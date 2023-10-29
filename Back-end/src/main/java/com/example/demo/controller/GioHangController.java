package com.example.demo.controller;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.GioHang;
import com.example.demo.entity.GioHangChiTiet;
import com.example.demo.entity.HinhThucThanhToan;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.HoaDon_KhuyenMai;
import com.example.demo.entity.KhachHang;
import com.example.demo.entity.KhuyenMai;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import com.example.demo.service.impl.GioHangChiTietServiceImpl;
import com.example.demo.service.impl.GioHangServiceImpl;
import com.example.demo.service.impl.HinhThucThanhToanServiceImpl;
import com.example.demo.service.impl.HoaDonChiTietServiceImpl;
import com.example.demo.service.impl.HoaDonServiceImpl;
import com.example.demo.service.impl.HoaDon_KhuyenMaiServiceImpl;
import com.example.demo.service.impl.KhachHangServiceImpl;
import com.example.demo.service.impl.KhuyenMaiServiceImpl;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/gio-hang")
public class GioHangController {

    @Autowired
    private GioHangServiceImpl gioHangService;
    @Autowired
    private GioHangChiTietServiceImpl gioHangChiTietService;
    @Autowired
    public HoaDonServiceImpl serviceHD;
    @Autowired
    public HoaDon_KhuyenMaiServiceImpl hoaDon_khuyenMaiService;
    @Autowired
    public LichSuHoaDonServiceImpl serviceLSHD;
    @Autowired
    public HoaDonChiTietServiceImpl hoaDonChiTietService;
    @Autowired
    public HinhThucThanhToanServiceImpl serviceHttt;
    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;
    @Autowired
    private KhachHangServiceImpl khService;
    @Autowired
    private KhuyenMaiServiceImpl khuyenMaiService;

    @GetMapping("/countSP")
    public ResponseEntity<?> countSP(@RequestParam(required = false) UUID id) {
        return ResponseEntity.ok(gioHangChiTietService.countSPOnGH(id));
    }

