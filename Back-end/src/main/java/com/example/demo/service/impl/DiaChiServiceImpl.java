package com.example.demo.service.impl;

import com.example.demo.entity.DiaChi;
import com.example.demo.entity.KhachHang;
import com.example.demo.repository.DiaChiRepository;
import com.example.demo.repository.KhachHangRepository;
import com.example.demo.service.DiaChiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class DiaChiServiceImpl implements DiaChiService {

    @Autowired
    private DiaChiRepository diaChiRepository;

    @Autowired
    private KhachHangRepository khachHangRepository;

    @Override
    public List<DiaChi> getAllIdKh(UUID idKH) {
        return diaChiRepository.getAllIdKh(idKH);
    }

    @Override
    public DiaChi add(DiaChi diaChi) {
        diaChi.setKhachHang(diaChi.getKhachHang());
        diaChi.setPhuongXa(diaChi.getPhuongXa());
        diaChi.setQuanHuyen(diaChi.getQuanHuyen());
        diaChi.setTinhThanh(diaChi.getTinhThanh());
        diaChi.setTrangThai(1);
        diaChi.setGhiChu(diaChi.getGhiChu());
        diaChi.setSdt(diaChi.getSdt());
        return diaChiRepository.save(diaChi);
    }

    @Override
    public DiaChi update(DiaChi diaChi, UUID id) {
        Optional<DiaChi> optional = diaChiRepository.findById(id);
        return optional.map(o->{
            o.setTinhThanh(diaChi.getTinhThanh());
            o.setQuanHuyen(diaChi.getQuanHuyen());
            o.setPhuongXa(diaChi.getPhuongXa());
            return diaChiRepository.save(o);
        }).orElse(null);

    }

    @Override
    public DiaChi addDCKH(DiaChi diaChi, UUID id) {
        KhachHang kh = khachHangRepository.findById(id).orElse(null);
        diaChi.setKhachHang(kh);
        diaChi.setPhuongXa(diaChi.getPhuongXa());
        diaChi.setQuanHuyen(diaChi.getQuanHuyen());
        diaChi.setTinhThanh(diaChi.getTinhThanh());
        diaChi.setTrangThai(1);
        return diaChiRepository.save(diaChi);
    }

    @Override
    public DiaChi delete(UUID id) {
        Optional<DiaChi> optional = diaChiRepository.findById(id);
        return optional.map(o->{
            diaChiRepository.delete(o);
            return o;
        }).orElse(null);
    }

    @Override
    public DiaChi detail(UUID id) {
        return diaChiRepository.findById(id).orElse(null);
    }
}
