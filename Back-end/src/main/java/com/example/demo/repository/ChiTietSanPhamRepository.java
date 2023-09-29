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

    @Query(value = "SELECT c.*, sp.id as idsp, sp.ten FROM ChiTietSanPham c\n" +
            "join SanPham sp on c.id_sp = sp.id\n" +
            "WHERE ((c.ma IS NULL OR c.ma LIKE LOWER( CONCAT('%', :key, '%')))\n" +
            "or (sp.ten IS NULL OR sp.ten LIKE LOWER(CONCAT('%', :key , '%'))))\n" +
            "and (c.trang_thai IS NULL OR c.trang_thai = :trangThai)", nativeQuery = true)
    Page<ChiTietSanPham> search(String key, Integer trangThai, Pageable pageable);

}
