package com.example.demo.service;

import com.example.demo.entity.LichSuHoaDon;

import java.util.List;
import java.util.UUID;

public interface LichSuHoaDonService {
    LichSuHoaDon createLichSuDonHang(LichSuHoaDon lichSuHoaDon);

    List<LichSuHoaDon> getAll();

    LichSuHoaDon detail(UUID id);

    List<LichSuHoaDon> findAllLSHDByIDsHD(UUID id);

    LichSuHoaDon findLSHDByIDsHD(UUID id);
}
