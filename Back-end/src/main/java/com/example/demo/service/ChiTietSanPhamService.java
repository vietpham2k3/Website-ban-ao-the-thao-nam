package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import org.springframework.data.domain.Page;

public interface ChiTietSanPhamService {

    Page<ChiTietSanPham> page(Integer page);

    ChiTietSanPham add(ChiTietSanPham chiTietSanPham);
}
