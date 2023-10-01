package com.example.demo.service.impl;

import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.service.HoaDonChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HoaDonChiTietServiceImpl implements HoaDonChiTietService {

    @Autowired
    private HoaDonChiTietRepository repository;

    @Override
    public List<HoaDonChiTiet> getAll(UUID id) {
        return repository.getAll(id);
    }

    @Override
    public List<HoaDonChiTiet> findAll() {
        return repository.findAll();
    }

    @Override
    public HoaDonChiTiet add(HoaDonChiTiet hoaDonChiTiet) {
        return repository.save(hoaDonChiTiet);
    }

    @Override
    public void update(Integer soLuong, UUID id) {
        repository.update(soLuong, id);
    }


    @Override
    public Boolean existsById(UUID id) {
        return repository.existsById(id);
    }

    @Override
    public HoaDonChiTiet findById(UUID id) {
        return repository.findById(id).orElse(null);
    }
}
