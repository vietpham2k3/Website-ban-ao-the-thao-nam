package com.example.demo.controller;

import com.example.demo.UploadFile.AnhKH;
import com.example.demo.dto.AnhDTO;
import com.example.demo.dto.KhachHangDTO;
import com.example.demo.entity.*;
import com.example.demo.service.impl.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hoa-don/")
public class HoaDonController {
    @Autowired
    public HoaDonServiceImpl serviceHD;
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
    @Autowired
    private KhachHangServiceImpl khService;

    @GetMapping("hien-thi")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(serviceHD.listHD());
    }

    @GetMapping("hien-thi-san-pham")
    public ResponseEntity<?> getAllSP() {
        return ResponseEntity.ok(serviceHD.getAllSP());
    }

    @GetMapping("/searchSP")
    public ResponseEntity<?> search(@RequestParam(value = "key", required = false) String key) {
        return ResponseEntity.ok(serviceHD.searchSPofHDCT(key));
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

    @GetMapping("/getAllKCByIdMSAndIdSP/{idMS}/{idSP}")
    public ResponseEntity<List<String>> getKCByIdMSAndIdSP(@PathVariable UUID idMS, @PathVariable UUID idSP) {
        List<String> listKC = chiTietSanPhamService.getKCByIdMSAndIdSP(idMS, idSP);
        return ResponseEntity.ok(listKC);
    }

    @GetMapping("/findAllAnhByIdMSAndIdSP/{idMS}/{idSP}")
    public ResponseEntity<List<AnhDTO>> findAnhByIdMSAndIdSP(@PathVariable UUID idMS, @PathVariable UUID idSP) {
        List<Anh> listAnh = chiTietSanPhamService.findAnhByIdMSAndIdSP(idMS, idSP);
        if (listAnh.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        List<AnhDTO> imageDTOList = listAnh.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(imageDTOList);
    }

    private AnhDTO convertToDTO(Anh anh) {
        AnhDTO anhDTO = new AnhDTO();
        anhDTO.setId(anh.getId());
        anhDTO.setMa(anh.getMa());
        anhDTO.setTrangThai(anh.getTrangThai());
        anhDTO.setNgayTao(anh.getNgayTao());
        anhDTO.setNgaySua(anh.getNgaySua());
        anhDTO.setChiTietSanPhamTen(anh.getChiTietSanPham().getSanPham().getTen());

        if (anh.getTen() != null) {
            try {
                Blob blob = anh.getTen();
                byte[] tenBytes = blob.getBytes(1, (int) blob.length());
                String tenBase64 = Base64.getEncoder().encodeToString(tenBytes);
                anhDTO.setTenBase64(tenBase64);
            } catch (SQLException e) {
                e.printStackTrace();
            }
        } else {
            anhDTO.setTenBase64(null);
        }

        return anhDTO;
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
        hoaDon.setTenNguoiNhan("Khách lẻ");
        hoaDon.setTienShip(0.0);
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
        serviceHD.add(hoaDon);
        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PutMapping("update-hd/{id}")
    public ResponseEntity<?> updateHD(@PathVariable UUID id, @RequestBody HoaDon hoaDon) {
        String ma = "HTTT" + new Random().nextInt(100000);

        HoaDon hd = serviceHD.detailHD(id);
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
        if (hoaDon.getTongTienKhiGiam().doubleValue() < 0) {
            hoaDon.setTongTienKhiGiam(0.0);
        }
        hoaDon.setNgayThanhToan(new Date());
        hoaDon.setTienShip(0.0);
        hoaDon.setNgaySua(new Date());
        hoaDon.setMa(hd.getMa());
        hoaDon.setLoaiDon(0);
        if (hoaDon.getTenNguoiNhan().isEmpty()) {
            hoaDon.setTenNguoiNhan("Khách lẻ");
        }
        hoaDon.setTenNguoiNhan(hoaDon.getTenNguoiNhan());
        hoaDon.setSoDienThoai(hoaDon.getSoDienThoai());
        hoaDon.setDiaChi("NULL");
        httt = serviceHttt.add(httt);
        hoaDon.setHinhThucThanhToan(httt);
        return ResponseEntity.ok(serviceHD.add(hoaDon));
    }


    @PutMapping("/thanh-toan/{id}")
    public ResponseEntity<?> thanhToan(@PathVariable UUID id){
        HoaDon hd = serviceHD.detailHD(id);
        String maLS = "LSHD" + new Random().nextInt(100000);
        LichSuHoaDon ls = serviceLSHD.detail(hd.getId()).builder()
                .trangThai(6)
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
        return ResponseEntity.ok(serviceHD.hienThiPageHD(pageable));
    }

    @GetMapping("detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        return ResponseEntity.ok(serviceHD.detailHD(id));
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
    public ResponseEntity<?> findVIP(String key, String tuNgay, String denNgay, Integer[] trangThai,
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

        return ResponseEntity.ok(serviceHD.searchVIP(key, tuNgayDate, denNgayDate, trangThai, loaiDon, minSL, maxSL, minTT, maxTT, pageable));
    }

    @PutMapping("updateKH/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody HoaDon hoaDon) {
        serviceHD.updateKHHD(id, hoaDon.getTenNguoiNhan(), hoaDon.getSoDienThoai(),
                hoaDon.getDiaChi());
        return ResponseEntity.ok("ok");
    }

    @PutMapping("updateHDTien/{id}")
    public ResponseEntity<?> updateTien(@PathVariable UUID id, @RequestBody HoaDon hoaDon) {
        serviceHD.updateHDTien(id, hoaDon.getTongTien(),
                hoaDon.getTongTienKhiGiam(),hoaDon.getTienShip());
        return ResponseEntity.ok("ok");
    }

    @PostMapping("xac-nhan/{id}")
    public ResponseEntity<?> xacNhan(@PathVariable UUID id,
                                     @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(1);
        hoaDon.setTrangThai(1);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Chờ giao hàng");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PostMapping("xac-nhan")
    public ResponseEntity<?> xacNhan(@RequestBody List<UUID> ids) {
        List<LichSuHoaDon> lichSuHoaDonList = new ArrayList<>();

        for (UUID id : ids) {
            String maLSHD = "LSHD" + new Random().nextInt(100000);
            HoaDon hoaDon = serviceHD.detailHD(id);
            hoaDon.setNgaySua(new Date());

            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setTrangThai(1);
            hoaDon.setTrangThai(1);
            lichSuHoaDon.setNgayTao(new Date());
            lichSuHoaDon.setMa(maLSHD);
            lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
            lichSuHoaDon.setHoaDon(hoaDon);
            lichSuHoaDon.setTen("Chờ giao hàng");

            lichSuHoaDonList.add(lichSuHoaDon);
        }

        serviceLSHD.createLichSuDonHangAll(lichSuHoaDonList);

        return ResponseEntity.ok("Xác nhận thành công");
    }

    @PostMapping("huy-don")
    public ResponseEntity<?> huyDon(@RequestBody List<UUID> ids) {
        List<LichSuHoaDon> lichSuHoaDonList = new ArrayList<>();

        for (UUID id : ids) {
            String maLSHD = "LSHD" + new Random().nextInt(100000);
            HoaDon hoaDon = serviceHD.detailHD(id);
            hoaDon.setNgaySua(new Date());

            LichSuHoaDon lichSuHoaDon = new LichSuHoaDon();
            lichSuHoaDon.setTrangThai(2);
            hoaDon.setTrangThai(2);
            lichSuHoaDon.setNgayTao(new Date());
            lichSuHoaDon.setMa(maLSHD);
            lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
            lichSuHoaDon.setHoaDon(hoaDon);
            lichSuHoaDon.setTen("Đã hủy đơn hàng");

            lichSuHoaDonList.add(lichSuHoaDon);
        }

        serviceLSHD.createLichSuDonHangAll(lichSuHoaDonList);

        return ResponseEntity.ok("Hủy đơn thành công");
    }

    @PostMapping("huy-don/{id}")
    public ResponseEntity<?> huyDon(@PathVariable UUID id,
                                    @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(2);
        hoaDon.setTrangThai(2);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Đã hủy đơn hàng");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PostMapping("xac-nhan-giao-hang/{id}")
    public ResponseEntity<?> xacNhanGiao(@PathVariable UUID id,
                                         @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(3);
        hoaDon.setTrangThai(3);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Đang giao hàng");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @PostMapping("xac-nhan-thanh-toan/{id}")
    public ResponseEntity<?> xacNhanTT(@PathVariable UUID id,
                                       @RequestBody LichSuHoaDon lichSuHoaDon) {
        String maLSHD = "LSHD" + new Random().nextInt(100000);
        HoaDon hoaDon = serviceHD.detailHD(id);
        hoaDon.setNgaySua(new Date());
        lichSuHoaDon.setTrangThai(6);
        hoaDon.setTrangThai(6);
        lichSuHoaDon.setNgayTao(new Date());
        lichSuHoaDon.setMa(maLSHD);
        hoaDon.setNgayThanhToan(new Date());
        lichSuHoaDon.setGhiChu(lichSuHoaDon.getGhiChu());
        lichSuHoaDon.setHoaDon(hoaDon);
        lichSuHoaDon.setTen("Thanh toán thành công");

        return ResponseEntity.ok(serviceLSHD.createLichSuDonHang(lichSuHoaDon));
    }

    @GetMapping("/getAll")
    public ResponseEntity<byte[]> getAllKH() throws IOException {
        List<KhachHang> listKH = khService.getAllKH();

        // Convert the Page<KhachHang> to byte array
        byte[] khachHangBytes = convertPageToByteArray2(listKH);

        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");

        return ResponseEntity.ok()
                .headers(headers)
                .body(khachHangBytes);
    }

    /**
     * Convert the Page<KhachHang> to byte array.
     */
    private byte[] convertPageToByteArray2(List<KhachHang> khachHangPage) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        SimpleModule module = new SimpleModule();
        module.addSerializer(ByteArrayInputStream.class, new AnhKH());
        objectMapper.registerModule(module);
        byte[] khachHangBytes = objectMapper.writeValueAsBytes(khachHangPage);
        return khachHangBytes;
    }

    @GetMapping("/searchKHinBH")
    public ResponseEntity<byte[]> searchKhinBH(String key) throws IOException {
        List<KhachHang> listKH = khService.searchKHinBH(key);

        // Convert the Page<KhachHang> to byte array
        byte[] khachHangBytes = convertPageToByteArray2(listKH);

        // Set the content type as application/octet-stream
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "khachhang.json");

        return ResponseEntity.ok()
                .headers(headers)
                .body(khachHangBytes);
    }


    @PostMapping("/addKHinBH/{id}")
    public ResponseEntity<?> addKHinBH(@PathVariable UUID id,@RequestBody KhachHang kh, MultipartFile anh) throws IOException, SQLException {
        // Create a new KhachHang object
        if (kh.getMaKhachHang() == null) {
            String ma = "KH" + new Random().nextInt(100000);
            kh.setMaKhachHang(ma);
        }
        kh.setTrangThai(1);
        HoaDon hd= serviceHD.detailHD(id);
        hd.setSoDienThoai(kh.getSdt());
        hd.setTenNguoiNhan(kh.getTenKhachHang());
        serviceHD.add(hd);

        // Check if a file is provided
        if (anh != null) {
            // Get the input stream of the file
            InputStream inputStream = anh.getInputStream();
            Blob imageBlob = khService.createBlob(inputStream);

            // Set the image blob to the KhachHang object
            kh.setAnh(imageBlob);
        }
        // Save the KhachHang object
        KhachHang savedKhachHang = khService.add(kh);
        KhachHangDTO savedKhachHangDTO = convertToDto(savedKhachHang);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedKhachHangDTO);
    }

    private KhachHangDTO convertToDto(KhachHang khachHang) {
        KhachHangDTO khachHangDTO = KhachHangDTO.builder()
                .id(khachHang.getId())
                .maKhachHang(khachHang.getMaKhachHang())
                .tenKhachHang(khachHang.getTenKhachHang())
                .sdt(khachHang.getSdt())
                .email(khachHang.getEmail())
                .ngaySinh(khachHang.getNgaySinh())
                .matKhau(khachHang.getMatKhau())
                .trangThai(khachHang.getTrangThai())
                .build();

        // Convert Blob to byte array
        Blob anhBlob = khachHang.getAnh();
        if (anhBlob != null) {
            try (InputStream inputStream = anhBlob.getBinaryStream()) {
                byte[] anhBytes = inputStream.readAllBytes();
                // Convert byte array to base64 string
                String anhBase64 = Base64.getEncoder().encodeToString(anhBytes);
                khachHangDTO.setAnh(anhBase64);
            } catch (SQLException | IOException e) {
                // Handle the exception
            }
        }

        return khachHangDTO;
    }
}




