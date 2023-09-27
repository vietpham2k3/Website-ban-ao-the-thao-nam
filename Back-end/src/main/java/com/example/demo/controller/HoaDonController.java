package com.example.demo.controller;

import com.example.demo.service.impl.HinhThucThanhToanServiceImpl;
import com.example.demo.service.impl.HoaDonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hoa-don/")
public class HoaDonController {
    @Autowired public HoaDonServiceImpl service;
    @Autowired public HinhThucThanhToanServiceImpl serviceHttt;

    @GetMapping("hien-thi")
    public ResponseEntity<?> getAll(){
     return ResponseEntity.ok(service.listHD());
    }

    @GetMapping("hien-thi-page")
    public ResponseEntity<?> getPageHD(@RequestParam (defaultValue = "0") int page,
                                       Model model){
        Pageable pageable = PageRequest.of(page,5);
        model.addAttribute("httt", serviceHttt.getAll());
        return ResponseEntity.ok(service.hienThiPageHD(pageable));
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id,Model model){
        model.addAttribute("hd", service.detailHD(id));
        model.addAttribute("listHD", service.listHD());
        model.addAttribute("httt", serviceHttt.getAll());
        return ResponseEntity.ok(service.detailHD(id));
    }

    @PostMapping("print-excel")
    public ResponseEntity<?> printExcel(){


        return ResponseEntity.ok(service.getExcel());
    }

}
