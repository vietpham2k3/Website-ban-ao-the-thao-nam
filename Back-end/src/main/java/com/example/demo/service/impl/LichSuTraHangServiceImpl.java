package com.example.demo.service.impl;

import com.example.demo.entity.LichSuTraHang;
import com.example.demo.repository.LichSuTraHangRepository;
import com.example.demo.service.LichSuTraHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LichSuTraHangServiceImpl implements LichSuTraHangService {

    @Autowired
    private LichSuTraHangRepository repository;

    @Override
    public LichSuTraHang add(LichSuTraHang traHang) {
        return repository.save(traHang);
    }
}
