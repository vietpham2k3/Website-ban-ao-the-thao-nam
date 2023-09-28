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

import java.util.UUID;

@Repository
public interface HoaDonRespository extends JpaRepository<HoaDon, UUID> {


    @Query(value = "SELECT HD.id,HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.tong_tien_sau_khi_giam," +
            " HD.trang_thai, HD.loai_don, HTTT.ten\n" +
            "FROM HoaDon HD JOIN HinhThucThanhToan HTTT ON HD.id_httt = HTTT.id \n",
            nativeQuery = true)
    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "UPDATE HoaDon SET ten_nguoi_nhan = :tenNguoiNhan, " +
            "sdt = :soDienThoai, dia_chi = :diaChi WHERE id = :id", nativeQuery = true)
    public void updateKH(UUID id, String tenNguoiNhan,String soDienThoai,String diaChi);

}
