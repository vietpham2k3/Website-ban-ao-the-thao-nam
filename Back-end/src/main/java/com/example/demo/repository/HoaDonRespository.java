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

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonRespository extends JpaRepository<HoaDon, UUID> {

    @Query(value = "SELECT HD.id,HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.tong_tien_sau_khi_giam," +
            " HD.trang_thai, HD.loai_don, HTTT.ten\n" +
            "FROM HoaDon HD JOIN HinhThucThanhToan HTTT ON HD.id_httt = HTTT.id \n",
            nativeQuery = true)
    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    @Query(value = "SELECT HD.id\n" +
            "      ,HD.dia_chi\n" +
            "      ,HD.ma\n" +
            "      ,HD.ngay_tao\n" +
            "      ,HD.ngay_thanh_toan\n" +
            "      ,HD.tong_tien\n" +
            "      ,HD.tong_tien_sau_khi_giam\n" +
            "      ,HD.trang_thai\n" +
            "      ,HD.ten_nguoi_nhan\n" +
            "      ,HD.sdt\n" +
            "      ,HD.ngay_du_kien_nhan\n" +
            "      ,HD.ngay_ship\n" +
            "      ,HD.tien_ship\n" +
            "      ,HD.ngay_sua\n" +
            "      ,HD.ngay_nhan\n" +
            "      ,HD.ghi_chu\n" +
            "      ,HD.loai_don,\n" +
            "\t  HTTT.ten,\n" +
            "\t  NV.ten\n" +
            "  FROM dbo.HoaDon HD JOIN HinhThucThanhToan HTTT ON HD.id_httt = HTTT.id JOIN NhanVien NV ON NV.id = HD.id_tk\n",nativeQuery = true)
    public List<HoaDon> hienThiHD();

    @Transactional
    @Modifying
    @Query(value = "UPDATE HoaDon SET ten_nguoi_nhan = :tenNguoiNhan, " +
            "sdt = :soDienThoai, dia_chi = :diaChi WHERE id = :id", nativeQuery = true)
    public void updateKH(UUID id, String tenNguoiNhan,String soDienThoai,String diaChi);

}
