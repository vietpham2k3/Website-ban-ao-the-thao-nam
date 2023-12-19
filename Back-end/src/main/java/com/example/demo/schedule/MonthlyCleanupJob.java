package com.example.demo.schedule;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.GioHangChiTiet;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import com.example.demo.service.impl.GioHangChiTietServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MonthlyCleanupJob {

    @Autowired
    private GioHangChiTietServiceImpl gioHangChiTietService;

    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;

    @Scheduled(cron = "0 0 0 1 * ?")
    public void execute() {
        List<GioHangChiTiet> gioHangChiTietList = gioHangChiTietService.findAll();

        for (GioHangChiTiet gioHangChiTiet : gioHangChiTietList) {
            ChiTietSanPham chiTietSanPham = gioHangChiTiet.getChiTietSanPham();
            Integer soLuong = gioHangChiTiet.getSoLuong();

            if (chiTietSanPham != null && soLuong != null) {
                chiTietSanPham.setSoLuong(chiTietSanPham.getSoLuong() + soLuong);
                chiTietSanPhamService.add(chiTietSanPham);
            }
        }

        gioHangChiTietService.deleteAll();
    }
}