package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name="KhachHang")
public class KhachHang {

    private static int i = 1;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private UUID id;

    @Column(name="ma")
    private String maKhachHang;

    @Column(name="ten")
    private String tenKhachHang;

    @Column(name="sdt")
    private String sdt;

    @Column(name="email")
    private String email;

    @Column(name="ngay_sinh")
    private Date ngaySinh;

    @Column(name="mat_khau")
    private String matKhau;

    @Column(name="trang_thai")
    private Integer trangThai;

    @Column(name="anh")
    @Lob
    private Blob anh;

    @PrePersist
    public void generateMaKhachHang() {
        if (maKhachHang == null) {
            maKhachHang = String.format("KH%02d", i++);
        }
    }
}
