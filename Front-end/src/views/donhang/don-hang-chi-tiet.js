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
import { detailCTSP, getAllByIdSP } from 'services/SanPhamService';
import Modal from 'react-bootstrap/Modal';
import {
  detailHD,
  detailLSHD,
  updateKHDH,
  xacNhanDH,
  huyDonHang,
  xacNhanGiao,
  xacNhanThanhToan,
  getById,
  deleteHDCT,
  updateSL,
  getAllSP,
  searchCTSPofDH,
  addSP
} from 'services/ServiceDonHang';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from 'react-bootstrap';
import * as yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import '../../scss/ErrorMessage.scss';
import InputSpinner from 'react-bootstrap-input-spinner';

const schema = yup.object().shape({
  tenNguoiNhan: yup
    .string()
    .required('Tên không được để trống')
    .matches(/^[a-zA-Z\s]{1,20}$/, 'Tên không hợp lệ, tối đa 20 ký tự'),
  soDienThoai: yup
    .string()
    .required('Số điện thoại không được để trống')
    .matches(/^0\d{9}$/, 'Số điện thoại không hợp lệ'),
  diaChi: yup.string().required('Địa chỉ không được để trống').max(250, 'Địa chỉ tối đa 250 ký tự')
});

function DonHangCT() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lichSuHoaDon, setLichSuHoaDon] = useState([]);

  //sp
  const [valuesSanPham, setValuesSanPham] = useState([]);
  const [inputDetail, setInputDetail] = useState(null);
  const [dataSP, setDataSP] = useState([]);
  const [mauSacKC, setMauSacKC] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  const [idHDCT, setIdHDCT] = useState('');
  const [idSP, setidSP] = useState('');
  const [idCTSP, setidCTSP] = useState('');
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getAllById = async (idHD) => {
    const res = await getById(idHD);
    if (res) {
      setValuesSanPham(res.data);
    }
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
  };

  useEffect(() => {
    update(idHDCT, valuesUpdate);
  }, [valuesUpdate]);

  const update = async (idHDCT, values) => {
    const res = await updateSL(idHDCT, values);
    if (res) {
      getAllById(id);
    }
  };

  // kcmssp
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

  console.log(valuesAdd);

  useEffect(() => {
    getAllMSKC(idSP);
  }, [idSP]);

  useEffect(() => {
    detail2(idCTSP);
  }, [idCTSP]);

  const detail2 = async (idCTSP) => {
    const res = await detailCTSP(idCTSP);
    if (res) {
      setDataDetail(res.data);
    }
  };

  const getAllMSKC = async (id) => {
    let res = await getAllByIdSP(id);
    if (res) {
      setMauSacKC(res.data);
    }
  };

  // modal
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);
  const [show6, setShow6] = useState(false);
  const [show7, setShow7] = useState(false);

  // const handleClose = () => {
  //   setShow(false);
  // };
  const handleShow = () => setShow(true);

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

  // cap nhat khach hang
  const [values, setValues] = useState({
    tenNguoiNhan: '',
    diaChi: '',
    soDienThoai: ''
  });

  const updateKH = async (id, value) => {
    const res = await updateKHDH(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      setShow(false);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    let validationErrors = {}; // Tạo một đối tượng để lưu trữ lỗi

    try {
      await schema.validate(values, { abortEarly: false });
      await updateKH(id, values);
    } catch (error) {
      if (error.inner) {
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message; // Lưu trữ lỗi vào đối tượng validationErrors
        });
      }

      const errorMessage = `
        <div>
          <strong>Thông tin không hợp lệ:</strong>
          <ul>
            <li>Trường " Họ và Tên ":
              <ul>
                <li>Không được để trống.</li>
                <li>Không được chứa ký tự đặc biệt hoặc số.</li>
                <li>Tối đa 20 ký tự.</li>
              </ul>
            </li>
            <li>Trường " Số điện thoại ":
              <ul>
                <li>Không được để trống.</li>
                <li>Phải là số.</li>
                <li>Phải bắt đầu bằng số 0.</li>
                <li>Tối đa 10 ký tự.</li>
              </ul>
            </li>
            <li>Trường " Địa chỉ ":
              <ul>
                <li>Không được để trống.</li>
                <li>Tối đa 250 ký tự.</li>
              </ul>
            </li>
          </ul>
        </div>
      `;

      toast.error(<div dangerouslySetInnerHTML={{ __html: errorMessage }} />, {
        autoClose: 3000,
        className: 'custom-toast-error'
      });
    }
  };

  // detailHD
  const [hoaDon, setHoaDon] = useState({});

  useEffect(() => {
    detail(id);
    detailListLSHD(id);
  }, [id]);

  useEffect(() => {
    setValues(hoaDon);
  }, [hoaDon]);

  const detail = async (id) => {
    const res = await detailHD(id);
    if (res && res.data) {
      setHoaDon(res.data);
    }
  };

  // getListLSHDbyIDHD
  const detailListLSHD = async (id) => {
    const res = await detailLSHD(id);
    if (res && res.data) {
      setLichSuHoaDon(res.data);
      console.log(lichSuHoaDon);
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
                                          <i style={{ color: 'gray' }} className="fa-solid fa-spinner fa-spin fa-lg"></i>
                                        )}
                                        {item.trangThai === 1 && (
                                          <i style={{ color: 'blue' }} className="fa-solid fa-check fa-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 2 && (
                                          <i style={{ color: 'red' }} className="fa-solid fa-xmark fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 3 && (
                                          <i style={{ color: 'gray' }} className="fa-solid fa-spinner fa-spin fa-lg"></i>
                                        )}
                                        {item.trangThai === 4 && (
                                          <i style={{ color: 'orange' }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 5 && (
                                          <i style={{ color: 'darkblue' }} className="fa-solid fa-check-double fa-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 6 && (
                                          <i style={{ color: 'red' }} className="fa-solid fa-xmark fa-beat-fade fa-lg"></i>
                                        )}
                                        {item.trangThai === 7 && (
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
                                          className="btn btn-labeled shadow-button btn btn-primary status-completed"
                                        >
                                          Đã xác nhận
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
                                          className="btn btn-labeled shadow-button btn btn-secondary status-pending"
                                        >
                                          Chờ giao hàng
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
                                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                                        >
                                          Đang giao hàng
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
                                          className="btn btn-labeled shadow-button btn btn-info status-completed"
                                        >
                                          Giao hàng thành công
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
                                          className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
                                        >
                                          Giao hàng thất bại
                                        </span>
                                      )}
                                      {item.trangThai === 7 && (
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
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-spinner fa-spin fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 1 && (
                            <li className={`timeline-item mini`}>
                              <div className="p-timeline-item">
                                <span className="p-timeline-date">{lshd.ten}</span>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 1 ? { backgroundColor: '#0ad406', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-regular fa-circle-check fa-beat fa-xl"></i>
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
                                <time className="p-timeline-date">Chờ giao hàng</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 3 ? { backgroundColor: 'yellow', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-spinner fa-spin fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 4 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">{lshd.ten}</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 4 ? { backgroundColor: 'yellow', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 5 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <span className="p-timeline-date">Giao hàng thành công</span>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 5 ? { backgroundColor: '#0ad406', color: 'black' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-check-double fa-beat fa-xl"></i>
                                </div>
                              </div>
                            </li>
                          )}
                          {lshd.trangThai === 6 && (
                            <li className="timeline-item bmw">
                              <div className="p-timeline-item">
                                <time className="p-timeline-date">Giao hàng thất bại</time>
                                <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                                <div
                                  style={lshd.hoaDon.trangThai === 6 ? { backgroundColor: 'orangered', color: 'white' } : {}}
                                  className="p-timeline-block"
                                >
                                  <i style={{ marginTop: 27 }} className="fa-solid fa-xmark fa-beat fa-xl"></i>
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
                                  style={lshd.hoaDon.trangThai === 7 ? { backgroundColor: 'aqua', color: 'black' } : {}}
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
              <div className="col-3">
                {hoaDon.trangThai === 0 && (
                  <button
                    onClick={handleShow2}
                    style={{
                      background: '#0ad406',
                      borderRadius: '50px',
                      border: '1px solid black',
                      justifyItems: 'center'
                    }}
                    type="button"
                    className="btn btn-labeled shadow-button"
                  >
                    <span style={{ marginBottom: '3px', color: 'black' }} className="btn-icon">
                      <i className="fa-regular fa-square-check fa-beat fa-lg"></i>
                    </span>
                    <span style={{ marginBottom: '3px', color: 'black', marginLeft: '5px' }} className="separator">
                      |
                    </span>
                    <span
                      style={{
                        marginBottom: '3px',
                        marginLeft: '5px',
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 'bold'
                      }}
                      className="btn-text"
                    >
                      Xác nhận đơn hàng
                    </span>
                  </button>
                )}

                {/* //xac nhan giao hang */}
                {hoaDon.trangThai === 1 && (
                  <button
                    onClick={handleShow4}
                    style={{
                      background: 'yellow',
                      borderRadius: '50px',
                      border: '1px solid black',
                      justifyItems: 'center',
                      marginLeft: '5px'
                    }}
                    type="button"
                    className="btn btn-labeled shadow-button"
                  >
                    <span style={{ marginBottom: '3px', color: 'black' }} className="btn-icon">
                      <i className="fa-regular fa-square-check fa-beat fa-lg"></i>
                    </span>
                    <span style={{ marginBottom: '3px', color: 'black', marginLeft: '5px' }} className="separator">
                      |
                    </span>
                    <span
                      style={{
                        marginBottom: '3px',
                        color: 'black',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        marginLeft: '5px'
                      }}
                      className="btn-text"
                    >
                      Xác nhận giao hàng
                    </span>
                  </button>
                )}
                {/* //xac nhan thanh toan */}

                {hoaDon.trangThai === 4 && (
                  <button
                    onClick={handleShow5}
                    style={{
                      background: '#FF00FF',
                      borderRadius: '50px',
                      border: '1px solid black',
                      justifyItems: 'center'
                    }}
                    type="button"
                    className="btn btn-labeled shadow-button"
                  >
                    <span style={{ marginBottom: '3px', color: 'white' }} className="btn-icon">
                      <i className="fa-regular fa-square-check fa-beat fa-lg"></i>
                    </span>
                    <span style={{ marginBottom: '3px', color: 'white', marginLeft: '5px' }} className="separator">
                      |
                    </span>
                    <span
                      style={{
                        marginBottom: '3px',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        marginLeft: '5px'
                      }}
                      className="btn-text"
                    >
                      Xác nhận thanh toán
                    </span>
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
                {hoaDon.trangThai === 0 && (
                  <button
                    onClick={handleShow3}
                    style={{
                      background: 'orangered',
                      borderRadius: '50px',
                      border: '1px solid black',
                      justifyItems: 'center'
                    }}
                    type="button"
                    className="btn btn-labeled shadow-button"
                  >
                    <span style={{ marginBottom: '3px', color: 'white' }} className="btn-icon">
                      <i className="fa-solid fa-xmark fa-fade fa-lg"></i>
                    </span>
                    <span style={{ marginBottom: '3px', color: 'white', marginLeft: '5px' }} className="separator">
                      |
                    </span>
                    <span
                      style={{
                        marginBottom: '3px',
                        color: 'white',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        marginLeft: '5px'
                      }}
                      className="btn-text"
                    >
                      Hủy đơn hàng
                    </span>
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

                    <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show} onHide={handleUpdate}>
                      <Modal.Header onClick={handleUpdate}>
                        <Modal.Title style={{ marginLeft: 120 }}>Cập Nhật Khách Hàng</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form className="needs-validation" noValidate onSubmit={handleUpdate}>
                          <div className="form-group row">
                            <label style={{ fontWeight: 'bold' }} htmlFor="tenNguoiNhan" className="col-sm-3 col-form-label">
                              Họ Và Tên:
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                name="tenNguoiNhan"
                                placeholder=""
                                value={hoaDon.tenNguoiNhan}
                                onChange={(e) => {
                                  setHoaDon({ ...hoaDon, tenNguoiNhan: e.target.value });
                                }}
                                required
                                pattern="^[a-zA-Z\s]{1,20}$"
                                title="Tên không được để trống, không chứa ký tự đặc biệt và số, tối đa 20 ký tự"
                              />
                              <div className="invalid-feedback">Tên không hợp lệ!</div>
                            </div>
                          </div>
                          <br></br>
                          <div className="form-group row">
                            <label style={{ fontWeight: 'bold' }} htmlFor="soDienThoai" className="col-sm-3 col-form-label">
                              Số Điện Thoại:
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="tel"
                                className="form-control"
                                name="soDienThoai"
                                placeholder=""
                                value={hoaDon.soDienThoai}
                                onChange={(e) => {
                                  setHoaDon({ ...hoaDon, soDienThoai: e.target.value });
                                }}
                                required
                                pattern="^0\d{9}$"
                                title="Số điện thoại không được để trống, phải là số, và bắt đầu bằng số 0"
                              />
                              <div className="invalid-feedback">Số điện thoại không hợp lệ!</div>
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
                                placeholder=""
                                value={hoaDon.diaChi}
                                onChange={(e) => {
                                  setHoaDon({ ...hoaDon, diaChi: e.target.value });
                                }}
                                required
                                maxLength="250"
                                title="Địa chỉ không được để trống, tối đa 250 ký tự"
                              ></textarea>
                              <div className="invalid-feedback">Địa chỉ không hợp lệ!</div>
                            </div>
                          </div>
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
            {hoaDon && (
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
                          {/* {hoaDon.nhanVien && hoaDon.nhanVien.ten ? hoaDon.nhanVien.ten : ''} */}
                          Phạm Quốc Việt
                        </span>
                      </Col>
                    </Col>
                  </Row>
                </Container>

                <br />

                <Container>
                  <Row style={{ marginBottom: 10 }}>
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
                          Tổng Tiền:
                        </span>
                      </Col>
                      <Col sm={3}>
                        <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>
                          {convertToCurrency(hoaDon.tongTien)}
                        </span>
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
                                borderRadius: '20px',
                                display: 'flex',
                                fontWeight: 'bold',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              className="btn btn-labeled shadow-button btn btn-primary status-completed"
                            >
                              Đã xác nhận
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
                              className="btn btn-labeled shadow-button btn btn-secondary status-pending"
                            >
                              Chờ giao hàng
                            </span>
                          )}
                          {hoaDon.trangThai === 4 && (
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
                          {hoaDon.trangThai === 5 && (
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
                              className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
                            >
                              Giao hàng thất bại
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
                            width: '200px',
                            fontSize: '15px',
                            fontWeight: 'bold'
                          }}
                        >
                          Khách Hàng:
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
                          {hoaDon.diaChi}
                        </span>
                      </Col>
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
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
                    <h3 className="col-6" style={{ fontWeight: 'bold', color: 'black' }}>
                      Lịch Sử Thanh Toán
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* noi dung */}
            <section className="navbar-expand-lg navbar-light bg-light">
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Table id="myTable" className="table table-hover" style={{ textAlign: 'center' }}>
                  <thead>
                    <tr style={{ textAlign: 'center' }}>
                      <th>Số Tiền</th>
                      <th>Trạng Thái</th>
                      <th>Thời gian</th>
                      <th>Phương thức</th>
                      <th>Người xác nhận</th>
                      <th>Ghi chú</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hoaDon && (
                      <tr>
                        <td>
                          {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.tien
                            ? convertToCurrency(hoaDon.hinhThucThanhToan.tien)
                            : ''}
                        </td>
                        <td style={{ fontSize: '12px', justifyContent: 'center', display: 'flex' }} className="align-middle">
                          {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.trangThai === 0 && (
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
                              Đang chờ thanh toán
                            </span>
                          )}
                          {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.trangThai === 1 && (
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
                              className="btn btn-labeled shadow-button btn btn-primary status-completed"
                            >
                              Đã thanh toán
                            </span>
                          )}
                          {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.trangThai === 2 && (
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
                              className="btn btn-labeled shadow-button btn btn-danger status-completed"
                            >
                              Thanh toán thất bại
                            </span>
                          )}
                        </td>
                        <td>
                          {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.ngaySua ? formatDate(hoaDon.hinhThucThanhToan.ngaySua) : ''}
                        </td>
                        <td>{hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.ten ? hoaDon.hinhThucThanhToan.ten : ''}</td>
                        {/* <td>{item.hoaDon.nhanVien.ten}</td> */}
                        <td>Phạm Quốc Việt</td>
                        <td>{hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.ghiChu ? hoaDon.hinhThucThanhToan.ghiChu : ''}</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </section>
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
                      {hoaDon.trangThai === 0 && (
                        <button
                          className="button-85"
                          onClick={handleShow6}
                          style={{ border: '1px solid black', background: 'greenyellow', borderRadius: '10px' }}
                          data-toggle="tooltip"
                          title="Thêm sản phẩm"
                          // className="shadow-button"
                          type="submit"
                        >
                          <span style={{ fontSize: '15px', fontWeight: 'bold' }} className="btn-text">
                            Thêm sản phẩm
                          </span>
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
                          <div className="box col-auto col-4">
                            <div style={{ marginTop: 10 }} className="search">
                              <input
                                style={{ borderRadius: 15, width: 800, height: 35 }}
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
                                              &nbsp;- {d.kichCo.ten}
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
              <Table style={{ textAlign: 'center' }} hover className="my-4">
                <tr className="ps-3">
                  <th>#</th>
                  <th>Mã</th>
                  <th>Ảnh</th>
                  <th>Sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng tiền</th>
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
                        <div style={{ fontWeight: 'bold', fontSize: 16 }}> {d.chiTietSanPham.sanPham.ten} </div> <br />
                        <div style={{ fontStyle: 'italic' }}> {d.chiTietSanPham.kichCo.ten} </div> <br />
                        <div style={{ backgroundColor: d.chiTietSanPham.mauSac.ten, width: 30, borderRadius: '10px', marginLeft: 80 }}>
                          &nbsp;
                        </div>
                      </td>
                      <td>
                        <div
                          className="input-spinner"
                          style={{ alignItems: 'center', width: 120, justifyContent: 'center', marginLeft: 90, marginTop: 20 }}
                        >
                          {hoaDon.trangThai === 0 ? (
                            <InputSpinner
                              type={'real'}
                              max={d.chiTietSanPham.soLuong + d.soLuong}
                              min={1}
                              key={d.id}
                              step={1}
                              value={d.soLuong}
                              onChange={(e) => handleUpdateSl(d.id, d.hoaDon.id, d.chiTietSanPham.id, e)}
                              variant={'dark'}
                              size="sm"
                            />
                          ) : (
                            <span
                              style={{ fontWeight: 'bold', fontSize: 16, justifyContent: 'center', marginLeft: 20, fontStyle: 'italic' }}
                            >
                              {d.soLuong}
                            </span>
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
                        {hoaDon.trangThai === 0 && <button onClick={() => handleDelete(d.id)} className="fa-solid fa-trash mx-3"></button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Card>
      </MainCard>
    </>
  );
}

export default DonHangCT;
