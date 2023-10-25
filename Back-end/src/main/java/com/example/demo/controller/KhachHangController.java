package com.example.demo.controller;

import com.example.demo.UploadFile.AnhKH;
import com.example.demo.dto.KhachHangDTO;
import com.example.demo.entity.DiaChi;
import com.example.demo.entity.KhachHang;
import com.example.demo.service.impl.DiaChiServiceImpl;
import com.example.demo.service.impl.HoaDonServiceImpl;
import com.example.demo.service.impl.KhachHangServiceImpl;
import com.example.demo.service.impl.SendEmailServicecImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;

@RestController
@RequestMapping("/api/khach-hang")
@CrossOrigin(origins = "http://localhost:3000")
public class KhachHangController {

    @Autowired
    public HoaDonServiceImpl serviceHD;

    @Autowired
    private KhachHangServiceImpl khService;

    @Autowired
    private DiaChiServiceImpl dcService;

    @Autowired
    private SendEmailServicecImpl emailService;

    @GetMapping("/getAll/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") UUID id) throws IOException, SQLException {
        KhachHang kh = khService.getOne(id);
        if (kh != null && kh.getAnh() != null) {
            byte[] imageData = convertBlobToBytes(kh.getAnh());
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageData);
        }
        return ResponseEntity.notFound().build();
    }

    private byte[] convertBlobToBytes(Blob blob) throws IOException, SQLException {
        if (blob != null) {
            try (InputStream inputStream = blob.getBinaryStream()) {
                ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
                byte[] buffer = new byte[4096];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, bytesRead);
                }
                return outputStream.toByteArray();
            }
        }
        return null;
    }

    @GetMapping("/getAllPage")
    public ResponseEntity<byte[]> getAll(@RequestParam(defaultValue = "0") Integer page) throws IOException {
        Page<KhachHang> khachHangPage = khService.getAll(page);

        // Convert the Page<KhachHang> to byte array
        byte[] khachHangBytes = convertPageToByteArray(khachHangPage);

        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");

        return ResponseEntity.ok()
                .headers(headers)
                .body(khachHangBytes);
    }

    /**
     * Convert the Page<KhachHang> to byte array.
     */
    private byte[] convertPageToByteArray(Page<KhachHang> khachHangPage) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ByteArrayInputStream.class, new AnhKH());
        objectMapper.registerModule(module);
        byte[] khachHangBytes = objectMapper.writeValueAsBytes(khachHangPage);
        return khachHangBytes;
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        KhachHang khachHang = khService.getOne(id);
        if (khachHang == null) {
            return ResponseEntity.notFound().build();
        }

        // Convert Blob to byte array
        byte[] anhBytes = null;
        Blob anhBlob = khachHang.getAnh();
        if (anhBlob != null) {
            try (InputStream inputStream = anhBlob.getBinaryStream()) {
                anhBytes = inputStream.readAllBytes();
            } catch (SQLException | IOException e) {
                // Xử lý ngoại lệ
            }
        }

        // Chuyển đổi mảng byte thành chuỗi base64
        String anhBase64 = null;
        if (anhBytes != null) {
            anhBase64 = Base64.getEncoder().encodeToString(anhBytes);
        }

        // Create a DTO object
        KhachHangDTO khachHangDTO = new KhachHangDTO();
        khachHangDTO.setId(khachHang.getId());
        khachHangDTO.setMaKhachHang(khachHang.getMaKhachHang());
        khachHangDTO.setTenKhachHang(khachHang.getTenKhachHang());
        khachHangDTO.setSdt(khachHang.getSdt());
        khachHangDTO.setEmail(khachHang.getEmail());
        khachHangDTO.setNgaySinh(khachHang.getNgaySinh());
        khachHangDTO.setMatKhau(khachHang.getMatKhau());
        khachHangDTO.setGioiTinh(khachHang.getGioiTinh());
        khachHangDTO.setTrangThai(khachHang.getTrangThai());
        khachHangDTO.setAnh(anhBase64);

        return ResponseEntity.ok(khachHangDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestParam(value = "anh", required = false) MultipartFile anh,
                                 @RequestParam("tenKhachHang") String tenKhachHang,
                                 @RequestParam("sdt") String sdt,
                                 @RequestParam("email") String email,
                                 @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngaySinh,
                                 @RequestParam("gioiTinh") Boolean gioiTinh,
                                 @RequestParam("tinhThanh") String tinhThanh,
                                 @RequestParam("quanHuyen") String quanHuyen,
                                 @RequestParam("phuongXa") String phuongXa,
                                 @RequestParam("diaChi") String diaChi,
                                 @RequestParam("trangThai") Integer trangThai
    ) throws IOException, SQLException {
        // Create a new KhachHang object
        KhachHang khachHang = new KhachHang();
        String ma = "KH" + new Random().nextInt(100000);
        khachHang.setMaKhachHang(ma);
        khachHang.setTenKhachHang(tenKhachHang);
        khachHang.setSdt(sdt);
        khachHang.setEmail(email);
        khachHang.setNgaySinh(ngaySinh);
        khachHang.setGioiTinh(gioiTinh);
        khachHang.setTrangThai(trangThai);

        //send email
        String matKhauMoi = generateRandomPassword(8);

        // Gán mật khẩu vào đối tượng KhachHang
        khachHang.setMatKhau(matKhauMoi);
        // Check if a file is provided
        if (anh != null) {
            // Get the input stream of the file
            InputStream inputStream = anh.getInputStream();
            Blob imageBlob = khService.createBlob(inputStream);

            // Set the image blob to the KhachHang object
            khachHang.setAnh(imageBlob);
        }

        // Save the KhachHang object
        khachHang = khService.add(khachHang);
        KhachHangDTO savedKhachHangDTO = convertToDto(khachHang);

        DiaChi diaChi1 = new DiaChi();
        diaChi1.setDiaChi(diaChi);
        diaChi1.setTinhThanh(tinhThanh);
        diaChi1.setQuanHuyen(quanHuyen);
        diaChi1.setPhuongXa(phuongXa);
        diaChi1.setTrangThai(1);
        diaChi1.setKhachHang(khachHang);
        dcService.add(diaChi1);

        // Gửi email chứa mật khẩu mới
        String subject = "Thông tin tài khoản";
        String body = "<h2>Thông tin tài khoản của bạn</h2>"
                + "<p>Xin chào, " + tenKhachHang + "</p>"
                + "<p>Chúng tôi gửi thông tin truy cập hệ thông của bạn:</p>"
                + "<p>Tên đăng nhập: " + email + "</p>"
                + "<p>Mật khẩu truy cập tạm thời là: <strong>" + matKhauMoi + "</strong></p>"
                + "<p>Lưu ý: Đây là mật khẩu mặc định được tạo bởi hệ thống, bạn vui lòng đổi lại để đảm bảo an toàn thông tin</p>"
                + "<p>Đây là email tự động vui lòng không trả lời.</p>";
        emailService.sendEmail(email, subject, body);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHangDTO);
    }

    private String generateRandomPassword(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * characters.length());
            password.append(characters.charAt(index));
        }

        return password.toString();
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id,
                                    @RequestParam(value = "anh", required = false) MultipartFile anh) throws IOException, SQLException {
        KhachHang khachHang = new KhachHang();
        if (anh != null && !anh.isEmpty()) {
            // Get the input stream of the file
            InputStream inputStream = anh.getInputStream();
            Blob imageBlob = khService.createBlob(inputStream);

            // Set the image blob to the KhachHang object
            khachHang.setAnh(imageBlob);
        }

        // Save the KhachHang object
        KhachHang savedKhachHang = khService.delete(id);
        KhachHangDTO savedKhachHangDTO = convertToDto(savedKhachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHangDTO);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestParam(value = "anh", required = false) MultipartFile anh,
//                                    @RequestParam("maKhachHang") String maKhachHang,
                                    @RequestParam("tenKhachHang") String tenKhachHang,
                                    @RequestParam("sdt") String sdt,
                                    @RequestParam("email") String email,
                                    @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngaySinh,
                                    @RequestParam("gioiTinh") Boolean gioiTinh,
                                    @RequestParam("trangThai") Integer trangThai) throws IOException, SQLException {
        // Create a new KhachHang object
        KhachHang khachHang = khService.getOne(id);

        khachHang.setTenKhachHang(tenKhachHang);
        khachHang.setSdt(sdt);
        khachHang.setEmail(email);
        khachHang.setNgaySinh(ngaySinh);
        khachHang.setGioiTinh(gioiTinh);
        khachHang.setTrangThai(trangThai);

        // Check if a file is provided
        if (anh != null && !anh.isEmpty()) {
            // Get the input stream of the file
            InputStream inputStream = anh.getInputStream();
            Blob imageBlob = khService.createBlob(inputStream);

            // Set the image blob to the KhachHang object
            khachHang.setAnh(imageBlob);
        }

        // Save the KhachHang object
        KhachHang savedKhachHang = khService.update(khachHang, id);
        KhachHangDTO savedKhachHangDTO = convertToDto(savedKhachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHangDTO);
    }


    @GetMapping("/searchKH")
    public ResponseEntity<?> getAll(@RequestParam(value = "key", required = false) String key,
                                    @RequestParam(value = "trangThai", required = false) Integer trangThai,
                                    @RequestParam(value = "gioiTinh", required = false) Boolean gioiTinh,
                                    @RequestParam(defaultValue = "0") Integer page) throws IOException {
        Pageable pageable = PageRequest.of(page, 5);
        Page<KhachHang> khachHangPage = khService.searchKH(key, trangThai, gioiTinh, pageable);
        // Convert the Page<KhachHang> to byte array
        byte[] khachHangBytes = convertPageToByteArray(khachHangPage);
//
//        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");
//
        return ResponseEntity.ok()
                .headers(headers)
                .body(khachHangBytes);
    }

    private KhachHangDTO convertToDto(KhachHang khachHang) {
        KhachHangDTO khachHangDTO = KhachHangDTO.builder()
                .id(khachHang.getId())
                .maKhachHang(khachHang.getMaKhachHang())
                .tenKhachHang(khachHang.getTenKhachHang())
                .sdt(khachHang.getSdt())
                .email(khachHang.getEmail())
                .ngaySinh(khachHang.getNgaySinh())
                .matKhau(khachHang.getMatKhau())
                .trangThai(khachHang.getTrangThai())
                .gioiTinh(khachHang.getGioiTinh())
//                .diaChi(DiaChi.builder().id(khachHang.getId()).build())
                .build();

        // Set anh field from Blob
        Blob anhBlob = khachHang.getAnh();
        if (anhBlob != null) {
            try (InputStream inputStream = anhBlob.getBinaryStream()) {
                byte[] anhBytes = inputStream.readAllBytes();
                // Convert byte array to base64 string
                String anhBase64 = Base64.getEncoder().encodeToString(anhBytes);
                khachHangDTO.setAnh(anhBase64);
            } catch (SQLException | IOException e) {
                // Handle the exception
            }
        }

        return khachHangDTO;
    }



    }
