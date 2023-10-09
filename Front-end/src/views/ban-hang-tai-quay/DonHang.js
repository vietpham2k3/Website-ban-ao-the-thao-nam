/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../../scss/DonHang.scss';
import { Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import _ from 'lodash';
import { useEffect } from 'react';
import { searchCTSP, getAllByIdSP, detailCTSP } from 'services/SanPhamService';
import SearchResult from './SearchResultList';
import {
  getById,
  updateSL,
  deleteHDCT,
  updateHD,
  addKM,
  getKmById,
  detailHD,
  thanhToan,
  searchCTSPofDH,
  addSP
} from 'services/ServiceDonHang';
import InputSpinner from 'react-bootstrap-input-spinner';
import TableKM from './TableKM';
import { detailKM, getAllKM } from 'services/ServiceKhuyenMai';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
function DonHang(props) {
  // eslint-disable-next-line react/prop-types
  const { id } = props;
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);
  const [idHDCT, setIdHDCT] = useState('');
  const [idKM, setIdKM] = useState('');
  const [values, setValues] = useState([]);
  const [dataKM, setDataKM] = useState([]);
  const [valuesSanPham, setValuesSanPham] = useState([]);
  const [dataHDKM, setDataHDKM] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tienThua, setTienThua] = useState(0);
  const [tienKhachDua, setTienKhachDua] = useState(0);
  const [tongSoLuong, setTongSoLuong] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [dataDetailHD, setDataDetailHD] = useState({});
  const [dataDetailKM, setDataDetailKM] = useState({});
  const [valuesAddKM, setValuesAddKM] = useState({
    khuyenMai: {
      id: ''
    },
    hoaDon: {
      id: id
    },
    tienGiam: 0
  });
  const [valuesUpdateHD, setValuesUpdateHD] = useState({
    tongTien: '',
    tongTienKhiGiam: '',
    hinhThucThanhToan: {
      id: dataDetailHD.hinhThucThanhToan && dataDetailHD.hinhThucThanhToan.id,
      trangThai: 0,
      tien: 0
    },
    trangThai: 0
  });
  const [valuesUpdate, setValuesUpdate] = useState({
    chiTietSanPham: {
      id: ''
    },
    hoaDon: {
      id: id
    },
    soLuong: ''
  });

  useEffect(() => {
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0;
    let count = 0;
    valuesSanPham.forEach((d) => {
      sum += d.soLuong * d.donGia;
      count += d.soLuong;
    });
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum);
    setTongSoLuong(count);
  }, [valuesSanPham]);

  useEffect(() => {
    setValuesUpdateHD((prevValuesUpdateHD) => ({
      ...prevValuesUpdateHD,
      tongTien: totalAmount
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount]);

  useEffect(() => {
    setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam);
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setValuesUpdateHD((prevValuesUpdateHD) => ({
      ...prevValuesUpdateHD,
      ...prevValuesUpdateHD.hinhThucThanhToan,
      tongTienKhiGiam: totalAmount - totalGiam
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount, dataKM]);
  useEffect(() => {
    handleSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    findAllKM(id);
    getAllById(id);
    detailHDById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    update(idHDCT, valuesUpdate);
  }, [valuesUpdate]);

  useEffect(() => {
    handleUpdateHD();
  }, [valuesUpdateHD]);

  useEffect(() => {
    getKM(totalAmount);
  }, [totalAmount]);

  useEffect(() => {
    detailMaKM(idKM);
  }, [idKM]);

  useEffect(() => {
    setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam);
  }, [valuesUpdateHD.hinhThucThanhToan.tien]);

  useEffect(() => {
    if (dataDetailHD.tongTienKhiGiam === 0) {
      toast.error('Mày mà spam là t cho m bay acc fb');
    } else {
      postKM(valuesAddKM);
    }
  }, [valuesAddKM]);

  const detailMaKM = async (id) => {
    const res = await detailKM(id);
    if (res) {
      setDataDetailKM(res.data);
    }
  };

  const findAllKM = async (id) => {
    const res = await getKmById(id);
    if (res) {
      setDataHDKM(res.data);
    }
  };

  const detailHDById = async (id) => {
    const res = await detailHD(id);
    if (res) {
      setDataDetailHD(res.data);
    }
  };

  const handleAddValueKm = (id, tienGiam) => {
    setIdKM(id);
    setValuesAddKM({
      ...valuesAddKM,
      khuyenMai: {
        id: id
      },
      tienGiam: tienGiam
    });
    setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam);

    setValuesUpdateHD((prevValuesUpdateHD) => ({
      ...prevValuesUpdateHD,
      tongTienKhiGiam: prevValuesUpdateHD.tongTienKhiGiam - tienGiam >= 0 ? prevValuesUpdateHD.tongTienKhiGiam - tienGiam : 0
    }));
  };

  const postKM = async (value) => {
    const res = await addKM(value);
    if (res.data === 'Mày thích spam không ?') {
      toast.warning('Mày như nào ?');
      return;
    } else {
      detailHDById(id);
      toast.success('Thêm mã giảm giá thành công');
      findAllKM(id);
      setTienThua(valuesUpdateHD.hinhThucThanhToan.tien - valuesUpdateHD.tongTienKhiGiam);
    }
  };

  const handleUpdateHD = () => {
    updateTTHD(id, valuesUpdateHD);
  };

  const updateTTHD = async (idHD, value) => {
    const res = await updateHD(idHD, value);
    if (res) {
      detailHDById(id);
    }
  };

  const ThanhToanHD = async (idHD) => {
    const res = await thanhToan(idHD);
    if (res) {
      toast.success('Thanh toán thành công');
      getAll();
    }
  };

  const getAllById = async (idHD) => {
    const res = await getById(idHD);
    if (res) {
      setValuesSanPham(res.data);
    }
  };

  const getKM = async (tien) => {
    const res = await getAllKM(tien);
    if (res) {
      setDataKM(res.data);
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

  const update = async (idHDCT, values) => {
    const res = await updateSL(idHDCT, values);
    if (res) {
      getAllById(id);
    }
  };

  const deleteHD = async (idHDCT) => {
    const res = await deleteHDCT(idHDCT);
    if (res) {
      getAllById(id);
    }
  };

  const handleSearchUsers = _.debounce(async () => {
    if (inputValue !== '') {
      // Kiểm tra nếu inputValue không rỗng
      const res = await searchCTSP(inputValue, '1', '', '', '');
      if (res && res.data) {
        setValues(res.data.content);
      }
    } else {
      setValues([]); // Nếu inputValue rỗng, đặt giá trị values là một mảng rỗng để không hiển thị dữ liệu
    }
  }, 100);

  const convertToCurrency = (value) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(value);
  };

  const handleDelete = (id) => {
    deleteHD(id);
  };

  const handleAddKM = () => {
    setShow(false);
    setActiveIndex(null);
  };

  const handleDivClick = (index) => {
    setActiveIndex(index);
  };

  function formatDate(dateString) {
    if (dateString === null) {
      return ''; // Trả về chuỗi rỗng nếu giá trị là null
    }

    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
  }

  const handleThanhToan = () => {
    ThanhToanHD(id);
    setValuesUpdateHD({
      ...valuesUpdateHD,
      ...valuesUpdateHD.hinhThucThanhToan,
      trangThai: 7,
      hinhThucThanhToan: {
        tien: tienKhachDua,
        trangThai: 1
      }
    });
  };

  const handleChangeValueTien = (e) => {
    setTienKhachDua(e);
    setValuesUpdateHD({
      ...valuesUpdateHD.hinhThucThanhToan,
      ...valuesUpdateHD,
      hinhThucThanhToan: {
        tien: e,
        trangThai: 0
      }
    });
  };

  // fix san pham
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => {
    setShow3(false);
  };
  const handleShow3 = () => setShow3(true);

  const [show4, setShow4] = useState(false);
  const handleClose4 = () => {
    setShow4(false);
  };
  const handleShow4 = () => setShow4(true);


  const [show1, setShow1] = useState(false);
  const handleClose1 = () => {
    setShow1(false);
  };
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => {
    setShow2(false);
  };
  //sp
  const [inputDetail, setInputDetail] = useState(null);
  const [dataSP, setDataSP] = useState([]);
  const [mauSacKC, setMauSacKC] = useState([]);
  const [dataDetail, setDataDetail] = useState({});
  const [idSP, setidSP] = useState('');
  const [idCTSP, setidCTSP] = useState('');

  // kcms sp
  const handleAddSoLuong = (id, idSP) => {
    setShow2(true);
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
    setShow1(false);
    // chuachac dong
    setShow2(false);
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

  // searchSPinDH;
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

  // khach hang

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <div className="col-5">
            <div style={{ display: 'flex', justifyContent: 'flex-start' }} className="export-form">
              <Button
                className="button-85"
                onClick={handleShow1}
                style={{ border: '1px solid black', background: 'greenyellow', borderRadius: '10px' }}
                data-toggle="tooltip"
                title="Thêm sản phẩm"
                type="submit"
              >
                <span style={{ fontSize: '15px', fontWeight: 'bold' }} className="btn-text">
                  Thêm sản phẩm
                </span>
              </Button>
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
                          show={show2}
                          onHide={handleClose2}
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

          {values.length > 0 && (
            <div className="search-result">
              <SearchResult
                result={values}
                id={id}
                getAllById={getAllById}
                handleSearchUsers={handleSearchUsers}
                setInputValue={setInputValue}
                setValuesSearch={setValues}
              />
            </div>
          )}
          <div className="table-container">
            <Table striped hover className="my-4">
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
                      />
                    </td>
                    <td>
                      {d.chiTietSanPham.sanPham.ten} <br /> {d.chiTietSanPham.kichCo.ten} <br />
                      <div style={{ backgroundColor: d.chiTietSanPham.mauSac.ten, width: 30, borderRadius: '10px' }}>&nbsp;</div>
                    </td>
                    <td>
                      <div
                        className="input-spinner"
                        style={{ display: 'flex', alignItems: 'center', width: 120, justifyContent: 'center' }}
                      >
                        <InputSpinner
                          key={d.id} // Đặt key duy nhất cho mỗi InputSpinner
                          type={'real'}
                          max={d.chiTietSanPham.soLuong + d.soLuong}
                          min={1}
                          step={1}
                          value={d.soLuong}
                          onChange={(e) => handleUpdateSl(d.id, d.hoaDon.id, d.chiTietSanPham.id, e)}
                          variant={'dark'}
                          size="sm"
                        />
                      </div>
                      {d.chiTietSanPham.soLuong < 10 ? (
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
                      <button onClick={() => handleDelete(d.id)} className="fa-solid fa-trash mx-3"></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-4 thong-tin-ban-hang">
          <div>
            <button type="button" className="btn btn-outline-primary" onClick={handleShow4}>
              Chọn khách hàng
            </button>
            <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show4} onHide={handleClose4}>
              <Modal.Header closeButton>
                <Modal.Title style={{ marginLeft: 175 }}>Khách Hàng</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ width: 500 }}>
               <div>
                
               </div>
              </Modal.Body>
            </Modal>
            <button className="fa-solid fa-plus mx-3" onClick={handleShow3}></button>
            <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show3} onHide={handleClose3}>
              <Modal.Header closeButton>
                <Modal.Title style={{ marginLeft: 145 }}>Thêm Khách Hàng</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ width: 500 }}>
                <form className="needs-validation" noValidate >
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
                        // value={hoaDon.tenNguoiNhan}
                        // onChange={(e) => {
                        //   setHoaDon({ ...hoaDon, tenNguoiNhan: e.target.value });
                        //   setNone(true);
                        //   setNone1(true);
                        // }}
                      />
                      {/* {!none && <div style={{ color: 'red' }}>Tên người nhận không được để trống !</div>}
                      {!none1 && <div style={{ color: 'red' }}>Tên người nhận không được quá 20 ký tự và phải là chữ !</div>} */}
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
                        // value={hoaDon.soDienThoai}
                        // onChange={(e) => {
                        //   setHoaDon({ ...hoaDon, soDienThoai: e.target.value });
                        //   setNone2(true);
                        //   setNone3(true);
                        // }}
                      />
                      {/* {!none2 && <div style={{ color: 'red' }}>Số điện thoại không được để trống !</div>}
                      {!none3 && <div style={{ color: 'red' }}>Số điện thoại phải là số, bắt đầu bằng số 0 và phải đúng 10 số !</div>} */}
                    </div>
                  </div>
                  <br></br>
                  <div className="form-group row">
                    <label style={{ fontWeight: 'bold' }} htmlFor="diaChi" className="col-sm-3 col-form-label">
                      Email:
                    </label>
                    <div className="col-sm-9">
                    <input
                        type="tel"
                        className="form-control"
                        name="email"
                        placeholder=""
                        // value={hoaDon.soDienThoai}
                        // onChange={(e) => {
                        //   setHoaDon({ ...hoaDon, soDienThoai: e.target.value });
                        //   setNone2(true);
                        //   setNone3(true);
                        // }}
                      />
                      {/* {!none4 && <div style={{ color: 'red' }}>Địa chỉ không được để trống !</div>}
                      {!none5 && <div style={{ color: 'red' }}>Địa chỉ không được vượt quá 250 ký tự !</div>} */}
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
                        Thêm Khách Hàng
                      </span>
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div>
          <br /> <br />
          <div className="ma-giam-gia">
            <div>
              <h6>Tên khách hàng</h6>
            </div>
            <div>
              <p>
                <input type="text" style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }} />{' '}
              </p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Số điện thoại</h6>
            </div>
            <div>
              <p>
                <input type="text" style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }} />{' '}
              </p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Mã giảm giá</h6>
            </div>
            <div>
              <p>
                <input
                  type="text"
                  style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }}
                  defaultValue={dataDetailKM && dataDetailKM.ma}
                />{' '}
                <button className="fa-solid fa-plus" onClick={() => setShow(true)}></button>
              </p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Số lượng sản phẩm</h6>
            </div>
            <div>
              <p>{tongSoLuong}</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Tổng tiền</h6>
            </div>
            <div>
              <p>{convertToCurrency(totalAmount)}</p>
            </div>
          </div>
          {dataHDKM.map((d) => (
            <div key={d.id} className="ma-giam-gia" style={{ color: 'red' }}>
              <div>
                <h6>Tiền giảm</h6>
              </div>
              <div>
                <p>-{convertToCurrency(d.tienGiam)}</p>
              </div>
            </div>
          ))}
          <div className="ma-giam-gia">
            <div>
              <h5>Khách phải trả</h5>
            </div>
            <div>
              <p style={{ fontSize: 'large', fontWeight: 'bold' }}>{convertToCurrency(dataDetailHD.tongTienKhiGiam)}</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Tiền khách đưa</h6>
            </div>
            <div>
              <input
                type="number"
                style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }}
                onChange={(e) => handleChangeValueTien(e.target.value)}
              />
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <select className="form-select" aria-label="Default select example">
                <option selected>Tiền mặt</option>
                <option defaultValue="1">QR</option>
              </select>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Tiền thừa</h6>
            </div>
            <div>
              <p>{convertToCurrency(tienThua)}</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            {dataKM.map((d, i) => (
              <div key={i} className={`col-10 card-voucher card-width`} onClick={() => handleDivClick(i)} style={{ cursor: 'pointer' }}>
                <h6 style={{ color: 'red', wordWrap: 'break-word' }}>
                  Giảm {convertToCurrency(d.mucGiam)} cho đơn tối thiểu {convertToCurrency(d.tien)}
                </h6>
                <div className="text-voucher">
                  <p style={{ fontSize: '13px', color: 'gray' }}>HSD: {formatDate(d.thoiGianKetThuc)}</p>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleAddValueKm(d.id, d.mucGiam)}
                    // disabled={true} // Thêm disabled vào đây
                  >
                    Áp dụng
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="button-thanh-toan">
            <button
              type="button"
              className="btn btn-success"
              disabled={tienThua < 0 || tienKhachDua === 0}
              onClick={() => handleThanhToan()}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
      <TableKM
        show={show}
        handleClose={() => setShow(false)}
        dataKM={dataKM}
        convertToCurrency={convertToCurrency}
        handleDivClick={handleDivClick}
        activeIndex={activeIndex}
        handleAddKM={handleAddKM}
        formatDate={formatDate}
      ></TableKM>
    </div>
  );
}

export default DonHang;
