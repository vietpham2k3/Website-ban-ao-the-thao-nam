package com.example.demo.service.impl;

import com.example.demo.entity.Anh;
import com.example.demo.repository.AnhRepository;
import com.example.demo.service.AnhService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class AnhServiceImpl implements AnhService {

    @Autowired
    private AnhRepository repository;


    @Override
    public Anh viewById(UUID id) {
        return repository.findFirstByChiTietSanPhamId(id);
    }
}