    @GetMapping("/detailGH")
    public ResponseEntity<?> detailGH(@RequestParam(required = false) UUID id) {
        return ResponseEntity.ok(gioHangService.getAll(id));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(@RequestParam UUID id) {
        return ResponseEntity.ok(gioHangChiTietService.getAll(id));
    }

    @DeleteMapping("/deleteSPInGH/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        GioHangChiTiet hd = gioHangChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hd.getChiTietSanPham().getId());
        chiTietSanPhamService.update(sp.getSoLuong() + hd.getSoLuong(), sp.getId());
        gioHangChiTietService.delete(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/clearGH/{id}/{idHD}")
    public ResponseEntity<?> clearGH(@PathVariable UUID id, @PathVariable UUID idHD) {
        List<GioHangChiTiet> list = gioHangChiTietService.getAll(id);
        List<HoaDonChiTiet> listHD = hoaDonChiTietService.getAll(idHD);
        for (GioHangChiTiet gioHangChiTiet : list) {
            for (HoaDonChiTiet hd : listHD) {
                if (gioHangChiTiet.getGioHang().getId().equals(id)
                        && hd.getChiTietSanPham().getId().equals(gioHangChiTiet.getChiTietSanPham().getId())
                        && hd.getHoaDon().getId().equals(idHD)) {
                    gioHangChiTietService.delete(gioHangChiTiet.getId());
                }
            }
        }
        return ResponseEntity.ok().build();
    }


    @PutMapping("update-sl/{id}")
    public ResponseEntity<?> updateSL(@PathVariable UUID id, @RequestBody GioHangChiTiet hoaDon) {
        GioHangChiTiet hd = gioHangChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hoaDon.getChiTietSanPham().getId());
        if (hoaDon.getSoLuong() > hd.getSoLuong()) {
            chiTietSanPhamService.update(sp.getSoLuong() - (hoaDon.getSoLuong() - hd.getSoLuong()), hoaDon.getChiTietSanPham().getId());
            gioHangChiTietService.updateSL(hoaDon.getSoLuong(), hd.getId());
            return ResponseEntity.ok("Tang cthd, giam ctsp");
        } else {
            // Không tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu, thực hiện thêm mới
            chiTietSanPhamService.update(sp.getSoLuong() + (hd.getSoLuong() - hoaDon.getSoLuong()), hoaDon.getChiTietSanPham().getId());
            gioHangChiTietService.updateSL(hoaDon.getSoLuong(), hd.getId());
            return ResponseEntity.ok("Giam cthd, tang ctsp");
        }
    }

    @PutMapping("update-hd-checkout/{id}")
    public ResponseEntity<?> updateHD(@RequestBody HoaDon hoaDon, @PathVariable UUID id, @RequestParam String nguoiTao) {
        String ma = "HTTT" + new Random().nextInt(100000);
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hd = serviceHD.detailHD(id);
        HinhThucThanhToan httt = new HinhThucThanhToan().builder()
                .ma(ma)
                .ten(hoaDon.getHinhThucThanhToan().getTen())
                .ngayTao(new Date())
                .trangThai(hoaDon.getHinhThucThanhToan().getTrangThai())
                .tien(hoaDon.getHinhThucThanhToan().getTien())
                .build();
        hoaDon.setId(id);
        hoaDon.setNgayTao(hd.getNgayTao());
        hoaDon.setNgayThanhToan(new Date());
        hoaDon.setNgaySua(new Date());
        hoaDon.setMa(hd.getMa());
        hoaDon.setLoaiDon(1);
        hoaDon.setTenNguoiNhan(hoaDon.getTenNguoiNhan());
        hoaDon.setSoDienThoai(hoaDon.getSoDienThoai());
        hoaDon.setDiaChi(hoaDon.getDiaChi());
        hoaDon.setTinh(hoaDon.getTinh());
        hoaDon.setHuyen(hoaDon.getHuyen());
        hoaDon.setXa(hoaDon.getXa());
        httt = serviceHttt.add(httt);
        hoaDon.setHinhThucThanhToan(httt);
        if (httt.getTen().equalsIgnoreCase("VNPay")) {
            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon().builder()
                    .ma(maLSHD)
                    .ten("Thanh toán thành công")
                    .trangThai(6)
                    .ngayTao(new Date())
                    .nguoiTao(nguoiTao)
                    .ghiChu("Thanh toán thành công")
                    .hoaDon(hd)
                    .build();
            serviceLSHD.createLichSuDonHang(lichSuHoaDon);
        }
        return ResponseEntity.ok(serviceHD.add(hoaDon));
    }

    @PostMapping("/add-km")
    public ResponseEntity<?> addkm(@RequestBody HoaDon_KhuyenMai khuyenMai) {
        List<KhuyenMai> list = khuyenMaiService.getAllKM(khuyenMai.getKhuyenMai().getTien());
        boolean isValid = false;
        List<HoaDon_KhuyenMai> listHD = hoaDon_khuyenMaiService.getAll(khuyenMai.getHoaDon().getId());
        for (HoaDon_KhuyenMai h : listHD) {
            if (khuyenMai.getKhuyenMai().getMa().equals(h.getKhuyenMai().getMa())) {
                return ResponseEntity.ok("ff");
            }
        }

        for (KhuyenMai k : list) {
            if (khuyenMai.getKhuyenMai().getMa().equalsIgnoreCase(k.getMa())) {
                khuyenMai.setTienGiam(k.getMucGiam());
                khuyenMai.setKhuyenMai(k);
                isValid = true;
                break;
            }
        }

        if (!isValid) {
            return ResponseEntity.ok("error");
        }

        hoaDon_khuyenMaiService.add(khuyenMai);
        return ResponseEntity.ok("Thành công");
    }


    @PostMapping("/tao-hoa-don")
    public ResponseEntity<String> themHoaDonChiTiet(@RequestParam String nguoiTao, @RequestBody List<HoaDonChiTiet> hoaDonChiTietList) {
        String ma = "HD" + new Random().nextInt(100000);
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = new HoaDon().builder()
                .ma(ma)
                .ngayTao(new Date())
                .loaiDon(1)
                .trangThai(0)
                .build();
        hoaDon = serviceHD.add(hoaDon);
        for (HoaDonChiTiet hd : hoaDonChiTietList) {
            hd.setHoaDon(hoaDon);
        }
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon().builder()
                .ma(maLSHD)
                .ten("Đã đặt đơn hàng")
                .trangThai(0)
                .nguoiTao(nguoiTao)
                .ngayTao(new Date())
                .hoaDon(hoaDon)
                .ghiChu("Đã đặt đơn hàng")
                .build();
        serviceLSHD.createLichSuDonHang(lichSuHoaDon);
        hoaDonChiTietService.taoHoaDon(hoaDonChiTietList);
        return ResponseEntity.ok(String.valueOf(hoaDon.getId()));
    }

    @PostMapping("/them-gio-hang")
    public ResponseEntity<?> themGioHang(@RequestParam UUID idKH, @RequestBody GioHangChiTiet gioHangChiTiet) {
        String ma = "GH" + new Random().nextInt(100000);
        KhachHang khachHang = khService.getOne(idKH);
        ChiTietSanPham ctsp = chiTietSanPhamService.detail(gioHangChiTiet.getChiTietSanPham().getId());

        // Kiểm tra xem có sẵn giỏ hàng cho khách hàng chưa
        GioHang gioHang = gioHangService.getAll(idKH);

        if (gioHang == null) {
            // Nếu chưa có giỏ hàng, tạo mới
            gioHang = new GioHang().builder()
                    .ma(ma)
                    .khachHang(khachHang)
                    .ngayTao(new Date())
                    .trangThai(0)
                    .tenNguoiNhan(khachHang.getTenKhachHang())
                    .build();
            gioHang = gioHangService.add(gioHang);
        }

        List<GioHangChiTiet> list = gioHangChiTietService.getAll(gioHang.getId());
        boolean productExistsInCart = false;

        for (GioHangChiTiet gioHangChiTiet1 : list) {
            if (gioHangChiTiet1.getChiTietSanPham().getId().equals(gioHangChiTiet.getChiTietSanPham().getId())) {
                // Nếu sản phẩm tương tự đã tồn tại trong giỏ hàng, cập nhật số lượng
                gioHangChiTiet1.setSoLuong(gioHangChiTiet1.getSoLuong() + gioHangChiTiet.getSoLuong());
                gioHangChiTiet.setGioHang(gioHang);
                gioHangChiTiet.setChiTietSanPham(gioHangChiTiet.getChiTietSanPham());
                gioHangChiTiet.setDonGia(ctsp.getGiaBan());
                gioHangChiTietService.add(gioHangChiTiet1); // Cập nhật chi tiết giỏ hàng
                chiTietSanPhamService.update(ctsp.getSoLuong() - gioHangChiTiet.getSoLuong(), gioHangChiTiet.getChiTietSanPham().getId());
                productExistsInCart = true;
                break;
            }
        }

        if (!productExistsInCart) {
            gioHangChiTiet.setGioHang(gioHang);
            gioHangChiTiet.setChiTietSanPham(gioHangChiTiet.getChiTietSanPham());
            gioHangChiTiet.setDonGia(ctsp.getGiaBan());
            gioHangChiTiet.setSoLuong(gioHangChiTiet.getSoLuong());
            chiTietSanPhamService.update(ctsp.getSoLuong() - gioHangChiTiet.getSoLuong(), gioHangChiTiet.getChiTietSanPham().getId());
            gioHangChiTietService.add(gioHangChiTiet); // Thêm chi tiết giỏ hàng
        }

        return ResponseEntity.ok(gioHangChiTiet);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteByIdHD(@PathVariable UUID id) {
        hoaDonChiTietService.deleteByIdHD(id);
        return ResponseEntity.ok("Thành công");
    }

}
