package com.example.demo.service.impl;

import com.example.demo.entity.VaiTro;
import com.example.demo.repository.VaiTroRepository;
import com.example.demo.service.VaiTroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class VaiTroServiceImpl implements VaiTroService {

    @Autowired
    private VaiTroRepository vaiTroRepository;

    @Override
    public Page<VaiTro> fillAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return vaiTroRepository.findAll(pageable);
    }

    @Override
    public List<VaiTro> getAll() {
        return vaiTroRepository.findAll();
    }

    @Override
    public VaiTro getOne(UUID id) {
        return vaiTroRepository.findById(id).orElse(null);
    }

    @Override
    public VaiTro detail(UUID id) {
        return vaiTroRepository.findById(id).orElse(null);
    }

    @Override
    public VaiTro add(VaiTro vaiTro) {
        vaiTro.setMa(vaiTro.getMa());
        vaiTro.setTen(vaiTro.getTen());
        vaiTro.setTrangThai(vaiTro.getTrangThai());
        return vaiTroRepository.save(vaiTro);
    }

    @Override
    public VaiTro update(VaiTro vaiTro) {
        VaiTro c = detail(vaiTro.getId());
        vaiTro.setId(vaiTro.getId());
        vaiTro.setMa(c.getMa());
        vaiTro.setTen(vaiTro.getTen());
        vaiTro.setTrangThai(vaiTro.getTrangThai());
        return vaiTroRepository.save(vaiTro);
    }

    @Override
    public VaiTro delete(UUID id) {
        VaiTro vaiTro = vaiTroRepository.findById(id).orElse(null);
        vaiTro.setTrangThai(0);
        vaiTro.setTen(vaiTro.getTen());
        return vaiTroRepository.save(vaiTro);
    }

    @Override
    public Page<VaiTro> pageSearchMS(String key, Integer trangThai, Pageable pageable) {
        return vaiTroRepository.searchPageMS(key,trangThai,pageable);
    }
}
