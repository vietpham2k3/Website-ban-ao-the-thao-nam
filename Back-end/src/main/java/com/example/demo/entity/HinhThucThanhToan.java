package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.UUID;

@Entity
@Getter @Setter
@Builder @AllArgsConstructor @NoArgsConstructor
@Table(name = "HinhThucThanhToan")
public class HinhThucThanhToan {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    public UUID id;

    @Column(name = "ma")
    public String ma;

    @Column(name = "ten")
    public String ten;

    @Column(name = "trang_thai")
    public Integer trangThai;

    @Column(name = "tien")
    public Double tien;

    @Column(name = "ghi_chu")
    public String ghiChu;

    @Column(name = "ngay_tao")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    public Date ngay_tao;

    @Column(name = "ngay_sua")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm")
    @Temporal(TemporalType.TIMESTAMP)
    public Date ngay_sua;
}
