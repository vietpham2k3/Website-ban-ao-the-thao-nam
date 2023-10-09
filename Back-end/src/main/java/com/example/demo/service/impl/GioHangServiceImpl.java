package com.example.demo.service.impl;

import com.example.demo.entity.GioHang;
import com.example.demo.repository.GioHangRepository;
import com.example.demo.service.GioHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service

public class GioHangServiceImpl implements GioHangService {
    @Autowired
    private GioHangRepository gioHangRepository;

    @Override
    public List<GioHang> getAll() {
        return gioHangRepository.findAll();
    }


    @Override
    public GioHang add(GioHang gioHang) {
        gioHang.setMa(gioHang.getMa());
        gioHang.setNgayTao(new Date());
        gioHang.setNgayThanhToan(new Date());
        gioHang.setTrangThai(gioHang.getTrangThai());
        gioHang.setTenNguoiNhan(gioHang.getTenNguoiNhan());
        gioHang.setDiaChi(gioHang.getDiaChi());
        gioHang.setSdt(gioHang.getSdt());
        gioHang.setKhachHang(gioHang.getKhachHang());
        return gioHangRepository.save(gioHang);
    }


}
