package com.example.demo.service.impl;

import com.example.demo.entity.HoaDon;
import com.example.demo.repository.HoaDonRespository;
import com.example.demo.response.HoaDonCustom;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HoaDonServiceImpl implements HoaDonService {
    @Autowired public HoaDonRespository res;

    @Override
    public List<HoaDon> listHD() {
        return res.findAll();
    }

    @Override
    public Page<HoaDon> pageHD(Pageable pageable) {
        return res.findAll(pageable);
    }

    @Override
    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable) {
        return res.hienThiPageHD(pageable);
    }

    @Override
    public List<HoaDon> getExcel() {
        return res.findAll();
    }

    @Override
    public HoaDon detailHD(UUID id) {
        return res.findById(id).orElse(null);
    }
}
