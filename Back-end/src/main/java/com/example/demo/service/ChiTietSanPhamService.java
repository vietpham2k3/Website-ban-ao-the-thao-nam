package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ChiTietSanPhamService {
    List<ChiTietSanPham> getAll();

    List<ChiTietSanPham> getAllSPNEW();

    Page<ChiTietSanPham> page(Integer page);

    Page<ChiTietSanPham> search(String key, Integer trangThai,Double min, Double max, Integer page);

    ChiTietSanPham add(ChiTietSanPham chiTietSanPham);

    ChiTietSanPham detail(UUID id);

    void delete(UUID id);

    void update(Integer soLuong ,UUID id);

}
