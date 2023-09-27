package com.example.demo.service.impl;

import com.example.demo.entity.HinhThucThanhToan;
import com.example.demo.repository.HinhThucThanhToanRespository;
import com.example.demo.service.HinhThucThanhToanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HinhThucThanhToanServiceImpl implements HinhThucThanhToanService {
    @Autowired public HinhThucThanhToanRespository res;

    @Override
    public List<HinhThucThanhToan> getAll() {
        return res.findAll();
    }
}
