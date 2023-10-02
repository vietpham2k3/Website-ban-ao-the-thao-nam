package com.example.demo.service.impl;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.repository.ChiTietSanPhamRepository;
import com.example.demo.service.ChiTietSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ChiTietSanPhamServiceImpl implements ChiTietSanPhamService {

    @Autowired
    private ChiTietSanPhamRepository repository;

    @Override
    public List<ChiTietSanPham> getAll() {
        return repository.getAll();
    }

    @Override
    public Page<ChiTietSanPham> page(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.getAll(pageable);
    }

    @Override
    public Page<ChiTietSanPham> search(String key, Integer trangThai, Double min, Double max, Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.search(key, trangThai,min, max, pageable);
    }

    @Override
    public ChiTietSanPham add(ChiTietSanPham chiTietSanPham) {
        return repository.save(chiTietSanPham);
    }

    @Override
    public ChiTietSanPham detail(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        repository.delete(id);
    }

    @Override
    public void update(Integer soLuong, UUID id) {
        repository.update(soLuong, id);
    }
}
