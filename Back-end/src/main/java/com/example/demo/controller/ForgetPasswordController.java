package com.example.demo.controller;

import com.example.demo.entity.KhachHang;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.impl.KhachHangServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ForgetPasswordController {
    @Autowired
    private KhachHangServiceImpl khachHangService;
    @Autowired
    private KhachHangRepository khachHangRepository;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> processForgotPassword(@RequestParam String email) {
        KhachHang khachHang = khachHangRepository.findByEmail(email);
        if (khachHang != null) {
            khachHangService.sendResetPasswordEmail(email, khachHang.getTenKhachHang());
            return ResponseEntity.ok("Mật khẩu mới đã được gửi đến email của bạn.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email không tồn tại trong hệ thống.");
        }
    }

}
