package com.example.demo.controller;

import com.example.demo.entity.Anh;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.SanPham;
import com.example.demo.repository.SanPhamRepository;
import com.example.demo.service.impl.AnhServiceImpl;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import com.example.demo.service.impl.SanPhamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Date;
import java.util.Random;
import java.util.UUID;


@RestController
@RequestMapping("/api/chi-tiet-san-pham/")
@CrossOrigin(origins = "http://localhost:3000")
public class ChiTietSanPhamController {

    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;

    @Autowired
    private SanPhamServiceImpl sanPhamRepository;

    private Date date = new Date();

    @Autowired
    private AnhServiceImpl anhService;

    @GetMapping("getAll")
    public ResponseEntity<?> hienThiPage(@RequestParam(value = "page",defaultValue = "0") Integer page){
        return ResponseEntity.ok(chiTietSanPhamService.page(page));
    }

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable("id") UUID id) throws IOException, SQLException {
        Anh image = anhService.viewById(id);
        byte[] imageData = convertBlobToBytes(image.getTen());
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageData);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") UUID id){
        return ResponseEntity.ok(chiTietSanPhamService.detail(id));
    }

    private byte[] convertBlobToBytes(Blob blob) throws IOException, SQLException {
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

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ChiTietSanPham chiTietSanPham) {
        String ma = "CTSP" + new Random().nextInt(100000);
        String maSP = "SP" + new Random().nextInt(100000);

        chiTietSanPham.setNgayTao(date);
        chiTietSanPham.setMa(ma);

        SanPham sanPham = new SanPham().builder()
                .ma(maSP)
                .ten(chiTietSanPham.getSanPham().getTen())
                .moTa(chiTietSanPham.getSanPham().getMoTa())
                .ngayTao(date)
                .trangThai(1)
                .build();

        // Lưu sanPham vào cơ sở dữ liệu trước
        sanPham = sanPhamRepository.add(sanPham);

        chiTietSanPham.setSanPham(sanPham);
        return ResponseEntity.ok(chiTietSanPhamService.add(chiTietSanPham));
    }
}
