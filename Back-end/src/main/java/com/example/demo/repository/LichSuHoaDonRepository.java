package com.example.demo.repository;

import com.example.demo.entity.LichSuHoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LichSuHoaDonRepository extends JpaRepository<LichSuHoaDon, UUID> {
    LichSuHoaDon findLichSuHoaDonById(UUID id);

    @Query(value = "SELECT LSHD.id,LSHD.ma,LSHD.ten,LSHD.nguoi_tao,LSHD.trang_thai,\n" +
            "LSHD.ngay_tao,LSHD.ghi_chu,LSHD.id_hd\n" +
            "  FROM LichSuHoaDon LSHD JOIN HoaDon HD ON LSHD.id_hd = HD.id\n" +
            "  WHERE HD.id = :id",nativeQuery = true)
    List<LichSuHoaDon> findLichSuHoaDonByHoaDonId(UUID id);
}
