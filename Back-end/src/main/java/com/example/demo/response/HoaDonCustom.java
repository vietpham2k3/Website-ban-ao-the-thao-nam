package com.example.demo.response;

import java.util.Date;
import java.util.UUID;

public interface HoaDonCustom {
    UUID getid();
    String getma();
    String getten_nguoi_nhan();
    Date getngay_tao();
    Double gettong_tien_sau_khi_giam();
    Integer gettrang_thai();
    Integer getloai_don();
    String getten();
}
