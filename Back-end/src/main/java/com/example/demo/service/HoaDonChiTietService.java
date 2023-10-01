package com.example.demo.service;

import com.example.demo.entity.HoaDonChiTiet;

import java.util.List;
import java.util.UUID;

public interface HoaDonChiTietService {

    List<HoaDonChiTiet> getAll(UUID id);

    HoaDonChiTiet add(HoaDonChiTiet hoaDonChiTiet);
}
