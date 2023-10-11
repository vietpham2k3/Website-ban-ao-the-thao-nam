package com.example.demo.service;


import com.example.demo.entity.GioHang;

import java.util.List;
import java.util.UUID;

public interface GioHangService {
    List<GioHang> getAll();

    GioHang add(GioHang gioHang);


}
