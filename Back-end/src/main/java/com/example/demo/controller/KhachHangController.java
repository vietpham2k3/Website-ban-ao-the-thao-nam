package com.example.demo.controller;

import com.example.demo.UploadFile.AnhKH;
import com.example.demo.dto.KhachHangDTO;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.KhachHang;
import com.example.demo.service.impl.HoaDonServiceImpl;
import com.example.demo.service.impl.KhachHangServiceImpl;
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
        khachHangDTO.setTrangThai(khachHang.getTrangThai());
        khachHangDTO.setAnh(anhBase64);

        return ResponseEntity.ok(khachHangDTO);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestParam("anh") MultipartFile anh,
//                                 @RequestParam("maKhachHang") String maKhachHang,
                                 @RequestParam("tenKhachHang") String tenKhachHang,
                                 @RequestParam("sdt") String sdt,
                                 @RequestParam("email") String email,
                                 @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngaySinh,
                                 @RequestParam("matKhau") String matKhau,
                                 @RequestParam("trangThai") Integer trangThai) throws IOException, SQLException {
        // Create a new KhachHang object
        KhachHang khachHang = new KhachHang();
        String ma = "KH" + new Random().nextInt(100000);
        khachHang.setMaKhachHang(ma);
        khachHang.setTenKhachHang(tenKhachHang);
        khachHang.setSdt(sdt);
        khachHang.setEmail(email);
        khachHang.setNgaySinh(ngaySinh);
        khachHang.setMatKhau(matKhau);
        khachHang.setTrangThai(trangThai);

        // Check if a file is provided
        if (anh != null) {
            // Get the input stream of the file
            InputStream inputStream = anh.getInputStream();
            Blob imageBlob = khService.createBlob(inputStream);

            // Set the image blob to the KhachHang object
            khachHang.setAnh(imageBlob);
        }

        // Save the KhachHang object
        KhachHang savedKhachHang = khService.add(khachHang);
        KhachHangDTO savedKhachHangDTO = convertToDto(savedKhachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHangDTO);
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
                                    @RequestParam("matKhau") String matKhau,
                                    @RequestParam("trangThai") Integer trangThai) throws IOException, SQLException {
        // Create a new KhachHang object
        KhachHang khachHang = khService.getOne(id);

//        khachHang.setMaKhachHang(maKhachHang);
        khachHang.setTenKhachHang(tenKhachHang);
        khachHang.setSdt(sdt);
        khachHang.setEmail(email);
        khachHang.setNgaySinh(ngaySinh);
        khachHang.setMatKhau(matKhau);
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
                                    @RequestParam(defaultValue = "0") Integer page) throws IOException {
        Pageable pageable = PageRequest.of(page, 5);
        Page<KhachHang> khachHangPage = khService.searchKH(key, trangThai, pageable);
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
                .build();

        // Convert Blob to byte array
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
