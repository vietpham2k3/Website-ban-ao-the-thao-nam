package com.example.demo.controller;

import com.example.demo.service.HoaDonService;
import com.example.demo.service.impl.HoaDonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/thong-ke/")
public class ThongKeController {
    @Autowired
    public HoaDonServiceImpl hdSer;

    @GetMapping("doanh-thu-tong-ngay-hien-tai")
    public ResponseEntity<?> doanhThuTongNgayCurrent() {
        return ResponseEntity.ok().body(hdSer.doanhThuTongNgayCurrent());
    }

    @GetMapping("doanh-thu-tong-thang-hien-tai")
    public ResponseEntity<?> doanhThuTongThangCurrent() {
        return ResponseEntity.ok().body(hdSer.doanhThuTongThangCurrent());
    }

    @GetMapping("doanh-thu-tong-nam-hien-tai")
    public ResponseEntity<?> doanhThuTongNamCurrent() {
        return ResponseEntity.ok().body(hdSer.doanhThuTongNamCurrent());
    }

    //
    @GetMapping("doanh-thu-tai-quay-ngay-hien-tai")
    public ResponseEntity<?> doanhThuTQNgayCurrent() {
        return ResponseEntity.ok().body(hdSer.doanhThuTaiQuayNgayCurrent());
    }

    @GetMapping("doanh-thu-tai-quay-thang-hien-tai")
    public ResponseEntity<?> doanhThuTQThangCurrent() {
        return ResponseEntity.ok().body(hdSer.doanhThuTaiQuayThangCurrent());
    }

    @GetMapping("doanh-thu-tai-quay-nam-hien-tai")
    public ResponseEntity<?> doanhThuTQNamCurrent() {
        return ResponseEntity.ok().body(hdSer.doanhThuTaiQuayNamCurrent());
    }

    //
    @GetMapping("doanh-thu-online-ngay-hien-tai")
    public ResponseEntity<?> doanhThuOnlineNgayCurrent() {
        return ResponseEntity.ok().body(hdSer.doanhThuOnlineNgayCurrent());
    }

    @GetMapping("doanh-thu-online-thang-hien-tai")
    public ResponseEntity<?> doanhThuOnlineThangCurrent() {
        return ResponseEntity.ok().body(hdSer.doanhThuOnlineThangCurrent());
    }

    @GetMapping("doanh-thu-online-nam-hien-tai")
    public ResponseEntity<?> doanhThuOnlineNamCurrent() {
        return ResponseEntity.ok().body(hdSer.doanhThuOnlineNamCurrent());
    }

    //
    @GetMapping("so-don-huy-ngay")
    public ResponseEntity<?> soDonHuyNgay() {
        return ResponseEntity.ok().body(hdSer.soDonHuyNgay());
    }

    @GetMapping("so-don-huy-thang")
    public ResponseEntity<?> soDonHuyThang() {
        return ResponseEntity.ok().body(hdSer.soDonHuyThang());
    }

    @GetMapping("so-don-huy-nam")
    public ResponseEntity<?> soDonHuyNam() {
        return ResponseEntity.ok().body(hdSer.soDonHuyNam());
    }

    //
    @GetMapping("so-don-cho-xac-nhan-ngay")
    public ResponseEntity<?> soDonChoXacNhanNgay() {
        return ResponseEntity.ok().body(hdSer.soDonChoXacNhanNgay());
    }

    @GetMapping("so-don-cho-xac-nhan-thang")
    public ResponseEntity<?> soDonChoXacNhanThang() {
        return ResponseEntity.ok().body(hdSer.soDonChoXacNhanThang());
    }

    @GetMapping("so-don-cho-xac-nhan-nam")
    public ResponseEntity<?> soDonChoXacNhanNam() {
        return ResponseEntity.ok().body(hdSer.soDonChoXacNhanNam());
    }

    //
    @GetMapping("so-don-da-ban-ngay")
    public ResponseEntity<?> soDonDaBanNgay() {
        return ResponseEntity.ok().body(hdSer.soDonThanhCongNgay());
    }

    @GetMapping("so-don-da-ban-thang")
    public ResponseEntity<?> soDonDaBanThang() {
        return ResponseEntity.ok().body(hdSer.soDonThanhCongThang());
    }

    @GetMapping("so-don-da-ban-nam")
    public ResponseEntity<?> soDonDaBanNam() {
        return ResponseEntity.ok().body(hdSer.soDonThanhCongNam());
    }

}
