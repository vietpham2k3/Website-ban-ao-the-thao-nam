package com.example.demo.service;

import com.example.demo.entity.DoiHang;
import com.example.demo.entity.HoaDonChiTiet;

import java.util.List;
import java.util.UUID;

public interface DoiHangService {

    List<HoaDonChiTiet> getAll(UUID id);

    DoiHang add(DoiHang traHang);
}
