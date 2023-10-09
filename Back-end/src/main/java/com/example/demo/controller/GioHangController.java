package com.example.demo.controller;

import com.example.demo.entity.CoAo;
import com.example.demo.entity.GioHang;
import com.example.demo.service.impl.GioHangServiceImpl;
import org.apache.regexp.RE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/gio-hang")
public class GioHangController {

    @Autowired
    private GioHangServiceImpl gioHangService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getALl(){
        return ResponseEntity.ok(gioHangService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody GioHang gioHang){
        String ma = "GH" + new Random().nextInt(100000);
        gioHang.setMa(ma);
        return ResponseEntity.ok(gioHangService.add(gioHang));
    }

}
