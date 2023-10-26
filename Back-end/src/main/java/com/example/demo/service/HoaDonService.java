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

    public Double doanhThuTongNgayCurrent();

    public Double doanhThuTongThangCurrent();

    public Double doanhThuTongNamCurrent();

    public Double doanhThuTaiQuayNgayCurrent();

    public Double doanhThuTaiQuayThangCurrent();

    public Double doanhThuTaiQuayNamCurrent();

    public Double doanhThuOnlineNgayCurrent();

    public Double doanhThuOnlineThangCurrent();

    public Double doanhThuOnlineNamCurrent();

    public Integer soDonHuyNgay();

    public Integer soDonHuyThang();

    public Integer soDonHuyNam();

    public Integer soDonChoXacNhanNgay();

    public Integer soDonChoXacNhanThang();

    public Integer soDonChoXacNhanNam();

    public Integer soDonThanhCongNgay();

    public Integer soDonThanhCongThang();

    public Integer soDonThanhCongNam();

    public List<String> sanPhamBanChayTrongNgay();

    public List<ChiTietSanPham> searchSPofHDCT(String key);

    HoaDon detailHD(UUID id);

    void delete(UUID id);

    public void updateHD(UUID id, String tenNguoiNhan, String soDienThoai,
                         String diaChi, String tinh,
                         String huyen, String xa, Double tongTien,
                         Double tongTienKhiGiam, Double tienShip);

    HoaDon add(HoaDon hoaDon);
}
