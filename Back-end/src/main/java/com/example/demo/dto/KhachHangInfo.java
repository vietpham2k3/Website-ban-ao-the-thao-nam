package com.example.demo.dto;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder


public class KhachHangInfo {

//    private UUID id;
    private String tenKhachHang;
    private String email;
    private Date ngaySinh;
    private Boolean gioiTinh;
}
