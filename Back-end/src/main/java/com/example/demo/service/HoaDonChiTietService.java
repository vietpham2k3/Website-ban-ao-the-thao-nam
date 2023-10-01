package com.example.demo.service;

import com.example.demo.entity.HoaDonChiTiet;

import java.util.List;
import java.util.UUID;

public interface HoaDonChiTietService {

    List<HoaDonChiTiet> getAll(UUID id);

    List<HoaDonChiTiet> findAll();

    HoaDonChiTiet add(HoaDonChiTiet hoaDonChiTiet);

    void update(Integer soLuong, UUID id);

    Boolean existsById(UUID id);

    HoaDonChiTiet findById(UUID id);
}
