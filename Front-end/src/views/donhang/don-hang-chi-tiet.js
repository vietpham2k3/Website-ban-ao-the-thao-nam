import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import $ from 'jquery';
import '../../scss/TimeLine.scss';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { detailHD, detailLSHD, updateKHDH } from 'services/ServiceDonHang';
import MainCard from 'ui-component/cards/MainCard';
import { Button } from 'react-bootstrap';

function DonHangCT() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lichSuHoaDon, setLichSuHoaDon] = useState([]);

  //timeLine kaka

  var item = '.timeline-item';
  var content = '.p-timeline-content';
  var active = 'i-is-active';

  //Handling events
  $('.timeline-item').on('click', function () {
    showTimelineContent(this);
  });
  $('.close').on('click', function () {
    closeCurrentContent(this);
  });

  function showTimelineContent(element) {
    var itemId = $(element).find('.p-timeline-carmodel').attr('data-car');
    // var highlighted = $(element).find('.p-timeline-carmodel');

    //Prevent having multiple items with the class i-is-active
    if ($(item).hasClass(active)) {
      $(item).removeClass(active);
    }

    //grab the id from the data attribute of each contentblock
    $(content).each(function () {
      var contentid = $(this).attr('data-car');

      //check if timeline item id is equal to the content id
      //If they're equal, show the content associated to that timeline item
      if (itemId == contentid) {
        var current = $(content + '[data-car="' + contentid + '"]');
        $(current).addClass(active);
        $(element).addClass(active);

        //If the content is not the selected (current) one
        $(content).not(current).removeClass(active);

        //Scroll to shown content
        var target = $(current);
        $('html, body').stop().animate({ scrollTop: target.offset().top }, 1000);
      }
    });
  }

  function closeCurrentContent(event) {
    var contentblock = $(event).parents(content);
    var contentid = $(contentblock).attr('data-car');
    $(item).each(function () {
      var itemId = $(this).find('.p-timeline-carmodel').attr('data-car');

      if (itemId == contentid) {
        //move page back to timeline
        var target = $('.timeline-title');
        $('html, body').stop().animate({ scrollTop: target.offset().top }, 1000);

        //remove class i-is-active from highlighted item
        // var currentItem = $(this).removeClass(active);
        contentblock.removeClass(active);
      }
    });
  }

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const [show5, setShow5] = useState(false);

  const handleClose = () => setShow(false);
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
    await updateKH(id, values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(false);
  };

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
      console.log(res);
    }
  };

  const detailListLSHD = async (id) => {
    const res = await detailLSHD(id);
    if (res && res.data) {
      setLichSuHoaDon(res.data);
      console.log(lichSuHoaDon);
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
                            <Table id="myTable" className="table" style={{ textAlign: 'center' }}>
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
                                    <td>{item.hoaDon.nhanVien.ten}</td>
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

            <Row>
              <Col>
                <div className="wrap">
                  <div className="timeline-wrap">
                    <ul className="timeline">
                      {lichSuHoaDon.map((lshd, index) => (
                        <React.Fragment key={index}>
                         {lshd.hoaDon.trangThai === 0 && (
      <li className="timeline-item bmw">
        <div className="p-timeline-item">
          <span className="p-timeline-date">Tạo hóa đơn</span>
          <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
          <div className="p-timeline-block">
            <i style={{ marginTop: 27 }} className="fa-solid fa-spinner fa-spin fa-xl"></i>
          </div>
        </div>
      </li>
    )}
    {lshd.hoaDon.trangThai === 1 && (
      <li className="timeline-item mini">
        <div className="p-timeline-item">
          <span className="p-timeline-date">Đã xác thực thông tin người dùng</span>
          <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
          <div className="p-timeline-block">
            <i style={{ marginTop: 27 }} className="fa-regular fa-circle-check fa-beat fa-xl"></i>
          </div>
        </div>
      </li>
    )}
    {lshd.trangThai === 2 && (
      <li className="timeline-item mini">
        <div className="p-timeline-item">
          <span className="p-timeline-date">Đã hủy đơn hàng</span>
          <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
          <div className="p-timeline-block">
            <i style={{ marginTop: 27 }} className="fa-solid fa-xmark fa-beat fa-xl"></i>
          </div>
        </div>
      </li>
    )}

    {/* {lshd.trangThai === 'cho_giao_hang' && (
      <li className="timeline-item bmw">
        <div className="p-timeline-item">
          <time className="p-timeline-date">Chờ giao hàng</time>
          <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
          <div className="p-timeline-block">
            <i style={{ marginTop: 27 }} className="fa-solid fa-spinner fa-spin fa-xl"></i>
          </div>
        </div>
      </li>
    )}
    {lshd.trangThai === 'dang_giao_hang' && (
      <li className="timeline-item bmw">
        <div className="p-timeline-item">
          <time className="p-timeline-date">Đang giao hàng</time>
          <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
          <div className="p-timeline-block">
            <i style={{ marginTop: 27 }} className="fa-solid fa-truck-fast fa-beat-fade fa-lg"></i>
          </div>
        </div>
      </li>
    )}
    {lshd.trangThai === 'giao_hang_thanh_cong' && (
      <li className="timeline-item bmw">
        <div className="p-timeline-item">
          <span className="p-timeline-date">Giao hàng thành công</span>
          <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
          <div className="p-timeline-block">
            <i style={{ marginTop: 27 }} className="fa-solid fa-check-double fa-beat fa-xl"></i>
          </div>
        </div>
      </li>
    )}
                          <li className="timeline-item bmw">
                            <div className="p-timeline-item">
                              <time className="p-timeline-date">Giao hàng thất bại</time>
                              <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                              <div className="p-timeline-block">
                                <i style={{ marginTop: 27 }} className="fa-solid fa-xmark fa-beat fa-xl"></i>
                              </div>
                            </div>
                          </li>
                          <li className="timeline-item mini">
                            <div className="p-timeline-item">
                              <time className="p-timeline-date">Thanh toán thành công</time>
                              <span className="p-timeline-carmodel">{formatDate(lshd.ngayTao)}</span>
                              <div className="p-timeline-block">
                                <i style={{ marginTop: 27 }} className="fa-regular fa-circle-check fa-beat fa-xl"></i>
                              </div>
                            </div>
                          </li> */}
                        </React.Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>

            {/* //button modal*/}
            <div className="row">
              {/* xac nhan don hang */}
              <div className="col-3">
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

                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show2} onHide={handleClose2}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body></Modal.Body>
                  {/* <Modal.Footer>
                       
                      </Modal.Footer> */}
                </Modal>
              </div>

              {/* //huy don */}
              <div className="col-3">
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

                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show3} onHide={handleClose3}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body></Modal.Body>
                  {/* <Modal.Footer>
                       
                      </Modal.Footer> */}
                </Modal>
              </div>

              {/* //xac nhan giao hang */}
              <div className="col-3">
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

                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show4} onHide={handleClose4}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body></Modal.Body>
                  {/* <Modal.Footer>
                       
                      </Modal.Footer> */}
                </Modal>
              </div>

              {/* //xac nhan thanh toan */}
              <div className="col 3">
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

                <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show5} onHide={handleClose5}>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: 185 }}>Ghi Chú</Modal.Title>
                  </Modal.Header>
                  <Modal.Body></Modal.Body>
                  {/* <Modal.Footer>
                       
                      </Modal.Footer> */}
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
                          {hoaDon.nhanVien && hoaDon.nhanVien.ten ? hoaDon.nhanVien.ten : ''}
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
                  <Row style={{ marginBottom: 10 }}>
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
                          Tổng Tiền:
                        </span>
                      </Col>
                      <Col sm={3}>
                        <span style={{ display: 'inline-block', width: '300px', fontSize: '15px' }}>
                          {convertToCurrency(hoaDon.tongTienKhiGiam)}
                        </span>
                      </Col>
                    </Col>
                  </Row>
                </Container>
              </div>
            )}
          </div>
        </Card>
      </MainCard>
    </>
  );
}

export default DonHangCT;
