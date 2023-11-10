package com.example.demo.service.impl;

import com.example.demo.entity.HangLoi;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.repository.HangLoiRepository;
import com.example.demo.repository.HoaDonChiTietRepository;
import com.example.demo.service.HangLoiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HangLoiServiceImpl implements HangLoiService {
    @Autowired
    public HangLoiRepository res;

    @Autowired
    public HoaDonChiTietRepository resHDCT;
    @Override
    public List<HangLoi> thongTinHangLoi(UUID id) {
        return res.getAllSPLoiByIdHD(id);
    }

    @Override
    public List<HoaDonChiTiet> spLoi(UUID id) {
        return resHDCT.getAllByIdHDAndIdHL(id);
    }
}
