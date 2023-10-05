package com.example.demo.repository;

import com.example.demo.entity.HoaDon_KhuyenMai;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface HoaDon_KhuyenMaiRepository extends JpaRepository<HoaDon_KhuyenMai, UUID> {

}
