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
        hoaDonChiTietService.taoHoaDon(hoaDonChiTiets);
        return ResponseEntity.ok("ok");
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
        // Nếu chưa có đổi hàng, tạo mới hóa đơn chi tiết
        HoaDonChiTiet newHoaDonChiTiet = new HoaDonChiTiet().builder()
                .chiTietSanPham(doiHangDTO.getHoaDonChiTiet().getChiTietSanPham())
                .doiHang(doiHang)
                .hoaDon(doiHangDTO.getHoaDonChiTiet().getHoaDon())
                .donGia(doiHangDTO.getHoaDonChiTiet().getDonGia())
                .soLuongHangDoi(doiHangDTO.getHoaDonChiTiet().getSoLuongHangDoi()) // Số lượng hàng đổi mới
                .build();
        // Tìm hoặc tạo mới hóa đơn chi tiết
        List<HoaDonChiTiet> list = hoaDonChiTietService.getAllByIdHD(doiHangDTO.getHoaDonChiTiet().getHoaDon().getId());
        List<HoaDonChiTiet> listHDCT = hoaDonChiTietService.existsById(
                doiHangDTO.getHoaDonChiTiet().getChiTietSanPham(), doiHangDTO.getHoaDonChiTiet().getHoaDon());
        for (HoaDonChiTiet hdct : list) {
            if (hdct.getDoiHang() != null) {
                DoiHang dh = doiHangService.findById(hdct.getDoiHang().getId());

                // Nếu đã có đổi hàng, cộng dồn số lượng hàng đổi và tổng tiền hàng đổi vào hóa đơn chi tiết
                int currentSoLuongHangDoiDH = dh.getSoHangDoi();
                double tien = dh.getTongTienHangDoi();

                int newSoLuongHangDoiDH = doiHangDTO.getDoiHang().getSoHangDoi();
                double newTien = doiHangDTO.getDoiHang().getTongTienHangDoi();

                dh.setSoHangDoi(currentSoLuongHangDoiDH + newSoLuongHangDoiDH);
                dh.setTongTienHangDoi(tien + newTien);

                dh = doiHangService.add(dh);
                newHoaDonChiTiet.setDoiHang(dh);

                if (hdct.getSoLuongHangDoi() != null) {
                    int sumSoHangDoi = hdct.getSoLuongHangDoi() + doiHangDTO.getHoaDonChiTiet().getSoLuongHangDoi();
                    if (!Objects.equals(hdct.getChiTietSanPham().getId(), doiHangDTO.getHoaDonChiTiet().getChiTietSanPham().getId())) {
                        // Nếu idHL không thay đổi, bạn có thể tránh thực hiện một số thao tác không cần thiết
//                        ChiTietSanPham ctsp = chiTietSanPhamService.detail(hdct.getChiTietSanPham().getId());

                    }
                    newHoaDonChiTiet.setId(doiHangDTO.getHoaDonChiTiet().getId());
                    newHoaDonChiTiet.setSoLuongHangDoi(sumSoHangDoi);
                }

                return ResponseEntity.ok(hoaDonChiTietService.add(newHoaDonChiTiet));
            }
        }



        // Thêm đổi hàng
        doiHangService.add(doiHang);

        // Thêm mới hóa đơn chi tiết
        return ResponseEntity.ok(hoaDonChiTietService.add(newHoaDonChiTiet));
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
