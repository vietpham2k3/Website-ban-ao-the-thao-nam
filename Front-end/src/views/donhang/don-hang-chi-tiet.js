import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Modal from 'react-bootstrap/Modal';

import '../../scss/MauSac.scss';
import { detailHD, updateKHDH } from 'services/ServiceDonHang';
import MainCard from 'ui-component/cards/MainCard';

function DonHangCT() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      // navigate(`/don-hang/chi-tiet/${d.id}`);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    await updateKH(id, values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(false);
  };

  const [hoaDon, setHoaDon] = useState({});

  useEffect(() => {
    detail(id);
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

  // useEffect(() => {
  //   getAll();
  // }, []);

  // const getAll = async () => {
  //   const res = await getAllhoaDon();
  //   if (res && res.data) {
  //     setData(res.data.content);
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
      return ''; // Trả về chuỗi rỗng nếu giá trị là null
    }
    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    // const seconds = dateObject.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
  }

  return (
    <div>
      <MainCard>
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
                      <div className="d-flex justify-content-end">
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
                        <div className="d-flex justify-content-end">
                          <button onClick={handleShow} className="btn btn-dark" data-bs-placement="right">
                            <i className="fa-solid fa-pen-to-square fa-bounce fa-lg"></i>
                            <span> | </span>
                            <span>Cập Nhật</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title style={{ marginLeft: 120 }}>Cập Nhật Khách Hàng</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
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
                              />

                              <div className="invalid-feedback">Không được để trống!</div>
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
                                pattern="^0\d\S*$"
                                title="Sai định dạng số điện thoại!"
                              />
                              <div className="invalid-feedback">Không được để trống!</div>
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
                              ></textarea>
                              <div className="invalid-feedback">Không được để trống!</div>
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
                              onClick={handleUpdate}
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
                      {/* <Modal.Footer>
                       
                      </Modal.Footer> */}
                    </Modal>
                  </div>
                </div>
                <hr />

                <div style={{ display: 'flex', justifyContent: 'space-around', justifyItems: 'center' }} className="row">
                  <div className="col-12">
                    {hoaDon && (
                      <div style={{ paddingLeft: '100px' }}>
                        <div style={{ marginBottom: 10 }} className="row col-12">
                          <div className="col-6 row">
                            <div className="col-3">
                              <span style={{ display: 'inline-block', width: '100px', fontSize: '15px', fontWeight: 'bold' }}>Mã Đơn:</span>
                            </div>
                            <div className="col-3">
                              <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>{hoaDon.ma}</span>
                            </div>
                          </div>
                          <div className="col-6 row">
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '200px', fontSize: '15px', fontWeight: 'bold' }}>
                                Người Tạo:
                              </span>
                            </div>
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>Phạm Quốc Việt</span>
                            </div>
                          </div>
                        </div>

                        <br />

                        <div style={{ marginBottom: 10 }} className="row col-12">
                          <div className="col-6 row">
                            <div className="col-3">
                              <span style={{ display: 'inline-block', width: '100px', fontSize: '15px', fontWeight: 'bold' }}>
                                Ngày Tạo:
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>
                                {formatDate(hoaDon.ngayTao)}
                              </span>
                            </div>
                          </div>
                          <div className="col-6 row">
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '200px', fontSize: '15px', fontWeight: 'bold' }}>
                                Khách Hàng:
                              </span>
                            </div>
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>{hoaDon.tenNguoiNhan}</span>
                            </div>
                          </div>
                        </div>

                        <br />

                        <div style={{ marginBottom: 10 }} className="row col-12">
                          <div className="col-6 row">
                            <div className="col-3">
                              <span style={{ display: 'inline-block', width: '120px', fontSize: '15px', fontWeight: 'bold' }}>
                                Số Điện Thoại:
                              </span>
                            </div>
                            <div className="col-3">
                              <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>{hoaDon.soDienThoai}</span>
                            </div>
                          </div>
                          <div className="col-6 row">
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '200px', fontSize: '15px', fontWeight: 'bold' }}>
                                Địa Chỉ:
                              </span>
                            </div>
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>{hoaDon.diaChi}</span>
                            </div>
                          </div>
                        </div>

                        <br />

                        <div className="row col-12">
                          <div className="col-6 row">
                            <div className="col-3">
                              <span style={{ display: 'inline-block', width: '100px', fontSize: '15px', fontWeight: 'bold' }}>Loại: </span>
                            </div>

                            <div style={{ display: 'inline-block', width: '300px', fontSize: '15px' }} className="col-3">
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
                                    justifyContent: 'center'
                                  }}
                                  className="btn btn-labeled shadow-button btn btn-primary status-pending"
                                >
                                  Đặt Hàng Online
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="col-6 row">
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '200px', fontSize: '15px', fontWeight: 'bold' }}>
                                Hình Thức:
                              </span>
                            </div>
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>
                                {hoaDon.hinhThucThanhToan && hoaDon.hinhThucThanhToan.ten ? hoaDon.hinhThucThanhToan.ten : ''}
                              </span>
                            </div>
                          </div>
                        </div>

                        <br />

                        <div className="row col-12">
                          <div className="col-6 row">
                            <div className="col-3">
                              <span style={{ display: 'inline-block', width: '100px', fontSize: '15px', fontWeight: 'bold' }}>
                                Trạng Thái:{' '}
                              </span>
                            </div>
                            <div style={{ display: 'inline-block', width: '300px', fontSize: '15px' }} className="col-3">
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
                                  className="btn btn-labeled shadow-button btn btn-info status-completed"
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
                          </div>
                          <div className="col-6 row">
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '200px', fontSize: '15px', fontWeight: 'bold' }}>
                                Tổng Tiền:
                              </span>
                            </div>
                            <div style={{ float: 'left' }} className="col-3">
                              <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>
                                {convertToCurrency(hoaDon.tongTienKhiGiam)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </MainCard>
    </div>
  );
}

export default DonHangCT;
