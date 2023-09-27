package com.example.demo.controller;

import com.example.demo.entity.Anh;
import com.example.demo.service.impl.AnhServiceImpl;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.UUID;


@RestController
@RequestMapping("/api/chi-tiet-san-pham/")
@CrossOrigin(origins = "http://localhost:3000")
public class ChiTietSanPhamController {

    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;

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
}
