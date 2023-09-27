package com.example.demo.repository;

import com.example.demo.entity.Anh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AnhRepository extends JpaRepository<Anh, UUID> {
}
