package com.example.demo.service.impl;

import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.repository.LichSuHoaDonRepository;
import com.example.demo.service.LichSuHoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LichSuHoaDonServiceImpl implements LichSuHoaDonService {

    @Autowired
    private LichSuHoaDonRepository repository;

    @Override
    public LichSuHoaDon add(LichSuHoaDon lichSuHoaDon) {
        return repository.save(lichSuHoaDon);
    }
}
