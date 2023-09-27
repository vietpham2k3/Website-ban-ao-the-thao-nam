package com.example.demo.controller;

import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/chi-tiet-san-pham/")
@CrossOrigin(origins = "http://localhost:3000")
public class ChiTietSanPhamController {

    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;

    @GetMapping("getAll")
    public ResponseEntity<?> hienThiPage(@RequestParam(value = "page",defaultValue = "0") Integer page){
        return ResponseEntity.ok(chiTietSanPhamService.page(page));
    }
}
