package com.example.demo.service.impl;

import com.example.demo.entity.DoiHang;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.repository.DoiHangRepository;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.service.DoiHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public Page<HoaDonChiTiet> page(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return hoaDonChiTietRepository.getAll(pageable);
    }

    @Override
    public Page<HoaDonChiTiet> search(String key, Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return hoaDonChiTietRepository.search(key, pageable);
    }

    @Override
    public List<HoaDonChiTiet> getAllHD(UUID id) {
        return hoaDonChiTietRepository.getAllHD(id);
    }

    @Override
    public DoiHang add(DoiHang traHang) {
        return repository.save(traHang);
    }

    @Override
    public DoiHang findById(UUID id) {
        return repository.findById(id).orElse(null);
    }
}
