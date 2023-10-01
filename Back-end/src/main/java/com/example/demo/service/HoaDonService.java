package com.example.demo.service;

import com.example.demo.controller.HoaDonController;
import com.example.demo.entity.HoaDon;
import com.example.demo.response.HoaDonCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.*;

public interface HoaDonService {

    public List<HoaDon> listHD();

    public Page<HoaDon> pageHD(Pageable pageable);

    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    public Page<HoaDonCustom> searchVIP(String key, Date tuNgay, Date denNgay, Double min, Double max,
                                       @Param("trangThai") HoaDonController.TrangThaiWrapper trangThai, Integer loaiDon, String tenHinhThuc, Pageable pageable);

    public List<HoaDon> getExcel();

    public HoaDon detailHD(UUID id);

    public void updateKHHD(UUID id, String tenNguoiNhan, String soDienThoai, String diaChi);

}
