package com.example.demo.service.impl;

import com.example.demo.controller.HoaDonController;
import com.example.demo.entity.HoaDon;
import com.example.demo.repository.HoaDonRespository;
import com.example.demo.response.HoaDonCustom;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.*;

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
    public Page<HoaDonCustom> searchVIP(String key, Date tuNgay, Date denNgay, Double min, Double max,
                                        @Param("trangThai") HoaDonController.TrangThaiWrapper trangThai, Integer loaiDon, String tenHinhThuc, Pageable pageable) {
        return res.findVIP(key,tuNgay,denNgay,min,max,trangThai.getTrangThai(),loaiDon,tenHinhThuc,pageable);
    }

    @Override
    public List<HoaDon> getExcel() {
        return res.findAll();
    }

    @Override
    public HoaDon detailHD(UUID id) {
        res.findAll();
        return res.findById(id).orElse(null);
    }

    @Override
    public void updateKHHD(UUID id, String tenNguoiNhan,String soDienThoai,String diaChi) {
         res.updateKH(id,tenNguoiNhan,soDienThoai,diaChi);
    }
}
