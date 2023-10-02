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

import java.util.List;
import java.util.UUID;

@Repository
public interface ChiTietSanPhamRepository extends JpaRepository<ChiTietSanPham, UUID> {

    @Transactional
    @Modifying
    @Query(value = "update ChiTietSanPham c set c.trangThai = 0 where c.id = :id")
    void delete(UUID id);


    @Query(value = "SELECT C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, c.id_ca, c.ma, c.so_luong, " +
            "c.gia_ban, c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai\n" +
            "FROM ChiTietSanPham C\n" +
            "JOIN (\n" +
            "  SELECT ChiTietSanPham.id_sp, MIN(ChiTietSanPham.id) AS min_id\n" +
            "  FROM ChiTietSanPham\n" +
            "  JOIN SanPham ON SanPham.id = ChiTietSanPham.id_sp\n" +
            "  GROUP BY ChiTietSanPham.id_sp\n" +
            ") AS T\n" +
            "ON C.id_sp = T.id_sp AND C.id = T.min_id\n" +
            "JOIN SanPham S ON S.id = C.id_sp;", nativeQuery = true)
    Page<ChiTietSanPham> getAll(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "update ChiTietSanPham c set c.soLuong = :soLuong where c.id = :id")
    void update(Integer soLuong, UUID id);

    @Query(value ="SELECT C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, c.id_ca, c.ma, c.so_luong, " +
            "c.gia_ban, c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai\n" +
            "FROM ChiTietSanPham C\n" +
            "JOIN (\n" +
            "  SELECT ChiTietSanPham.id_sp, MIN(ChiTietSanPham.id) AS min_id\n" +
            "  FROM ChiTietSanPham\n" +
            "  JOIN SanPham ON SanPham.id = ChiTietSanPham.id_sp\n" +
            "  GROUP BY ChiTietSanPham.id_sp\n" +
            ") AS T\n" +
            "ON C.id_sp = T.id_sp AND C.id = T.min_id\n" +
            "JOIN SanPham S ON S.id = C.id_sp\n" +
            "WHERE (:key IS NULL OR C.ma LIKE LOWER(CONCAT('%', :key, '%')) OR S.ten LIKE LOWER(CONCAT('%', :key , '%')))\n" +
            "AND (:trangThai IS NULL OR C.trang_thai = :trangThai)\n" +
            "AND ((:min IS NULL OR C.gia_ban >= :min) AND (:max IS NULL OR C.gia_ban <= :max))",
            nativeQuery = true)
    Page<ChiTietSanPham> search(
            @Param("key") String key,
            @Param("trangThai") Integer trangThai,
            @Param("min") Double min,
            @Param("max") Double max,
            Pageable pageable
    );

    @Query(value = "SELECT * FROM ChiTietSanPham WHERE trang_thai = 1", nativeQuery = true)
    List<ChiTietSanPham>getAll();

}
