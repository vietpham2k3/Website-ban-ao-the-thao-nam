package com.example.demo.service.impl;

import com.example.demo.entity.NhaSanXuat;
import com.example.demo.repository.NhaSanXuatRepository;
import com.example.demo.service.NhaSanXuatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NhaSanXuatServiceImpl implements NhaSanXuatService {

    @Autowired
    private NhaSanXuatRepository repository;

    @Override
    public List<NhaSanXuat> getAll() {
        return repository.findAll();
    }

}
