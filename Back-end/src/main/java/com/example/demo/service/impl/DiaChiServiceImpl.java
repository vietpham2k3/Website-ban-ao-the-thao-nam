package com.example.demo.service.impl;

import com.example.demo.entity.DiaChi;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DiaChiServiceImpl implements DiaChiService {

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Override
    public List<DiaChi> getAll() {
        return diaChiRepository.findAll();
    }

    @Override
    public DiaChi add(DiaChi diaChi) {
        diaChi.setKhachHang(diaChi.getKhachHang());
        diaChi.setPhuongXa(diaChi.getPhuongXa());
        diaChi.setQuanHuyen(diaChi.getQuanHuyen());
        diaChi.setTinhThanh(diaChi.getTinhThanh());
        diaChi.setTrangThai(diaChi.getTrangThai());
        diaChi.setGhiChu(diaChi.getGhiChu());
        diaChi.setSdt(diaChi.getSdt());
        return diaChiRepository.save(diaChi);
    }

    @Override
    public DiaChi update(DiaChi diaChi) {
        return null;
    }

    @Override
    public DiaChi delete(UUID id) {
        return null;
    }
}
