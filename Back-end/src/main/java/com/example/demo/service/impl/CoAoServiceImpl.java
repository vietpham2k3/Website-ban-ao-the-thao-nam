package com.example.demo.service.impl;

import com.example.demo.entity.CoAo;
import com.example.demo.repository.CoAoRepository;
import com.example.demo.service.CoAoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CoAoServiceImpl implements CoAoService {

    @Autowired
    private CoAoRepository repository;

    @Override
    public List<CoAo> getAll() {
        return repository.findAll();
    }
}
