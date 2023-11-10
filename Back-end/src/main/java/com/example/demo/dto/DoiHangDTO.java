package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Getter
@Setter
public class DoiHangDTO {
    private UUID id;
    private String ma;
    private Integer soHangDoi;
    private Integer trangThai;
    private Double tongTienHangDoi;
    private String ghiChu;
    private Date ngayTao;
    private String nguoiTao;

}
