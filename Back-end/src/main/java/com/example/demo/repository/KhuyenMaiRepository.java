package com.example.demo.repository;

import com.example.demo.entity.KhuyenMai;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.UUID;

@Repository
public interface KhuyenMaiRepository extends JpaRepository<KhuyenMai, UUID> {
    @Query(value = "SELECT * FROM KhuyenMai \n" +
            "WHERE (:key IS NULL OR ma LIKE CONCAT('%', :key, '%'))\n" +
            "      AND (:key IS NULL OR ten LIKE CONCAT('%', :key , '%'))\n" +
            "      AND (:trangThai IS NULL OR trang_thai = :trangThai)", nativeQuery = true)
    Page<KhuyenMai> search(@Param("key") String key, Integer trangThai, Pageable pageable);
}