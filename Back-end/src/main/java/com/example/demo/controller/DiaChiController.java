package com.example.demo.controller;

import com.example.demo.entity.DiaChi;
import com.example.demo.service.impl.DiaChiServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/dia-chi")
public class DiaChiController {
    @Autowired
    private DiaChiServiceImpl dcService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(){
        return ResponseEntity.ok(dcService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add (@RequestBody DiaChi diaChi){
        return ResponseEntity.ok(dcService.add(diaChi));
    }
}
