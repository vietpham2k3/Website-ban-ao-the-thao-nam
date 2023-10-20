package com.example.demo.repository;

import com.example.demo.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DiaChiRepository extends JpaRepository<DiaChi, UUID> {
    @Query(value = "SELECT *\n" +
            "from DiaChi \n" +
            "WHERE id_kh = :idKH", nativeQuery = true)
    List<DiaChi> getAllIdKh(UUID idKH);
}
