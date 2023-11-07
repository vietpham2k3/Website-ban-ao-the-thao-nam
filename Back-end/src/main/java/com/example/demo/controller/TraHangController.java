package com.example.demo.controller;

import com.example.demo.entity.LichSuTraHang;
import com.example.demo.entity.TraHang;
import com.example.demo.service.TraHangService;
import com.example.demo.service.impl.LichSuTraHangServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tra-hang")
public class TraHangController {

    @Autowired
    private LichSuTraHangServiceImpl lichSuTraHangService;

    @Autowired
    private TraHangService traHangService;

    @PostMapping("/tao-don-tra-hang")
    public ResponseEntity<?> getAll(@RequestBody TraHang traHang) {
        String ma = "LSTH" + new Random().nextInt(100000);
        String maTH = "TH" + new Random().nextInt(100000);
        traHang.setMa(maTH);
        traHang.setNgayTao(new Date());
        traHang = traHangService.add(traHang);
        LichSuTraHang lichSuTraHang = new LichSuTraHang().builder()
                .ma(ma)
                .ten("Trả hàng")
                .ngayTao(new Date())
                .trangThai(15)
                .nguoiTao(traHang.getNguoiTao())
                .ghiChu(traHang.getGhiChu())
                .traHang(traHang)
                .build();
        return ResponseEntity.ok(lichSuTraHangService.add(lichSuTraHang));
    }
}
