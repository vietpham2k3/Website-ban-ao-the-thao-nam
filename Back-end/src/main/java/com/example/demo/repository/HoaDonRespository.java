package com.example.demo.repository;

import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDon_KhuyenMai;
import com.example.demo.response.HoaDonCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Repository
public interface HoaDonRespository extends JpaRepository<HoaDon, UUID> {

    @Query(value = "SELECT HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, SUM(HDCT.so_luong) AS tong_so_luong,\n" +
            "SUM(HDCT.so_luong * HDCT.don_gia) as tong_tien, HD.trang_thai, HD.loai_don\n" +
            "FROM HoaDon HD\n" +
            "JOIN HoaDonChiTiet HDCT ON HD.id = HDCT.id_hd\n" +
            "GROUP BY HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.tong_tien, HD.trang_thai, HD.loai_don\n" +
            "ORDER BY HD.ngay_tao DESC",
            nativeQuery = true)
    public Page<HoaDonCustom> hienThiPageHD(Pageable pageable);

    @Query(value = "SELECT hd.*, hdct.id as idHDCT, hdct.id_ctsp, hdct.id_hd, hdct.don_gia, hdct.so_luong\n" +
            "FROM HoaDon HD\n" +
            "JOIN HoaDonChiTiet HDCT ON HD.id = HDCT.id_hd\n" +
            "WHERE HD.trang_thai IN :trangThai \n" +
            "and hd.id_kh = :idKH \n" +
            "and loai_don = 1\n" +
            "ORDER BY HD.ngay_tao DESC",
            nativeQuery = true)
    List<HoaDon> searchByTrangThai(@Param("trangThai") Integer[] trangThai, @Param("idKH") UUID idKH);

    @Query(value = "SELECT HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, \n" +
            "       SUM(HDCT.so_luong) AS tong_so_luong,\n" +
            "       SUM(HDCT.so_luong * HDCT.don_gia) as tong_tien, \n" +
            "       HD.trang_thai, HD.loai_don\n" +
            "FROM HoaDon HD\n" +
            "JOIN HoaDonChiTiet HDCT ON HD.id = HDCT.id_hd\n" +
            "WHERE ((:key IS NULL OR HD.ma LIKE CONCAT('%', :key, '%')) \n" +
            "       OR (:key IS NULL OR HD.ten_nguoi_nhan LIKE CONCAT('%', :key, '%')))\n" +
            "       AND (:tuNgay IS NULL OR HD.ngay_tao >= :tuNgay) \n" +
            "       AND (:denNgay IS NULL OR HD.ngay_tao <= :denNgay) \n" +
            "       AND (HD.trang_thai IN :trangThai) \n" +
            "       AND (:loaiDon IS NULL OR HD.loai_don = :loaiDon)\n" +
            "GROUP BY HD.id, HD.ma, HD.ten_nguoi_nhan, HD.ngay_tao, HD.trang_thai, HD.loai_don\n" +
            "HAVING ((:minSL IS NULL OR SUM(HDCT.so_luong) >= :minSL) \n" +
            "       AND (:maxSL IS NULL OR SUM(HDCT.so_luong) <= :maxSL)) \n" +
            "       AND ((:minTT IS NULL OR SUM(HDCT.so_luong * HDCT.don_gia) >= :minTT) \n" +
            "       AND (:maxTT IS NULL OR SUM(HDCT.so_luong * HDCT.don_gia) <= :maxTT))\n" +
            "\t   ORDER BY HD.ngay_tao DESC",
            nativeQuery = true)
    public Page<HoaDonCustom> findVIP(@Param("key") String key,
                                      @Param("tuNgay") Date tuNgay,
                                      @Param("denNgay") Date denNgay,
                                      @Param("trangThai") Integer[] trangThai,
                                      @Param("loaiDon") Integer loaiDon,
                                      @Param("minSL") Double minSL,
                                      @Param("maxSL") Double maxSL,
                                      @Param("minTT") Double minTT,
                                      @Param("maxTT") Double maxTT,
                                      Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "UPDATE HoaDon SET ten_nguoi_nhan = :tenNguoiNhan, \n" +
            "            sdt = :soDienThoai, dia_chi = :diaChi, tinh = :tinh," +
            " huyen = :huyen, xa = :xa ,ngay_sua = GETDATE(),tong_tien = :tongTien," +
            " tong_tien_sau_khi_giam = :tongTienKhiGiam," +
            "tien_ship = :tienShip WHERE id = :id", nativeQuery = true)
    public void updateHD(UUID id, String tenNguoiNhan, String soDienThoai,
                         String diaChi, String tinh,
                         String huyen, String xa, Double tongTien,
                         Double tongTienKhiGiam, Double tienShip);

