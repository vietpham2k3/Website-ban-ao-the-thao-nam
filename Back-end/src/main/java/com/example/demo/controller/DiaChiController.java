package com.example.demo.controller;

import com.example.demo.entity.DiaChi;
import com.example.demo.service.impl.DiaChiServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/dia-chi")
public class DiaChiController {
    @Autowired
    private DiaChiServiceImpl dcService;

    @GetMapping("/getAllIdKh/{idKH}")
    public ResponseEntity<?> getAll(@PathVariable("idKH") UUID idKH) {
        return ResponseEntity.ok(dcService.getAllIdKh(idKH));
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody DiaChi diaChi) {
        return ResponseEntity.ok(dcService.add(diaChi));
    }

    @PostMapping("/addDCKH/{id}")
    public ResponseEntity<?> addDCKH(@RequestBody DiaChi diaChi, @PathVariable UUID id) {
        return ResponseEntity.ok(dcService.addDCKH(diaChi, id));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(dcService.delete(id));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(dcService.detail(id));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody DiaChi diaChi, @PathVariable("id") UUID id) {
        return ResponseEntity.ok(dcService.update(diaChi, id));
    }
}
