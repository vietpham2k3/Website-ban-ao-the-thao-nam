package com.example.demo.controller;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.service.DoiHangService;
import com.example.demo.service.impl.DoiHangServiceImpl;
import com.example.demo.service.impl.HoaDonChiTietServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/doi-hang")
public class DoiHangController {

    @Autowired
    public HoaDonChiTietServiceImpl hoaDonChiTietService;

    @Autowired
    public DoiHangServiceImpl doiHangService;

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody List<HoaDonChiTiet> hoaDonChiTiets) {
        for (HoaDonChiTiet hoaDonChiTiet : hoaDonChiTiets) {
            if (hoaDonChiTiet.getSoLuongHangDoi() == 0) {
                hoaDonChiTiet.setDoiHang(null);
            }
        }

        hoaDonChiTietService.taoHoaDon(hoaDonChiTiets);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/getAll/{id}")
    public ResponseEntity<?> getAll(@PathVariable UUID id) {
        return ResponseEntity.ok(doiHangService.getAll(id));
    }
}
