package com.example.demo.service.impl;

import com.example.demo.dto.KichThuocDTO;
import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.KichCo;
import com.example.demo.entity.VaiTro;
import com.example.demo.repository.ChiTietSanPhamRepository;
import com.example.demo.repository.KichCoRepository;
import com.example.demo.service.KichCoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@Service
public class KichCoServiceImpl implements KichCoService {
    @Autowired
    private KichCoRepository repository;

    @Override
    public List<KichCo> getAll() {
        return repository.getAll();
    }

    @Override
    public Page<KichCo> pageSearchKC(String key, Integer trangThai, Pageable pageable) {
        return repository.searchPageKC(key, trangThai, pageable);
    }

    @Override
    public Page<KichCo> fillAll(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.findAll(pageable);
    }

    @Override
    public KichCo getOne(UUID id) {
        return repository.findById(id).orElse(null);

    }

    @Override
    public KichCo detail(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public KichCo add(KichCo kichCo) {
        String maSP = "KC" + new Random().nextInt(100000);
        kichCo.setMa(maSP);
        kichCo.setTen(kichCo.getTen());
        kichCo.setTrangThai(kichCo.getTrangThai());
        kichCo.setNgayTao(new Date());
        return repository.save(kichCo);
    }

    @Override
    public KichCo update(KichCo kichCo) {
        kichCo.setTen(kichCo.getTen());
        kichCo.setTrangThai(kichCo.getTrangThai());
        kichCo.setNgayTao(kichCo.getNgayTao());
        kichCo.setNgaySua(new Date());
        return repository.save(kichCo);
    }

    @Override
    public KichCo delete(UUID id) {
        KichCo kichCo = repository.findById(id).orElse(null);
        kichCo.setTrangThai(1);
        kichCo.setNgaySua(new Date());
        return repository.save(kichCo);
    }

    @Override
    public List<KichCo> findByKichCoString(List<String> kichCosString) {
        List<KichCo> kichCos = new ArrayList<>();
        for (String kcString: kichCosString) {
            KichCo kichCo = repository.findByTen(kcString);
            kichCos.add(kichCo);
        }
        return kichCos;
    }
}
