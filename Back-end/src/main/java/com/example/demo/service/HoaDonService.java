package com.example.demo.service;

import com.example.demo.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface HoaDonService {

    public List<HoaDon> listHD();

    public Page<HoaDon> pageHD(Pageable pageable);

    public List<HoaDon> getExcel();

    public HoaDon detailHD(UUID id);

}
