package com.example.demo.service;

import com.example.demo.entity.Anh;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.KichCo;
import com.example.demo.entity.SanPham;
import org.springframework.data.domain.Page;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

public interface ChiTietSanPhamService {
    List<ChiTietSanPham> getAll();

    List<ChiTietSanPham> getAllByIdSP(UUID id);

    List<ChiTietSanPham> getAllByIdSPTT(UUID id);

    List<String> getAllMSByIdSP(UUID id);

    List<String> getKCByIdMSAndIdSP(UUID idMS,UUID idSP);

    List<Anh> findAnhByIdMSAndIdSP(UUID idSP, UUID idMS);

    List<ChiTietSanPham> getAllSPNEW();

    Page<ChiTietSanPham> page(Integer page);

    Page<ChiTietSanPham> search(String key, Integer trangThai, Double min, Double max, Integer page);

    ChiTietSanPham add(ChiTietSanPham chiTietSanPham);

    ChiTietSanPham detail(UUID id);

    void delete(UUID id);

    void deleteMSKC(UUID id);

    void update(Integer soLuong, UUID id);

    List<ChiTietSanPham> getAllProduct();

    List<ChiTietSanPham> getAllBestseller();

    Page<ChiTietSanPham> pageWeb(Integer page);

    Page<ChiTietSanPham> locChiTietSanPham(String mauSac, String kichCo, String chatLieu, String coAo, String nhaSanXuat, BigDecimal minGiaBan, BigDecimal maxGiaBan, Integer page);
//    Page<ChiTietSanPham> searchMauSac(String key, Integer page);
}
