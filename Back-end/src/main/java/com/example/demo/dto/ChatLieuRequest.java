package com.example.demo.dto;

import com.example.demo.entity.ChatLieu;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.util.UUID;

@Getter
@Setter
public class ChatLieuRequest {
    private UUID id;
    private String ma;
    private String ten;
    private Integer trang_thai;
    private String ngay_tao;
    private String ngay_sua;

    public ChatLieu map(ChatLieu chatLieu) {
        chatLieu.setMa(this.getMa());
        chatLieu.setTrangThai(this.getTrang_thai());
        chatLieu.setNgayTao(Date.valueOf(this.getNgay_tao()));
        chatLieu.setNgaySua(Date.valueOf(this.getNgay_sua()));
        return chatLieu;
    }
    public ChatLieu mapUpdate(ChatLieu chatLieu) {
        chatLieu.setId(this.getId());
        chatLieu.setMa(this.getMa());
        chatLieu.setTrangThai(this.getTrang_thai());
        chatLieu.setNgayTao(Date.valueOf(this.getNgay_tao()));
        chatLieu.setNgaySua(Date.valueOf(this.getNgay_sua()));
        return chatLieu;
    }
}
