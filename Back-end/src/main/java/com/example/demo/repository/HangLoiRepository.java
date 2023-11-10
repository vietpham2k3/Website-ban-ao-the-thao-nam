package com.example.demo.repository;

import com.example.demo.entity.HangLoi;
import com.example.demo.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface HangLoiRepository extends JpaRepository<HangLoi, UUID> {

    @Query(value = "SELECT HL.* FROM HangLoi HL JOIN HoaDonChiTiet HDCT ON HL.id = HDCT.id_hl\n" +
            "WHERE id_hd = :id", nativeQuery = true)
    List<HangLoi> getAllSPLoiByIdHD(UUID id);
}
