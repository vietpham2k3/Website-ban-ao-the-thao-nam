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
    @Query(value = "update SanPham c set c.trangThai = 0 where c.id = :id")
    void delete(UUID id);

    @Transactional
    @Modifying
    @Query(value = "update ChiTietSanPham c set c.trangThai = 0 where c.id = :id")
    void deleteMSKC(UUID id);

    @Query(value = "SELECT sp from ChiTietSanPham sp where sp.sanPham.id = :id")
    List<ChiTietSanPham> getAllByIdSP(UUID id);


    @Query(value = "SELECT C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, c.id_ca, c.ma, t.so_luong,\n" +
            "c.gia_ban, c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai\n" +
            "FROM ChiTietSanPham C\n" +
            "JOIN (\n" +
            "SELECT ChiTietSanPham.id_sp, MIN(ChiTietSanPham.id) AS min_id,\n" +
            "SUM(ChiTietSanPham.so_luong) AS so_luong\n" +
            "FROM ChiTietSanPham\n" +
            "JOIN SanPham ON SanPham.id = ChiTietSanPham.id_sp\n" +
            "where ChiTietSanPham.trang_thai = 1\n" +
            "GROUP BY ChiTietSanPham.id_sp\n" +
            ") AS T\n" +
            "ON C.id_sp = T.id_sp AND C.id = T.min_id\n" +
            "JOIN SanPham S ON S.id = C.id_sp\n" +
            "order by c.ngay_tao desc", nativeQuery = true)
    Page<ChiTietSanPham> getAll(Pageable pageable);


    @Query(value = "SELECT C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, c.id_ca, c.ma, t.so_luong,\n" +
            "c.gia_ban, c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai\n" +
            "FROM ChiTietSanPham C\n" +
            "JOIN (\n" +
            "SELECT ChiTietSanPham.id_sp, MIN(ChiTietSanPham.id) AS min_id,\n" +
            "SUM(ChiTietSanPham.so_luong) AS so_luong\n" +
            "FROM ChiTietSanPham\n" +
            "JOIN SanPham ON SanPham.id = ChiTietSanPham.id_sp\n" +
            "where ChiTietSanPham.trang_thai = 1\n" +
            "GROUP BY ChiTietSanPham.id_sp\n" +
            ") AS T\n" +
            "ON C.id_sp = T.id_sp AND C.id = T.min_id\n" +
            "JOIN SanPham S ON S.id = C.id_sp\n" +
            "order by c.ngay_tao desc", nativeQuery = true)
    List<ChiTietSanPham> getAllSP();



    @Transactional
    @Modifying
    @Query(value = "update ChiTietSanPham c set c.soLuong = :soLuong where c.id = :id")
    void update(Integer soLuong, UUID id);

    @Query(value = "SELECT C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, " +
            "c.id_ca, c.ma, T.so_luong, " +
            "c.gia_ban, c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai " +
            "FROM ChiTietSanPham C " +
            "JOIN ( " +
            "SELECT id_sp, SUM(so_luong) AS so_luong " +
            "FROM ChiTietSanPham " +
            "WHERE ChiTietSanPham.trang_thai = 1 " +
            "GROUP BY id_sp " +
            ") AS T " +
            "ON C.id_sp = T.id_sp " +
            "JOIN ( " +
            "SELECT id_sp, MIN(id) AS min_id " +
            "FROM ChiTietSanPham " +
            "GROUP BY id_sp " +
            ") AS MinIDs " +
            "ON C.id_sp = MinIDs.id_sp AND C.id = MinIDs.min_id " +
            "JOIN SanPham S ON S.id = C.id_sp " +
            "WHERE (:key IS NULL OR LOWER(S.ma) LIKE CONCAT('%', LOWER(:key), '%') OR LOWER(S.ten) LIKE CONCAT('%', LOWER(:key), '%')) " +
            "AND (:trangThai IS NULL OR S.trang_thai = :trangThai) " +
            "AND ((:min IS NULL OR C.gia_ban >= :min) AND (:max IS NULL OR C.gia_ban <= :max)) " +
            "GROUP BY C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, " +
            "c.id_ca, c.ma, T.so_luong, " +
            "c.gia_ban, c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai " +
            "ORDER BY c.ngay_tao DESC",
            countQuery = "SELECT COUNT(*) " +
                    "FROM ChiTietSanPham C " +
                    "JOIN ( " +
                    "SELECT id_sp, SUM(so_luong) AS so_luong " +
                    "FROM ChiTietSanPham " +
                    "WHERE ChiTietSanPham.trang_thai = 1 " +
                    "GROUP BY id_sp " +
                    ") AS T " +
                    "ON C.id_sp = T.id_sp " +
                    "JOIN ( " +
                    "SELECT id_sp, MIN(id) AS min_id " +
                    "FROM ChiTietSanPham " +
                    "GROUP BY id_sp " +
                    ") AS MinIDs " +
                    "ON C.id_sp = MinIDs.id_sp AND C.id = MinIDs.min_id " +
                    "JOIN SanPham S ON S.id = C.id_sp " +
                    "WHERE (:key IS NULL OR LOWER(S.ma) LIKE CONCAT('%', LOWER(:key), '%') OR LOWER(S.ten) LIKE CONCAT('%', LOWER(:key), '%')) " +
                    "AND (:trangThai IS NULL OR S.trang_thai = :trangThai) " +
                    "AND ((:min IS NULL OR C.gia_ban >= :min) AND (:max IS NULL OR C.gia_ban <= :max)) " +
                    "GROUP BY C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, " +
                    "c.id_ca, c.ma, T.so_luong, " +
                    "c.gia_ban,c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai " +
                    "ORDER BY c.ngay_tao DESC",
            nativeQuery = true)
    Page<ChiTietSanPham> search(
            @Param("key") String key,
            @Param("trangThai") Integer trangThai,
            @Param("min") Double min,
            @Param("max") Double max,
            Pageable pageable
    );

    @Query(value = "SELECT C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, " +
            "c.id_ca, c.ma, T.so_luong, " +
            "c.gia_ban, c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai " +
            "FROM ChiTietSanPham C " +
            "JOIN ( " +
            "SELECT id_sp, SUM(so_luong) AS so_luong " +
            "FROM ChiTietSanPham " +
            "WHERE ChiTietSanPham.trang_thai = 1 " +
            "GROUP BY id_sp " +
            ") AS T " +
            "ON C.id_sp = T.id_sp " +
            "JOIN ( " +
            "SELECT id_sp, MIN(id) AS min_id " +
            "FROM ChiTietSanPham " +
            "GROUP BY id_sp " +
            ") AS MinIDs " +
            "ON C.id_sp = MinIDs.id_sp AND C.id = MinIDs.min_id " +
            "JOIN SanPham S ON S.id = C.id_sp " +
            "WHERE (:key IS NULL OR LOWER(S.ma) LIKE CONCAT('%', LOWER(:key), '%') OR LOWER(S.ten) LIKE CONCAT('%', LOWER(:key), '%')) " +
            "GROUP BY C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, " +
            "c.id_ca, c.ma, T.so_luong, " +
            "c.gia_ban, c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai " +
            "ORDER BY c.ngay_tao DESC",
            countQuery = "SELECT COUNT(*) " +
                    "FROM ChiTietSanPham C " +
                    "JOIN ( " +
                    "SELECT id_sp, SUM(so_luong) AS so_luong " +
                    "FROM ChiTietSanPham " +
                    "WHERE ChiTietSanPham.trang_thai = 1 " +
                    "GROUP BY id_sp " +
                    ") AS T " +
                    "ON C.id_sp = T.id_sp " +
                    "JOIN ( " +
                    "SELECT id_sp, MIN(id) AS min_id " +
                    "FROM ChiTietSanPham " +
                    "GROUP BY id_sp " +
                    ") AS MinIDs " +
                    "ON C.id_sp = MinIDs.id_sp AND C.id = MinIDs.min_id " +
                    "JOIN SanPham S ON S.id = C.id_sp " +
                    "WHERE (:key IS NULL OR LOWER(S.ma) LIKE CONCAT('%', LOWER(:key), '%') OR LOWER(S.ten) LIKE CONCAT('%', LOWER(:key), '%')) " +
                    "GROUP BY C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, " +
                    "c.id_ca, c.ma, T.so_luong, " +
                    "c.gia_ban,c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai " +
                    "ORDER BY c.ngay_tao DESC",
            nativeQuery = true)
    List<ChiTietSanPham> searchSPofHDCT(
            @Param("key") String key);

    @Query(value = "SELECT ctsp.*, SUM(hdct.so_luong) FROM ChiTietSanPham ctsp\n" +
            "JOIN HoaDonChiTiet hdct ON hdct.id_ctsp = ctsp.id\n" +
            "WHERE ctsp.trang_thai = 1\n" +
            "GROUP BY ctsp.id, ctsp.gia_ban, ctsp.id_ca, ctsp.id_cl, ctsp.id_kc, ctsp.id_lsp, ctsp.id_ms, ctsp.id_nsx, ctsp.id_sp\n" +
            ",ctsp.ma,ctsp.so_luong,ctsp.ngay_sua,ctsp.ngay_tao,ctsp.nguoi_sua,ctsp.nguoi_tao,ctsp.trang_thai\n" +
            "ORDER BY SUM(hdct.so_luong) DESC", nativeQuery = true)
    List<ChiTietSanPham> getAll();

    @Query(value = "SELECT ctsp.*\n" +
            "FROM ChiTietSanPham ctsp\n" +
            "JOIN SanPham sp ON sp.id = ctsp.id_sp\n" +
            "WHERE ctsp.trang_thai = 1\n" +
            "ORDER BY sp.ngay_tao DESC", nativeQuery = true)
    List<ChiTietSanPham> getAllSPNew();

    @Query(value = "SELECT ctsp.*, SUM(hdct.so_luong) FROM ChiTietSanPham ctsp\n" +
            "JOIN HoaDonChiTiet hdct ON hdct.id_ctsp = ctsp.id\n" +
            "WHERE ctsp.trang_thai = 1\n" +
            "GROUP BY ctsp.id, ctsp.gia_ban, ctsp.id_ca, ctsp.id_cl, ctsp.id_kc, ctsp.id_lsp, ctsp.id_ms, ctsp.id_nsx, ctsp.id_sp\n" +
            ",ctsp.ma,ctsp.so_luong,ctsp.ngay_sua,ctsp.ngay_tao,ctsp.nguoi_sua,ctsp.nguoi_tao,ctsp.trang_thai\n" +
            "ORDER BY SUM(hdct.so_luong) DESC", nativeQuery = true)
    List<ChiTietSanPham> getAllBestseller();


    @Query(value = "SELECT * FROM ChiTietSanPham\n" +
            "WHERE trang_thai = 1", nativeQuery = true)
    List<ChiTietSanPham> getAllProduct();

}
