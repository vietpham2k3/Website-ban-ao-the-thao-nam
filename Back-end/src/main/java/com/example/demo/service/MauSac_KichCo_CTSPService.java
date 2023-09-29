package com.example.demo.service;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.MauSac_KichCo_CTSP;

import java.util.List;
import java.util.UUID;

public interface MauSac_KichCo_CTSPService {

    List<MauSac_KichCo_CTSP> getAllById(UUID id);

    MauSac_KichCo_CTSP add(MauSac_KichCo_CTSP mauSac_kichCo_ctsp);

    Integer calculateTotalQuantityByChiTietSanPham(ChiTietSanPham chiTietSanPham);

    MauSac_KichCo_CTSP delete(UUID id);

    MauSac_KichCo_CTSP detail(UUID id);
}
