package com.example.demo.controller;

import com.example.demo.dto.HoaDonRequest;
import com.example.demo.dto.KhachHangDTO;
import com.example.demo.dto.NhanVienRequest;
import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.entity.MauSac_KichCo_CTSP;
import com.example.demo.entity.NhanVien;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import com.example.demo.service.impl.HinhThucThanhToanServiceImpl;
import com.example.demo.service.impl.HoaDonChiTietServiceImpl;
import com.example.demo.service.impl.HoaDonServiceImpl;
import com.example.demo.service.impl.LichSuHoaDonServiceImpl;
import com.example.demo.service.impl.MauSac_KichCo_CTSPServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.*;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hoa-don/")
public class HoaDonController {
    @Autowired
    public HoaDonServiceImpl service;
    @Autowired
    public HoaDonChiTietServiceImpl hoaDonChiTietService;
    @Autowired
    public HinhThucThanhToanServiceImpl serviceHttt;
    @Autowired
    public LichSuHoaDonServiceImpl lichSuHoaDonService;
    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;
    @Autowired
    private MauSac_KichCo_CTSPServiceImpl mauSac_kichCo_ctspService;

    @GetMapping("hien-thi")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.listHD());
    }

    @GetMapping("getById/{id}")
    public ResponseEntity<?> getAllById(@PathVariable UUID id) {
        return ResponseEntity.ok(hoaDonChiTietService.getAll(id));
    }


    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody HoaDon hoaDon) {
        String ma = "HD" + new Random().nextInt(100000);
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        hoaDon.setMa(ma);
        hoaDon.setNgayTao(new Date());
        hoaDon.setLoaiDon(0);
        hoaDon.setTrangThai(1);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon().builder()
                .ma(maLSHD)
                .ten("Tạo hoá đơn")
                .trangThai(0)
                .ngayTao(new Date())
                .hoaDon(hoaDon)
                .build();
        service.add(hoaDon);
        return ResponseEntity.ok(lichSuHoaDonService.add(lichSuHoaDon));
    }

    @PostMapping("add-sp/{id}")
    public ResponseEntity<?> addSP(@PathVariable UUID id, @RequestBody HoaDonChiTiet hoaDon) {
        ChiTietSanPham sp = chiTietSanPhamService.detail(hoaDon.getChiTietSanPham().getId());
        hoaDon.setDonGia(sp.getGiaBan());
        mauSac_kichCo_ctspService.update(hoaDon.getSoLuong(), id);
        mauSac_kichCo_ctspService.updateCTSP(hoaDon.getSoLuong(), hoaDon.getChiTietSanPham().getId());
        hoaDonChiTietService.add(hoaDon);
        return ResponseEntity.ok(hoaDon.getId());
    }

    @GetMapping("hien-thi-page")
    public ResponseEntity<?> getPageHD(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        return ResponseEntity.ok(service.hienThiPageHD(pageable));
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        return ResponseEntity.ok(service.detailHD(id));
    }

    @PutMapping("updateKH/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody HoaDon hoaDon) {
        hoaDon.setNgaySua(new Date());
        service.updateKHHD(id, hoaDon.getTenNguoiNhan(), hoaDon.getSoDienThoai(),
                hoaDon.getDiaChi());
        return ResponseEntity.ok("ok");
    }

//    @PostMapping("print-excel")
//    public ResponseEntity<byte[]> exportToExcel(HttpServletResponse response,
//                                                @RequestBody List<HoaDon> hoaDons)
//            throws IOException {
//        XSSFWorkbook workbook = new XSSFWorkbook();
//        XSSFSheet sheet = workbook.createSheet("Danh sách đơn hàng");
//        XSSFRow headerRow = sheet.createRow(0);
//        headerRow.createCell(0).setCellValue("Mã Đơn Hàng");
//        headerRow.createCell(1).setCellValue("Ngày Đặt Hàng");
//        headerRow.createCell(2).setCellValue("Hình Thức Thanh Toán");
//        headerRow.createCell(3).setCellValue("Loại Đơn");
//        headerRow.createCell(4).setCellValue("Khách Hàng");
//        headerRow.createCell(5).setCellValue("Số Điện Thoại");
//        headerRow.createCell(6).setCellValue("Địa Chỉ");
//        headerRow.createCell(7).setCellValue("Trạng Thái");
//        headerRow.createCell(8).setCellValue("Tổng Tiền Sau Khi Giảm");
//
//        CellStyle dateCellStyle = workbook.createCellStyle();
//        CreationHelper creationHelper = workbook.getCreationHelper();
//        dateCellStyle.setDataFormat(creationHelper.createDataFormat().getFormat("dd-MM-yyyy"));
//
//        for (int i = 0; i < headerRow.getLastCellNum(); i++) {
//            sheet.autoSizeColumn(i);
//        }
//
//        hoaDons = service.getExcel();
//        int rowNum = 1;
//        for (HoaDon hoaDon : hoaDons) {
//            XSSFRow row = sheet.createRow(rowNum++);
//            row.createCell(0).setCellValue(hoaDon.getMa());
//            Cell ngayThanhToanCell = row.createCell(1);
//            ngayThanhToanCell.setCellValue(hoaDon.getNgayTao());
//            ngayThanhToanCell.setCellStyle(dateCellStyle);
//            row.createCell(2).setCellValue(hoaDon.getHinhThucThanhToan().getTen());
//            row.createCell(3).setCellValue(hoaDon.getLoaiDon());
//            row.createCell(4).setCellValue(hoaDon.getTenNguoiNhan());
//            row.createCell(5).setCellValue(hoaDon.getSoDienThoai());
//            row.createCell(6).setCellValue(hoaDon.getDiaChi());
//            row.createCell(7).setCellValue(getTrangThaiHoaDonString(hoaDon.getTrangThai()));
//            row.createCell(8).setCellValue(hoaDon.getTongTienKhiGiam() + " VND");
//        }
//
//        // Code tạo workbook và sheet
////        OutputStream outputStream = response.getOutputStream();
////        workbook.write(outputStream);
////        workbook.close();
////        outputStream.close();
////        response.setHeader("Content-Disposition", "attachment; filename=danhsachhoadon.xlsx");
////        response.setContentType("application/vnd.ms-excel");
//
//        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
//        workbook.write(byteArrayOutputStream);
//        workbook.close();
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
//        headers.setContentDispositionFormData("attachment", "danhsachhoadon.xlsx");
//
//        return new ResponseEntity<>(byteArrayOutputStream.toByteArray(), headers, HttpStatus.OK);
//    }
//
//    private String getTrangThaiHoaDonString(int trangThai) {
//        switch (trangThai) {
//            case 0:
//                return "Đang chờ xác nhận";
//            case 1:
//                return "Đã xác nhận";
//            case 2:
//                return "Đã hủy đơn";
//            case 3:
//                return "Chờ giao hàng";
//            case 4:
//                return "Đang giao hàng";
//            case 5:
//                return "Giao hàng thành công";
//            case 6:
//                return "Giao hàng thất bại";
//            default:
//                return "Thanh toán thành công";
//        }
//    }


}




