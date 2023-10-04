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

    @Query(value = "SELECT HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, SUM(HDCT.so_luong) AS tong_so_luong,\n" +
            "SUM(HDCT.so_luong * HDCT.don_gia) as tong_tien, HD.trang_thai, HD.loai_don\n" +
            "FROM HoaDon HD\n" +
            "JOIN HoaDonChiTiet HDCT ON HD.id = HDCT.id_hd\n" +
            "GROUP BY HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.tong_tien, HD.trang_thai, HD.loai_don\n" +
            "ORDER BY HD.ngay_tao DESC",
            nativeQuery = true)
    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    @Query(value = "SELECT HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, \n" +
            "       SUM(HDCT.so_luong) AS tong_so_luong,\n" +
            "       SUM(HDCT.so_luong * HDCT.don_gia) as tong_tien, \n" +
            "       HD.trang_thai, HD.loai_don\n" +
            "FROM HoaDon HD\n" +
            "JOIN HoaDonChiTiet HDCT ON HD.id = HDCT.id_hd\n" +
            "WHERE ((:key IS NULL OR HD.ma LIKE CONCAT('%', :key, '%')) \n" +
            "       OR (:key IS NULL OR HD.ten_nguoi_nhan LIKE CONCAT('%', :key, '%')))\n" +
            "       AND (:tuNgay IS NULL OR HD.ngay_tao >= :tuNgay) \n" +
            "       AND (:denNgay IS NULL OR HD.ngay_tao <= :denNgay) \n" +
            "       AND (:trangThai IS NULL OR HD.trang_thai = :trangThai) \n" +
            "       AND (:loaiDon IS NULL OR HD.loai_don = :loaiDon)\n" +
            "GROUP BY HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.trang_thai, HD.loai_don\n" +
            "HAVING ((:minSL IS NULL OR SUM(HDCT.so_luong) >= :minSL) \n" +
            "       AND (:maxSL IS NULL OR SUM(HDCT.so_luong) <= :maxSL)) \n" +
            "       AND ((:minTT IS NULL OR SUM(HDCT.so_luong * HDCT.don_gia) >= :minTT) \n" +
            "       AND (:maxTT IS NULL OR SUM(HDCT.so_luong * HDCT.don_gia) <= :maxTT))\n" +
            "\t   ORDER BY HD.ngay_tao DESC",
            nativeQuery = true)
    public Page<HoaDonCustom> findVIP(@Param("key") String key,
                                      @Param("tuNgay") Date tuNgay,
                                      @Param("denNgay") Date denNgay,
                                      @Param("trangThai") Integer trangThai,
                                      @Param("loaiDon") Integer loaiDon,
                                      @Param("minSL") Double minSL,
                                      @Param("maxSL") Double maxSL,
                                      @Param("minTT") Double minTT,
                                      @Param("maxTT") Double maxTT,
                                      Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "UPDATE HoaDon SET ten_nguoi_nhan = :tenNguoiNhan, \n" +
            "            sdt = :soDienThoai, dia_chi = :diaChi ,ngay_sua = GETDATE() WHERE id = :id", nativeQuery = true)
    public void updateKH(UUID id, String tenNguoiNhan, String soDienThoai, String diaChi);

    @Query(value = "select h from HoaDon h where h.trangThai = 0")
    List<HoaDon> getAllHD();

    @Query(value = "select h from HoaDon h where h.id = :id")
    List<HoaDon> getAllHDLSTT(@Param("id") UUID id);

}
