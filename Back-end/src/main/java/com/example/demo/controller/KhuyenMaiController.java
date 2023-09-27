package com.example.demo.controller;

import com.example.demo.entity.KhuyenMai;
import com.example.demo.service.impl.KhuyenMaiServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.UUID;

@RestController
@RequestMapping("/api/khuyen-mai/")
@CrossOrigin(origins = "http://localhost:3000")
public class KhuyenMaiController {
    @Autowired
    private KhuyenMaiServiceImpl service;

    @GetMapping("hien-thi")
    public ResponseEntity<?> hienThi(){
        return ResponseEntity.ok(service.getAllKM());
    }

    @GetMapping("hien-thi-page")
    public ResponseEntity<?> hienthiPage(@RequestParam(defaultValue = "0") Integer page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(service.pageKM(pageable));
    }

    @GetMapping("hien-thi-page-search")
    public ResponseEntity<?> hienThiPageSearch(String key,Integer trangThai, @RequestParam (defaultValue = "0") Integer page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(service.pageSearchKM(key,trangThai,pageable));
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody KhuyenMai khuyenMai){
        khuyenMai.setMa(khuyenMai.getMa());
        khuyenMai.setTen(khuyenMai.getTen());
        khuyenMai.setMucGiam(khuyenMai.getMucGiam());
        khuyenMai.setTien(khuyenMai.getTien());
        khuyenMai.setMoTa(khuyenMai.getMoTa());
        khuyenMai.setNgayTao(new Date());
        khuyenMai.setThoiGianBatDau(khuyenMai.getThoiGianBatDau());
        khuyenMai.setThoiGianKetThuc(khuyenMai.getThoiGianKetThuc());
        return ResponseEntity.ok(service.add(khuyenMai));
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id){
        return ResponseEntity.ok(service.detail(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody KhuyenMai khuyenMai){
        khuyenMai.setId(id);
        khuyenMai.setMa(khuyenMai.getMa());
        khuyenMai.setTen(khuyenMai.getTen());
        khuyenMai.setMucGiam(khuyenMai.getMucGiam());
        khuyenMai.setTien(khuyenMai.getTien());
        khuyenMai.setMoTa(khuyenMai.getMoTa());
        khuyenMai.setNgayTao(new Date());
        khuyenMai.setThoiGianBatDau(khuyenMai.getThoiGianBatDau());
        khuyenMai.setThoiGianKetThuc(khuyenMai.getThoiGianKetThuc());
        khuyenMai.setNgaySua(new Date());
        return ResponseEntity.ok(service.add(khuyenMai));
    }

    @PutMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id, @RequestBody KhuyenMai khuyenMai){
        khuyenMai.setId(id);
        return ResponseEntity.ok(service.xoa(id));
    }
}
