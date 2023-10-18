package com.example.demo.service.impl;

import com.example.demo.entity.Anh;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.KichCo;
import com.example.demo.entity.SanPham;
import com.example.demo.repository.ChiTietSanPhamRepository;
import com.example.demo.service.ChiTietSanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class ChiTietSanPhamServiceImpl implements ChiTietSanPhamService {

    @Autowired
    private ChiTietSanPhamRepository repository;

    @Override
    public List<ChiTietSanPham> getAll() {
        return repository.getAll();
    }

    @Override
    public List<ChiTietSanPham> getAllByIdSP(UUID id) {
        return repository.getAllByIdSP(id);
    }

    @Override
    public List<ChiTietSanPham> getAllByIdSPTT(UUID id) {
        return repository.getAllByIdSPTT(id);
    }

    @Override
    public List<String> getAllMSByIdSP(UUID id) {
        return repository.getAllMSByIdSP(id);
    }

    @Override
    public List<String> getKCByIdMSAndIdSP(UUID idMS, UUID idSP) {
        return repository.getKCByIdMSAndIdSP(idMS, idSP);
    }

    @Override
    public List<Anh> findAnhByIdMSAndIdSP(UUID idSP, UUID idMS) {
        return repository.findAnhByIdMSAndIdSP(idSP, idMS);
    }

    @Override
    public List<ChiTietSanPham> getAllSPNEW() {
        return repository.getAllSPNew();
    }

    @Override
    public Page<ChiTietSanPham> page(Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.getAll(pageable);
    }

    @Override
    public List<ChiTietSanPham> getAllBestseller() {
        return repository.getAllBestseller();
    }

    @Override
    public List<ChiTietSanPham> getAllProduct() {
        return repository.getAllProduct();
    }

    @Override
    public Page<ChiTietSanPham> search(String key, Integer trangThai, Double min, Double max, Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.search(key, trangThai, min, max, pageable);
    }

    @Override
    public ChiTietSanPham add(ChiTietSanPham chiTietSanPham) {
        return repository.save(chiTietSanPham);
    }

    @Override
    public ChiTietSanPham detail(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void delete(UUID id) {
        repository.delete(id);
    }

    @Override
    public void deleteMSKC(UUID id) {
        repository.deleteMSKC(id);
    }

    @Override
    public void update(Integer soLuong, UUID id) {
        repository.update(soLuong, id);
    }

    @Override
    public Page<ChiTietSanPham> pageWeb(Integer page) {
        Pageable pageable = PageRequest.of(page, 20);
        return repository.getAll(pageable);
    }

    @Override
    public Page<ChiTietSanPham> locChiTietSanPham(String mauSac, String kichCo,
                                                  String chatLieu, String coAo,
                                                  String nhaSanXuat, BigDecimal minGiaBan, BigDecimal maxGiaBan, Integer page) {
        Pageable pageable = PageRequest.of(page, 21);
        return repository.locChiTietSanPham(mauSac, kichCo, chatLieu, coAo, nhaSanXuat, minGiaBan, maxGiaBan, pageable);
    }

//    @Override
//    public Page<ChiTietSanPham> searchMauSac(String key, Integer page) {
//        Pageable pageable = PageRequest.of(page, 21);
//        return repository.searchByColorName(key, pageable);
//    }
}
