package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.response.HoaDonCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.*;

public interface HoaDonService {

    List<HoaDon> listHD();

    Page<HoaDon> pageHD(Pageable pageable);

    Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    public Page<HoaDonCustom> searchVIP(String key, Date tuNgay, Date denNgay, Integer[] trangThai,
                                        Integer loaiDon, Double minSL, Double maxSL, Double minTT,
                                        Double maxTT, Pageable pageable);

    public List<ChiTietSanPham> getAllSP();

    public List<ChiTietSanPham> searchSPofHDCT(String key);

    HoaDon detailHD(UUID id);

    void delete(UUID id);

    public void updateKHHD(UUID id, String tenNguoiNhan, String soDienThoai,
                           String diaChi, String tinh,
                           String huyen, String xa);

    public void updateHDTien(UUID id, Double tongTien,Double tongTienKhiGiam,Double tienShip);

    HoaDon add(HoaDon hoaDon);
}
