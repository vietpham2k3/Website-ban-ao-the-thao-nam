package com.example.demo.service;

import com.example.demo.entity.HangLoi;
import com.example.demo.entity.HoaDonChiTiet;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

public interface HangLoiService {
    public List<HangLoi> thongTinHangLoi(UUID id);

    public List<HoaDonChiTiet> spLoi(UUID id);
}
