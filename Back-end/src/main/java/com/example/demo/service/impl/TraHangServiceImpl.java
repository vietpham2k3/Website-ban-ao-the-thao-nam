package com.example.demo.service.impl;

import com.example.demo.entity.TraHang;
import com.example.demo.repository.TraHangRepository;
import com.example.demo.service.TraHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TraHangServiceImpl implements TraHangService {

    @Autowired
    private TraHangRepository repository;

    @Override
    public TraHang add(TraHang traHang) {
        return repository.save(traHang);
    }
}