package com.example.demo.service.impl;

import com.example.demo.entity.KhachHang;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.KhachHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.sql.rowset.serial.SerialBlob;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class KhachHangServiceImpl implements KhachHangService {

    @Autowired
    private KhachHangRepository khRepo;

    @Override
    public List<KhachHang> getAll() {
        return khRepo.findAll();
    }

    @Override
    public List<KhachHang> getAllKH() {
        return khRepo.getAllKH();
    }

    @Override
    public List<KhachHang> searchKHinBH(String key) {
        return khRepo.searchKHinBH(key);
    }

    @Override
    public Page<KhachHang> getAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return khRepo.findAll(pageable);
    }

    @Override
    public KhachHang add(KhachHang khachHang){
        return khRepo.save(khachHang);
    }

    @Override
    public KhachHang delete(UUID id) {
       KhachHang khachHang = khRepo.findById(id).orElse(null);
       khachHang.setTrangThai(0);
        khachHang.setMaKhachHang(khachHang.getMaKhachHang());
        khachHang.setTenKhachHang(khachHang.getTenKhachHang());
        khachHang.setSdt(khachHang.getSdt());
        khachHang.setEmail(khachHang.getEmail());
        khachHang.setNgaySinh(khachHang.getNgaySinh());
        khachHang.setMatKhau(khachHang.getMatKhau());
        return khRepo.save(khachHang);
    }

    @Override
    public KhachHang getOne(UUID id) {
        return khRepo.findById(id).orElse(null);
    }
//
    @Override
    public KhachHang update(KhachHang khachHang, UUID id) {
        Optional<KhachHang> op = khRepo.findById(id);
        return op.map(o -> {
            o.setMaKhachHang(khachHang.getMaKhachHang());
            o.setTenKhachHang(khachHang.getTenKhachHang());
            o.setSdt(khachHang.getSdt());
            o.setEmail(khachHang.getEmail());
            o.setNgaySinh(khachHang.getNgaySinh());
            o.setMatKhau(khachHang.getMatKhau());
            o.setTrangThai(khachHang.getTrangThai());
            return khRepo.save(o);
        }).orElse(null);
    }

    @Override
    public Blob createBlob(InputStream inputStream) throws SQLException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        byte[] buffer = new byte[4096];
        int bytesRead;
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        byte[] bytes = outputStream.toByteArray();
        return new SerialBlob(bytes);
    }

    @Override
    public Page<KhachHang> searchKH(String key, Integer trangThai, Pageable pageable) {
        return khRepo.searchKH(key, trangThai, pageable);
    }


//    @Override
//    public Page<KhachHang> getAll(Integer page) {
//        Pageable pageable = PageRequest.of(page, 5);
//        return khRepo.findAll(pageable);
//    }
}
