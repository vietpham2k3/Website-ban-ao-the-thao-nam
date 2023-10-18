package com.example.demo.controller;

import com.example.demo.dto.KhachHangDTO;
import com.example.demo.dto.NhanVienDTO;
import com.example.demo.entity.KhachHang;
import com.example.demo.entity.NhanVien;
import com.example.demo.service.NhanVienService;
import com.example.demo.service.impl.KhachHangServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private NhanVienService nhanVienService;

    @Autowired
    private KhachHangServiceImpl khService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam("email") String email, @RequestParam("matKhau") String matKhau ) {
        KhachHang kh = khService.findKhachHangByEmailAndMatKhau(email, matKhau);
        NhanVien nv = nhanVienService.findKhachHangByEmailAndMatKhau(email, matKhau);

        if (kh != null && nv != null) {
            // Tìm thấy cả khách hàng và nhân viên
            return ResponseEntity.ok("Both customer and employee found");
        } else if (kh != null) {
            // Tìm thấy khách hàng
            KhachHangDTO nvDTO = new KhachHangDTO();
            nvDTO.setId(kh.getId());
            nvDTO.setTenKhachHang(kh.getTenKhachHang());
            nvDTO.setEmail(kh.getEmail());
            nvDTO.setMatKhau(kh.getMatKhau());
            nvDTO.setRole("KH"); // Đặt vai trò cho nhân viên
            return ResponseEntity.ok(nvDTO);
        } else if (nv != null) {
            // Tìm thấy nhân viên
            NhanVienDTO nvDTO = new NhanVienDTO();
            nvDTO.setId(nv.getId());
            nvDTO.setTen(nv.getTen());
            nvDTO.setEmail(nv.getEmail());
            nvDTO.setMatKhau(nv.getMatKhau());
            nvDTO.setRole("NV"); // Đặt vai trò cho nhân viên
            return ResponseEntity.ok(nvDTO);
        } else {
            // Không tìm thấy
            return ResponseEntity.ok("Not found");
        }
    }

}
