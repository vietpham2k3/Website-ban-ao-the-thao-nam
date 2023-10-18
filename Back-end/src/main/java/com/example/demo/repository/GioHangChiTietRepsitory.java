package com.example.demo.repository;

import com.example.demo.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GioHangChiTietRepsitory extends JpaRepository<GioHangChiTiet, UUID> {

    @Query(value = "SELECT COUNT(id) FROM GioHangChiTiet WHERE id_gh IS NULL OR CONVERT(NVARCHAR(36), id_gh) = :id", nativeQuery = true)
    Integer countSPOnGH(UUID id);
}
