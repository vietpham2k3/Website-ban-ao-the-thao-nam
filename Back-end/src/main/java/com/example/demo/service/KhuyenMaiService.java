package com.example.demo.service;

import com.example.demo.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface KhuyenMaiService {
    public List<KhuyenMai> getAllKM();

    public Page<KhuyenMai> pageKM(Pageable pageable);

    public Page<KhuyenMai> pageSearchKM(String key, Integer trangThai, Pageable pageable);

    public KhuyenMai add(KhuyenMai khuyenMai);

    public KhuyenMai detail(UUID id);

    public KhuyenMai xoa(UUID id);



}
