package com.example.demo.repository;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.KhuyenMai;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, UUID> {

    @Transactional
    @Modifying
    @Query(value = "update ChiTietSanPham c set c.trangThai = 0 where c.id = :id")
    void delete(UUID id);

    @Transactional
    @Modifying
    @Query(value = "update ChiTietSanPham c set c.soLuong = :soLuong where c.id = :id")
    void update(Integer soLuong, UUID id);

    @Query(value = "SELECT c.*, sp.id as idsp, sp.ten FROM ChiTietSanPham c\n" +
            "JOIN SanPham sp ON c.id_sp = sp.id\n" +
            "WHERE (:key IS NULL OR c.ma LIKE LOWER(CONCAT('%', :key, '%')) OR sp.ten LIKE LOWER(CONCAT('%', :key , '%')))\n" +
            "AND (:trangThai IS NULL OR c.trang_thai = :trangThai)\n" +
            "AND ((:min IS NULL OR c.gia_ban >= :min) AND (:max IS NULL OR c.gia_ban <= :max))",
            nativeQuery = true)
    Page<ChiTietSanPham> search(
            @Param("key") String key,
            @Param("trangThai") Integer trangThai,
            @Param("min") Double min,
            @Param("max") Double max,
            Pageable pageable
    );

}
