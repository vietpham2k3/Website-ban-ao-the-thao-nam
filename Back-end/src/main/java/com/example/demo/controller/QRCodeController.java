package com.example.demo.controller;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequestMapping("/api/qrcode")
@CrossOrigin(origins = "http://localhost:3000")

public class QRCodeController {

    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;

    @GetMapping(value = "/api/chi-tiet-san-pham/findID/{id}", produces = MediaType.IMAGE_PNG_VALUE)
    public byte[] generateQRCode(@PathVariable("id") UUID id) throws WriterException, IOException {

        ChiTietSanPham ctsp = chiTietSanPhamService.findID(id);

        String ma = ctsp.getMa();
        Integer soLuong = ctsp.getSoLuong();
        Double giaBan = ctsp.getGiaBan();
        String tenSp = ctsp.getSanPham().getTen();
        String mota = ctsp.getSanPham().getMoTa();
        String tenChatLieu =  ctsp.getChatLieu().getTen();
        String tenMauSac = ctsp.getMauSac().getMa();

        String data = "Ma: " + ma + "\n"
                + "So Luong: " + soLuong + "\n"
                + "Tên Sản Phẩm: " + tenSp + "\n"
                + "Mô tả: " + mota + "\n"
                + "Tên Chất Liệu: " + tenChatLieu + "\n"
                + "Tên Màu Sắc: " + tenMauSac + "\n"
                + "Gia Ban: " + giaBan;

        int width = 300;
        int height = 300;

        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, width, height);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

        return outputStream.toByteArray();
    }
}
