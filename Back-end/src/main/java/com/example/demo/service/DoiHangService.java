package com.example.demo.service;

import com.example.demo.entity.DoiHang;
import com.example.demo.entity.HoaDonChiTiet;
import org.springframework.data.domain.Page;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface DoiHangService {

    List<HoaDonChiTiet> getAll(UUID id);

    Page<HoaDonChiTiet> page(Integer page);

    Page<HoaDonChiTiet> search(String key, Date tuNgay, Date denNgay, Integer page);

    List<HoaDonChiTiet> getAllHD(UUID id);

    DoiHang add(DoiHang traHang);

    DoiHang findById(UUID id);
}
