package com.example.demo.service;

import com.example.demo.entity.DiaChi;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public interface DiaChiService {
    List<DiaChi> getAllIdKh(UUID idKH);

    DiaChi add(DiaChi diaChi);

    DiaChi update(DiaChi diaChi, UUID id);

    DiaChi addDCKH(DiaChi diaChi, UUID id);

    DiaChi delete(UUID id);

    DiaChi detail (UUID id);
}
