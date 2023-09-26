package com.example.demo.repository;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.MauSac;
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

    @Query(value = "select h from ChatLieu h where h.ten like lower(concat('%', :key ,'%'))")
    Page<ChatLieu> search(String key, Pageable pageable);


}
