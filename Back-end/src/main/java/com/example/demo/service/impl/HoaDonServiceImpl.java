package com.example.demo.service.impl;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.repository.ChiTietSanPhamRepository;
import com.example.demo.repository.HoaDonRespository;
import com.example.demo.response.HoaDonCustom;
import com.example.demo.service.HoaDonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.*;

@Service

public class HoaDonServiceImpl implements HoaDonService {
    @Autowired
    public HoaDonRespository res;
    @Autowired
    private ChiTietSanPhamRepository resCTSP;

    @Override
    public List<HoaDon> listHD() {
        return res.getAllHD();
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
    public Page<HoaDonCustom> searchVIP(String key, Date tuNgay, Date denNgay, Integer[] trangThai,
                                        Integer loaiDon, Double minSL, Double maxSL, Double minTT,
                                        Double maxTT, Pageable pageable) {
        return res.findVIP(key, tuNgay, denNgay, trangThai, loaiDon, minSL, maxSL, minTT, maxTT, pageable);
    }

    @Override
    public List<ChiTietSanPham> getAllSP() {
        return resCTSP.getAllSP();
    }

    @Override
    public Double doanhThuTongNgayCurrent() {
        return res.doanhThuTongNgayCurrent();
    }

    @Override
    public Double doanhThuTongThangCurrent() {
        return res.doanhThuTongThangCurrent();
    }

    @Override
    public Double doanhThuTongNamCurrent() {
        return res.doanhThuTongNamCurrent();
    }

    @Override
    public Double doanhThuTaiQuayNgayCurrent() {
        return res.doanhThuTaiQuayNgayCurrent();
    }

    @Override
    public Double doanhThuTaiQuayThangCurrent() {
        return res.doanhThuTaiQuayThangCurrent();
    }

    @Override
    public Double doanhThuTaiQuayNamCurrent() {
        return res.doanhThuTaiquayNamCurrent();
    }

    @Override
    public Double doanhThuOnlineNgayCurrent() {
        return res.doanhThuOnlineNgayCurrent();
    }

    @Override
    public Double doanhThuOnlineThangCurrent() {
        return res.doanhThuOnlineThangCurrent();
    }

    @Override
    public Double doanhThuOnlineNamCurrent() {
        return res.doanhThuOnlineNamCurrent();
    }

    @Override
    public List<ChiTietSanPham> searchSPofHDCT(String key) {
        return resCTSP.searchSPofHDCT(key);
    }

    @Override
    public HoaDon detailHD(UUID id) {
        return res.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        res.deleteById(id);
    }

    @Override
    public void updateHD(UUID id, String tenNguoiNhan, String soDienThoai,
                           String diaChi, String tinh,
                           String huyen, String xa,Double tongTien,
                           Double tongTienKhiGiam,Double tienShip) {
        res.updateHD(id, tenNguoiNhan, soDienThoai, diaChi,tinh,
                huyen,xa,tongTien,tongTienKhiGiam,tienShip);
    }

    @Override
    public HoaDon add(HoaDon hoaDon) {
        return res.save(hoaDon);
    }
}
