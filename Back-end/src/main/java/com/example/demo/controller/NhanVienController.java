package com.example.demo.controller;

import com.example.demo.UploadFile.AnhNV;
import com.example.demo.dto.NhanVienRequest;
import com.example.demo.entity.NhanVien;
import com.example.demo.entity.VaiTro;
import com.example.demo.service.NhanVienService;
import com.example.demo.service.VaiTroService;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/nhanvien")
@CrossOrigin(origins = "http://localhost:3000")

public class NhanVienController {

    @Autowired
    private NhanVienService service;

    @Autowired
    private VaiTroService vtService;

    @GetMapping("/getAll/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") UUID id) throws IOException, SQLException {
        NhanVien nv = service.getOne(id);
        if (nv != null && nv.getAnh() != null) {
            byte[] imageData = convertBlobToBytes(nv.getAnh());
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
        Page<NhanVien> nhanVienPage = service.getAll(page);

        // Convert the Page<KhachHang> to byte array
        byte[] nhanVienBytes = convertPageToByteArray(nhanVienPage);

        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");

        return ResponseEntity.ok()
                .headers(headers)
                .body(nhanVienBytes);
    }

    private byte[] convertPageToByteArray(Page<NhanVien> khachHangPage) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ByteArrayInputStream.class, new AnhNV());
        objectMapper.registerModule(module);
        byte[] khachHangBytes = objectMapper.writeValueAsBytes(khachHangPage);
        return khachHangBytes;
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        NhanVien nhanVien = service.getOne(id);
        if (nhanVien == null) {
            return ResponseEntity.notFound().build();
        }

        // Convert Blob to byte array
        byte[] anhBytes = null;
        Blob anhBlob = nhanVien.getAnh();
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

        NhanVienRequest nhanVienRequest = new NhanVienRequest();
        nhanVienRequest.setId(nhanVien.getId());
        nhanVienRequest.setMa(nhanVien.getMa());
        nhanVienRequest.setTen(nhanVien.getTen());
        nhanVienRequest.setSdt(nhanVien.getSdt());
        nhanVienRequest.setEmail(nhanVien.getEmail());
        nhanVienRequest.setDiaChi(nhanVien.getDiaChi());
        nhanVienRequest.setNgaySinh(nhanVien.getNgaySinh());
        nhanVienRequest.setNgayTao(new Date());
        nhanVienRequest.setNgaySua(nhanVien.getNgaySua());
        nhanVienRequest.setNguoiTao(nhanVien.getNguoiTao());
        nhanVienRequest.setNguoiSua(nhanVien.getNguoiSua());
        nhanVienRequest.setMatKhau(nhanVien.getMatKhau());
        nhanVienRequest.setVaiTro(VaiTro.builder().id(nhanVien.getId()).build());
        nhanVienRequest.setTrangThai(nhanVien.getTrangThai());
        nhanVienRequest.setAnh(anhBase64);

        return ResponseEntity.ok(nhanVienRequest);
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(
            @RequestParam("anh") MultipartFile anh,
//                                 @RequestParam("maKhachHang") String maKhachHang,
            @RequestParam("ten") String ten,
            @RequestParam("sdt") String sdt,
            @RequestParam("email") String email,
            @RequestParam("diaChi") String diaChi,
            @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngaySinh,
            @RequestParam("matKhau") String matKhau,
            @RequestParam("vaiTro") String vaiTro,
            @RequestParam("trangThai") Integer trangThai) throws IOException, SQLException {
        // Create a new KhachHang object
        NhanVien nv = new NhanVien();
        String ma = "CL" + new Random().nextInt(100000);
        nv.setMa(ma);
        nv.setTen(ten);
        nv.setSdt(sdt);
        nv.setEmail(email);
        nv.setDiaChi(diaChi);
        nv.setNgaySinh(ngaySinh);
        nv.setMatKhau(matKhau);
        nv.setVaiTro(VaiTro.builder().id(UUID.fromString(vaiTro)).build());
        nv.setTrangThai(trangThai);

        // Check if a file is provided

        if (anh != null) {
            // Get the input stream of the file
            InputStream inputStream = anh.getInputStream();
            Blob imageBlob = service.createBlob(inputStream);

            // Set the image blob to the nv object
            nv.setAnh(imageBlob);
        }

        // Save the nv object
        NhanVien saveNhanVien = service.add(nv);
        NhanVienRequest saveNhanVienDTO = convertToDto(saveNhanVien);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveNhanVienDTO);
    }

    private NhanVienRequest convertToDto(NhanVien nhanVien) {
        NhanVienRequest nhanVienRequest = NhanVienRequest.builder()
                .id(nhanVien.getId())
                .ma(nhanVien.getMa())
                .ten(nhanVien.getTen())
                .sdt(nhanVien.getSdt())
                .email(nhanVien.getEmail())
                .diaChi(nhanVien.getDiaChi())
                .ngaySinh(nhanVien.getNgaySinh())
                .ngayTao(nhanVien.getNgayTao())
                .ngaySua(nhanVien.getNgaySua())
                .nguoiTao(nhanVien.getNguoiTao())
                .nguoiSua(nhanVien.getNguoiSua())
                .matKhau(nhanVien.getMatKhau())
                .vaiTro(VaiTro.builder().id(nhanVien.getId()).build())
                .trangThai(nhanVien.getTrangThai())
                .build();

        // Convert Blob to byte array
        Blob anhBlob = nhanVien.getAnh();
        if (anhBlob != null) {
            try (InputStream inputStream = anhBlob.getBinaryStream()) {
                byte[] anhBytes = inputStream.readAllBytes();
                // Convert byte array to base64 string
                String anhBase64 = Base64.getEncoder().encodeToString(anhBytes);
                nhanVienRequest.setAnh(anhBase64);
            } catch (SQLException | IOException e) {
                // Handle the exception
            }
        }

        return nhanVienRequest;
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestParam(value = "anh", required = false) MultipartFile anh,
//                                    @RequestParam("maKhachHang") String maKhachHang,
                                    @RequestParam("ten") String ten,
                                    @RequestParam("sdt") String sdt,
                                    @RequestParam("email") String email,
                                    @RequestParam("diaChi") String diaChi,
                                    @DateTimeFormat(pattern = "yyyy-MM-dd") Date ngaySinh,
                                    @RequestParam("matKhau") String matKhau,
                                    @RequestParam("vaiTro") String vaiTro,
                                    @RequestParam("trangThai") Integer trangThai) throws IOException, SQLException {
        // Create a new KhachHang object
        NhanVien nv = service.getOne(id);

        nv.setTen(ten);
        nv.setSdt(sdt);
        nv.setEmail(email);
        nv.setDiaChi(diaChi);
        nv.setNgaySinh(ngaySinh);
        nv.setMatKhau(matKhau);
        nv.setVaiTro(VaiTro.builder().id(UUID.fromString(vaiTro)).build());
        nv.setTrangThai(trangThai);

        // Check if a file is provided
        if (anh != null && !anh.isEmpty()) {
            // Get the input stream of the file
            InputStream inputStream = anh.getInputStream();
            Blob imageBlob = service.createBlob(inputStream);

            // Set the image blob to the KhachHang object
            nv.setAnh(imageBlob);
        }

        // Save the KhachHang object
        NhanVien saveNhanVien = service.update(nv, id);
        NhanVienRequest saveNVDTO = convertToDto(saveNhanVien);
        return ResponseEntity.status(HttpStatus.CREATED).body(saveNVDTO);
    }

    @GetMapping("/searchNV")
    public ResponseEntity<?> search(@RequestParam(value = "key", required = false) String key,
                                    @RequestParam(value = "trangThai", required = false) Integer trangThai,
                                    @RequestParam(defaultValue = "0") Integer page) throws IOException {
        Pageable pageable = PageRequest.of(page, 5);
        Page<NhanVien> nhanVienPage = service.searchNhanVienPage(key, trangThai, pageable);
        // Convert the Page<KhachHang> to byte array
        byte[] nhanVienBytes = convertPageToByteArray(nhanVienPage);
//
//        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");
//
        return ResponseEntity.ok()
                .headers(headers)
                .body(nhanVienBytes);
    }

    @GetMapping("/vaitro")
    public ResponseEntity<?> getAllVaiTro() {
        return ResponseEntity.ok(vtService.getAll());
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id) {
        service.delete(id);
        return ResponseEntity.ok("thành công");
    }
}


