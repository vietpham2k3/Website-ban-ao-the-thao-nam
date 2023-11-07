package com.example.demo.controller;

import com.example.demo.dto.TraHangDTO;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.entity.LichSuTraHang;
import com.example.demo.entity.TraHang;
import com.example.demo.service.TraHangService;
import com.example.demo.service.impl.HoaDonChiTietServiceImpl;
import com.example.demo.service.impl.HoaDonServiceImpl;
import com.example.demo.service.impl.LichSuHoaDonServiceImpl;
import com.example.demo.service.impl.LichSuTraHangServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tra-hang")
public class TraHangController {

    @Autowired
    private LichSuTraHangServiceImpl lichSuTraHangService;

    @Autowired
    private TraHangService traHangService;

    @Autowired
    public HoaDonChiTietServiceImpl hoaDonChiTietService;
    @Autowired
    public LichSuHoaDonServiceImpl serviceLSHD;
    @Autowired
    public HoaDonServiceImpl serviceHD;

    @PostMapping("/tao-don-tra-hang")
    public ResponseEntity<?> getAll(@RequestBody TraHang traHang) {
        return ResponseEntity.ok(traHangService.add(traHang));
    }

    @PostMapping("yeu-cau-tra-hang/{id}")
    public ResponseEntity<?> xacNhanGiao(@PathVariable UUID id,
                                         @RequestBody TraHangDTO traHangDTO) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        String maTH = "TH" + new Random().nextInt(100000);

        // Tạo trả hàng
        TraHang traHang = new TraHang();
        traHang.setMa(maTH);
        traHang.setNgayTao(new Date());
        traHang.setSoHangTra(traHangDTO.getSoHangTra());
        traHang.setGhiChu(traHangDTO.getLichSuHoaDon().getGhiChu());
        traHang.setTienCanTra(traHangDTO.getTienCanTra());
        traHang.setTienTra(traHangDTO.getTienTra());
        traHang.setTrangThai(traHangDTO.getTrangThai());
        traHang = traHangService.add(traHang);

        // Lấy hoá đơn
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        traHangDTO.getLichSuHoaDon().setTrangThai(15);
        hoaDon.setTrangThai(15);
        traHangDTO.getLichSuHoaDon().setNgayTao(new Date());
        traHangDTO.getLichSuHoaDon().setMa(maLSHD);
        traHangDTO.getLichSuHoaDon().setGhiChu(traHangDTO.getLichSuHoaDon().getGhiChu());
        traHangDTO.getLichSuHoaDon().setHoaDon(hoaDon);
        traHangDTO.getLichSuHoaDon().setTen("Yêu cầu trả hàng");

        // Lấy danh sách hoá đơn chi tiết theo id hoá đơn
        List<HoaDonChiTiet> hoaDonChiTiets = hoaDonChiTietService.getAll(id);

        // Duyệt danh sách hoá đơn chi tiết
        for (HoaDonChiTiet hoaDonChiTiet : hoaDonChiTiets) {
            if (hoaDonChiTiet.getSoLuongHangTra() > 0) {
                // Nếu soLuongHangTra > 0, thêm trả hàng vào hoá đơn chi tiết
                hoaDonChiTiet.setTraHang(traHang);
            }
        }

        // Lưu danh sách hoá đơn chi tiết đã cập nhật
        hoaDonChiTietService.taoHoaDon(hoaDonChiTiets);

        // Lưu lịch sử đơn hàng
        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(traHangDTO.getLichSuHoaDon()));
    }


    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody List<HoaDonChiTiet> hoaDonChiTiets) {
        for (HoaDonChiTiet hoaDonChiTiet : hoaDonChiTiets) {
            if (hoaDonChiTiet.getSoLuongHangTra() == 0) {
                hoaDonChiTiet.setTraHang(null);
            }
        }

        hoaDonChiTietService.taoHoaDon(hoaDonChiTiets);
        return ResponseEntity.ok("ok");
    }

}
