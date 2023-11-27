package com.example.demo.controller;


import com.example.demo.service.impl.DoiHangServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hang-loi")
public class HangLoiController {

    @Autowired
    public DoiHangServiceImpl doiHangService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") Integer page) {
        return ResponseEntity.ok(doiHangService.page(page));
    }
}