    @Query(value = "select h from HoaDon h where h.trangThai = 0 and h.loaiDon = 0")
    List<HoaDon> getAllHD();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            " WHERE\n" +
            "    (\n" +
            "      (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "       MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 6 AND\n" +
            "       HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "      (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "       MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 7 AND\n" +
            "       HD.loai_don = 1)\n" +
            "    )" , nativeQuery = true)
    public Double doanhThuTongNgayCurrent();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    DAY(HD.ngay_thanh_toan) = DAY(GETDATE())AND\n" +
            "\t MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "\t YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "    AND HD.trang_thai = 6\n" +
            "\tAND HD.loai_don = 0", nativeQuery = true)
    public Double doanhThuTaiQuayNgayCurrent();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    DAY(HD.ngay_thanh_toan) = DAY(GETDATE())AND\n" +
            "\t MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "\t YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "    AND HD.trang_thai = 7\n" +
            "\tAND HD.loai_don = 1", nativeQuery = true)
    public Double doanhThuOnlineNgayCurrent();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            " WHERE\n" +
            "    (\n" +
            "      (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 6 AND\n" +
            "       HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "      (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 7 AND\n" +
            "       HD.loai_don = 1)\n" +
            "    )" , nativeQuery = true)
    public Double doanhThuTongThangCurrent();

    @Query(value = "SELECT\n" +
            "    SUM(HD.tong_tien_sau_khi_giam) AS doanh_thu_thang_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "\t YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "\tAND HD.trang_thai = 6\n" +
            "\tAND HD.loai_don = 0", nativeQuery = true)
    public Double doanhThuTaiQuayThangCurrent();

    @Query(value = "SELECT\n" +
            "    SUM(HD.tong_tien_sau_khi_giam) AS doanh_thu_thang_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "\t YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "\tAND HD.trang_thai = 7\n" +
            "\tAND HD.loai_don = 1", nativeQuery = true)
    public Double doanhThuOnlineThangCurrent();

    @Query(value = "SELECT\n" +
            "    COALESCE(SUM(HD.tong_tien_sau_khi_giam), 0) AS doanh_thu_ngay_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            " WHERE\n" +
            "    (\n" +
            "      (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 6 AND\n" +
            "       HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "      (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 7 AND\n" +
            "       HD.loai_don = 1)\n" +
            "    )" , nativeQuery = true)
    public Double doanhThuTongNamCurrent();

    @Query(value = "SELECT\n" +
            "    SUM(HD.tong_tien_sau_khi_giam) AS doanh_thu_nam_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "\t\tAND HD.trang_thai = 6\n" +
            "\t\tAND HD.loai_don = 0", nativeQuery = true)
    public Double doanhThuTaiquayNamCurrent();

    @Query(value = "SELECT\n" +
            "    SUM(HD.tong_tien_sau_khi_giam) AS doanh_thu_nam_hien_tai\n" +
            "FROM\n" +
            "    HoaDon HD\n" +
            "WHERE\n" +
            "    YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "\t\tAND HD.trang_thai = 7\n" +
            "\t\tAND HD.loai_don = 1", nativeQuery = true)
    public Double doanhThuOnlineNamCurrent();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "            FROM HoaDon HD WHERE\n" +
            "                DAY(HD.ngay_thanh_toan) = DAY(GETDATE())AND\n" +
            "             MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 2", nativeQuery = true)
    public Integer soDonHuyNgay();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "            FROM HoaDon HD WHERE\n" +
            "                DAY(HD.ngay_thanh_toan) = DAY(GETDATE())AND\n" +
            "             MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 0", nativeQuery = true)
    public Integer soDonChoXacNhanNgay();

    @Query(value = "\tSELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "FROM HoaDon HD\n" +
            "WHERE\n" +
            "    (\n" +
            "        (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "         MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "         YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 6 AND\n" +
            "         HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "        (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "         MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "         YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 7 AND\n" +
            "         HD.loai_don = 1)\n" +
            "    );", nativeQuery = true)
    public Integer soDonThanhCongNgay();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_thang\n" +
            "            FROM HoaDon HD WHERE\n" +
            "             MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 2", nativeQuery = true)
    public Integer soDonHuyThang();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_thang\n" +
            "            FROM HoaDon HD WHERE\n" +
            "             MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 0", nativeQuery = true)
    public Integer soDonChoXacNhanThang();

    @Query(value = "\tSELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "FROM HoaDon HD\n" +
            "WHERE\n" +
            "    (\n" +
            "        (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "         YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 6 AND\n" +
            "         HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "        (MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "         YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 7 AND\n" +
            "         HD.loai_don = 1)\n" +
            "    );", nativeQuery = true)
    public Integer soDonThanhCongThang();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_nam\n" +
            "            FROM HoaDon HD WHERE\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 2", nativeQuery = true)
    public Integer soDonHuyNam();

    @Query(value = "SELECT COALESCE(COUNT(*), 0) AS so_don_nam\n" +
            "            FROM HoaDon HD WHERE\n" +
            "            YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE())\n" +
            "              AND HD.trang_thai = 0", nativeQuery = true)
    public Integer soDonChoXacNhanNam();

    @Query(value = "\tSELECT COALESCE(COUNT(*), 0) AS so_don_ngay\n" +
            "FROM HoaDon HD\n" +
            "WHERE\n" +
            "    (\n" +
            "        (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 6 AND\n" +
            "         HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "        (YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "         HD.trang_thai = 7 AND\n" +
            "         HD.loai_don = 1)\n" +
            "    );", nativeQuery = true)
    public Integer soDonThanhCongNam();

    @Query(value = "WITH RankedData AS (\n" +
            "  SELECT\n" +
            "    SP.ten AS san_pham_ten,\n" +
            "    SUM(HDCT.so_luong) OVER (PARTITION BY CTSP.id_sp) AS so_luong_sp_dh,\n" +
            "    HDCT.don_gia,\n" +
            "    ROW_NUMBER() OVER(PARTITION BY CTSP.id_sp ORDER BY HDCT.so_luong DESC) AS RowNum\n" +
            "  FROM HoaDonChiTiet HDCT\n" +
            "  JOIN ChiTietSanPham CTSP ON CTSP.id = HDCT.id_ctsp\n" +
            "  JOIN HoaDon HD ON HD.id = HDCT.id_hd  \n" +
            "  JOIN SanPham SP ON SP.id = CTSP.id_sp\n" +
            "  WHERE\n" +
            "    (\n" +
            "      (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "       MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 6 AND\n" +
            "       HD.loai_don = 0)\n" +
            "    )\n" +
            "    OR\n" +
            "    (\n" +
            "      (DAY(HD.ngay_thanh_toan) = DAY(GETDATE()) AND\n" +
            "       MONTH(HD.ngay_thanh_toan) = MONTH(GETDATE()) AND\n" +
            "       YEAR(HD.ngay_thanh_toan) = YEAR(GETDATE()) AND\n" +
            "       HD.trang_thai = 7 AND\n" +
            "       HD.loai_don = 1)\n" +
            "    )\n" +
            ")\n" +
            "\n" +
            "\n" +
            "SELECT\n" +
            "  san_pham_ten,\n" +
            "  so_luong_sp_dh,\n" +
            "  don_gia,\n" +
            "  so_luong_sp_dh * don_gia as tienSP\n" +
            "FROM RankedData\n" +
            "WHERE RowNum = 1\n" +
            "ORDER BY so_luong_sp_dh DESC" , nativeQuery = true)
    public List<String> sanPhamBanChayTrongNgay();

}
