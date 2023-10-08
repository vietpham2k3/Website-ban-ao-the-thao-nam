package com.example.demo.controller;

import com.example.demo.entity.ChiTietSanPham;
import com.example.demo.entity.HinhThucThanhToan;
import com.example.demo.entity.HoaDon;
import com.example.demo.entity.HoaDonChiTiet;
import com.example.demo.entity.HoaDon_KhuyenMai;
import com.example.demo.entity.LichSuHoaDon;
import com.example.demo.service.impl.ChiTietSanPhamServiceImpl;
import com.example.demo.service.impl.HinhThucThanhToanServiceImpl;
import com.example.demo.service.impl.HoaDonChiTietServiceImpl;
import com.example.demo.service.impl.HoaDonServiceImpl;
import com.example.demo.service.impl.HoaDon_KhuyenMaiServiceImpl;
import com.example.demo.service.impl.LichSuHoaDonServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hoa-don/")
public class HoaDonController {
    @Autowired
    public HoaDonServiceImpl service;
    @Autowired
    public HoaDon_KhuyenMaiServiceImpl hoaDon_khuyenMaiService;
    @Autowired
    public LichSuHoaDonServiceImpl serviceLSHD;
    @Autowired
    public HoaDonChiTietServiceImpl hoaDonChiTietService;
    @Autowired
    public HinhThucThanhToanServiceImpl serviceHttt;
    @Autowired
    private ChiTietSanPhamServiceImpl chiTietSanPhamService;

