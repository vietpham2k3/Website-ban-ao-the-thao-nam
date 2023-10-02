package com.example.demo.controller;

import com.example.demo.dto.HoaDonRequest;
import com.example.demo.dto.KhachHangDTO;
import com.example.demo.dto.NhanVienRequest;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.NhanVien;
import com.example.demo.service.impl.HinhThucThanhToanServiceImpl;
import com.example.demo.service.impl.HoaDonServiceImpl;
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
import org.springframework.data.repository.query.Param;
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
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hoa-don/")
public class HoaDonController {
    @Autowired
    public HoaDonServiceImpl service;
    @Autowired
    public HinhThucThanhToanServiceImpl serviceHttt;

    @GetMapping("hien-thi")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.listHD());
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


    public class TrangThaiWrapper {
        private int[] trangThai;

        public int[] getTrangThai() {
            return trangThai;
        }

        public TrangThaiWrapper() {
        }

        public void setTrangThai(String trangThai) {
            if (trangThai != null && !trangThai.trim().isEmpty()) {
                String[] trangThaiStrings = trangThai.split(",");
                int[] trangThaiInts = new int[trangThaiStrings.length];
                for (int i = 0; i < trangThaiStrings.length; i++) {
                    trangThaiInts[i] = Integer.parseInt(trangThaiStrings[i].trim());
                }
                this.trangThai = trangThaiInts;
            } else {
                this.trangThai = new int[0];
            }
        }
    }

    @GetMapping("hien-thi-page-find")
    public ResponseEntity<?> findVIP(String key, String tuNgay, String denNgay, Double min, Double max,
                                     Integer trangThai, Integer loaiDon, String tenHinhThuc,
                                     @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 5);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm aa");
        Date tuNgayDate = null;
        Date denNgayDate = null;

        try {
            tuNgayDate = dateFormat.parse(tuNgay);
            denNgayDate = dateFormat.parse(denNgay);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(service.searchVIP(key, tuNgayDate, denNgayDate, min, max, trangThai, loaiDon, tenHinhThuc, pageable));
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




