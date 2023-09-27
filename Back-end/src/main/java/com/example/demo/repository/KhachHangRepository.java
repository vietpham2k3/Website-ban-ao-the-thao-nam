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

    @Query("SELECT kh FROM KhachHang kh " +
            "WHERE (kh.maKhachHang IS NULL OR kh.maKhachHang LIKE CONCAT('%', :key, '%')) " +
            "AND (kh.tenKhachHang IS NULL OR kh.tenKhachHang LIKE CONCAT('%', :key, '%')) " +
            "AND (kh.sdt IS NULL OR kh.sdt LIKE CONCAT('%', :key, '%')) " +
            "AND (kh.email IS NULL OR kh.email LIKE CONCAT('%', :key, '%')) " +
            "AND (kh.trangThai IS NULL OR kh.trangThai = :trangThai)")
    Page<KhachHang> searchKH(
            @Param("key") String key,
            @Param("trangThai") Integer trangThai,
            Pageable pageable
    );

    @Query(value = "SELECT kh.id, kh.ma, kh.ten, kh.sdt, kh.email, kh.ngay_sinh, kh.trang_thai FROM KhachHang kh", nativeQuery = true)
    Page<KhachHang> pageKH(Pageable pageable);
}
