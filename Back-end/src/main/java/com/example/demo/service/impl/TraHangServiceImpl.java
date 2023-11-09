package com.example.demo.service.impl;

import com.example.demo.entity.DoiHang;
import com.example.demo.repository.TraHangRepository;
import com.example.demo.service.TraHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TraHangServiceImpl implements TraHangService {

    @Autowired
    private TraHangRepository repository;

    @Override
    public DoiHang add(DoiHang traHang) {
        return repository.save(traHang);
    }
}
