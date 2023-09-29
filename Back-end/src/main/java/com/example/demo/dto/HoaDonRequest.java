package com.example.demo.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

public class HoaDonRequest {
    private UUID id;

    private String diaChi;

    private String ma;

    private Date ngayTao;

    private Date ngayThanhToan;

    private Double tongTien;

    private Double tongTienKhiGiam;

    private Integer trangThai;

    private String tenNguoiNhan;

    private String soDienThoai;

    private Date ngayDuKienNhan;

    private Date ngayShip;

    private Double tienShip;

    private Date ngaySua;

    private Date ngayNhan;

    private String ghiChu;

    private Integer loaiDon;

    public String ten;

    public String anh;

}
