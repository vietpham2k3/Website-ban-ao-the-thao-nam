package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public interface ChatLieuRepository extends JpaRepository<ChatLieu, UUID> {
    @Query(value = "select id,ma,ten,trang_thai,ngay_tao,ngay_sua from chatLieu", nativeQuery = true)
    List<ChatLieu> getAll();
    @Query(value = "SELECT * FROM ChatLieu \n" +
            "WHERE (:key IS NULL OR ma LIKE CONCAT('%', :key, '%'))\n" +
            "      AND (:key IS NULL OR ten LIKE CONCAT('%', :key , '%'))\n" +
            "      AND (:trangThai IS NULL OR trang_thai = :trangThai)", nativeQuery = true)
    Page<ChatLieu> searchPageMS(@Param("key") String key,
                              @Param("trangThai") Integer trangThai,
                              Pageable pageable);


}
