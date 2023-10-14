package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="DiaChi")
public class DiaChi {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private UUID id;

    @Column(name="ten_nguoi_nhan")
    private String tenNguoiNhan;

    @Column(name="sdt")
    private String sdt;

    @Column(name="tinh_thanh")
    private String tinhThanh;

    @Column(name="quan_huyen")
    private String quanHuyen;

    @Column(name="phuong_xa")
    private String phuongXa;

    @Column(name="ghi_chu")
    private String ghiChu;

    @Column(name="trang_thai")
    private Integer trangThai;

    @ManyToOne
    @JoinColumn(name = "id_kh", referencedColumnName = "id")
    private KhachHang khachHang;
}
