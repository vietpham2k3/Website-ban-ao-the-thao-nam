package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ChiTietSanPhamService {
    List<ChiTietSanPham> getAll();

    List<ChiTietSanPham> getAllByIdSP(UUID id);

    List<ChiTietSanPham> getAllByIdCTSP(UUID id);

    List<ChiTietSanPham> getAllSPNEW();

    Page<ChiTietSanPham> page(Integer page);

    Page<ChiTietSanPham> search(String key, Integer trangThai, Double min, Double max, Integer page);

    ChiTietSanPham add(ChiTietSanPham chiTietSanPham);

    ChiTietSanPham detail(UUID id);

    void delete(UUID id);

    void deleteMSKC(UUID id);

    void update(Integer soLuong, UUID id);

    List<ChiTietSanPham> getAllProduct();

    List<ChiTietSanPham> getAllBestseller();
}
