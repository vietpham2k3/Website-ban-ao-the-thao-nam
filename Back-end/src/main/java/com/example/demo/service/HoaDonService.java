package com.example.demo.service;

import com.example.demo.entity.HoaDon;
import com.example.demo.response.HoaDonCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface HoaDonService {

    List<HoaDon> listHD();

    Page<HoaDon> pageHD(Pageable pageable);

    Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    List<HoaDon> getExcel();

    HoaDon detailHD(UUID id);

    void updateKHHD(UUID id, String tenNguoiNhan, String soDienThoai, String diaChi);

    HoaDon add(HoaDon hoaDon);
}
