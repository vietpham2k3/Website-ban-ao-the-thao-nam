package com.example.demo.repository;

import com.example.demo.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface MauSacRepository extends JpaRepository<MauSac, UUID> {

    @Query(value = "SELECT * FROM MauSac WHERE ma LIKE NULL OR ma LIKE CONCAT('%', :key, '%')\n" +
            " AND ten LIKE NULL OR ten LIKE CONCAT('%', :key, '%')", nativeQuery = true)
    Page<MauSac> searchPageMS(@Param("key") String key, Pageable pageable);
}
