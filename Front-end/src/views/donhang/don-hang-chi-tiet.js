/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../../scss/TimeLine.scss';
import '../../scss/TableMSKC.scss';
import '../../scss/SearchResult.scss';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { detailCTSP, getAllByIdSPTT } from 'services/SanPhamService';
import Modal from 'react-bootstrap/Modal';
import { getTP, getQH, getP, getFee, getServices } from 'services/ApiGHNService';
import {
  detailHD,
  detailLSHD,
  xacNhanDH,
  huyDonHang,
  xacNhanGiao,
  xacNhanThanhToan,
  getById,
  deleteHDCT,
  updateSL,
  getAllSP,
  searchCTSPofDH,
  addSP,
  getKmById,
  giaoHangThanhCong,
  giaoHangThatBai,
  updateHoaDon
} from 'services/ServiceDonHang';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import '../../scss/ErrorMessage.scss';
import InputSpinner from 'react-bootstrap-input-spinner';

function DonHangCT() {
  const { id } = useParams();
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
  const [inputDetail, setInputDetail] = useState(null);
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
    if (parseInt(valuesAdd.soLuong) > parseInt(dataDetail.soLuong)) {
      toast.error('Đã vượt quá số lượng hiện có !');
      return;
    }
    add(valuesAdd);
    getAllById(id);
  };

  const add = async (value) => {
    const res = await addSP(value);
    if (res) {
      toast.success('Thêm sản phẩm thành công');
      getAllById(id);
      handleCloseSPofDH();
    }
  };

  const handleCloseSPofDH = () => {
    setShow7(false);
    // chuachac dong
    setShow6(false);
    //
    setInputDetail(null);
    inputDetail(null);
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
    setInputDetail(id);
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

  useEffect(() => {
    if (valuesServices.to_district !== 0) {
      getService(valuesServices);
    }
  }, [valuesServices]);

  useEffect(() => {
    if (valuesFee.service_id !== 0) {
      fee(valuesFee);
    }
  }, [valuesFee.to_ward_code]);

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
  const [show5, setShow5] = useState(false);
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

  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const handleClose6 = () => setShow6(false);
  const handleShow6 = () => setShow6(true);

  const handleClose7 = () => setShow7(false);
  // const handleShow7 = () => setShow7(true);

  const handleClose8 = () => setShow8(false);
  const handleShow8 = () => setShow8(true);

  const handleClose9 = () => setShow9(false);
  const handleShow9 = () => setShow9(true);

  const [lshd, setLshd] = useState({
    ghiChu: ''
  });

  const [lshd1, setLshd1] = useState({
    ghiChu: ''
  });

  const [lshd2, setLshd2] = useState({
    ghiChu: ''
  });

  const [lshd3, setLshd3] = useState({
    ghiChu: ''
  });

  const [lshd4, setLshd4] = useState({
    ghiChu: ''
  });

  const [lshd5, setLshd5] = useState({
    ghiChu: ''
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
    const res = await xacNhanDH(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow2(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanDH = async (event) => {
    event.preventDefault();
    await xacNhan(id, lshd);
  };

  // huy don
  const huyDon = async (id, value) => {
    const res = await huyDonHang(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow3(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleHuyDon = async (event) => {
    event.preventDefault();
    await huyDon(id, lshd1);
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

  // xac nhan thanh toan

  const thanhToan = async (id, value) => {
    const res = await xacNhanThanhToan(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow5(false);
      detail(id);
      detailListLSHD(id);
    }
  };

  const handleXacNhanThanhToan = async (event) => {
    event.preventDefault();
    await thanhToan(id, lshd3);
  };
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
    setValuesFee({
      ...valuesFee,
      to_district_id: parseInt(event.target.value, 10)
    });
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
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setSelectedWard(event.target.value);
    setValuesFee({
      ...valuesFee,
      insurance_value: totalAmount,
      to_ward_code: event.target.value
    });
    // setTgDuKien({
    //   ...tgDuKien,
    //   to_ward_code: event.target.value
    // });
    setTongTienKhiGiam(totalAmount - totalGiam + hoaDon.tienShip);
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

  const getService = async (value) => {
    try {
      const res = await getServices(value);
      if (res) {
        setValuesFee({
          ...valuesFee,
          service_id: res.data.data[0].service_id
        });
        // setTgDuKien({
        //   ...tgDuKien,
        //   service_id: res.data.data[0].service_id
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fee = async (value) => {
    try {
      const res = await getFee(value);
      if (res) {
        const total = res.data.data.total;
        setHoaDon({
          ...hoaDon,
          tienShip: total
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                                          <i style={{ color: 'red' }} className="fa-solid fa-xmark fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 3 && (
                                          <i style={{ color: 'orange' }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 4 && (
                                          <i style={{ color: 'darkblue' }} className="fa-solid fa-check-double fa-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 5 && (
                                          <i style={{ color: 'red' }} className="fa-solid fa-xmark fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 6 && (
                                          <i style={{ color: 'green' }} className="fa-regular fa-circle-check fa-beat fa-lg"></i>
                                        )}
                                      </div>
                                    </td>
                                    <td style={{ fontSize: '12px', justifyContent: 'center', display: 'flex' }} className="align-middle">
                                      {item.trangThai === 0 && (
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
                                          Đang chờ xác nhận
                                        </span>
                                      )}
                                      {item.trangThai === 1 && (
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
                                          className="btn btn-labeled shadow-button btn btn-secondary status-pending"
                                        >
                                          Chờ giao hàng
                                        </span>
                                      )}
                                      {item.trangThai === 2 && (
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
                                          className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
                                        >
                                          Đã hủy đơn
                                        </span>
                                      )}

                                      {item.trangThai === 3 && (
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
                                          Đang giao hàng
                                        </span>
                                      )}
                                      {item.trangThai === 4 && (
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
                                          className="btn btn-labeled shadow-button btn btn-info status-completed"
                                        >
                                          Giao hàng thành công
                                        </span>
                                      )}
                                      {item.trangThai === 5 && (
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
                                          className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
                                        >
                                          Giao hàng thất bại
                                        </span>
                                      )}
                                      {item.trangThai === 6 && (
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
                                          className="btn btn-labeled shadow-button btn btn-info status-completed"
                                        >
                                          Thanh toán thành công
                                        </span>
                                      )}
                                    </td>
                                    <td>{formatDate(item.ngayTao)}</td>
                                    {/* <td>{item.hoaDon.nhanVien.ten}</td> */}
                                    <td>Phạm Quốc Việt</td>
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
                                  style={lshd.hoaDon.trangThai === 2 ? { backgroundColor: 'orangered', color: 'white' } : {}}
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
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-xmark fa-beat fa-xl"></i>
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
                {hoaDon.trangThai === 0 && (
                  <button onClick={handleShow2} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Xác nhận</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}

                {/* //xac nhan giao hang */}
                {hoaDon.trangThai === 1 && (
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
                {hoaDon.trangThai === 3 && (
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

                {/* //xac nhan thanh toan */}
                {hoaDon.trangThai === 4 && (
                  <button onClick={handleShow5} className="relative inline-block text-base group">
                    <span className="relative z-10 block px-8 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                      <span className="absolute inset-0 w-full h-full px-8 py-3 rounded-lg bg-gray-50"></span>
                      <span className="absolute left-0 w-48 h-48 -ml-5 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                      <span className="relative">Thanh toán</span>
                    </span>
                    <span
                      className="absolute bottom-0 right-0 w-full h-10 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0"
                      data-rounded="rounded-lg"
                    ></span>
                  </button>
                )}
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
                            setLshd({ ghiChu: e.target.value });
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
                            setLshd2({ ghiChu: e.target.value });
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
                            setLshd4({ ghiChu: e.target.value });
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
              {/* //xac nhan thanh toan */}
              <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show5} onHide={handleClose5}>
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
                          value={lshd3.ghiChu}
                          onChange={(e) => {
                            setLshd3({ ghiChu: e.target.value });
                          }}
                        ></textarea>
                      </div>
                    </div>
                    <br></br>
                    <div className="text-center">
                      <button
                        onClick={handleXacNhanThanhToan}
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
                {(hoaDon.trangThai === 0 || hoaDon.trangThai === 1) && (
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
                              setLshd1({ ghiChu: e.target.value });
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
                              setLshd5({ ghiChu: e.target.value });
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
                          {hoaDon.trangThai === 0 && (
                            <button onClick={handleShow} className="btn btn-dark" data-bs-placement="right">
                              <i className="fa-solid fa-pen-to-square fa-bounce fa-lg"></i>
                              <span> | </span>
                              <span>Cập Nhật</span>
                            </button>
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
                                  <select id="district" className="form-select fsl" onChange={(e) => handleDistrictChange(e)}>
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
                                  <select id="ward" className="form-select fsl" onChange={handleWardChange}>
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
                        {hoaDon.nhanVien && hoaDon.nhanVien.ten ? hoaDon.nhanVien.ten : ''}
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
                              justifyContent: 'center'
                            }}
                            className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
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
                              justifyContent: 'center'
                            }}
                            className="btn btn-labeled shadow-button btn btn-info status-completed"
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
                              justifyContent: 'center'
                            }}
                            className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
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
                        {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.ten ? hoaDon.hinhThucThanhToan.ten : ''}
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
                        {hoaDon.soDienThoai}
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
                        {hoaDon.ghiChu}
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
                        {hoaDon.diaChi}, {hoaDon.xa}, {hoaDon.huyen}, {hoaDon.tinh}
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Container>
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
                    <h3 className="col-6" style={{ fontWeight: 'bold', color: 'crimson' }}>
                      Sản Phẩm
                    </h3>
                  </div>

                  <div className="col-5">
                    <div style={{ display: 'flex', justifyContent: 'end' }} className="export-form">
                      {(hoaDon.trangThai === 0 || hoaDon.trangThai === 1) && (
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
                          {hoaDon.trangThai === 0 || hoaDon.trangThai === 1 ? (
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
                        {(hoaDon.trangThai === 0 || hoaDon.trangThai === 1) && (
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

              {hoaDon && hoaDon.tienShip !== 0 && (
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
                          Phí ship:
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
                          {convertToCurrency(hoaDon.tienShip)}
                        </span>
                      </Col>
                    </Col>
                  </Row>
                </Container>
              )}
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
