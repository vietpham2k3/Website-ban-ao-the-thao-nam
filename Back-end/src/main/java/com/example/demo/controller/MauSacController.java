package com.example.demo.controller;

import com.example.demo.entity.MauSac;
import com.example.demo.service.MauSacService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/mau-sac/")
@CrossOrigin(origins = "http://localhost:3000")
public class MauSacController {
    @Autowired public
    MauSacService service;

    @GetMapping("hien-thi")
    public ResponseEntity<?> hienThi(){
        return ResponseEntity.ok(service.getAllMS());
    }

    @GetMapping("hien-thi-page")
    public ResponseEntity<?> hienThiPage(@RequestParam (defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(service.pageMS(pageable));
    }

    @GetMapping("hien-thi-page-search")
    public ResponseEntity<?> hienThiPageSearch(String key,@RequestParam (defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(service.pageSearchMS(key,pageable));
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody MauSac mauSac){
        return ResponseEntity.ok(service.add(mauSac));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id,
                                    @RequestBody MauSac mauSac){
        mauSac.setId(id);
        return ResponseEntity.ok(service.add(mauSac));
    }

    @PutMapping("delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id,
                                    @RequestBody MauSac mauSac){
        mauSac.setId(id);
        return ResponseEntity.ok(service.xoa(id));
    }

}