    @GetMapping("hien-thi")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.listHD());
    }

    @GetMapping("hien-thi-san-pham")
    public ResponseEntity<?> getAllSP() {
        return ResponseEntity.ok(service.getAllSP());
    }

    @GetMapping("/searchSP")
    public ResponseEntity<?> search(@RequestParam(value = "key", required = false) String key) {
        return ResponseEntity.ok(service.searchSPofHDCT(key));
    }

    @GetMapping("getById/{id}")
    public ResponseEntity<?> getAllById(@PathVariable UUID id) {
        return ResponseEntity.ok(hoaDonChiTietService.getAll(id));
    }

    @GetMapping("getKmById/{id}")
    public ResponseEntity<?> getKmById(@PathVariable UUID id) {
        return ResponseEntity.ok(hoaDon_khuyenMaiService.getAll(id));
    }

    @PostMapping("addKM")
    public ResponseEntity<?> add(@RequestBody HoaDon_KhuyenMai hoaDon) {
        List<HoaDon_KhuyenMai> list = hoaDon_khuyenMaiService.getAllNotById();
        for (HoaDon_KhuyenMai h : list) {
            if (hoaDon.getHoaDon().getId().equals(h.getHoaDon().getId())
                    && hoaDon.getKhuyenMai().getId().equals(h.getKhuyenMai().getId())) {
                return ResponseEntity.ok("Mày thích spam không ?");
            }
        }
        return ResponseEntity.ok(hoaDon_khuyenMaiService.add(hoaDon));
    }

    @GetMapping("getKCByIdMS/{id}")
    public ResponseEntity<?> getAllByIdCTSP(@PathVariable UUID id) {
        return ResponseEntity.ok(chiTietSanPhamService.getKCByIdMS(id));
    }

    @GetMapping("getAllMSByIdSP/{id}")
    public ResponseEntity<?> getAllByIdSP2(@PathVariable UUID id) {
        return ResponseEntity.ok(chiTietSanPhamService.getAllMSByIdSP(id));
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody HoaDon hoaDon) {
        String ma = "HD" + new Random().nextInt(100000);
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        hoaDon.setMa(ma);
        hoaDon.setNgayTao(new Date());
        hoaDon.setLoaiDon(0);
        hoaDon.setTrangThai(0);
        HinhThucThanhToan httt = new HinhThucThanhToan().builder()
                .ma(ma)
                .ten("Tiền mặt")
                .ngayTao(new Date())
                .tien(0.0)
                .trangThai(0)
                .build();
        httt = serviceHttt.add(httt);
        hoaDon.setHinhThucThanhToan(httt);
        LichSuHoaDon lichSuHoaDon = new LichSuHoaDon().builder()
                .ma(maLSHD)
                .ten("Tạo hoá đơn")
                .trangThai(0)
                .ngayTao(new Date())
                .hoaDon(hoaDon)
                .ghiChu("Tạo hoá đơn")
                .build();
        service.add(hoaDon);
        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PutMapping("update-hd/{id}")
    public ResponseEntity<?> updateHD(@PathVariable UUID id, @RequestBody HoaDon hoaDon) {
        String ma = "HTTT" + new Random().nextInt(100000);

        HoaDon hd = service.detailHD(id);
        HinhThucThanhToan h = serviceHttt.detail(hd.hinhThucThanhToan.getId());
        HinhThucThanhToan httt = new HinhThucThanhToan().builder()
                .id(hd.hinhThucThanhToan.getId())
                .ma(ma)
                .ten("Tiền mặt")
                .ngayTao(h.getNgayTao())
                .ngaySua(new Date())
                .trangThai(hoaDon.getHinhThucThanhToan().getTrangThai())
                .tien(hoaDon.getHinhThucThanhToan().getTien())
                .build();
        hoaDon.setId(id);
        hoaDon.setNgayTao(hd.getNgayTao());
        hoaDon.setNgayThanhToan(new Date());
        hoaDon.setNgaySua(new Date());
        hoaDon.setMa(hd.getMa());
        hoaDon.setLoaiDon(0);
        httt = serviceHttt.add(httt);
        hoaDon.setHinhThucThanhToan(httt);
        return ResponseEntity.ok(service.add(hoaDon));
    }


    @PutMapping("/thanh-toan/{id}")
    public ResponseEntity<?> thanhToan(@PathVariable UUID id){
        HoaDon hd = service.detailHD(id);
        String maLS = "LSHD" + new Random().nextInt(100000);
        LichSuHoaDon ls = serviceLSHD.detail(hd.getId()).builder()
                .trangThai(7)
                .ma(maLS)
                .ten("Thanh toán thành công")
                .ngayTao(new Date())
                .hoaDon(hd)
                .ghiChu("Đã thanh toán")
                .build();
        return ResponseEntity.ok(serviceLSHD.add(ls));
    }

    @PostMapping("add-sp")
    public ResponseEntity<?> addSP(@RequestBody HoaDonChiTiet hoaDon) {
        List<HoaDonChiTiet> list = hoaDonChiTietService.findAll();
        for (HoaDonChiTiet h : list) {
            if (h.getChiTietSanPham().getId().equals(hoaDon.getChiTietSanPham().getId()) &&
                    h.getHoaDon().getId().equals(hoaDon.getHoaDon().getId())) {
                // Không tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu, thực hiện thêm mới
                ChiTietSanPham sp = chiTietSanPhamService.detail(hoaDon.getChiTietSanPham().getId());
                hoaDon.setDonGia(sp.getGiaBan());
                // Tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu
                hoaDonChiTietService.update(hoaDon.getSoLuong(), h.getId());
                chiTietSanPhamService.update(sp.getSoLuong() - hoaDon.getSoLuong(), hoaDon.getChiTietSanPham().getId());
                return ResponseEntity.ok("ok");
            }
        }

        // Không tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu, thực hiện thêm mới
        ChiTietSanPham sp = chiTietSanPhamService.detail(hoaDon.getChiTietSanPham().getId());
        hoaDon.setDonGia(sp.getGiaBan());
        hoaDonChiTietService.add(hoaDon);
        chiTietSanPhamService.update(sp.getSoLuong() - hoaDon.getSoLuong(), hoaDon.getChiTietSanPham().getId());
        return ResponseEntity.ok(hoaDon.getId());
    }

    @PutMapping("update-sl/{id}")
    public ResponseEntity<?> updateSL(@PathVariable UUID id, @RequestBody HoaDonChiTiet hoaDon) {
        HoaDonChiTiet hd = hoaDonChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hoaDon.getChiTietSanPham().getId());
        if (hoaDon.getSoLuong() > hd.getSoLuong()) {
            chiTietSanPhamService.update(sp.getSoLuong() - (hoaDon.getSoLuong() - hd.getSoLuong()), hoaDon.getChiTietSanPham().getId());
            hoaDonChiTietService.updateSL(hoaDon.getSoLuong(), hd.getId());
            return ResponseEntity.ok("Tang cthd, giam ctsp");
        } else {
            // Không tìm thấy cặp id hoá đơn và id sản phẩm trong cơ sở dữ liệu, thực hiện thêm mới
            chiTietSanPhamService.update(sp.getSoLuong() + (hd.getSoLuong() - hoaDon.getSoLuong()), hoaDon.getChiTietSanPham().getId());
            hoaDonChiTietService.updateSL(hoaDon.getSoLuong(), hd.getId());
            return ResponseEntity.ok("Giam cthd, tang ctsp");
        }
    }

    @DeleteMapping("delete-hdct/{id}")
    public ResponseEntity<?> deleteHDCT(@PathVariable UUID id) {
        HoaDonChiTiet hd = hoaDonChiTietService.findById(id);
        ChiTietSanPham sp = chiTietSanPhamService.detail(hd.getChiTietSanPham().getId());
        chiTietSanPhamService.update(sp.getSoLuong() + hd.getSoLuong(), sp.getId());
        hoaDonChiTietService.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("hien-thi-page")
    public ResponseEntity<?> getPageHD(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        return ResponseEntity.ok(service.hienThiPageHD(pageable));
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        return ResponseEntity.ok(service.detailHD(id));
    }

    @GetMapping("hien-thi-list-lshd/{id}")
    public ResponseEntity<?> listLSHDByIds(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceLSHD.findAllLSHDByIDsHD(id));
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
    public ResponseEntity<?> findVIP(String key, String tuNgay, String denNgay, Integer trangThai,
                                     Integer loaiDon, Double minSL, Double maxSL, Double minTT,
                                     Double maxTT,
                                     @RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 10);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm aa");
        Date tuNgayDate = null;
        Date denNgayDate = null;

        try {
            tuNgayDate = dateFormat.parse(tuNgay);
            denNgayDate = dateFormat.parse(denNgay);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(service.searchVIP(key, tuNgayDate, denNgayDate, trangThai, loaiDon, minSL, maxSL, minTT, maxTT, pageable));
    }

    @PutMapping("updateKH/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody HoaDon hoaDon) {
        service.updateKHHD(id, hoaDon.getTenNguoiNhan(), hoaDon.getSoDienThoai(),
                hoaDon.getDiaChi());
        return ResponseEntity.ok("ok");
    }

    @PostMapping("xac-nhan/{id}")
    public ResponseEntity<?> xacNhan(@PathVariable UUID id,
                                     @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = service.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(1);
        hoaDon.setTrangThai(1);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        hoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Đã xác thực thông tin người dùng");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PutMapping("huy-don/{id}")
    public ResponseEntity<?> huyDon(@PathVariable UUID id,
                                    @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = service.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(2);
        hoaDon.setTrangThai(2);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        hoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Đã hủy đơn hàng");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PutMapping("xac-nhan-giao-hang/{id}")
    public ResponseEntity<?> xacNhanGiao(@PathVariable UUID id,
                                         @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = service.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(4);
        hoaDon.setTrangThai(4);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        hoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Đang giao hàng");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PutMapping("xac-nhan-thanh-toan/{id}")
    public ResponseEntity<?> xacNhanTT(@PathVariable UUID id,
                                       @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = service.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(7);
        hoaDon.setTrangThai(7);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        hoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        hoaDon.setNgayThanhToan(new Date());
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Thanh toán thành công");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }


}




