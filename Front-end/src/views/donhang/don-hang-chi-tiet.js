import React, { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import $ from 'jquery';
import '../../scss/TimeLine.scss';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { detailHD, updateKHDH } from 'services/ServiceDonHang';
import MainCard from 'ui-component/cards/MainCard';

function DonHangCT() {
  const { id } = useParams();
  const navigate = useNavigate();

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
                    {/* <div className="col-1">
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
                    </div> */}
                  </div>

                  <div className="col-5">
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <div className="col-5">
                        <div className="d-flex justify-content-end">
                          <button
                            onClick={handleShow1}
                            className="btn btn-labeled shadow-button"
                            style={{
                              background: 'deepskyblue',
                              borderRadius: '50px',
                              border: '1px solid black',
                              justifyItems: 'center'
                            }}
                          >
                            <i className="fa-solid fa-circle-info fa-shake fa-lg"></i>
                            <span> | </span>
                            <span style={{ fontWeight: 'bold' }}>Chi Tiết</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <Modal style={{ marginTop: 150, marginLeft: 150 }} show={show1} onHide={handleClose1}>
                      <Modal.Header closeButton>
                        <Modal.Title style={{ marginLeft: 125 }}>Lịch Sử Đơn Hàng</Modal.Title>
                      </Modal.Header>
                      <Modal.Body></Modal.Body>
                      {/* <Modal.Footer>
                       
                      </Modal.Footer> */}
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="wrap">
                <div className="timeline-wrap">
                  <ul className="timeline">
                    <li className="timeline-item bmw">
                      <div className="p-timeline-item">
                        <span className="p-timeline-date">Tạo hóa đơn</span>
                        <span className="p-timeline-carmodel">
                        10/10/2023
                        </span>
                        <div className="p-timeline-block">
                        <i style={{marginTop: 27}} className="fa-solid fa-spinner fa-spin fa-xl"></i>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item mini">
                      <div className="p-timeline-item">
                        <span className="p-timeline-date">Đã xác thực thông tin người dùng</span>
                        <span className="p-timeline-carmodel">
                          10/10/2023
                        </span>
                        <div className="p-timeline-block">
                        
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item mini">
                      <div className="p-timeline-item">
                        <span className="p-timeline-date">Đã hủy đơn hàng</span>
                        <span className="p-timeline-carmodel">
                          
                        </span>
                        <div className="p-timeline-block">
                        <i style={{marginTop: 27}} className="fa-solid fa-xmark fa-beat fa-xl"></i>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item bmw">
                      <div className="p-timeline-item">
                        <time className="p-timeline-date">Chờ giao hàng</time>
                        <span className="p-timeline-carmodel">
                          
                        </span>
                        <div className="p-timeline-block">
                        <i style={{marginTop: 27}} className="fa-solid fa-spinner fa-spin fa-xl"></i>
                        </div>
                      </div>
                    </li>
                    <li className="timeline-item bmw">
                      <div className="p-timeline-item">
                        <time className="p-timeline-date">Đang giao hàng</time>
                        <span className="p-timeline-carmodel">
                          
                        </span>
                        <div className="p-timeline-block"></div>
                      </div>
                    </li>
                    <li className="timeline-item bmw">
                      <div className="p-timeline-item">
                        <span className="p-timeline-date">Giao hàng thành công</span>
                        <span className="p-timeline-carmodel">
                          
                        </span>
                        <div className="p-timeline-block"></div>
                      </div>
                    </li>
                    <li className="timeline-item bmw">
                      <div className="p-timeline-item">
                        <time className="p-timeline-date">Giao hàng thất bại</time>
                        <span className="p-timeline-carmodel" >
                          
                        </span>
                        <div className="p-timeline-block"></div>
                      </div>
                    </li>
                    <li className="timeline-item mini">
                      <div className="p-timeline-item">
                        <time className="p-timeline-date">Thanh toán thành công</time>
                        <span className="p-timeline-carmodel">
                         
                        </span>
                        <div className="p-timeline-block"></div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* //button */}
            {/* xac nhan don hang */}
            <div className="row">
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
