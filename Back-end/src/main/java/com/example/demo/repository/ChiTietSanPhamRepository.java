package com.example.demo.repository;

import com.example.demo.entity.ChiTietSanPham;
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

    @Query(value = "SELECT sp from ChiTietSanPham sp where sp.sanPham.id = :id and sp.trangThai = 1")
    List<ChiTietSanPham> getAllByIdSPTT(UUID id);

    @Query(value = "SELECT MS.id, MS.ma, MIN(CTSP.id) AS id_ctsp, SP.id\n" +
            "FROM ChiTietSanPham CTSP\n" +
            "JOIN MauSac MS ON CTSP.id_ms = MS.id\n" +
            "JOIN SanPham SP ON CTSP.id_sp = SP.id\n" +
            "WHERE CTSP.id_sp = :id AND CTSP.trang_thai = 1\n" +
            "GROUP BY MS.id, MS.ma, SP.id;"
            , nativeQuery = true)
    List<String> getAllMSByIdSP(UUID id);

    @Query(value = "SELECT KC.ten , CTSP.id\n" +
            "FROM ChiTietSanPham CTSP\n" +
            "JOIN KichCo KC ON CTSP.id_kc = KC.id\n" +
            "WHERE CTSP.id_ms = :id AND CTSP.trang_thai = 1\n" +
            "GROUP BY KC.id, KC.ten , CTSP.id"
            , nativeQuery = true)
    List<String> getKCByIdMS(UUID id);

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

    @Query(value = "SELECT C.id, c.id_cl, c.id_sp, c.id_lsp, c.id_nsx, c.id_kc, c.id_ms, c.id_ca, c.ma, T.so_luong, c.gia_ban, c.ngay_tao, c.ngay_sua, c.nguoi_tao, c.nguoi_sua, c.trang_thai, cl.ten AS ChatLieu, ms.ten AS MauSac, lsp.ten AS LoaiSanPham, nsx.ten AS NhaSanXuat, ca.ten AS CoAo\n" +
            "FROM ChiTietSanPham C\n" +
            "JOIN (\n" +
            "    SELECT id_sp, SUM(so_luong) AS so_luong\n" +
            "    FROM ChiTietSanPham\n" +
            "    WHERE ChiTietSanPham.trang_thai = 1\n" +
            "    GROUP BY id_sp\n" +
            ") AS T ON C.id_sp = T.id_sp\n" +
            "JOIN (\n" +
            "    SELECT id_sp, MIN(id) AS min_id\n" +
            "    FROM ChiTietSanPham\n" +
            "    GROUP BY id_sp\n" +
            ") AS MinIDs ON C.id_sp = MinIDs.id_sp AND C.id = MinIDs.min_id\n" +
            "JOIN SanPham S ON S.id = C.id_sp\n" +
            "LEFT JOIN ChatLieu cl ON C.id_cl = cl.id\n" +
            "LEFT JOIN MauSac ms ON C.id_ms = ms.id\n" +
            "LEFT JOIN LoaiSanPham lsp ON C.id_lsp = lsp.id\n" +
            "LEFT JOIN NhaSanXuat nsx ON C.id_nsx = nsx.id\n" +
            "LEFT JOIN CoAo ca ON C.id_ca = ca.id\n" +
            "WHERE\n" +
            "    (\n" +
            "        :key IS NULL OR\n" +
            "        LOWER(S.ma) LIKE CONCAT('%', LOWER(:key), '%') OR\n" +
            "        LOWER(c.ma) LIKE CONCAT('%', LOWER(:key), '%') OR\n" +
            "        LOWER(T.so_luong) LIKE CONCAT('%', LOWER(:key), '%') OR\n" +
            "        LOWER(cl.ten) LIKE CONCAT('%', LOWER(:key), '%') OR\n" +
            "        LOWER(ms.ten) LIKE CONCAT('%', LOWER(:key), '%') OR\n" +
            "        LOWER(lsp.ten) LIKE CONCAT('%', LOWER(:key), '%') OR\n" +
            "        LOWER(nsx.ten) LIKE CONCAT('%', LOWER(:key), '%') OR\n" +
            "        LOWER(ca.ten) LIKE CONCAT('%', LOWER(:key), '%') OR\n" +
            "        LOWER(S.ten) LIKE CONCAT('%', LOWER(:key), '%')  -- Thêm điều kiện tìm kiếm theo tên sản phẩm\n" +
            "    )\n" +
            "AND\n" +
            "    (:trangThai IS NULL OR S.trang_thai = :trangThai)\n" +
            "AND\n" +
            "    (:min IS NULL OR C.gia_ban >= :min)\n" +
            "AND\n" +
            "    (:max IS NULL OR C.gia_ban <= :max)\n" +
            "AND\n" +
            "    (:mauSac IS NULL OR LOWER(ms.ten) LIKE CONCAT('%', LOWER(:mauSac), '%'))\n" +
            "AND\n" +
            "    (:chatLieu IS NULL OR LOWER(cl.ten) LIKE CONCAT('%', LOWER(:chatLieu), '%'))\n" +
            "AND\n" +
            "    (:loaiSanPham IS NULL OR LOWER(lsp.ten) LIKE CONCAT('%', LOWER(:loaiSanPham), '%'))\n" +
            "AND\n" +
            "    (:nhaSanXuat IS NULL OR LOWER(nsx.ten) LIKE CONCAT('%', LOWER(:nhaSanXuat), '%'))\n" +
            "AND\n" +
            "    (:coAo IS NULL OR LOWER(ca.ten) LIKE CONCAT('%', LOWER(:coAo), '%'))\n" +
            "ORDER BY c.ngay_tao DESC;\n",
            nativeQuery = true)
    Page<ChiTietSanPham> search(
            @Param("key") String key,
            @Param("trangThai") Integer trangThai,
            @Param("min") Double min,
            @Param("max") Double max,
            @Param("mauSac") List<String> mauSac,
            @Param("chatLieu") List<String> chatLieu,
            @Param("loaiSanPham") List<String> loaiSanPham,
            @Param("nhaSanXuat") List<String> nhaSanXuat,
            @Param("coAo") List<String> coAo,
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
            "JOIN SanPham sp ON sp.id = ctsp.id_sp\n" +
            "WHERE sp.trang_thai = 1\n" +
            "GROUP BY ctsp.id, ctsp.gia_ban, ctsp.id_ca, ctsp.id_cl, ctsp.id_kc, ctsp.id_lsp, ctsp.id_ms, ctsp.id_nsx, ctsp.id_sp\n" +
            ",ctsp.ma,ctsp.so_luong,ctsp.ngay_sua,ctsp.ngay_tao,ctsp.nguoi_sua,ctsp.nguoi_tao,ctsp.trang_thai\n" +
            "ORDER BY SUM(hdct.so_luong) DESC", nativeQuery = true)
    List<ChiTietSanPham> getAll();

    @Query(value = "SELECT ctsp.*\n" +
            "FROM ChiTietSanPham ctsp\n" +
            "JOIN (\n" +
            "  SELECT ctsp.id_sp, MAX(ctsp.id) AS max_id\n" +
            "  FROM ChiTietSanPham ctsp\n" +
            "  JOIN SanPham sp ON sp.id = ctsp.id_sp\n" +
            "  WHERE ctsp.trang_thai = 1\n" +
            "  GROUP BY ctsp.id_sp\n" +
            ") AS sp ON sp.max_id = ctsp.id\n" +
            "ORDER BY ctsp.ngay_tao DESC", nativeQuery = true)
    List<ChiTietSanPham> getAllSPNew();

    @Query(value = "SELECT\n" +
            "  ctsp.*,\n" +
            "  SUM(hdct.so_luong)\n" +
            "FROM ChiTietSanPham ctsp\n" +
            "JOIN HoaDonChiTiet hdct ON hdct.id_ctsp = ctsp.id\n" +
            "JOIN (\n" +
            "  SELECT id_sp, MAX(id) AS max_id\n" +
            "  FROM ChiTietSanPham\n" +
            "  WHERE trang_thai = 1\n" +
            "  GROUP BY id_sp\n" +
            ") AS subquery ON subquery.max_id = ctsp.id\n" +
            "WHERE ctsp.trang_thai = 1\n" +
            "GROUP BY ctsp.id, ctsp.gia_ban, ctsp.id_ca, ctsp.id_cl, ctsp.id_kc, ctsp.id_lsp, ctsp.id_ms, ctsp.id_nsx, ctsp.id_sp,\n" +
            "ctsp.ma,ctsp.so_luong,ctsp.ngay_sua,ctsp.ngay_tao,ctsp.nguoi_sua,ctsp.nguoi_tao,ctsp.trang_thai\n" +
            "ORDER BY SUM(hdct.so_luong) DESC", nativeQuery = true)
    List<ChiTietSanPham> getAllBestseller();


    @Query(value = "SELECT ctsp.*\n" +
            "FROM ChiTietSanPham ctsp\n" +
            "JOIN (\n" +
            "  SELECT id_sp, MAX(id) AS max_id\n" +
            "  FROM ChiTietSanPham\n" +
            "  WHERE trang_thai = 1\n" +
            "  GROUP BY id_sp\n" +
            ") AS subquery ON subquery.max_id = ctsp.id\n" +
            "WHERE ctsp.trang_thai = 1", nativeQuery = true)
    List<ChiTietSanPham> getAllProduct();

}
