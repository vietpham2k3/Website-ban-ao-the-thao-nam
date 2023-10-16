package com.example.demo.controller;

import com.example.demo.entity.CoAo;
import com.example.demo.entity.GioHang;
import com.example.demo.entity.HinhThucThanhToan;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.HoaDon_KhuyenMai;
import com.example.demo.entity.KhuyenMai;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import com.example.demo.service.impl.GioHangServiceImpl;
import com.example.demo.service.impl.HinhThucThanhToanServiceImpl;
import com.example.demo.service.impl.HoaDonChiTietServiceImpl;
import com.example.demo.service.impl.HoaDonServiceImpl;
import com.example.demo.service.impl.HoaDon_KhuyenMaiServiceImpl;
import com.example.demo.service.impl.KhachHangServiceImpl;
import com.example.demo.service.impl.KhuyenMaiServiceImpl;
import com.example.demo.service.impl.LichSuHoaDonServiceImpl;
import jakarta.validation.Valid;
import org.apache.regexp.RE;
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

    @GetMapping("/getAll")
    public ResponseEntity<?> getALl() {
        return ResponseEntity.ok(gioHangService.getAll());
    }

    @PutMapping("update-hd-checkout/{id}")
    public ResponseEntity<?> updateHD(@RequestBody HoaDon hoaDon, @PathVariable UUID id) {
        String ma = "HTTT" + new Random().nextInt(100000);

        HoaDon hd = serviceHD.detailHD(id);
        HinhThucThanhToan httt = new HinhThucThanhToan().builder()
                .ma(ma)
                .ten(hoaDon.getHinhThucThanhToan().getTen())
                .ngayTao(new Date())
                .trangThai(1)
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
        hoaDon.setTrangThai(0);
        httt = serviceHttt.add(httt);
        hoaDon.setHinhThucThanhToan(httt);
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
    public ResponseEntity<String> themHoaDonChiTiet(@RequestBody List<HoaDonChiTiet> hoaDonChiTietList) {
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
                .ten("Tạo hoá đơn")
                .trangThai(0)
                .ngayTao(new Date())
                .hoaDon(hoaDon)
                .ghiChu("Tạo hoá đơn")
                .build();
        serviceLSHD.createLichSuDonHang(lichSuHoaDon);
        hoaDonChiTietService.taoHoaDon(hoaDonChiTietList);
        return ResponseEntity.ok(String.valueOf(hoaDon.getId()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteByIdHD(@PathVariable UUID id) {
        hoaDonChiTietService.deleteByIdHD(id);
        return ResponseEntity.ok("Thành công");
    }

}
