package com.example.demo.service;

import com.example.demo.entity.HoaDon;
import com.example.demo.response.HoaDonCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface HoaDonService {

    public List<HoaDon> listHD();

    public Page<HoaDon> pageHD(Pageable pageable);

    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    public List<HoaDon> getExcel();

    public HoaDon detailHD(UUID id);

    public void updateKHHD(UUID id, String tenNguoiNhan,String soDienThoai,String diaChi);

}
