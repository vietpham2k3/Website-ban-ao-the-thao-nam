package com.example.demo.repository;

import com.example.demo.entity.VaiTro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface VaiTroRepository extends JpaRepository<VaiTro, UUID> {

    @Query(value = "select vt from VaiTro vt where vt.trangThai = 1")
    List<VaiTro> getAll();

    @Query(value = "SELECT * FROM VaiTro\n" +
            "WHERE ((ma is null or ma LIKE lower(CONCAT('%', ?1, '%')))\n" +
            "or (ten is null or ten LIKE lower(CONCAT('%', ?1, '%'))))\n" +
            "and (trang_thai is null or trang_thai LIKE lower(CONCAT('%', ?2, '%')))", nativeQuery = true)
    Page<VaiTro> searchPageMS(@Param("key") String key,
                                @Param("trangThai") Integer trangThai,
                                Pageable pageable);
}
