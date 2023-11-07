package com.example.demo.dto.response;


import org.springframework.beans.factory.annotation.Value;

public interface ProductDetailClientRespose {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.ma}")
    String getMa();

    @Value("#{target.tenChatLieu}")
    String getTenChatLieu();

    @Value("#{target.tenNhaSanXuat}")
    String getTenNhaSanXuat();

    @Value("#{target.tenSize}")
    String getTenSize();

    @Value("#{target.tenMau}")
    String getTenMau();

    @Value("#{target.tenLoaiSanPham}")
    String getTenLoaiSanPham();

    @Value("#{target.tenCoAo}")
    String getTenCoAO();

}
