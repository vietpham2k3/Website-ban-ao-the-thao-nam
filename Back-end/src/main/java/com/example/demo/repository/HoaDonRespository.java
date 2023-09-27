package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.response.HoaDonCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HoaDonRespository extends JpaRepository<HoaDon, UUID> {

    @Query(value = "SELECT HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.tong_tien_sau_khi_giam, HD.trang_thai, HD.loai_don, HTTT.ten\n" +
            "FROM HoaDon HD JOIN HinhThucThanhToan HTTT ON HD.id_httt = HTTT.id \n",
            nativeQuery = true)
    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable);
}
