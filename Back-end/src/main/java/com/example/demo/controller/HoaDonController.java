package com.example.demo.controller;

import com.example.demo.service.impl.HoaDonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hoa-don/")
public class HoaDonController {
    @Autowired public HoaDonServiceImpl service;

    @GetMapping("hien-thi")
    public ResponseEntity<?> getAll(){
     return ResponseEntity.ok(service.listHD());
    }

    @GetMapping("hien-thi-page")
    public ResponseEntity<?> getPageHD(@RequestParam (defaultValue = "0") int page,
                                       Model model){
        Pageable pageable = PageRequest.of(page,5);

        return ResponseEntity.ok(service.pageHD(pageable));
    }

    @PostMapping("print-excel")
    public ResponseEntity<?> printExcel(){


        return ResponseEntity.ok(service.getExcel());
    }

}
