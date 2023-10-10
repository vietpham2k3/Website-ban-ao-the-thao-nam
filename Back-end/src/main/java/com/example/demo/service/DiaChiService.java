package com.example.demo.service;

import com.example.demo.entity.DiaChi;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface DiaChiService {
    List<DiaChi> getAll();

    DiaChi add(DiaChi diaChi);

    DiaChi update(DiaChi diaChi);

    DiaChi delete(UUID id);
}
