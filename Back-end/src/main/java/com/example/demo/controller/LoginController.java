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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private NhanVienService nhanVienService;

    @Autowired
    private KhachHangServiceImpl khService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam("email") String email, @RequestParam("matKhau") String matKhau) {
        KhachHang kh = khService.findKhachHangByEmailAndMatKhau(email, matKhau);
        NhanVien nv = nhanVienService.findKhachHangByEmailAndMatKhau(email, matKhau);

        if (kh != null && nv != null) {
            // Tìm thấy cả khách hàng và nhân viên
            return ResponseEntity.ok("Both customer and employee found");
        } else if (kh != null) {
            // Tìm thấy khách hàng
            if (kh.getTrangThai() == 0) {
                return ResponseEntity.ok("Tài khoản này đã bị khoá");
            }
            KhachHangDTO nvDTO = new KhachHangDTO();
            nvDTO.setId(kh.getId());
            nvDTO.setTenKhachHang(kh.getTenKhachHang());
            nvDTO.setEmail(kh.getEmail());
            nvDTO.setMatKhau(kh.getMatKhau());
            nvDTO.setRole("KH"); // Đặt vai trò cho nhân viên
            return ResponseEntity.ok(nvDTO);
        } else if (nv != null) {
            // Tìm thấy nhân viên
            if (nv.getTrangThai() == 1) {
                return ResponseEntity.ok("Tài khoản này đã bị khoá");
            }
            NhanVienDTO nvDTO = new NhanVienDTO();
            nvDTO.setId(nv.getId());
            nvDTO.setTen(nv.getTen());
            nvDTO.setEmail(nv.getEmail());
            nvDTO.setMatKhau(nv.getMatKhau());
            if (nv.getVaiTro().getTen().equalsIgnoreCase("Nhân viên")) {
                nvDTO.setRole("NV"); // Đặt vai trò cho nhân viên
            } else {
                nvDTO.setRole("AD"); // Đặt vai trò cho nhân viên
            }
            return ResponseEntity.ok(nvDTO);
        } else {
            // Không tìm thấy
            return ResponseEntity.ok("Not found");
        }
    }

    @PostMapping("/loginGoogle")
    public ResponseEntity<?> loginGoogle(@RequestBody KhachHang khachHang) {
        List<KhachHang> list = khService.getAll();
        boolean foundMatchingCustomer = false;

        for (KhachHang kh : list) {
            if (khachHang.getEmail().equalsIgnoreCase(kh.getEmail()) && khachHang.getTenKhachHang().equalsIgnoreCase(kh.getTenKhachHang())) {
                foundMatchingCustomer = true;

                if (kh.getTrangThai() == 0) {
                    return ResponseEntity.ok("Tài khoản này đã bị khoá");
                }

                KhachHangDTO nvDTO = new KhachHangDTO();
                nvDTO.setId(kh.getId());
                nvDTO.setTenKhachHang(kh.getTenKhachHang());
                nvDTO.setEmail(kh.getEmail());
                nvDTO.setRole("KH"); // Đặt vai trò cho khách hàng
                return ResponseEntity.ok(nvDTO);
            }
        }

        if (!foundMatchingCustomer) {
            String ma = "KH" + new Random().nextInt(100000);
            khachHang.setMaKhachHang(ma);
            khachHang.setTrangThai(1);
            khachHang.setNgayTao(new Date());

            // Thêm khách hàng mới vào cơ sở dữ liệu
            KhachHang savedKhachHang = khService.dangKy(khachHang);
            KhachHangDTO nvDTO = new KhachHangDTO();
            nvDTO.setMaKhachHang(savedKhachHang.getMaKhachHang());
            nvDTO.setId(savedKhachHang.getId());
            nvDTO.setTenKhachHang(savedKhachHang.getTenKhachHang());
            nvDTO.setEmail(savedKhachHang.getEmail());
            nvDTO.setRole("KH"); // Đặt vai trò cho khách hàng mới
            return ResponseEntity.ok(nvDTO);
        }

        return ResponseEntity.ok(khachHang);
    }


    @PostMapping("/SignUp")
    public ResponseEntity<?> signUp(@RequestBody KhachHang khachHang) {
        // Kiểm tra xem email đã tồn tại hay chưa
        if (khService.checkEmailExists(khachHang.getEmail())) {
            // Nếu email đã tồn tại, trả về thông báo lỗi
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Tài khoản đã tồn tại");
        }

        String ma = "KH" + new Random().nextInt(100000);
        khachHang.setMaKhachHang(ma);
        khachHang.setTrangThai(1);

        // Thêm khách hàng mới vào cơ sở dữ liệu
        KhachHang savedKhachHang = khService.dangKy(khachHang);

        // Trả về thông báo đăng ký thành công
        return ResponseEntity.ok(savedKhachHang);
    }
}
