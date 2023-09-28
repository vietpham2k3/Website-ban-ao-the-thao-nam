package com.example.demo.service;

import com.example.demo.entity.KhachHang;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

@Service
public interface KhachHangService {

    List<KhachHang> getAll();

    Page<KhachHang> getAll(Integer page);

    KhachHang add(KhachHang khachHang);

    KhachHang delete(UUID id);

    KhachHang getOne(UUID id);

    KhachHang update(KhachHang khachHang, UUID id);

    Blob createBlob(InputStream inputStream) throws SQLException, IOException;

    Page<KhachHang>searchKH(String key, Integer trangThai, Pageable pageable);
}
