package com.example.demo.repository;

import com.example.demo.entity.KhachHang;
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
public interface KhachHangRepository extends JpaRepository<KhachHang, UUID> {
    @Transactional
    @Modifying
    @Query(value = "update KhachHang kh set kh.trangThai = 0 where kh.id = :id")
    void delete(UUID id);

    @Query(value = "SELECT * FROM KhachHang \n" +
            "WHERE ((ma is null or ma LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (ten is null or ten LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (sdt is null or sdt LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (email is null or email LIKE lower(CONCAT('%', ?1, '%'))))\n" +
            "and (trang_thai is null or trang_thai LIKE lower(CONCAT('%', ?2, '%')))", nativeQuery = true)
    Page<KhachHang> searchKH(
            @Param("key") String key,
            @Param("trangThai") Integer trangThai,
            Pageable pageable
    );

    @Query(value = "SELECT kh.id, kh.ma, kh.ten, kh.sdt, kh.email, kh.ngay_sinh, kh.trang_thai FROM KhachHang kh", nativeQuery = true)
    Page<KhachHang> pageKH(Pageable pageable);
}
