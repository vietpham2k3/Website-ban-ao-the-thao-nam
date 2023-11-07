package com.example.demo.dto;

import com.example.demo.entity.LichSuHoaDon;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TraHangDTO {

    private LichSuHoaDon lichSuHoaDon;
    private Double tienCanTra;
    private Integer soHangTra;
    private Integer trangThai;
    private Double tienTra;

}
