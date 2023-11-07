package com.example.demo.service.impl;

import com.example.demo.dto.FilterProductClient;
import com.example.demo.dto.response.ProductDetailClientRespose;
import com.example.demo.entity.Anh;
import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.CoAo;
import com.example.demo.entity.KichCo;
import com.example.demo.entity.LoaiSanPham;
import com.example.demo.entity.MauSac;
import com.example.demo.entity.NhaSanXuat;
import com.example.demo.repository.ChiTietSanPhamRepository;
import com.example.demo.service.ChatLieuService;
import com.example.demo.service.ChiTietSanPhamService;
import com.example.demo.service.CoAoService;
import com.example.demo.service.KichCoService;
import com.example.demo.service.LoaiSanPhamService;
import com.example.demo.service.MauSacService;
import com.example.demo.service.NhaSanXuatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ChiTietSanPhamServiceImpl implements ChiTietSanPhamService {

    @Autowired
    private ChiTietSanPhamRepository repository;

    @Autowired
    private MauSacService mauSacService;

    @Autowired
    private ChatLieuService chatLieuService;

    @Autowired
    private KichCoService kichCoService;

    @Autowired
    private CoAoService coAoService;

    @Autowired
    private LoaiSanPhamService loaiSanPhamService;

    @Autowired
    private NhaSanXuatService nhaSanXuatService;

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
    public List<ChiTietSanPham> updateAll(List<ChiTietSanPham> chiTietSanPham) {
        return repository.saveAll(chiTietSanPham);
    }

    @Override
    public List<String> getKCByIdMSAndIdSP(UUID idMS,UUID idSP) {
        return repository.getKCByIdMSAndIdSP(idMS,idSP);
    }

    @Override
    public List<Anh> findAnhByIdMSAndIdSP(UUID idSP, UUID idMS) {
        return repository.findAnhByIdMSAndIdSP(idSP,idMS);
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
    public List<ChiTietSanPham> detailByIdSP(UUID id) {
        return repository.detailByIdSP(id);
    }


    @Override
    public List<ChiTietSanPham> getAllProduct() {
        return repository.getAllProduct();
    }

    @Override
    public Page<ChiTietSanPham> search(
            String key,
            Integer trangThai,
            Double min,
            Double max,
            List<String> mauSac,
            List<String> chatLieu,
            List<String> loaiSanPham,
            List<String> nhaSanXuat,
            List<String> coAo,
            Integer page
    ) {
        Pageable pageable = PageRequest.of(page, 5);
        return repository.search(key, trangThai, min, max, mauSac, chatLieu, loaiSanPham, nhaSanXuat, coAo, pageable);
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
    public ChiTietSanPham findID(UUID id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Page<ChiTietSanPham> filter(FilterProductClient filterProductClient, int page) {
        if (filterProductClient == null) {
            return null;
        }
        List<String> msacString = filterProductClient.getListMau();
        List<MauSac> mauSacs = mauSacService.findByListString(msacString);
        List<String> chatLieusString = filterProductClient.getListChatLieu();
        List<ChatLieu> chatLieus = chatLieuService.findByChatLieuString(chatLieusString);
        List<String> kichCos = filterProductClient.getListSize();
        List<KichCo> tenKichCo = kichCoService.findByKichCoString(kichCos);
        List<String> coAoString = filterProductClient.getListCoAo();
        List<CoAo> coAos = coAoService.findByCoAoString(coAoString);
        List<String> lsphamString = filterProductClient.getListLoaiSanPham();
        List<LoaiSanPham> loaiSanPhams = loaiSanPhamService.findByLoaiSanPhamString(lsphamString);
        List<String> nsxString = filterProductClient.getListNhaSanXuat();
        List<NhaSanXuat> nhaSanXuats = nhaSanXuatService.findByNhaSanXuatString(nsxString);
        double greater = filterProductClient.getGiaBanMin();
        double less = filterProductClient.getGiaBanMax();
        Pageable pageable = PageRequest.of(page, 5);

        Page<ChiTietSanPham> chiTietSanPhams = repository.findAll(pageable);

        if (!mauSacs.isEmpty() && !tenKichCo.isEmpty() && !chatLieus.isEmpty() && !coAos.isEmpty() && !loaiSanPhams.isEmpty() && !nhaSanXuats.isEmpty()) {
            chiTietSanPhams = repository.findByMauSacInAndChatLieuInAndKichCoInAndCoAoInAndLoaiSanPhamInAndNhaSanXuatInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    mauSacs, chatLieus, tenKichCo, coAos, loaiSanPhams, nhaSanXuats,pageable, greater, less);
        } else if (!mauSacs.isEmpty() && !tenKichCo.isEmpty()) {
            chiTietSanPhams = repository.findByMauSacInAndKichCoInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    mauSacs, tenKichCo, greater, less, pageable);
        } else if (!mauSacs.isEmpty() && !coAos.isEmpty()) {
            chiTietSanPhams = repository.findByMauSacInAndCoAoInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    mauSacs, coAos, greater, less, pageable);
        } else if (!mauSacs.isEmpty() && !chatLieus.isEmpty()) {
            chiTietSanPhams = repository.findByMauSacInAndChatLieuInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    mauSacs, chatLieus, greater, less, pageable);
        } else if (!tenKichCo.isEmpty() && !chatLieus.isEmpty()) {
            chiTietSanPhams = repository.findByKichCoInAndChatLieuInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    tenKichCo, chatLieus, greater, less, pageable);
        } else if (!mauSacs.isEmpty()) {
            chiTietSanPhams = repository.findByMauSacInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    mauSacs, greater, less, pageable);
        } else if (!tenKichCo.isEmpty()) {
            chiTietSanPhams = repository.findByKichCoInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    tenKichCo, greater, less, pageable);
        } else if (!chatLieus.isEmpty()) {
            chiTietSanPhams = repository.findByChatLieuInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    chatLieus, greater, less, pageable);
        } else if (!coAos.isEmpty()) {
            chiTietSanPhams = repository.findByCoAoInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    coAos, greater, less, pageable);
        } else if (!loaiSanPhams.isEmpty()) {
            chiTietSanPhams = repository.findByLoaiSanPhamInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    loaiSanPhams, greater, less, pageable);
        } else if (!nhaSanXuats.isEmpty()) {
            chiTietSanPhams = repository.findByNhaSanXuatInAndGiaBanIsGreaterThanEqualAndGiaBanIsLessThanEqual(
                    nhaSanXuats, greater, less, pageable);
        } else{
            chiTietSanPhams = repository.findByGiaBanIsGreaterThanAndGiaBanLessThan(greater, less, pageable);
        }

        return chiTietSanPhams;

    }

}
//    @Override
//    public List<ProductDetailClientRespose> findAllClient(FilterProductClient req) {
//        System.out.println(req.getListMau().size());
//        return repository.findAllClient(req);
//    }

//       if(!mauSacs.isEmpty()) {
//           chiTietSanPhams = repository.findByMauSacIn(mauSacs, pageable);
//       }
//
//       if (!chatLieus.isEmpty()) {
//           chiTietSanPhams = repository.
//       }