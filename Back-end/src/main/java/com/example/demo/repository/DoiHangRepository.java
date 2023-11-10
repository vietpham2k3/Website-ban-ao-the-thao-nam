package com.example.demo.repository;

import com.example.demo.entity.DoiHang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DoiHangRepository extends JpaRepository<DoiHang, UUID> {


}
