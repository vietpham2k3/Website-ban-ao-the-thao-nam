package com.example.demo.repository;

import com.example.demo.entity.DoiHang;
import com.example.demo.entity.HoaDonChiTiet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DoiHangRepository extends JpaRepository<DoiHang, UUID> {

}
