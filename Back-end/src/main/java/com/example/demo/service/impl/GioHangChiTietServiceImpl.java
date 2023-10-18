package com.example.demo.service.impl;

import com.example.demo.repository.GioHangChiTietRepsitory;
import com.example.demo.service.GioHangChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GioHangChiTietServiceImpl implements GioHangChiTietService {

    @Autowired
    private GioHangChiTietRepsitory repository;

    @Override
    public Integer countSPOnGH(UUID id) {
        return repository.countSPOnGH(id);
    }
}
