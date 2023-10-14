package com.example.demo.repository;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, UUID> {

    @Query(value = "select h from HoaDonChiTiet h where h.hoaDon.id = :id")
    List<HoaDonChiTiet> getAll(UUID id);

    @Query(value = "select h from HoaDonChiTiet h where h.chiTietSanPham = :chiTietSanPham and h.hoaDon = :hoaDon ")
    List<HoaDonChiTiet> existsById(ChiTietSanPham chiTietSanPham, HoaDon hoaDon);

    @Transactional
    @Modifying
    @Query(value = "update HoaDonChiTiet c set c.soLuong = c.soLuong + :soLuong  where c.id = :id")
    void update(Integer soLuong, UUID id);

    @Transactional
    @Modifying
    @Query(value = "update HoaDonChiTiet c set c.soLuong = :soLuong  where c.id = :id")
    void updateSL(Integer soLuong, UUID id);

    @Transactional
    @Modifying
    @Query(value = "delete from LichSuHoaDon \n" +
            "where LichSuHoaDon.id_hd = :id " +
            "delete from HoaDon_KhuyenMai \n" +
            "where HoaDon_KhuyenMai.id_hd = :id\n" +
            "delete from HoaDonChiTiet\n" +
            "where HoaDonChiTiet.id_hd = :id\n" +
            "delete from HoaDon\n" +
            "where id = :id", nativeQuery = true)
    void delete(UUID id);

}
