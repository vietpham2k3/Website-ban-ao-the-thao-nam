package com.example.demo.service.impl;

import com.example.demo.entity.DoiHang;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.repository.DoiHangRepository;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.service.DoiHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DoiHangServiceImpl implements DoiHangService {

    @Autowired
    private DoiHangRepository repository;

    @Autowired
    private HoaDonChiTietRepository hoaDonChiTietRepository;

    @Override
    public List<HoaDonChiTiet> getAll(UUID id) {
        return hoaDonChiTietRepository.getAllByIdHDAndIdTH(id);
    }

    @Override
    public DoiHang add(DoiHang traHang) {
        return repository.save(traHang);
    }
}
