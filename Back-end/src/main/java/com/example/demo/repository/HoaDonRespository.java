package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.response.HoaDonCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Repository
public interface HoaDonRespository extends JpaRepository<HoaDon, UUID> {

    @Query(value = "SELECT HD.id,HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.tong_tien_sau_khi_giam," +
            " HD.trang_thai, HD.loai_don, HTTT.ten\n" +
            "FROM HoaDon HD JOIN HinhThucThanhToan HTTT ON HD.id_httt = HTTT.id \n",
            nativeQuery = true)
    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    @Query(value = "SELECT HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.tong_tien_sau_khi_giam, HD.trang_thai, HD.loai_don, HTTT.ten " +
            "FROM HoaDon HD JOIN HinhThucThanhToan HTTT ON HD.id_httt = HTTT.id " +
            "WHERE ((:key IS NULL OR HD.ma LIKE CONCAT('%', :key , '%')) " +
            "OR (:key IS NULL OR HD.ten_nguoi_nhan LIKE CONCAT('%', :key , '%'))) " +
            "AND (:tuNgay IS NULL OR HD.ngay_tao >= :tuNgay) " +
            "AND (:denNgay IS NULL OR HD.ngay_tao <= :denNgay) " +
            "AND ((:min IS NULL OR HD.tong_tien_sau_khi_giam >= :min) " +
            "AND (:max IS NULL OR HD.tong_tien_sau_khi_giam <= :max)) " +
            "AND (:trangThai IS NULL OR HD.trang_thai = :trangThai)"+
            "AND (:loaiDon IS NULL OR HD.loai_don = :loaiDon) " +
            "AND (:tenHinhThuc IS NULL OR HTTT.ten LIKE CONCAT('%', :tenHinhThuc , '%')) "
            ,nativeQuery = true)
    public Page<HoaDonCustom> findVIP(@Param("key") String key,
                                      @Param("tuNgay") Date tuNgay,
                                      @Param("denNgay") Date denNgay,
                                      @Param("min") Double min,
                                      @Param("max") Double max,
                                      @Param("trangThai") Integer trangThai,
                                      @Param("loaiDon") Integer loaiDon,
                                      @Param("tenHinhThuc") String tenHinhThuc,
                                      Pageable pageable);


    @Transactional
    @Modifying
    @Query(value = "UPDATE HoaDon SET ten_nguoi_nhan = :tenNguoiNhan, " +
            "sdt = :soDienThoai, dia_chi = :diaChi WHERE id = :id", nativeQuery = true)
    public void updateKH(UUID id, String tenNguoiNhan, String soDienThoai, String diaChi);

}
