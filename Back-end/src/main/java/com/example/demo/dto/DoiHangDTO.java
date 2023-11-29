package com.example.demo.dto;
import com.example.demo.entity.DoiHang;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.LichSuHoaDon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoiHangDTO {

    private DoiHang doiHang;
    private HoaDonChiTiet hoaDonChiTiet;
    private LichSuHoaDon lichSuHoaDon;

}
