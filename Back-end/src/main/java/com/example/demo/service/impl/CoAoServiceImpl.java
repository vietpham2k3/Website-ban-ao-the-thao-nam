package com.example.demo.service.impl;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.CoAo;
import com.example.demo.entity.MauSac;
import com.example.demo.repository.CoAoRepository;
import com.example.demo.service.CoAoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class CoAoServiceImpl implements CoAoService {

    @Autowired
    private CoAoRepository repository;

    @Override
    public List<CoAo> getAll() {
        return repository.getAll();
    }

    @Override
    public Page<CoAo>fillAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.findAll(pageable);
    }

    @Override
    public Page<CoAo> pageSearchMS(String key, Integer trangThai, Pageable pageable) {
        return repository.searchPageMS(key,trangThai,pageable);
    }


    @Override
    public CoAo getOne(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public CoAo detail(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public CoAo add(CoAo coAo) {
        coAo.setMa(coAo.getMa());
        coAo.setTen(coAo.getTen());
        coAo.setTrangThai(coAo.getTrangThai());
        coAo.setNgayTao(new Date());
        return repository.save(coAo);
    }

    @Override
    public CoAo update(CoAo coAo) {
        CoAo c = detail(coAo.getId());
        coAo.setId(coAo.getId());
        coAo.setMa(c.getMa());
        coAo.setTen(coAo.getTen());
        coAo.setTrangThai(coAo.getTrangThai());
        coAo.setNgayTao(coAo.getNgayTao());
        coAo.setNgaySua(new Date());
        return repository.save(coAo);
    }


    @Override
    public CoAo delete(UUID id) {
        CoAo coAo = repository.findById(id).orElse(null);
        coAo.setTrangThai(1);
        coAo.setNgaySua(new Date());
        coAo.setNgayTao(coAo.getNgayTao());
        coAo.setTen(coAo.getMa());
        return repository.save(coAo);
    }

    @Override
    public List<CoAo> findByCoAoString(List<String> coAoString) {
        List<CoAo> coAos = new ArrayList<>();
        for (String coAo: coAoString) {
            CoAo ca = repository.findByTen(coAo);
            coAos.add(ca);
        }
        return coAos;
    }
}
