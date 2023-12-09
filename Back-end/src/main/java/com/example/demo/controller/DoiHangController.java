package com.example.demo.controller;

import com.example.demo.dto.DoiHangDTO;
import com.example.demo.entity.*;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import com.example.demo.service.impl.DoiHangServiceImpl;
import com.example.demo.service.impl.HoaDonChiTietServiceImpl;
import com.example.demo.service.impl.HoaDonServiceImpl;
import com.example.demo.service.impl.LichSuHoaDonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/doi-hang")
public class DoiHangController {

    @Autowired
    public HoaDonChiTietServiceImpl hoaDonChiTietService;

    @Autowired
    public DoiHangServiceImpl doiHangService;

    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;

    @Autowired
    public HoaDonServiceImpl serviceHD;

    @Autowired
    public LichSuHoaDonServiceImpl serviceLSHD;

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody List<HoaDonChiTiet> hoaDonChiTiets) {
        for (HoaDonChiTiet hoaDonChiTiet :hoaDonChiTiets) {
            hoaDonChiTiet.setLichSuSoLuongYeuCauDoi(hoaDonChiTiet.getSoLuongYeuCauDoi());
        }
        hoaDonChiTietService.taoHoaDon(hoaDonChiTiets);
        return ResponseEntity.ok("ok");
    }

    @PutMapping("/updateMoney/{id}")
    public ResponseEntity<?> updateMoney(@RequestBody DoiHang doiHang, @PathVariable UUID id) {
        doiHang.setId(id);
        DoiHang doihang = doiHangService.findById(id);
        doiHang.setMa(doihang.getMa());
        doiHang.setTongTienHangDoi(doihang.getTongTienHangDoi());
        doiHang.setSoHangDoi(doihang.getSoHangDoi());
        doiHang.setTrangThai(doihang.getTrangThai());
        doiHang.setNgayTao(doihang.getNgayTao());
        doiHang.setNguoiTao(doihang.getNguoiTao());
        doiHang.setPhuongThucThanhToan(doihang.getPhuongThucThanhToan());
        doiHang.setGhiChu(doihang.getGhiChu());
        return ResponseEntity.ok(doiHangService.add(doiHang));
    }

    @GetMapping("/detailDoiHang/{id}")
    public ResponseEntity<?> detailDoiHang(@PathVariable UUID id) {
        return ResponseEntity.ok(doiHangService.findById(id));
    }

    @GetMapping("/getAll/{id}")
    public ResponseEntity<?> getAll(@PathVariable UUID id) {
        return ResponseEntity.ok(doiHangService.getAllHD(id));
    }

    @PostMapping("add-sp")
    public ResponseEntity<?> addSP(@RequestBody DoiHangDTO doiHangDTO) {
        // Tạo mã mới cho đổi hàng
        String ma = "DH" + new Random().nextInt(100000);
        DoiHang doiHang = new DoiHang();
        doiHang.setMa(ma);
        doiHang.setNgayTao(new Date());
        doiHang.setSoHangDoi(doiHangDTO.getDoiHang().getSoHangDoi());
        doiHang.setTrangThai(doiHangDTO.getDoiHang().getTrangThai());
        doiHang.setGhiChu(doiHangDTO.getDoiHang().getGhiChu());
        doiHang.setNguoiTao(doiHangDTO.getDoiHang().getNguoiTao());
        doiHang.setTongTienHangDoi(doiHangDTO.getDoiHang().getTongTienHangDoi());
        doiHang.setPhuongThucThanhToan(doiHangDTO.getDoiHang().getPhuongThucThanhToan());
        doiHang.setTienKhachPhaiTra(doiHangDTO.getDoiHang().getTienKhachPhaiTra());

        // Tìm hoặc tạo mới đổi hàng
        DoiHang existingDoiHang = null;
        List<HoaDonChiTiet> list = hoaDonChiTietService.getAllByIdHD(doiHangDTO.getHoaDonChiTiet().getHoaDon().getId());
        for (HoaDonChiTiet hdct : list) {
            if (hdct.getDoiHang() != null) {
                existingDoiHang = doiHangService.findById(hdct.getDoiHang().getId());
                break;
            }
        }
        HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet().builder()
                .chiTietSanPham(doiHangDTO.getHoaDonChiTiet().getChiTietSanPham())
                .doiHang(existingDoiHang)
                .hoaDon(doiHangDTO.getHoaDonChiTiet().getHoaDon())
                .donGia(doiHangDTO.getHoaDonChiTiet().getDonGia())
                .soLuongHangDoi(doiHang.getSoHangDoi())
                .build();

        if (existingDoiHang != null) {
            // Đã có đổi hàng, cộng dồn số lượng hàng đổi và tổng tiền hàng đổi vào hóa đơn chi tiết
            int currentSoLuongHangDoiDH = existingDoiHang.getSoHangDoi();
            double tien = existingDoiHang.getTongTienHangDoi();

            int newSoLuongHangDoiDH = doiHangDTO.getDoiHang().getSoHangDoi();
            double newTien = doiHangDTO.getDoiHang().getTongTienHangDoi();

            existingDoiHang.setSoHangDoi(currentSoLuongHangDoiDH + newSoLuongHangDoiDH);
            existingDoiHang.setTongTienHangDoi(tien + newTien);

            existingDoiHang = doiHangService.add(existingDoiHang);

            // Cập nhật đổi hàng cho tất cả hoá đơn chi tiết có idHD trùng nhau
            for (HoaDonChiTiet hdct : list) {
                if (hdct.getDoiHang() == null) {
                    hdct.setDoiHang(existingDoiHang);
                    hoaDonChiTietService.add(hdct);
                }
            }
            hoaDonChiTietService.add(hoaDonChiTiet);
        } else {
            // Thêm mới đổi hàng
            doiHangService.add(doiHang);

//            // Thêm mới hoá đơn chi tiết
//            HoaDonChiTiet hoaDonChiTiet = doiHangDTO.getHoaDonChiTiet();
//            hoaDonChiTiet.setDoiHang(doiHang);
//            hoaDonChiTietService.add(hoaDonChiTiet);

            // Cập nhật đổi hàng cho tất cả hoá đơn chi tiết có idHD trùng nhau
            for (HoaDonChiTiet hdct : list) {
                if (hdct.getDoiHang() == null) {
                    hdct.setDoiHang(doiHang);
                    hoaDonChiTietService.add(hdct);
                }
            }
            hoaDonChiTietService.add(hoaDonChiTiet);
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteHDCT(@PathVariable UUID id) {
        HoaDonChiTiet hd = hoaDonChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hd.getChiTietSanPham().getId());
        chiTietSanPhamService.update(sp.getSoLuong() + hd.getSoLuongHangDoi(), sp.getId());
        hoaDonChiTietService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("yeu-cau-doi-hang/{id}")
    public ResponseEntity<?> xacNhanTra(@PathVariable UUID id,
                                        @RequestBody DoiHangDTO doiHangDTO) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        doiHangDTO.getLichSuHoaDon().setTrangThai(15);
        hoaDon.setTrangThai(15);
        doiHangDTO.getLichSuHoaDon().setNgayTao(new Date());
        doiHangDTO.getLichSuHoaDon().setMa(maLSHD);
        doiHangDTO.getLichSuHoaDon().setGhiChu(doiHangDTO.getLichSuHoaDon().getGhiChu());
        doiHangDTO.getLichSuHoaDon().setHoaDon(hoaDon);
        doiHangDTO.getLichSuHoaDon().setTen("Yêu cầu đổi hàng");
        List<HoaDonChiTiet> list = hoaDonChiTietService.getAllByIdHD(id);
        for (HoaDonChiTiet hdct : list) {
            if (hdct.getDoiHang() != null) {
                DoiHang dh = doiHangService.findById(hdct.getDoiHang().getId());
                dh.setGhiChu(doiHangDTO.getLichSuHoaDon().getGhiChu());
                dh.setSoHangDoi(doiHangDTO.getDoiHang().getSoHangDoi());
                dh.setTongTienHangDoi(doiHangDTO.getDoiHang().getTongTienHangDoi());
                dh.setNguoiTao(doiHangDTO.getDoiHang().getNguoiTao());
                dh.setPhuongThucThanhToan(doiHangDTO.getDoiHang().getPhuongThucThanhToan());
                dh.setTienKhachPhaiTra(doiHangDTO.getDoiHang().getTienKhachPhaiTra());
                doiHangService.add(dh);
                break;
            }
        }
        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(doiHangDTO.getLichSuHoaDon()));
    }

}
