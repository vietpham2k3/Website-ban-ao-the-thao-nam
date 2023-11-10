/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import '../../scss/TimeLine.scss';
import '../../scss/TableMSKC.scss';
import '../../scss/SearchResult.scss';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { detailCTSP, getAllByIdSPTT } from 'services/SanPhamService';
import Modal from 'react-bootstrap/Modal';
import { PDFDownloadLink, Document, Page, Text, StyleSheet, Font, View } from '@react-pdf/renderer';
import myFont from '../../fonts/Roboto Việt Hóa/Roboto-Regular.ttf';
import { getTP, getQH, getP } from 'services/ApiGHNService';
import {
  detailHD,
  detailLSHD,
  xacNhanDH,
  huyDonHang,
  xacNhanGiao,
  getById,
  deleteHDCT,
  updateSL,
  getAllSP,
  searchCTSPofDH,
  addSP,
  getKmById,
  giaoHangThanhCong,
  giaoHangThatBai,
  updateHoaDon,
  giaoLaiLan1,
  giaoLaiLan2,
  giaoLaiLan3,
  giaoThatBaiLan1,
  giaoThatBaiLan2,
  giaoThatBaiLan3,
  xacNhanTraHang,
  huyDonTraHang,
  hienThiDoiHang,
  getAllSPDoiHang,
  hienThiHangLoi,
  getAllSPLoi,
  hienThiSPYCDoiHang,
  hienThiYCDoiHang
} from 'services/ServiceDonHang';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import '../../scss/ErrorMessage.scss';
import InputSpinner from 'react-bootstrap-input-spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
function DonHangCT() {
  const { id } = useParams();
  const dataLogin = JSON.parse(localStorage.getItem('dataLoginNV'));
  const navigate = useNavigate();
  const [lichSuHoaDon, setLichSuHoaDon] = useState([]);
  const [thanhPho, setThanhPho] = useState([]);
  const [quan, setQuan] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  //sp
  const [valuesSanPham, setValuesSanPham] = useState([]);
  // const [inputDetail, setInputDetail] = useState(null);
  const [dataSP, setDataSP] = useState([]);
  const [mauSacKC, setMauSacKC] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  const [idHDCT, setIdHDCT] = useState('');
  const [idSP, setidSP] = useState('');
  const [idCTSP, setidCTSP] = useState('');
  // detailHD
  const [hoaDon, setHoaDon] = useState({});
  const [valuesServices, setValuesServices] = useState({
    shop_id: 4625720,
    from_district: 1710,
    to_district: 0
  });
  const [valuesFee, setValuesFee] = useState({
    service_id: 0,
    insurance_value: 0,
    coupon: null,
    from_district_id: 1710,
    to_district_id: 0,
    to_ward_code: '',
    height: 15,
    length: 15,
    weight: 5000,
    width: 15
  });
  // cap nhat hoa don
  Font.register({ family: 'Roboto', src: myFont });

  const [totalAmount, setTotalAmount] = useState(0);
  const [tongTienKhiGiam, setTongTienKhiGiam] = useState(0);

  const [valuesUpdate, setValuesUpdate] = useState({
    chiTietSanPham: {
      id: ''
    },
    hoaDon: {
      id: id
    },
    soLuong: ''
  });

  const [valuesAdd, setValuesAdd] = useState({
    chiTietSanPham: {
      id: ''
    },
    hoaDon: {
      id: id
    },
    soLuong: ''
  });

  useEffect(() => {
    getAll(0);
  }, []);

  const getAll = async () => {
    const res = await getAllSP();
    if (res && res.data) {
      setDataSP(res.data);
    }
  };

  //searchSPinDH
  const [term, setTerm] = useState('');

  const searchSPofDH = async (term) => {
    const res = await searchCTSPofDH(term);
    if (res) {
      setDataSP(res.data);
    }
  };

  const handleSearchSPofDH = _.debounce(async () => {
    if (term) {
      searchSPofDH(term);
    } else {
      searchSPofDH('');
    }
  }, []);

  useEffect(() => {
    handleSearchSPofDH();
  }, [term]);

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const deleteHD = async (idHDCT) => {
    const res = await deleteHDCT(idHDCT);
    if (res) {
      getAllById(id);
    }
  };

  const handleDelete = (id) => {
    deleteHD(id);
  };

  useEffect(() => {
    getAllById(id);
  }, [id]);

  const getAllById = async (idHD) => {
    const res = await getById(idHD);
    if (res) {
      setValuesSanPham(res.data);
    }
  };

  const updateHD = async (id, value) => {
    const res = await updateHoaDon(id, value);
    if (res) {
      detail(id);
      setShow(false);
    }
  };

  console.log(hoaDon);

  const handleUpdateHD = async (event) => {
    event.preventDefault();
    if (hoaDon.tenNguoiNhan === '') {
      setNone(false);
      return;
    }

    if (hoaDon.tenNguoiNhan.length > 30 || !/^[a-zA-Z\sÀ-ỹ]+$/u.test(hoaDon.tenNguoiNhan)) {
      // Kiểm tra tên có vượt quá 30 ký tự hoặc không chỉ chứa chữ cái, khoảng trắng và dấu tiếng Việt
      setNone1(false);
      return;
    }

    if (hoaDon.soDienThoai === '') {
      setNone2(false);
      return;
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^0[0-9]{9}$/;
    if (!phoneRegex.test(hoaDon.soDienThoai)) {
      setNone3(false);
      return;
    }

    if (hoaDon.diaChi === '') {
      setNone4(false);
      return;
    }

    if (hoaDon.diaChi.length > 250) {
      setNone5(false);
      return;
    }

    if (!selectedProvince) {
      toast.error('Vui lòng chọn tỉnh/thành phố.');
      return;
    }

    if (!selectedDistrict) {
      toast.error('Vui lòng chọn quận/huyện.');
      return;
    }

    if (!selectedWard) {
      toast.error('Vui lòng chọn phường/xã.');
      return;
    }

    toast.success('Cập nhật thành công !');
    await updateHD(id, hoaDon);
  };

  const handleUpdateSl = (id, idHD, idCTSP, soLuong) => {
    setIdHDCT(id);

    setValuesUpdate({
      ...valuesUpdate,
      chiTietSanPham: {
        id: idCTSP
      },
      hoaDon: {
        id: idHD
      },
      soLuong: soLuong
    });

    setHoaDon((prevValues) => ({
      ...prevValues,
      tongTien: totalAmount,
      tongTienKhiGiam: tongTienKhiGiam
    }));
  };

  const update = async (idHDCT, hoaDon) => {
    const res = await updateSL(idHDCT, hoaDon);
    if (res) {
      getAllById(id);
      detail(id);
    }
  };

  useEffect(() => {
    if (totalAmount) {
      updateHD(id, hoaDon);
    }
  }, [hoaDon.tongTien]);

  useEffect(() => {
    if (idHDCT) {
      update(idHDCT, valuesUpdate);
    }
  }, [valuesUpdate]);

  useEffect(() => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setTongTienKhiGiam(totalAmount - totalGiam + hoaDon.tienShip);

    setHoaDon({
      ...hoaDon,
      tongTien: totalAmount,
      tongTienKhiGiam: totalAmount - totalGiam + hoaDon.tienShip
    });
  }, [hoaDon.tienShip, totalAmount]);

  // kcms sp
  const handleAddSoLuong = (id, idSP) => {
    setShow7(true);
    setidSP(idSP);
    setidCTSP(id);
    setValuesAdd({ ...valuesAdd, chiTietSanPham: { id: id } });
  };

  const handleAdd = () => {
    // getAllById(id);
    if (parseInt(valuesAdd.soLuong) > parseInt(dataDetail.soLuong)) {
      toast.error('Đã vượt quá số lượng hiện có !');
      return;
    }
    add(valuesAdd);
  };

  const add = async (value) => {
    const res = await addSP(value);
    if (res.data === 'ok') {
      window.location.reload();
      toast.success('Thêm sản phẩm thành công');
    } else if (res) {
      toast.success('Thêm sản phẩm thành công');
      getAllById(id);
      handleCloseSPofDH();
      getAll();
      if (idCTSP) {
        detail2(idCTSP);
      }
    }
  };

  const handleCloseSPofDH = () => {
    setShow7(false);
    // chuachac dong
    setShow6(false);
    //
    // setInputDetail(null);
    // inputDetail(null);
    getAllById(id);
    setValuesAdd({
      chiTietSanPham: {
        id: ''
      },
      hoaDon: {
        id: id
      },
      soLuong: ''
    });
  };

  const handleDetail = (id) => {
    // setInputDetail(id);
    setidCTSP(id);
    setValuesAdd({ ...valuesAdd, chiTietSanPham: { id: id } });
  };

  useEffect(() => {
    if (idSP) {
      getAllMSKC(idSP);
    }
  }, [idSP]);

  useEffect(() => {
    if (idCTSP) {
      detail2(idCTSP);
    }
  }, [idCTSP]);

  // useEffect(() => {
  //   if (valuesServices.to_district !== 0) {
  //     getService(valuesServices);
  //   }
  // }, [valuesServices]);

  // useEffect(() => {
  //   if (valuesFee.service_id !== 0) {
  //     fee(valuesFee);
  //   }
  // }, [valuesFee.to_ward_code]);

  const detail2 = async (idCTSP) => {
    const res = await detailCTSP(idCTSP);
    if (res) {
      setDataDetail(res.data);
    }
  };

  const getAllMSKC = async (id) => {
    let res = await getAllByIdSPTT(id);
    if (res) {
      setMauSacKC(res.data);
    }
  };

  useEffect(() => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0;
    valuesSanPham.forEach((d) => {
      sum += d.soLuong * d.donGia;
    });
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum);
    setTongTienKhiGiam(sum - totalGiam + hoaDon.tienShip);
  }, [valuesSanPham, hoaDon.tienShip]);

  // modal
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show6, setShow6] = useState(false);
  const [show7, setShow7] = useState(false);
  const [show8, setShow8] = useState(false);
  const [show9, setShow9] = useState(false);

  // const handleClose = () => {
  //   setShow(false);
  // };

  const [valuesId, setValuesId] = useState({
    province_id: ''
  });
  const [valuesIdWard, setValuesIdWard] = useState({
    district_id: ''
  });

  const handleShow = () => {
    thanhPho.forEach((province) => {
      if (province.NameExtension[1] === hoaDon.tinh) {
        setValuesId({
          province_id: province.ProvinceID
        });
        console.log(province.ProvinceID);
      }
      setSelectedProvince(province.ProvinceID);
    });

    setShow(true);
  };

  useEffect(() => {
    if (valuesId.province_id) {
      getQuanHuyen(valuesId);
    }
    setSelectedDistrict(valuesId);
  }, [valuesId.province_id]);

  console.log(quan);

  useEffect(() => {
    quan.forEach((district) => {
      if (district.DistrictName === hoaDon.huyen) {
        setValuesIdWard({
          district_id: district.DistrictID
        });
        setValuesServices({
          ...valuesServices,
          to_district: district.DistrictID
        });
        setValuesFee({
          ...valuesFee,
          to_district_id: district.DistrictID
        });
        // setTgDuKien({
        //   ...tgDuKien,
        //   to_district_id: district.DistrictID
        // });
      }
    });
  }, [quan, hoaDon, valuesId]);

  useEffect(() => {
    if (valuesIdWard.district_id) {
      getPhuong(valuesIdWard);
    }
    setSelectedWard(valuesIdWard);
  }, [valuesIdWard.district_id]);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const handleClose7 = () => setShow7(false);
  // const handleShow7 = () => setShow7(true);

  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);

  const tenNV = {
    nhanVien: { ten: dataLogin && dataLogin.ten }
  };

  const [lshd, setLshd] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const [lshd1, setLshd1] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const [lshd2, setLshd2] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const [lshd4, setLshd4] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const [lshd5, setLshd5] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const [none, setNone] = useState(true);
  const [none1, setNone1] = useState(true);
  const [none2, setNone2] = useState(true);
  const [none3, setNone3] = useState(true);
  const [none4, setNone4] = useState(true);
  const [none5, setNone5] = useState(true);

  useEffect(() => {
    if (id) {
      detail(id);
      detailListLSHD(id);
      getKMByIdHD(id);
    }
  }, [id]);

  const detail = async (id) => {
    const res = await detailHD(id);
    if (res && res.data) {
      setHoaDon(res.data);
    }
  };

  const [dataHDKM, setDataHDKM] = useState([]);

  const getKMByIdHD = async (id) => {
    try {
      const res = await getKmById(id);
      if (res) {
        setDataHDKM(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // getListLSHDbyIDHD
  const detailListLSHD = async (id) => {
    const res = await detailLSHD(id);
    if (res && res.data) {
      setLichSuHoaDon(res.data);
    }
  };

  //Ghi chu and more haha
  //xac nhan don
  const xacNhan = async (id, value) => {
    const res = await xacNhanDH(id, value, tenNV.nhanVien.ten);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow2(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanDH = async (event) => {
    event.preventDefault();
    await xacNhan(id, lshd, tenNV.nhanVien.ten);
  };

  // huy don
  const huyDon = async (id, value) => {
    const res = await huyDonHang(id, value, tenNV.nhanVien.ten);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow3(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleHuyDon = async (event) => {
    event.preventDefault();
    await huyDon(id, lshd1, tenNV.nhanVien.ten);
  };

  // xac nhan giao hang

  const giaoHang = async (id, value) => {
    const res = await xacNhanGiao(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow4(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanGiaoHang = async (event) => {
    event.preventDefault();
    await giaoHang(id, lshd2);
  };

  // xac nhan giao hang thanh cong

  const giaoHangTC = async (id, value) => {
    const res = await giaoHangThanhCong(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow8(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanGiaoHangThanhCong = async (event) => {
    event.preventDefault();
    await giaoHangTC(id, lshd4);
  };

  // xac nhan giao hang that bai

  const giaoHangTB = async (id, value) => {
    const res = await giaoHangThatBai(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow9(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanGiaoHangThatBai = async (event) => {
    event.preventDefault();
    await giaoHangTB(id, lshd5);
  };

  // giao that bai lan 1
  const [show16, setShow16] = useState(false);

  const [lshd16, setLshd16] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const handleClose16 = () => setShow16(false);
  const handleShow16 = () => setShow16(true);

  const giaoThatBai1 = async (id, value) => {
    const res = await giaoThatBaiLan1(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow16(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleGiaoTBLan1 = async (event) => {
    event.preventDefault();
    await giaoThatBai1(id, lshd16);
  };

  // giao that bai lan 2
  const [show17, setShow17] = useState(false);

  const [lshd17, setLshd17] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const handleClose17 = () => setShow17(false);
  const handleShow17 = () => setShow17(true);

  const giaoThatBai2 = async (id, value) => {
    const res = await giaoThatBaiLan2(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow17(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleGiaoTBLan2 = async (event) => {
    event.preventDefault();
    await giaoThatBai2(id, lshd16);
  };

  // giao that bai lan 3
  const [show18, setShow18] = useState(false);

  const [lshd18, setLshd18] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const handleClose18 = () => setShow18(false);
  const handleShow18 = () => setShow18(true);

  const giaoThatBai3 = async (id, value) => {
    const res = await giaoThatBaiLan3(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow18(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleGiaoTBLan3 = async (event) => {
    event.preventDefault();
    await giaoThatBai3(id, lshd18);
  };

  // giao lai lan 1
  const [show11, setShow11] = useState(false);

  const [lshd11, setLshd11] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const handleClose11 = () => setShow11(false);
  const handleShow11 = () => setShow11(true);

  const giaoLai1 = async (id, value) => {
    const res = await giaoLaiLan1(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow11(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanGiaoLaiLan1 = async (event) => {
    event.preventDefault();
    await giaoLai1(id, lshd11);
  };

  // giao lai lan 2
  const [show12, setShow12] = useState(false);

  const [lshd12, setLshd12] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const handleClose12 = () => setShow12(false);
  const handleShow12 = () => setShow12(true);

  const giaoLai2 = async (id, value) => {
    const res = await giaoLaiLan2(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow12(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanGiaoLaiLan2 = async (event) => {
    event.preventDefault();

    await giaoLai2(id, lshd12);
  };

  // giao lai lan 3
  const [show15, setShow15] = useState(false);

  const [lshd15, setLshd15] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const handleClose15 = () => setShow15(false);
  const handleShow15 = () => setShow15(true);

  const giaoLai3 = async (id, value) => {
    const res = await giaoLaiLan3(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow15(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanGiaoLaiLan3 = async (event) => {
    event.preventDefault();
    await giaoLai3(id, lshd15);
  };

  // xac nhan tra hang
  const [show20, setShow20] = useState(false);

  const [lshd20, setLshd20] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const handleClose20 = () => setShow20(false);
  const handleShow20 = () => setShow20(true);

  const xacNhanTra = async (id, value) => {
    const res = await xacNhanTraHang(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow20(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanTraHang = async (event) => {
    event.preventDefault();
    await xacNhanTra(id, lshd20);
  };

  // xac nhan huy tra hang
  const [show21, setShow21] = useState(false);

  const [lshd21, setLshd21] = useState({
    ghiChu: '',
    nguoiTao: dataLogin && dataLogin.ten
  });

  const handleClose21 = () => setShow21(false);
  const handleShow21 = () => setShow21(true);

  const huyTraHang = async (id, value) => {
    const res = await huyDonTraHang(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow21(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleHuyTraHang = async (event) => {
    event.preventDefault();
    await huyTraHang(id, lshd21);
  };

  // xac nhan nhan hang
  // const [lshd25, setLshd25] = useState({
  //   ghiChu: '',
  //   nguoiTao: dataLogin && dataLogin.ten
  // });

  // const xacNhanNhanHang = async (id, value) => {
  //   const res = await nhanHang(id, value);
  //   if (res) {
  //     toast.success('Cập nhật thành công !');
  //     detail(id);
  //     detailListLSHD(id);
  //   }
  // };

  // const handleXacNhanNhanHang = async (event) => {
  //   event.preventDefault();
  //   setLshd25({
  //     ...lshd25
  //   });
  //   await xacNhanNhanHang(id, lshd25);
  // };

  // apiGHN

  const getThanhPho = async () => {
    try {
      const res = await getTP();
      if (res) {
        setThanhPho(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuanHuyen = async (value) => {
    try {
      const res = await getQH(value);
      if (res) {
        setQuan(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPhuong = async (value) => {
    const res = await getP(value);
    if (res) {
      setPhuong(res.data.data);
    }
  };

  useEffect(() => {
    getThanhPho();
  }, []);

  const handleProvinceChange = (event) => {
    const provinceId = {
      province_id: event.target.value
    };

    setSelectedProvince(event.target.value);
    getQuanHuyen(provinceId);
    const selectedProvinceId = event.target.value;
    const selectedProvince = thanhPho.find((province) => province.ProvinceID === parseInt(selectedProvinceId, 10));

    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.NameExtension[1];
      setHoaDon({
        ...hoaDon,
        tinh: selectedProvinceName
      });
    }
  };

  const handleDistrictChange = (event) => {
    const districtId = {
      district_id: event.target.value
    };
    setSelectedDistrict(event.target.value);
    setValuesServices({
      ...valuesServices,
      to_district: parseInt(event.target.value, 10)
    });
    // setTgDuKien({
    //   ...tgDuKien,
    //   to_district_id: parseInt(event.target.value, 10)
    // });
    getPhuong(districtId);
    // setValuesFee({
    //   ...valuesFee,
    //   to_district_id: parseInt(event.target.value, 10)
    // });
    const selectedProvinceId = event.target.value;
    const selectedProvince = quan.find((province) => province.DistrictID === parseInt(selectedProvinceId, 10));

    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.DistrictName;
      setHoaDon({
        ...hoaDon,
        huyen: selectedProvinceName
      });
    }
  };

  const handleWardChange = (event) => {
    // const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setSelectedWard(event.target.value);
    // setValuesFee({
    //   ...valuesFee,
    //   insurance_value: totalAmount,
    //   to_ward_code: event.target.value
    // });
    // setTgDuKien({
    //   ...tgDuKien,
    //   to_ward_code: event.target.value
    // });
    // setTongTienKhiGiam(totalAmount - totalGiam + hoaDon.tienShip);
    const selectedProvinceId = event.target.value;
    const selectedProvince = phuong.find((province) => province.WardCode === selectedProvinceId);

    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.WardName;
      setHoaDon({
        ...hoaDon,
        xa: selectedProvinceName
      });
    }
  };

  // const getService = async (value) => {
  //   try {
  //     const res = await getServices(value);
  //     if (res) {
  //       setValuesFee({
  //         ...valuesFee,
  //         service_id: res.data.data[0].service_id
  //       });
  //       // setTgDuKien({
  //       //   ...tgDuKien,
  //       //   service_id: res.data.data[0].service_id
  //       // });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const fee = async (value) => {
  //   try {
  //     const res = await getFee(value);
  //     if (res) {
  //       const total = res.data.data.total;
  //       setHoaDon({
  //         ...hoaDon,
  //         tienShip: total
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    return formatter.format(number);
  }

  function formatDate(dateString) {
    if (dateString === null) {
      return '';
    }

    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    let meridian = 'AM';

    if (hours >= 12) {
      meridian = 'PM';
      hours = hours % 12; // Chuyển sang định dạng 12 giờ
    }

    // Đảm bảo hiển thị đúng định dạng hh:mm
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${formattedHours}:${formattedMinutes} ${meridian}`;

    return formattedDate;
  }

  //in hóa đơn

  const styles = StyleSheet.create({
    container: {
      marginLeft: '40px'
    },
    title: {
      paddingTop: '50px',
      paddingBottom: '20px',
      fontSize: '20px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold'
    },
    titleHD: {
      paddingTop: '20px',
      fontSize: '20px',
      fontFamily: 'Roboto',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    titleTB: {
      fontSize: '15px',
      textAlign: 'center',
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      paddingBottom: '10px'
    },
    text: {
      fontSize: '13px',
      fontFamily: 'Roboto',
      textAlign: 'center'
    },
    textMaHD: {
      fontSize: '13px',
      fontFamily: 'Roboto',
      textAlign: 'center',
      paddingBottom: '20px'
    },
    textThuocTinh: {
      fontSize: '10px',
      fontFamily: 'Roboto',
      marginBottom: '3px',
      marginTop: '3px'
    },
    table: {
      width: '100%',
      marginLeft: '40px',
      marginRight: '40px'
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      borderTop: '1px solid #EEE',
      marginRight: '40px'
    },
    header: {
      borderTop: 'none'
    },
    bold: {
      fontWeight: 'bold'
    },
    // So Declarative and unDRY 👌
    row1: {
      width: '10%',
      paddingTop: '10px',
      paddingBottom: '10px',
      fontSize: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    row2: {
      width: '25%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    row3: {
      width: '20%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    row4: {
      width: '20%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      borderLeft: '1px solid black',
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    row5: {
      width: '20%',
      fontSize: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      border: '1px solid black',
      paddingLeft: '5px',
      fontFamily: 'Roboto'
    },
    colorBlock: {
      width: 30,
      height: 30,
      borderRadius: 10
    },
    flexContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%'
    },
    textLeft: {
      fontFamily: 'Roboto',
      fontSize: '13px',
      marginLeft: '40px'
    },
    textRight: {
      fontFamily: 'Roboto',
      fontSize: '15px',
      marginRight: '30px'
    },
    button: {
      color: 'white',
      textDecoration: 'none'
    }
  });

  const InvoiceDocument = () => {
    return (
      <Document>
        <Page>
          <Text style={styles.title}>Sports Shop</Text>
          <Text style={styles.text}>SDT: 0559044158</Text>
          <Text style={styles.text}>Email: sportsshop@gmail.com</Text>
          <Text style={styles.text}>Địa chỉ: Đại Đồng - Tiên Du - Bắc Ninh</Text>
          <Text style={styles.text}>Ngân hàng: Techcombank - STK: 69696969696969</Text>
          <Text style={styles.text}>Chủ tải khoản: Trần Quang Dũng</Text>
          <Text style={styles.titleHD}>HOÁ ĐƠN BÁN HÀNG</Text>
          <Text style={styles.textMaHD}>{hoaDon.ma}</Text>

          <div style={styles.container}>
            <Text style={styles.textThuocTinh}>Ngày mua: {formatDate(hoaDon.ngayThanhToan)}</Text>
            <Text style={styles.textThuocTinh}>Khách hàng: {hoaDon.tenNguoiNhan}</Text>
            <Text style={styles.textThuocTinh}>Địa chỉ: {hoaDon.diaChi}</Text>
            <Text style={styles.textThuocTinh}>Số điện thoại: {hoaDon.sdt}</Text>
            <Text style={styles.textThuocTinh}>Nhân viên bán hàng: {hoaDon && hoaDon.taiKhoan && hoaDon.taiKhoan.ten}</Text>
          </div>
          <Text style={styles.titleTB}>DANH SÁCH SẢN PHẨM KHÁCH HÀNG MUA</Text>
          <View style={styles.table}>
            <View style={[styles.row, styles.header]}>
              <Text style={styles.row1}>STT</Text>
              <Text style={styles.row2}>Sản phẩm</Text>
              <Text style={styles.row3}>Số lượng</Text>
              <Text style={styles.row4}>Đơn giá</Text>
              <Text style={styles.row5}>Thành tiền</Text>
            </View>
            {valuesSanPham.map((d, i) => (
              <View key={i} style={[styles.row, styles.header]}>
                <Text style={styles.row1}>{i + 1}</Text>
                <Text style={styles.row2}>
                  {d.chiTietSanPham.sanPham.ten} [{d.chiTietSanPham.kichCo.ten} - {d.chiTietSanPham.mauSac.ma}]
                </Text>
                <Text style={styles.row3}>{d.soLuong}</Text>
                <Text style={styles.row4}>{convertToCurrency(d.donGia)}</Text>
                <Text style={styles.row5}>{convertToCurrency(d.soLuong * d.donGia)}</Text>
              </View>
            ))}
          </View>
          <View>
            <View style={[styles.flexContainer, { paddingTop: '10px' }]}>
              <Text style={styles.textLeft}>Tổng tiền</Text>
              <Text style={styles.textRight}>{convertToCurrency(totalAmount)}</Text>
            </View>
            {dataHDKM.map((d) => (
              <View key={d.id} style={[styles.flexContainer, { color: 'red' }]}>
                <Text style={styles.textLeft}>Tiền giảm</Text>
                <Text style={styles.textRight}>-{convertToCurrency(d.tienGiam)}</Text>
              </View>
            ))}
            <View style={styles.flexContainer}>
              <Text style={styles.textLeft}>Tiền cần thanh toán</Text>
              <Text style={styles.textRight}>{convertToCurrency(hoaDon.tongTienKhiGiam)}</Text>
            </View>
            {/* <View style={styles.flexContainer}>
              <Text style={styles.textLeft}>Tiền thừa</Text>
              <Text style={styles.textRight}>{convertToCurrency(tienThua)}</Text>
            </View> */}
          </View>
          <View>
            <Text style={[styles.text, { paddingTop: '50px' }]}>-------------Cảm ơn quý khách!-------------</Text>
          </View>
        </Page>
      </Document>
    );
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      In hóa đơn
    </Tooltip>
  );

  const handleTienShipChange = async (e) => {
    if (e) {
      const value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        if (value < 0) {
          // Nếu nhỏ hơn 0, đặt giá trị thành 0
          setHoaDon({ ...hoaDon, tienShip: value });
          updateHD(id, { ...hoaDon, tienShip: value });
        } else {
          // Nếu không, cập nhật giá trị trong state
          setHoaDon({ ...hoaDon, tienShip: value });
          updateHD(id, { ...hoaDon, tienShip: value });
        }
      }
    }
  };

  console.log(hoaDon.tienShip);

  ///hàng doi
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  useEffect(() => {
    hienThiDonDoi(id);
    hienThiSPDonDoi(id);
    hienThiDonLoi(id);
    hienThiSPLoi(id);
    hienThiSPYCDoi(id);
    hienThiDonYCDoi(id);
  }, [id]);

  const [donDoi, setDonDoi] = useState([]);
  const [spDoiHang, setSpDoiHang] = useState([]);
  const [donLoi, setDonLoi] = useState([]);
  const [spLoi, setSpLoi] = useState([]);
  const [donYCDoi, setDonYCDoi] = useState([]);
  const [spYCDoi, setSpYCDoi] = useState([]);

  const hienThiDonYCDoi = async (id) => {
    const res = await hienThiYCDoiHang(id);
    if (res && res.data) {
      setDonYCDoi(res.data);
    }
  };

  const hienThiSPYCDoi = async (id) => {
    const res = await hienThiSPYCDoiHang(id);
    if (res && res.data) {
      setSpYCDoi(res.data);
    }
  };

  const hienThiDonDoi = async (id) => {
    const res = await hienThiDoiHang(id);
    if (res && res.data) {
      setDonDoi(res.data);
    }
  };

  const hienThiSPDonDoi = async (id) => {
    const res = await getAllSPDoiHang(id);
    if (res && res.data) {
      setSpDoiHang(res.data);
    }
  };

  const hienThiDonLoi = async (id) => {
    const res = await hienThiHangLoi(id);
    if (res && res.data) {
      setDonLoi(res.data);
    }
  };

  const hienThiSPLoi = async (id) => {
    const res = await getAllSPLoi(id);
    if (res && res.data) {
      setSpLoi(res.data);
    }
  };

  console.log(donYCDoi);

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <MainCard>
        <Card>
          <div className="w-auto rounded bg-white border shadow p-4">
            <div className="row">
              <div className="col-12">
                <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="card-box">
                  <div style={{ display: 'flex', justifyContent: 'start' }} className="col-7">
                    <h3 className="col-6" style={{ fontWeight: 'bold', color: 'darkblue' }}>
                      Trạng Thái Đơn Hàng
                    </h3>
                  </div>

                  <div className="col-5">
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div className="col-5">
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="justify-content-end">
                          <Button
                            onClick={handleShow1}
                            variant="primary"
                            className="shadow-button"
                            style={{
                              borderRadius: '50px',
                              border: '1px solid black',
                              justifyItems: 'center',
                              background: 'deepskyblue',
                              color: 'black'
                            }}
                          >
                            <i className="fa-solid fa-circle-info fa-shake fa-lg"></i>
                            <span> | </span>
                            <span style={{ fontWeight: 'bold' }}>Chi Tiết</span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      style={{ marginLeft: 150 }}
                      show={show1}
                      onHide={handleClose1}
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter" style={{ marginLeft: 300 }}>
                          Lịch Sử Đơn Hàng
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <section className="navbar-expand-lg navbar-light bg-light">
                          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <Table id="myTable" className="table table-hover" style={{ textAlign: 'center' }}>
                              <thead>
                                <tr style={{ textAlign: 'center' }}>
                                  <th></th>
                                  <th>Trạng Thái</th>
                                  <th>Thời gian</th>
                                  <th>Người xác nhận</th>
                                  <th>Ghi chú</th>
                                </tr>
                              </thead>
                              <tbody>
                                {lichSuHoaDon.map((item, index) => (
                                  <tr key={index}>
                                    <td>
                                      <div style={{ marginTop: 5 }}>
                                        {item.trangThai === 0 && (
                                          <i style={{ color: 'orange' }} className="fa-solid fa-file-invoice fa-beat fa-lg"></i>
                                        )}
                                        {item.trangThai === 1 && (
                                          <i style={{ color: 'gray' }} className="fa-solid fa-spinner fa-spin fa-lg"></i>
                                        )}
                                        {item.trangThai === 2 && (
                                          <i style={{ color: '#990000' }} className="fa-solid fa-xmark fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 3 && (
                                          <i style={{ color: 'orange' }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 4 && (
                                          <i style={{ color: 'green' }} className="fa-solid fa-check-double fa-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 5 && (
                                          <i style={{ color: 'red' }} className="fa-solid fa-ban fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 6 && (
                                          <i style={{ color: 'green' }} className="fa-regular fa-circle-check fa-beat fa-lg"></i>
                                        )}
                                        {item.trangThai === 7 && (
                                          <i style={{ color: 'black' }} className="fa-solid fa-clipboard-check fa-beat fa-lg"></i>
                                        )}
                                        {item.trangThai === 8 && (
                                          <i style={{ color: 'orange' }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 9 && (
                                          <i style={{ color: 'orange' }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 10 && (
                                          <i style={{ color: 'orange' }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 11 && (
                                          <i style={{ color: 'red' }} className="fa-solid fa-ban fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 12 && (
                                          <i style={{ color: 'red' }} className="fa-solid fa-ban fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 13 && (
                                          <i style={{ color: 'red' }} className="fa-solid fa-ban fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 14 && (
                                          <i style={{ color: 'black' }} className="fa-solid fa-clipboard-question fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 15 && (
                                          <i style={{ color: 'black' }} className="fa-solid fa-clipboard-question fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 16 && (
                                          <i style={{ color: '#0000FF' }} className="fa-solid fa-clipboard-check fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 17 && (
                                          <i style={{ color: '#990000' }} className="fa-solid fa-xmark fa-beat-fade fa-lg"></i>
                                        )}
                                      </div>
                                    </td>
                                    <td style={{ fontSize: '12px', justifyContent: 'center', display: 'flex' }} className="align-middle">
                                      {item.trangThai === 0 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold'
                                          }}
                                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                                        >
                                          Đang chờ xác nhận
                                        </span>
                                      )}
                                      {item.trangThai === 1 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold'
                                          }}
                                          className="btn btn-labeled shadow-button btn btn-secondary status-pending"
                                        >
                                          Chờ giao hàng
                                        </span>
                                      )}
                                      {item.trangThai === 2 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: '#990000',
                                            color: 'white'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-cancelled"
                                        >
                                          Đã hủy đơn
                                        </span>
                                      )}
                                      {item.trangThai === 3 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold'
                                          }}
                                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                                        >
                                          Đang giao hàng
                                        </span>
                                      )}
                                      {item.trangThai === 4 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: 'greenyellow',
                                            color: 'black'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-completed"
                                        >
                                          Giao hàng thành công
                                        </span>
                                      )}
                                      {item.trangThai === 5 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: 'red',
                                            color: 'white'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-cancelled"
                                        >
                                          Giao hàng thất bại
                                        </span>
                                      )}
                                      {item.trangThai === 6 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold'
                                          }}
                                          className="btn btn-labeled shadow-button btn btn-info status-completed"
                                        >
                                          Thanh toán thành công
                                        </span>
                                      )}
                                      {item.trangThai === 7 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: 'darkblue',
                                            color: 'white'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-completed"
                                        >
                                          Đã nhận hàng
                                        </span>
                                      )}
                                      {item.trangThai === 8 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold'
                                          }}
                                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                                        >
                                          Giao lại lần 1
                                        </span>
                                      )}
                                      {item.trangThai === 9 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold'
                                          }}
                                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                                        >
                                          Giao lại lần 2
                                        </span>
                                      )}
                                      {item.trangThai === 10 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold'
                                          }}
                                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                                        >
                                          Giao lại lần 3
                                        </span>
                                      )}
                                      {item.trangThai === 11 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: 'red',
                                            color: 'white'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-cancelled"
                                        >
                                          Giao hàng thất bại lần 1
                                        </span>
                                      )}
                                      {item.trangThai === 12 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: 'red',
                                            color: 'white'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-cancelled"
                                        >
                                          Giao hàng thất bại lần 2
                                        </span>
                                      )}
                                      {item.trangThai === 13 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: 'red',
                                            color: 'white'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-cancelled"
                                        >
                                          Giao hàng thất bại lần 3
                                        </span>
                                      )}
                                      {item.trangThai === 14 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: '#FFFF00',
                                            color: 'black'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-cancelled"
                                        >
                                          Yêu cầu hủy đơn
                                        </span>
                                      )}
                                      {item.trangThai === 15 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: '#FFFF00',
                                            color: 'black'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-cancelled"
                                        >
                                          Yêu cầu trả hàng
                                        </span>
                                      )}
                                      {item.trangThai === 16 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: 'darkblue',
                                            color: 'white'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-cancelled"
                                        >
                                          Trả hàng thành công
                                        </span>
                                      )}
                                      {item.trangThai === 17 && (
                                        <span
                                          style={{
                                            width: '240px',
                                            pointerEvents: 'none',
                                            height: '30px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            backgroundColor: '#990000',
                                            color: 'white'
                                          }}
                                          className="btn btn-labeled shadow-button btn status-cancelled"
                                        >
                                          Trả hàng thất bại
                                        </span>
                                      )}
                                    </td>
                                    <td>{formatDate(item.ngayTao)}</td>
                                    <td>{item.nguoiTao}</td>
                                    <td>{item.ghiChu}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </div>
                        </section>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            {/* //time line  */}
            <Row>
              <Col>
                <div className="wrap">
                  <div className="timeline-wrap">
                    <ul className="timeline">
                      {lichSuHoaDon.map((lshd, index) => (
                        <React.Fragment key={index}>
                          {lshd.trangThai === 0 && (
                            <li className={`timeline-item bmw`}>
                              <div className="p-timeline-item">
                                <span className="p-timeline-date">{lshd.ten}</span>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 0 ? { backgroundColor: 'yellow', color: 'black' } : {}}
                                  className={'p-timeline-block'}
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-file-invoice fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 1 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 1 ? { backgroundColor: 'yellow', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-spinner fa-spin fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 2 && (
                            <li className="timeline-item mini">
                              <div className="p-timeline-item">
                                <span className="p-timeline-date">{lshd.ten}</span>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 2 ? { backgroundColor: '#990000', color: 'white' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-xmark fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 3 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 3 ? { backgroundColor: 'yellow', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 4 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <span className="p-timeline-date">{lshd.ten}</span>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 4 ? { backgroundColor: '#0ad406', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-check-double fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 5 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 5 ? { backgroundColor: 'orangered', color: 'white' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-ban fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 6 && (
                            <li className="timeline-item mini">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 6 ? { backgroundColor: 'aqua', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-regular fa-circle-check fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 7 && (
                            <li className="timeline-item mini">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 7 ? { backgroundColor: 'darkblue', color: 'white' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-clipboard-check fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}

                          {lshd.trangThai === 8 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 8 ? { backgroundColor: 'yellow', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                </div>
                              </div>
                            </li>
                          )}

                          {lshd.trangThai === 9 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 9 ? { backgroundColor: 'yellow', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                </div>
                              </div>
                            </li>
                          )}

                          {lshd.trangThai === 10 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 10 ? { backgroundColor: 'yellow', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                </div>
                              </div>
                            </li>
                          )}

                          {lshd.trangThai === 11 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 11 ? { backgroundColor: 'orangered', color: 'white' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-ban fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}

                          {lshd.trangThai === 12 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 12 ? { backgroundColor: 'orangered', color: 'white' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-ban fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}

                          {lshd.trangThai === 13 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 13 ? { backgroundColor: 'orangered', color: 'white' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-ban fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}

                          {lshd.trangThai === 14 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 14 ? { backgroundColor: '#FFFF00', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-clipboard-question fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}

                          {lshd.trangThai === 15 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 15 ? { backgroundColor: '#FFFF00', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-clipboard-question fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 16 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 16 ? { backgroundColor: '#0000FF', color: 'white' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-clipboard-check fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 17 && (
                            <li className="timeline-item mini">
                              <div className="p-timeline-item">
                                <span className="p-timeline-date">{lshd.ten}</span>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 17 ? { backgroundColor: '#990000', color: 'white' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-xmark fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>

            {/* button */}
            <div className="row">
              {/* xac nhan don hang */}
              <div style={{ paddingLeft: 32 }} className="col-3">
                {(hoaDon.trangThai === 0 || hoaDon.trangThai === 6) && hoaDon.loaiDon === 1 && (
                  <button onClick={handleShow2} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Xác nhận đơn</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}

                {/* //xac nhan giao hang */}
                {hoaDon.trangThai === 1 && hoaDon.loaiDon === 1 && (
                  <button onClick={handleShow4} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Giao hàng</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}

                {/* //giao hang thanh cong */}
                {(hoaDon.trangThai === 3 || hoaDon.trangThai === 8 || hoaDon.trangThai === 9 || hoaDon.trangThai === 10) &&
                  hoaDon.loaiDon === 1 && (
                    <button onClick={handleShow8} className="relative inline-block text-base group">
                      <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                        <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative">Giao thành công</span>
                      </span>
                      <span
                        className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                        data-rounded="rounded-lg"
                      ></span>
                    </button>
                  )}

                {/* //xac nhan giao lai lan 1 */}
                {hoaDon.trangThai === 5 && hoaDon.loaiDon === 1 && (
                  <button onClick={handleShow11} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Giao lại lần 1</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}

                {/* //xac nhan giao lai lan 2 */}
                {hoaDon.trangThai === 11 && hoaDon.loaiDon === 1 && (
                  <button onClick={handleShow12} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Giao lại lần 2</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}

                {/* //xac nhan giao lai lan 3 */}
                {hoaDon.trangThai === 12 && hoaDon.loaiDon === 1 && (
                  <button onClick={handleShow15} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Giao lại lần 3</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}
                {/* //xac nhan huy don  */}
                {hoaDon.trangThai === 14 && hoaDon.loaiDon === 1 && (
                  <button onClick={handleShow3} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative" style={{ color: 'red' }}>
                        Xác nhận hủy
                      </span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}
                {/* //xac nhan tra hang  */}
                {hoaDon.trangThai === 15 && (
                  <button onClick={handleShow20} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Xác nhận trả hàng</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}
                {/* //xac nhan tra hang  */}
                {/* {hoaDon.trangThai === 4 && (
                  <button onClick={handleXacNhanNhanHang} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Nhận hàng</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )} */}
              </div>
              {/* //modal*/}
              {/* //xac nhan don hang */}
              <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="needs-validation" noValidate>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Nhập ghi chú (nếu có)"
                          value={lshd.ghiChu}
                          onChange={(e) => {
                            setLshd({ ...lshd, ghiChu: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                      <button
                        onClick={handleXacNhanDH}
                        type="submit"
                        className="btn btn-labeled shadow-button"
                        style={{
                          background: 'deepskyblue',
                          borderRadius: '50px',
                          border: '1px solid black',
                          justifyItems: 'center'
                        }}
                      >
                        <span
                          style={{
                            marginBottom: '3px',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold'
                          }}
                          className="btn-text"
                        >
                          Ghi Chú
                        </span>
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              {/* //xac nhan giao hang */}
              <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show4} onHide={handleClose4}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="needs-validation" noValidate>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Nhập ghi chú (nếu có)"
                          value={lshd2.ghiChu}
                          onChange={(e) => {
                            setLshd2({ ...lshd2, ghiChu: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                      <button
                        onClick={handleXacNhanGiaoHang}
                        type="submit"
                        className="btn btn-labeled shadow-button"
                        style={{
                          background: 'deepskyblue',
                          borderRadius: '50px',
                          border: '1px solid black',
                          justifyItems: 'center'
                        }}
                      >
                        <span
                          style={{
                            marginBottom: '3px',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold'
                          }}
                          className="btn-text"
                        >
                          Ghi Chú
                        </span>
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              {/* //giao hang thanh cong*/}
              <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show8} onHide={handleClose8}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="needs-validation" noValidate>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Nhập ghi chú (nếu có)"
                          value={lshd4.ghiChu}
                          onChange={(e) => {
                            setLshd4({ ...lshd4, ghiChu: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                      <button
                        onClick={handleXacNhanGiaoHangThanhCong}
                        type="submit"
                        className="btn btn-labeled shadow-button"
                        style={{
                          background: 'deepskyblue',
                          borderRadius: '50px',
                          border: '1px solid black',
                          justifyItems: 'center'
                        }}
                      >
                        <span
                          style={{
                            marginBottom: '3px',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold'
                          }}
                          className="btn-text"
                        >
                          Ghi Chú
                        </span>
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              {/* //xac nhan giao lai lan 1 */}
              <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show11} onHide={handleClose11}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="needs-validation" noValidate>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Nhập ghi chú (nếu có)"
                          value={lshd11.ghiChu}
                          onChange={(e) => {
                            setLshd11({ ...lshd11, ghiChu: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                      <button
                        onClick={handleXacNhanGiaoLaiLan1}
                        type="submit"
                        className="btn btn-labeled shadow-button"
                        style={{
                          background: 'deepskyblue',
                          borderRadius: '50px',
                          border: '1px solid black',
                          justifyItems: 'center'
                        }}
                      >
                        <span
                          style={{
                            marginBottom: '3px',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold'
                          }}
                          className="btn-text"
                        >
                          Ghi Chú
                        </span>
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              {/* //xac nhan giao lai lan 2 */}
              <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show12} onHide={handleClose12}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="needs-validation" noValidate>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Nhập ghi chú (nếu có)"
                          value={lshd12.ghiChu}
                          onChange={(e) => {
                            setLshd12({ ...lshd12, ghiChu: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                      <button
                        onClick={handleXacNhanGiaoLaiLan2}
                        type="submit"
                        className="btn btn-labeled shadow-button"
                        style={{
                          background: 'deepskyblue',
                          borderRadius: '50px',
                          border: '1px solid black',
                          justifyItems: 'center'
                        }}
                      >
                        <span
                          style={{
                            marginBottom: '3px',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold'
                          }}
                          className="btn-text"
                        >
                          Ghi Chú
                        </span>
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              {/* //xac nhan giao lai lan 3 */}
              <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show15} onHide={handleClose15}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="needs-validation" noValidate>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Nhập ghi chú (nếu có)"
                          value={lshd15.ghiChu}
                          onChange={(e) => {
                            setLshd15({ ...lshd15, ghiChu: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                      <button
                        onClick={handleXacNhanGiaoLaiLan3}
                        type="submit"
                        className="btn btn-labeled shadow-button"
                        style={{
                          background: 'deepskyblue',
                          borderRadius: '50px',
                          border: '1px solid black',
                          justifyItems: 'center'
                        }}
                      >
                        <span
                          style={{
                            marginBottom: '3px',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold'
                          }}
                          className="btn-text"
                        >
                          Ghi Chú
                        </span>
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              {/* //xac nhan tra hang*/}
              <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show20} onHide={handleClose20}>
                <Modal.Header closeButton>
                  <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form className="needs-validation" noValidate>
                    <div className="form-group row">
                      <div className="col-sm-12">
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Nhập ghi chú (nếu có)"
                          value={lshd20.ghiChu}
                          onChange={(e) => {
                            setLshd20({ ...lshd20, ghiChu: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                      <button
                        onClick={handleXacNhanTraHang}
                        type="submit"
                        className="btn btn-labeled shadow-button"
                        style={{
                          background: 'deepskyblue',
                          borderRadius: '50px',
                          border: '1px solid black',
                          justifyItems: 'center'
                        }}
                      >
                        <span
                          style={{
                            marginBottom: '3px',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold'
                          }}
                          className="btn-text"
                        >
                          Ghi Chú
                        </span>
                      </button>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              {/* //huy don */}
              <div className="col-3">
                {(hoaDon.trangThai === 0 ||
                  hoaDon.trangThai === 1 ||
                  hoaDon.trangThai === 6 ||
                  hoaDon.trangThai === 5 ||
                  hoaDon.trangThai === 11 ||
                  hoaDon.trangThai === 10 ||
                  hoaDon.trangThai === 12) &&
                  hoaDon.loaiDon === 1 && (
                    <button onClick={handleShow3} className="relative inline-block text-base group">
                      <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                        <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                        <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                        <span className="relative" style={{ color: 'red' }}>
                          Hủy đơn
                        </span>
                      </span>
                      <span
                        className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                        data-rounded="rounded-lg"
                      ></span>
                    </button>
                  )}
                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show3} onHide={handleClose3}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="needs-validation" noValidate>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <textarea
                            className="form-control"
                            rows="4"
                            name="diaChi"
                            placeholder="Nhập ghi chú (nếu có)"
                            value={lshd1.ghiChu}
                            onChange={(e) => {
                              setLshd1({ ...lshd1, ghiChu: e.target.value });
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <br></br>
                      <div className="text-center">
                        <button
                          onClick={handleHuyDon}
                          type="submit"
                          className="btn btn-labeled shadow-button"
                          style={{
                            background: 'deepskyblue',
                            borderRadius: '50px',
                            border: '1px solid black',
                            justifyItems: 'center'
                          }}
                        >
                          <span
                            style={{
                              marginBottom: '3px',
                              color: 'white',
                              fontSize: '15px',
                              fontWeight: 'bold'
                            }}
                            className="btn-text"
                          >
                            Ghi Chú
                          </span>
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
                {/* //giao hang that bai */}
                {hoaDon.trangThai === 3 && (
                  <button onClick={handleShow9} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative" style={{ color: 'red' }}>
                        Giao thất bại
                      </span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}
                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show9} onHide={handleClose9}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="needs-validation" noValidate>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <textarea
                            className="form-control"
                            rows="4"
                            name="diaChi"
                            placeholder="Nhập ghi chú (nếu có)"
                            value={lshd5.ghiChu}
                            onChange={(e) => {
                              setLshd5({ ...lshd5, ghiChu: e.target.value });
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <br></br>
                      <div className="text-center">
                        <button
                          onClick={handleXacNhanGiaoHangThatBai}
                          type="submit"
                          className="btn btn-labeled shadow-button"
                          style={{
                            background: 'deepskyblue',
                            borderRadius: '50px',
                            border: '1px solid black',
                            justifyItems: 'center'
                          }}
                        >
                          <span
                            style={{
                              marginBottom: '3px',
                              color: 'white',
                              fontSize: '15px',
                              fontWeight: 'bold'
                            }}
                            className="btn-text"
                          >
                            Ghi Chú
                          </span>
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
                {/* //giao hang that bai lần 1*/}
                {hoaDon.trangThai === 8 && (
                  <button onClick={handleShow16} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative" style={{ color: 'red' }}>
                        Giao thất bại
                      </span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}
                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show16} onHide={handleClose16}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="needs-validation" noValidate>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <textarea
                            className="form-control"
                            rows="4"
                            name="diaChi"
                            placeholder="Nhập ghi chú (nếu có)"
                            value={lshd16.ghiChu}
                            onChange={(e) => {
                              setLshd16({ ...lshd16, ghiChu: e.target.value });
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <br></br>
                      <div className="text-center">
                        <button
                          onClick={handleGiaoTBLan1}
                          type="submit"
                          className="btn btn-labeled shadow-button"
                          style={{
                            background: 'deepskyblue',
                            borderRadius: '50px',
                            border: '1px solid black',
                            justifyItems: 'center'
                          }}
                        >
                          <span
                            style={{
                              marginBottom: '3px',
                              color: 'white',
                              fontSize: '15px',
                              fontWeight: 'bold'
                            }}
                            className="btn-text"
                          >
                            Ghi Chú
                          </span>
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
                {/* //giao hang that bai lần 2*/}
                {hoaDon.trangThai === 9 && (
                  <button onClick={handleShow17} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative" style={{ color: 'red' }}>
                        Giao thất bại
                      </span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}
                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show17} onHide={handleClose17}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="needs-validation" noValidate>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <textarea
                            className="form-control"
                            rows="4"
                            name="diaChi"
                            placeholder="Nhập ghi chú (nếu có)"
                            value={lshd17.ghiChu}
                            onChange={(e) => {
                              setLshd17({ ...lshd17, ghiChu: e.target.value });
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <br></br>
                      <div className="text-center">
                        <button
                          onClick={handleGiaoTBLan2}
                          type="submit"
                          className="btn btn-labeled shadow-button"
                          style={{
                            background: 'deepskyblue',
                            borderRadius: '50px',
                            border: '1px solid black',
                            justifyItems: 'center'
                          }}
                        >
                          <span
                            style={{
                              marginBottom: '3px',
                              color: 'white',
                              fontSize: '15px',
                              fontWeight: 'bold'
                            }}
                            className="btn-text"
                          >
                            Ghi Chú
                          </span>
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
                {/* //giao hang that bai lần 3*/}
                {hoaDon.trangThai === 19 && (
                  <button onClick={handleShow18} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative" style={{ color: 'red' }}>
                        Giao thất bại
                      </span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}
                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show18} onHide={handleClose18}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="needs-validation" noValidate>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <textarea
                            className="form-control"
                            rows="4"
                            name="diaChi"
                            placeholder="Nhập ghi chú (nếu có)"
                            value={lshd18.ghiChu}
                            onChange={(e) => {
                              setLshd18({ ...lshd18, ghiChu: e.target.value });
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <br></br>
                      <div className="text-center">
                        <button
                          onClick={handleGiaoTBLan3}
                          type="submit"
                          className="btn btn-labeled shadow-button"
                          style={{
                            background: 'deepskyblue',
                            borderRadius: '50px',
                            border: '1px solid black',
                            justifyItems: 'center'
                          }}
                        >
                          <span
                            style={{
                              marginBottom: '3px',
                              color: 'white',
                              fontSize: '15px',
                              fontWeight: 'bold'
                            }}
                            className="btn-text"
                          >
                            Ghi Chú
                          </span>
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
                {/* //huy tra hang*/}
                {hoaDon.trangThai === 15 && (
                  <button onClick={handleShow21} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative" style={{ color: 'red' }}>
                        Hủy trả hàng
                      </span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}
                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show21} onHide={handleClose21}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form className="needs-validation" noValidate>
                      <div className="form-group row">
                        <div className="col-sm-12">
                          <textarea
                            className="form-control"
                            rows="4"
                            name="diaChi"
                            placeholder="Nhập ghi chú (nếu có)"
                            value={lshd21.ghiChu}
                            onChange={(e) => {
                              setLshd21({ ...lshd21, ghiChu: e.target.value });
                            }}
                          ></textarea>
                        </div>
                      </div>
                      <br></br>
                      <div className="text-center">
                        <button
                          onClick={handleHuyTraHang}
                          type="submit"
                          className="btn btn-labeled shadow-button"
                          style={{
                            background: 'deepskyblue',
                            borderRadius: '50px',
                            border: '1px solid black',
                            justifyItems: 'center'
                          }}
                        >
                          <span
                            style={{
                              marginBottom: '3px',
                              color: 'white',
                              fontSize: '15px',
                              fontWeight: 'bold'
                            }}
                            className="btn-text"
                          >
                            Ghi Chú
                          </span>
                        </button>
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </Card>
        <br></br>
        <br></br>
        <Card>
          <div className="w-auto rounded bg-white border shadow p-4">
            <div className="row">
              <div className="col-12">
                <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="card-box">
                  <div style={{ display: 'flex', justifyContent: 'start' }} className="col-7">
                    <h3 className="col-6" style={{ fontWeight: 'bold', color: 'brown' }}>
                      Thông Tin Đơn Hàng
                    </h3>
                    <div className="col-1">
                      <div className=" justify-content-end">
                        <button
                          onClick={() => navigate('/don-hang')}
                          className="btn fa-khenh "
                          data-bs-placement="right"
                          data-bs-title="Trở về đơn hàng"
                        >
                          <i style={{ color: 'darkblue' }} className="fa-solid fa-person-walking-arrow-loop-left fa-xl"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-5">
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <div className="col-5">
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="justify-content-end">
                          {hoaDon.trangThai === 0 && hoaDon.loaiDon === 1 && (
                            <button onClick={handleShow} className="btn btn-dark" data-bs-placement="right">
                              <i className="fa-solid fa-pen-to-square fa-bounce fa-lg"></i>
                              <span> | </span>
                              <span>Cập Nhật</span>
                            </button>
                          )}
                          {((hoaDon.trangThai === 7 && hoaDon.loaiDon === 1) ||
                            (hoaDon.trangThai === 6 && hoaDon.loaiDon === 0) ||
                            hoaDon.trangThai === 16) && (
                            <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                              <button className="btn btn-dark" data-bs-placement="right">
                                <PDFDownloadLink document={<InvoiceDocument />} fileName="hoa_don.pdf">
                                  <Text style={styles.button}>
                                    <i className="fa-solid fa-print fa-xl"></i>
                                  </Text>
                                </PDFDownloadLink>
                              </button>
                            </OverlayTrigger>
                          )}
                        </div>
                      </div>
                    </div>

                    <Modal
                      size="lg"
                      aria-labelledby="contained-modal-title-vcenter"
                      centered
                      style={{ marginLeft: 150 }}
                      show={show}
                      onHide={handleUpdateHD}
                    >
                      <Modal.Header onClick={handleUpdateHD}>
                        <Modal.Title style={{ marginLeft: 225 }}>Cập Nhật Thông Tin Người Nhận</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form className="needs-validation" noValidate onSubmit={handleUpdateHD}>
                          <div className="row">
                            <div className="col-6">
                              <div className="form-group row">
                                <label style={{ fontWeight: 'bold' }} htmlFor="tenNguoiNhan" className="col-sm-3 col-form-label">
                                  Họ Và Tên:
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="tenNguoiNhan"
                                    placeholder="Họ Và Tên"
                                    value={hoaDon.tenNguoiNhan}
                                    onChange={(e) => {
                                      setHoaDon({ ...hoaDon, tenNguoiNhan: e.target.value });
                                      setNone(true);
                                      setNone1(true);
                                    }}
                                  />
                                  {!none && <div style={{ color: 'red' }}>Tên người nhận không được để trống !</div>}
                                  {!none1 && <div style={{ color: 'red' }}>Tên người nhận không được quá 30 ký tự và phải là chữ !</div>}
                                </div>
                              </div>
                              <br></br>
                              <div className="form-group row">
                                <label style={{ fontWeight: 'bold' }} htmlFor="soDienThoai" className="col-sm-3 col-form-label">
                                  Số ĐT:
                                </label>
                                <div className="col-sm-9">
                                  <input
                                    type="tel"
                                    className="form-control"
                                    name="soDienThoai"
                                    placeholder="Số Điện Thoại"
                                    value={hoaDon.soDienThoai}
                                    onChange={(e) => {
                                      setHoaDon({ ...hoaDon, soDienThoai: e.target.value });
                                      setNone2(true);
                                      setNone3(true);
                                    }}
                                  />
                                  {!none2 && <div style={{ color: 'red' }}>Số điện thoại không được để trống !</div>}
                                  {!none3 && (
                                    <div style={{ color: 'red' }}>Số điện thoại phải là số, bắt đầu bằng số 0 và phải đúng 10 số !</div>
                                  )}
                                </div>
                              </div>
                              <br></br>
                              <div className="form-group row">
                                <label style={{ fontWeight: 'bold' }} htmlFor="diaChi" className="col-sm-3 col-form-label">
                                  Địa Chỉ:
                                </label>
                                <div className="col-sm-9">
                                  <textarea
                                    className="form-control"
                                    rows="4"
                                    name="diaChi"
                                    placeholder="Địa Chỉ"
                                    value={hoaDon.diaChi}
                                    onChange={(e) => {
                                      setHoaDon({ ...hoaDon, diaChi: e.target.value });
                                      setNone4(true);
                                      setNone5(true);
                                    }}
                                  ></textarea>
                                  {!none4 && <div style={{ color: 'red' }}>Địa chỉ không được để trống !</div>}
                                  {!none5 && <div style={{ color: 'red' }}>Địa chỉ không được vượt quá 250 ký tự !</div>}
                                </div>
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="form-group row">
                                <label
                                  style={{ fontStyle: 'italic', paddingLeft: 29 }}
                                  htmlFor="tenNguoiNhan"
                                  className="col-sm-5 col-form-label"
                                >
                                  Tỉnh/Thành Phố:
                                </label>
                                <div className="col-sm-7">
                                  <select id="province" className="form-select fsl" onChange={handleProvinceChange}>
                                    <option value="">-----Chọn tỉnh thành-----</option>
                                    {thanhPho.map((province) => (
                                      <option
                                        key={province.ProvinceID}
                                        selected={province.NameExtension[1] === hoaDon.tinh}
                                        value={province.ProvinceID}
                                      >
                                        {province.NameExtension[1]}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <br></br>
                              <div className="form-group row">
                                <label
                                  style={{ fontStyle: 'italic', paddingLeft: 29 }}
                                  htmlFor="soDienThoai"
                                  className="col-sm-5 col-form-label"
                                >
                                  Quận/Huyện:
                                </label>
                                <div className="col-sm-7">
                                  <select
                                    id="district"
                                    className="form-select fsl"
                                    disabled={!selectedProvince}
                                    onChange={(e) => handleDistrictChange(e)}
                                  >
                                    <option value="">----Chọn quận huyện-----</option>
                                    {quan.map((district) => (
                                      <option
                                        key={district.DistrictID}
                                        selected={district.DistrictName === hoaDon.huyen}
                                        value={district.DistrictID}
                                      >
                                        {district.DistrictName}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <br></br>
                              <div className="form-group row">
                                <label
                                  style={{ fontStyle: 'italic', paddingLeft: 29 }}
                                  htmlFor="diaChi"
                                  className="col-sm-5 col-form-label"
                                >
                                  Phường/Xã:
                                </label>
                                <div className="col-sm-7">
                                  <select
                                    id="ward"
                                    className="form-select fsl"
                                    disabled={!selectedProvince || !selectedDistrict}
                                    onChange={handleWardChange}
                                  >
                                    <option value="">-----Chọn phường xã-----</option>
                                    {phuong.map((ward) => (
                                      <option key={ward.WardCode} selected={ward.WardName === hoaDon.xa} value={ward.WardCode}>
                                        {ward.WardName}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <br></br>
                          <br></br>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-labeled shadow-button"
                              style={{
                                background: 'deepskyblue',
                                borderRadius: '50px',
                                border: '1px solid black',
                                justifyItems: 'center'
                              }}
                            >
                              <span
                                style={{
                                  marginBottom: '3px',
                                  color: 'white',
                                  fontSize: '15px',
                                  fontWeight: 'bold'
                                }}
                                className="btn-text"
                              >
                                Cập Nhật
                              </span>
                            </button>
                          </div>
                        </form>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* //detail */}

            <div style={{ paddingLeft: '100px' }}>
              <Container>
                <Row style={{ marginBottom: 10 }}>
                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '100px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Mã Đơn:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '300px',
                          fontSize: '15px'
                        }}
                      >
                        {hoaDon.ma}
                      </span>
                    </Col>
                  </Col>

                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '200px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Người Tạo:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '300px',
                          fontSize: '15px'
                        }}
                      >
                        {hoaDon.loaiDon == 0 && (hoaDon.nhanVien && hoaDon.nhanVien.ten ? hoaDon.nhanVien.ten : '')}
                        {hoaDon.loaiDon == 1 && (hoaDon.khachHang && hoaDon.khachHang.tenKhachHang ? hoaDon.khachHang.tenKhachHang : '')}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>

              <br />

              <Container>
                <Row>
                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '100px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Trạng Thái:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <div style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>
                        {hoaDon.trangThai === 0 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              fontWeight: 'bold',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Đang chờ xác nhận
                          </span>
                        )}

                        {hoaDon.trangThai === 1 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              fontWeight: 'bold',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            className="btn btn-labeled shadow-button btn btn-secondary status-pending"
                          >
                            Chờ giao hàng
                          </span>
                        )}

                        {hoaDon.trangThai === 2 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#990000',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Đã hủy đơn
                          </span>
                        )}

                        {hoaDon.trangThai === 3 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              fontWeight: 'bold',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Đang giao hàng
                          </span>
                        )}
                        {hoaDon.trangThai === 4 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              fontWeight: 'bold',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'greenyellow',
                              color: 'black'
                            }}
                            className="btn btn-labeled shadow-button btn status-completed"
                          >
                            Giao hàng thành công
                          </span>
                        )}
                        {hoaDon.trangThai === 5 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              fontWeight: 'bold',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'red',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Giao hàng thất bại
                          </span>
                        )}
                        {hoaDon.trangThai === 6 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              fontWeight: 'bold',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            className="btn btn-labeled shadow-button btn btn-info status-completed"
                          >
                            Thanh toán thành công
                          </span>
                        )}
                        {hoaDon.trangThai === 7 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              fontWeight: 'bold',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'darkblue',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-completed"
                          >
                            Đã nhận hàng
                          </span>
                        )}
                        {hoaDon.trangThai === 8 && (
                          <span
                            style={{
                              width: '200px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold'
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Giao lại lần 1
                          </span>
                        )}
                        {hoaDon.trangThai === 9 && (
                          <span
                            style={{
                              width: '200px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold'
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Giao lại lần 2
                          </span>
                        )}
                        {hoaDon.trangThai === 10 && (
                          <span
                            style={{
                              width: '200px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold'
                            }}
                            className="btn btn-labeled shadow-button btn btn-warning status-pending"
                          >
                            Giao lại lần 3
                          </span>
                        )}
                        {hoaDon.trangThai === 11 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              fontWeight: 'bold',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'red',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Giao hàng thất bại
                          </span>
                        )}
                        {hoaDon.trangThai === 12 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              fontWeight: 'bold',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: 'red',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Giao hàng thất bại
                          </span>
                        )}
                        {hoaDon.trangThai === 13 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: 'red',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Giao hàng thất bại
                          </span>
                        )}
                        {hoaDon.trangThai === 14 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#FFFF00',
                              color: 'black'
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Yêu cầu hủy đơn
                          </span>
                        )}
                        {hoaDon.trangThai === 15 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#FFFF00',
                              color: 'black'
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Yêu cầu trả hàng
                          </span>
                        )}
                        {hoaDon.trangThai === 16 && (
                          <span
                            style={{
                              width: '240px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#0000FF',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Trả hàng thành công
                          </span>
                        )}
                        {hoaDon.trangThai === 17 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#990000',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-cancelled"
                          >
                            Trả hàng thất bại
                          </span>
                        )}
                      </div>
                    </Col>
                  </Col>
                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '100px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Ngày Tạo:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '300px',
                          fontSize: '15px'
                        }}
                      >
                        {formatDate(hoaDon.ngayTao)}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>

              <br />

              <Container>
                <Row>
                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '100px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Loại:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <div style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>
                        {hoaDon.loaiDon === 0 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              fontWeight: 'bold',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                            className="btn btn-labeled shadow-button btn btn-dark status-pending"
                          >
                            Tại Quầy
                          </span>
                        )}
                        {hoaDon.loaiDon === 1 && (
                          <span
                            style={{
                              width: '250px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              fontWeight: 'bold',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              backgroundColor: '#126e3bff',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn btn-primary status-pending"
                          >
                            Đặt Hàng Online
                          </span>
                        )}
                      </div>
                    </Col>
                  </Col>

                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '200px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Người Nhận:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '300px',
                          fontSize: '15px'
                        }}
                      >
                        {hoaDon.tenNguoiNhan}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>

              <br />

              <Container>
                <Row>
                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '200px',
                          fontSize: '15px',
                          fontWeight: 'bold',
                          paddingTop: '7px'
                        }}
                      >
                        Hình Thức:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '300px',
                          fontSize: '15px'
                        }}
                      >
                        {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.ten ? (
                          hoaDon.hinhThucThanhToan.ten
                        ) : (
                          <p style={{ color: 'red' }}>Chưa chọn hình thức !</p>
                        )}
                        {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.ten === 'Tiền mặt' && (
                          <img
                            style={{ display: 'inline-block' }}
                            width={'35px'}
                            height={'15px'}
                            src="https://symbols.vn/wp-content/uploads/2021/11/Bieu-tuong-tien-mat-doc-dao.png"
                            alt="COD Logo"
                            className="payment-logo"
                          />
                        )}
                        {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.ten === 'VNPay' && (
                          <img
                            style={{ display: 'inline-block' }}
                            width={'35px'}
                            height={'20px'}
                            src="https://on.net.vn/web/image/3876184-2b57e083/202166185_2021396718013233_8499389898242103910_n.png"
                            alt="VNPay Logo"
                            className="payment-logo"
                          />
                        )}
                      </span>
                    </Col>
                  </Col>

                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '120px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Số Điện Thoại:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '300px',
                          fontSize: '15px'
                        }}
                      >
                        {hoaDon.soDienThoai && hoaDon.soDienThoai}
                        {!hoaDon.soDienThoai && <p style={{ color: 'red' }}>Không có số điện thoại !</p>}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>

              <br />

              <Container>
                <Row>
                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '200px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Ghi Chú:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '300px',
                          fontSize: '15px'
                        }}
                      >
                        {hoaDon.ghiChu && hoaDon.ghiChu}
                        {!hoaDon.ghiChu && <p style={{ color: 'red' }}>Không có ghi chú !</p>}
                      </span>
                    </Col>
                  </Col>

                  <Col sm={6} className="row">
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '200px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Địa Chỉ:
                      </span>
                    </Col>
                    <Col sm={3}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '300px',
                          fontSize: '15px'
                        }}
                      >
                        {hoaDon.diaChi && (
                          <p>
                            {hoaDon.diaChi}, {hoaDon.xa}, {hoaDon.huyen}, {hoaDon.tinh}
                          </p>
                        )}

                        {!hoaDon.diaChi && <p style={{ color: 'red' }}>Không có địa chỉ !</p>}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Card>

        {hoaDon.trangThai === 15 && (
          <>
            <br></br>
            <br></br>
            <Card>
              <div className="w-auto rounded bg-white border shadow p-4">
                <div className="row">
                  <div className="col-12">
                    <Box sx={{ width: '100%' }}>
                      <Tabs onChange={handleChange} value={value} aria-label="Tabs where selection follows focus" selectionFollowsFocus>
                        <Tab label="Hàng Yêu Cầu Đổi" />
                        <Tab label="Hàng Đổi" />
                        <Tab label="Hàng Lỗi" />
                      </Tabs>
                    </Box>
                  </div>
                </div>
                <hr />
                {/* //table */}
                {value === 0 && (
                  <TableContainer style={{ width: '100%' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell>Mã: </TableCell>
                          <TableCell>Số Hàng Đổi: </TableCell>
                          <TableCell>Tiền Hàng: </TableCell>
                          <TableCell>Trạng Thái: </TableCell>
                          <TableCell>Ngày Tạo: </TableCell>
                          <TableCell>Người Tạo: </TableCell>
                          <TableCell>Ghi Chú: </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {donYCDoi.slice(0, 1).map((n, index) => {
                          const sizeData = n.split(',');
                          const ma = sizeData[0];
                          const tien = sizeData[1];
                          const soHangDoi = sizeData[2];
                          const trangThai = sizeData[3];
                          const ngayTao = sizeData[4];
                          const nguoiTao = sizeData[5];
                          const ghiChu = sizeData[6];

                          return (
                            <React.Fragment key={index}>
                              <TableRow>
                                <TableCell>
                                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen3(!open3)}>
                                    {open3 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                  </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {ma}
                                </TableCell>
                                <TableCell>{soHangDoi}</TableCell>
                                <TableCell>{convertToCurrency(tien)}</TableCell>
                                <TableCell>{trangThai === '0' ? 'Đang đổi hàng' : 'Đổi hàng thành công'}</TableCell>
                                <TableCell>{formatDate(ngayTao)}</TableCell>
                                <TableCell>{nguoiTao}</TableCell>
                                <TableCell>{ghiChu}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                  <Collapse in={open3} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                      <Typography variant="h6" gutterBottom component="div">
                                        Hàng Yêu Cầu Đổi
                                      </Typography>
                                      <Table size="small" aria-label="purchases">
                                        <tr>
                                          <th style={{ paddingLeft: 5 }}>#</th>
                                          <th style={{ paddingLeft: 5 }}>Mã</th>
                                          <th style={{ paddingLeft: 10 }}>Ảnh</th>
                                          <th style={{ paddingLeft: 6 }}>Sản phẩm</th>
                                          <th style={{ paddingLeft: 10 }}>Số lượng</th>
                                          <th style={{ paddingLeft: 5 }}>Đơn giá</th>
                                          <th style={{ paddingLeft: 5 }}>Tổng tiền</th>
                                        </tr>
                                        <tbody>
                                          {spYCDoi.map((d, i) => (
                                            <tr key={i}>
                                              <td>{i + 1}</td>
                                              <td>{d.chiTietSanPham.sanPham.ma}</td>
                                              <td>
                                                <img
                                                  src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                                                  className="product-image"
                                                  style={{ width: '70px', height: '100px' }}
                                                  alt="vai"
                                                />
                                              </td>
                                              <td>
                                                <span style={{ fontWeight: 'bold' }}>{d.chiTietSanPham.sanPham.ten} </span>
                                                <br />
                                                <span style={{ fontStyle: 'italic' }}>{d.chiTietSanPham.kichCo.ten}</span> -{' '}
                                                <span
                                                  className="color-circle"
                                                  style={{
                                                    backgroundColor: d.chiTietSanPham.mauSac.ten,
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                    height: '15px',
                                                    width: '15px'
                                                  }}
                                                ></span>
                                              </td>
                                              <td>
                                                <span style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20, fontStyle: 'italic' }}>
                                                  {d.soLuongYeuCauDoi}
                                                </span>
                                              </td>
                                              <td>{convertToCurrency(d.donGia)}</td>
                                              <td>{convertToCurrency(d.soLuongYeuCauDoi * d.donGia)}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </Table>
                                    </Box>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {value === 1 && (
                  <TableContainer style={{ width: '100%' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell>Mã: </TableCell>
                          <TableCell>Số Hàng Đổi: </TableCell>
                          <TableCell>Tiền Hàng: </TableCell>
                          <TableCell>Trạng Thái: </TableCell>
                          <TableCell>Ngày Tạo: </TableCell>
                          <TableCell>Người Tạo: </TableCell>
                          <TableCell>Ghi Chú: </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {donDoi.slice(0, 1).map((n, index) => {
                          const sizeData = n.split(',');
                          const ma = sizeData[0];
                          const tien = sizeData[1];
                          const soHangDoi = sizeData[2];
                          const trangThai = sizeData[3];
                          const ngayTao = sizeData[4];
                          const nguoiTao = sizeData[5];
                          const ghiChu = sizeData[6];

                          return (
                            <React.Fragment key={index}>
                              <TableRow>
                                <TableCell>
                                  <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                    {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                  </IconButton>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                  {ma}
                                </TableCell>
                                <TableCell>{soHangDoi}</TableCell>
                                <TableCell>{convertToCurrency(tien)}</TableCell>
                                <TableCell>{trangThai === '0' ? 'Đang đổi hàng' : 'Đổi hàng thành công'}</TableCell>
                                <TableCell>{formatDate(ngayTao)}</TableCell>
                                <TableCell>{nguoiTao}</TableCell>
                                <TableCell>{ghiChu}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                  <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Box sx={{ margin: 1 }}>
                                      <Typography variant="h6" gutterBottom component="div">
                                        Hàng Đổi
                                      </Typography>
                                      <Table size="small" aria-label="purchases">
                                        <tr>
                                          <th style={{ paddingLeft: 5 }}>#</th>
                                          <th style={{ paddingLeft: 5 }}>Mã</th>
                                          <th style={{ paddingLeft: 10 }}>Ảnh</th>
                                          <th style={{ paddingLeft: 6 }}>Sản phẩm</th>
                                          <th style={{ paddingLeft: 10 }}>Số lượng</th>
                                          <th style={{ paddingLeft: 5 }}>Đơn giá</th>
                                          <th style={{ paddingLeft: 5 }}>Tổng tiền</th>
                                        </tr>
                                        <tbody>
                                          {spDoiHang.map((d, i) => (
                                            <tr key={i}>
                                              <td>{i + 1}</td>
                                              <td>{d.chiTietSanPham.sanPham.ma}</td>
                                              <td>
                                                <img
                                                  src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                                                  className="product-image"
                                                  style={{ width: '70px', height: '100px' }}
                                                  alt="vai"
                                                />
                                              </td>
                                              <td>
                                                <span style={{ fontWeight: 'bold' }}>{d.chiTietSanPham.sanPham.ten} </span>
                                                <br />
                                                <span style={{ fontStyle: 'italic' }}>{d.chiTietSanPham.kichCo.ten}</span> -{' '}
                                                <span
                                                  className="color-circle"
                                                  style={{
                                                    backgroundColor: d.chiTietSanPham.mauSac.ten,
                                                    display: 'inline-block',
                                                    verticalAlign: 'middle',
                                                    height: '15px',
                                                    width: '15px'
                                                  }}
                                                ></span>
                                              </td>
                                              <td>
                                                <span style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20, fontStyle: 'italic' }}>
                                                  {d.soLuongHangDoi}
                                                </span>
                                              </td>
                                              <td>{convertToCurrency(d.donGia)}</td>
                                              <td>{convertToCurrency(d.soLuongHangDoi * d.donGia)}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </Table>
                                    </Box>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                {value === 2 && (
                  <TableContainer style={{ width: '100%' }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell />
                          <TableCell>Mã: </TableCell>
                          <TableCell>Số Hàng Lỗi: </TableCell>
                          <TableCell>Ngày Tạo: </TableCell>
                          <TableCell>Người Tạo: </TableCell>
                          <TableCell>Ghi Chú: </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {donLoi.slice(0, 1).map((l, index) => (
                          <React.Fragment key={index}>
                            <TableRow>
                              <TableCell>
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen2(!open2)}>
                                  {open2 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                              </TableCell>
                              <TableCell component="th" scope="row">
                                {l.ma}
                              </TableCell>
                              <TableCell>{l.soHangLoi}</TableCell>
                              <TableCell>{formatDate(l.ngayTao)}</TableCell>
                              <TableCell>{l.nguoiTao}</TableCell>
                              <TableCell>{l.ghiChu}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                <Collapse in={open2} timeout="auto" unmountOnExit>
                                  <Box sx={{ margin: 1 }}>
                                    <Typography variant="h6" gutterBottom component="div">
                                      Hàng Lỗi
                                    </Typography>
                                    <Table size="small" aria-label="purchases">
                                      <tr>
                                        <th style={{ paddingLeft: 5 }}>#</th>
                                        <th style={{ paddingLeft: 5 }}>Mã</th>
                                        <th style={{ paddingLeft: 10 }}>Ảnh</th>
                                        <th style={{ paddingLeft: 6 }}>Sản phẩm</th>
                                        <th style={{ paddingLeft: 10 }}>Số lượng</th>
                                        <th style={{ paddingLeft: 5 }}>Đơn giá</th>
                                        <th style={{ paddingLeft: 5 }}>Tổng tiền</th>
                                      </tr>
                                      <tbody>
                                        {spLoi.map((d, i) => (
                                          <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{d.chiTietSanPham.sanPham.ma}</td>
                                            <td>
                                              <img
                                                src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                                                className="product-image"
                                                style={{ width: '70px', height: '100px' }}
                                                alt="vai"
                                              />
                                            </td>
                                            <td>
                                              <span style={{ fontWeight: 'bold' }}>{d.chiTietSanPham.sanPham.ten} </span>
                                              <br />
                                              <span style={{ fontStyle: 'italic' }}>{d.chiTietSanPham.kichCo.ten}</span> -{' '}
                                              <span
                                                className="color-circle"
                                                style={{
                                                  backgroundColor: d.chiTietSanPham.mauSac.ten,
                                                  display: 'inline-block',
                                                  verticalAlign: 'middle',
                                                  height: '15px',
                                                  width: '15px'
                                                }}
                                              ></span>
                                            </td>
                                            <td>
                                              <span style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20, fontStyle: 'italic' }}>
                                                {d.soLuongHangLoi}
                                              </span>
                                            </td>
                                            <td>{convertToCurrency(d.donGia)}</td>
                                            <td>{convertToCurrency(d.soLuongHangLoi * d.donGia)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </Table>
                                  </Box>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </div>
            </Card>
          </>
        )}

        <br></br>
        <br></br>
        <Card>
          <div className="w-auto rounded bg-white border shadow p-4">
            <div className="row">
              <div className="col-12">
                <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="card-box">
                  <div style={{ display: 'flex', justifyContent: 'start' }} className="col-7">
                    <h3 className="col-6" style={{ fontWeight: 'bold', color: 'crimson' }}>
                      Sản Phẩm
                    </h3>
                  </div>

                  <div className="col-5">
                    <div style={{ display: 'flex', justifyContent: 'end' }} className="export-form">
                      {(hoaDon.trangThai === 0 || hoaDon.trangThai === 1) && hoaDon.loaiDon === 1 && (
                        <button onClick={handleShow6} className="relative inline-block text-base group">
                          <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                            <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                            <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                            <span className="relative">Thêm sản phẩm</span>
                          </span>
                          <span
                            className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                            data-rounded="rounded-lg"
                          ></span>
                        </button>
                      )}
                      <Modal
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        style={{ marginLeft: 150 }}
                        show={show6}
                        onHide={handleClose6}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title-vcenter" style={{ marginLeft: 300 }}>
                            Thêm Sản Phẩm
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="box col-auto col-6">
                            <div className="search">
                              <input
                                style={{ borderRadius: 15, width: 900, height: 35 }}
                                type="text"
                                className="input-search results-list"
                                placeholder="Nhập mã hoặc tên sản phẩm cần tìm..."
                                value={term}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                          <section className="navbar-expand-lg navbar-light bg-light">
                            <div>
                              <div className="results-list">
                                <Table hover>
                                  <tbody>
                                    {dataSP.length > 0 ? (
                                      dataSP.map((d, i) => (
                                        <tr key={i} onClick={() => handleAddSoLuong(d.id, d.sanPham.id)} style={{ cursor: 'pointer' }}>
                                          <td>
                                            <img
                                              src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
                                              className="product-image"
                                              style={{ width: '70px', height: '100px' }}
                                              alt='"none"'
                                            />
                                          </td>
                                          <td>{d.sanPham.ma}</td>
                                          <td>{d.sanPham.ten}</td>
                                          <td>{d.soLuong || 0}</td>
                                          <td>{convertToCurrency(d.giaBan)}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan={5}>Không có dữ liệu</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </Table>

                                <Modal
                                  show={show7}
                                  onHide={handleClose7}
                                  style={{ marginLeft: 150 }}
                                  backdrop="static"
                                  keyboard={false}
                                  size="md"
                                  aria-labelledby="contained-modal-title-vcenter"
                                  centered
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Chọn loại của sản phẩm</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <div className="body-add-new">
                                      <div className="mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label">
                                          Thuộc tính
                                        </label>
                                        {mauSacKC.map((d, i) => (
                                          <div className="form-check" key={i}>
                                            <input
                                              className="form-check-input"
                                              type="radio"
                                              name="flexRadioDefault"
                                              id={d.id}
                                              value={d.id}
                                              checked={d.id === dataDetail.id}
                                              onChange={() => handleDetail(d.id)}
                                            />
                                            <label className="form-check-label custom-label" htmlFor={d.id}>
                                              <div style={{ backgroundColor: d.mauSac.ten, width: 50, borderRadius: '10px' }}>&nbsp;</div>
                                              &nbsp;- {d.kichCo.ten} - {d.chatLieu.ten} - {d.loaiSanPham.ten} - {d.coAo.ten} -{' '}
                                              {d.nhaSanXuat.ten}
                                            </label>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                          Số lượng:{' '}
                                          <small>
                                            Còn lại <strong>{dataDetail.soLuong}</strong>
                                          </small>
                                        </label>
                                        <input
                                          className="form-control"
                                          id="exampleFormControlTextarea1"
                                          type="number"
                                          onChange={(e) => setValuesAdd({ ...valuesAdd, soLuong: e.target.value })}
                                        ></input>
                                      </div>
                                    </div>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="primary" onClick={() => handleAdd()}>
                                      Thêm
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                              </div>
                            </div>
                          </section>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* noi dung */}
            <div className="table-container">
              <Table hover className="my-4">
                <tr>
                  <th style={{ paddingLeft: 5 }}>#</th>
                  <th style={{ paddingLeft: 5 }}>Mã</th>
                  <th style={{ paddingLeft: 10 }}>Ảnh</th>
                  <th style={{ paddingLeft: 6 }}>Sản phẩm</th>
                  <th style={{ paddingLeft: 10 }}>Số lượng</th>
                  <th style={{ paddingLeft: 5 }}>Đơn giá</th>
                  <th style={{ paddingLeft: 5 }}>Tổng tiền</th>
                </tr>
                <tbody>
                  {valuesSanPham.map((d, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{d.chiTietSanPham.sanPham.ma}</td>
                      <td>
                        <img
                          src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                          className="product-image"
                          style={{ width: '70px', height: '100px' }}
                          alt="vai"
                        />
                      </td>
                      <td>
                        <span style={{ fontWeight: 'bold' }}>{d.chiTietSanPham.sanPham.ten} </span>
                        <br />
                        <span style={{ fontStyle: 'italic' }}>{d.chiTietSanPham.kichCo.ten}</span> -{' '}
                        <span
                          className="color-circle"
                          style={{
                            backgroundColor: d.chiTietSanPham.mauSac.ten,
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            height: '15px',
                            width: '15px'
                          }}
                        ></span>
                      </td>
                      <td>
                        <div className="input-spinner" style={{ width: 120 }}>
                          {(hoaDon.trangThai === 0 || hoaDon.trangThai === 1) && hoaDon.loaiDon === 1 ? (
                            <InputSpinner
                              type={'real'}
                              max={d.chiTietSanPham.soLuong + d.soLuong}
                              min={1}
                              key={d.id}
                              step={1}
                              value={d.soLuong}
                              onChange={(e) => {
                                handleUpdateSl(d.id, d.hoaDon.id, d.chiTietSanPham.id, e);
                              }}
                              variant={'dark'}
                              size="sm"
                            />
                          ) : (
                            <span style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 20, fontStyle: 'italic' }}>{d.soLuong}</span>
                          )}
                        </div>
                        {d.chiTietSanPham.soLuong < 10 && hoaDon.trangThai === 0 ? (
                          <span style={{ color: 'red' }}>
                            Số sản phẩm còn lại: <strong>{d.chiTietSanPham.soLuong}</strong>
                          </span>
                        ) : (
                          ''
                        )}
                      </td>
                      <td>{convertToCurrency(d.donGia)}</td>
                      <td>{convertToCurrency(d.soLuong * d.donGia)}</td>
                      <td>
                        {hoaDon.loaiDon === 1 && (hoaDon.trangThai === 0 || hoaDon.trangThai === 1) && (
                          <button onClick={() => handleDelete(d.id)} className="fa-solid fa-trash mx-3"></button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Container style={{ display: 'flex', justifyContent: 'end' }}>
                <Row style={{ marginBottom: 10 }}>
                  <Col sm={12} className="row">
                    <Col sm={6}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '100px',
                          fontSize: '15px',
                          fontWeight: 'bold'
                        }}
                      >
                        Tiền hàng:
                      </span>
                    </Col>
                    <Col sm={6}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '100px',
                          fontSize: '15px'
                        }}
                      >
                        {convertToCurrency(totalAmount)}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>

              <br></br>

              {/* {hoaDon && hoaDon.tienShip !== 0 && ( */}
              <Container style={{ display: 'flex', justifyContent: 'end' }}>
                <Row style={{ marginBottom: 10 }}>
                  <Col sm={12} className="row">
                    <Col sm={6}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '100px',
                          fontSize: '15px',
                          fontWeight: 'bold',
                          paddingTop: 20
                        }}
                      >
                        Phí ship:
                      </span>
                    </Col>
                    <Col sm={6}>
                      {(hoaDon && hoaDon.trangThai === 0) || hoaDon.trangThai === 1 ? (
                        <TextField
                          id="standard-basic"
                          label="Tiền ship"
                          variant="standard"
                          style={{
                            display: 'inline-block',
                            width: '100px',
                            fontSize: '15px',
                            fontWeight: 'bold'
                          }}
                          type="number"
                          value={hoaDon.tienShip}
                          onChange={handleTienShipChange}
                        />
                      ) : (
                        <span
                          style={{
                            display: 'inline-block',
                            width: '100px',
                            fontSize: '15px',
                            paddingTop: 20
                          }}
                        >
                          {convertToCurrency(hoaDon.tienShip)}
                        </span>
                      )}
                    </Col>
                  </Col>
                </Row>
              </Container>
              {/* )} */}
              <br></br>

              {dataHDKM && dataHDKM.length > 0 && (
                <Container style={{ display: 'flex', justifyContent: 'end' }}>
                  <Row style={{ marginBottom: 10 }}>
                    <Col sm={12} className="row">
                      <Col sm={6}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '100px',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            color: 'red',
                            fontStyle: 'italic'
                          }}
                        >
                          Khuyến mãi:
                        </span>
                      </Col>
                      <Col sm={6}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '100px',
                            fontSize: '15px',
                            color: 'red',
                            fontStyle: 'italic'
                          }}
                        >
                          {dataHDKM.map((d, i) => (
                            <tr key={i} style={{ color: 'red' }}>
                              <td>- {convertToCurrency(d.tienGiam)}</td>
                            </tr>
                          ))}
                        </span>
                      </Col>
                    </Col>
                  </Row>
                </Container>
              )}

              <br></br>
              <Container style={{ display: 'flex', justifyContent: 'end' }}>
                <Row style={{ marginBottom: 10 }}>
                  <Col sm={12} className="row">
                    <Col sm={6}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '150px',
                          fontSize: '22px',
                          fontWeight: 'bold'
                        }}
                      >
                        Tổng tiền:
                      </span>
                    </Col>
                    <Col sm={6}>
                      <span
                        style={{
                          display: 'inline-block',
                          width: '100px',
                          fontSize: '22px',
                          fontWeight: 'bold'
                        }}
                      >
                        {convertToCurrency(tongTienKhiGiam)}{' '}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Card>
      </MainCard>
    </>
  );
}

export default DonHangCT;
