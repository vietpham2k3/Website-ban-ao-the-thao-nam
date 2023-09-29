package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ChiTietSanPhamService {
    List<ChiTietSanPham> getAll();

    Page<ChiTietSanPham> page(Integer page);

    ChiTietSanPham add(ChiTietSanPham chiTietSanPham);

    ChiTietSanPham detail(UUID id);
}