//    @GetMapping("page")
//    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page) {
//        return ResponseEntity.ok(service.getAll(page));
//    }
//
//    @GetMapping("/search")
//    public ResponseEntity<?> hienThiSearchNV(String key,
//                                             Integer trangThai,
//                                             @RequestParam(value = "page", defaultValue = "0") Integer page) {
//        Pageable pageable = PageRequest.of(page, 5);
//        return ResponseEntity.ok(service.searchNhanVienPage(key, trangThai, pageable));
//    }
//
//    @GetMapping("/detail/{id}")
//    public ResponseEntity<?> detaila(@PathVariable UUID id) {
//        return ResponseEntity.ok(service.getOne(id));
//    }
//
//    @GetMapping("/vaitro")
//    public ResponseEntity<?> getAllVaiTro() {
//        return ResponseEntity.ok(vtService.getAll());
//    }
//
//    @GetMapping("/getAll")
//    public ResponseEntity<?> getAll() {
//        return ResponseEntity.ok(service.fillAll());
//    }
//
//    @PostMapping("/add")
//    public ResponseEntity<?> add(@RequestBody NhanVienRequest nhanVien) {
//        return ResponseEntity.ok(service.add(nhanVien));
//    }
//
//    @PutMapping("/update/{id}")
//    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody NhanVienRequest nhanVien) {
//        nhanVien.setId(id);
//        return ResponseEntity.ok(service.update(nhanVien));
//    }
//
//    @PutMapping("/delete/{id}")
//    public ResponseEntity<?> delete(@PathVariable UUID id) {
//        service.delete(id);
//        return ResponseEntity.ok("thành công");
//    }

//}