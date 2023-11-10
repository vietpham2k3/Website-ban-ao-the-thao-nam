package com.example.demo.controller;

import com.example.demo.dto.DoiHangDTO;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.DoiHang;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.service.DoiHangService;
import com.example.demo.service.impl.DoiHangServiceImpl;
import com.example.demo.service.impl.HoaDonChiTietServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Random;
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
        hoaDonChiTietService.taoHoaDon(hoaDonChiTiets);
        return ResponseEntity.ok("ok");
    }

    @GetMapping("/getAll/{id}")
    public ResponseEntity<?> getAll(@PathVariable UUID id) {
        return ResponseEntity.ok(doiHangService.getAll(id));
    }

    @PostMapping("add-sp")
    public ResponseEntity<?> addSP(@RequestBody DoiHangDTO doiHangDTO) {
        String ma = "DH" + new Random().nextInt(100000);
        DoiHang doiHang = new DoiHang();
        doiHang.setMa(ma);
        doiHang.setNgayTao(new Date());
        doiHang.setSoHangDoi(doiHangDTO.getDoiHang().getSoHangDoi());
        doiHang.setTrangThai(doiHangDTO.getDoiHang().getTrangThai());
        doiHang.setGhiChu(doiHangDTO.getDoiHang().getGhiChu());
        doiHang.setNguoiTao(doiHangDTO.getDoiHang().getNguoiTao());
        doiHang.setTongTienHangDoi(doiHangDTO.getDoiHang().getTongTienHangDoi());
        doiHang = doiHangService.add(doiHang);
        HoaDonChiTiet hoaDonChiTiet = new HoaDonChiTiet().builder()
                .chiTietSanPham(doiHangDTO.getHoaDonChiTiet().getChiTietSanPham())
                .doiHang(doiHang)
                .hoaDon(doiHangDTO.getHoaDonChiTiet().getHoaDon())
                .donGia(doiHangDTO.getHoaDonChiTiet().getDonGia())
                .soLuongHangDoi(doiHangDTO.getHoaDonChiTiet().getSoLuongHangDoi())
                .build();
        return ResponseEntity.ok(hoaDonChiTietService.add(hoaDonChiTiet));
    }
}
