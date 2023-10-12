/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from 'react';
import '../../scss/CheckOut.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import { getById } from 'services/ServiceDonHang';
import { deleteByIdHD, addKhuyenMai } from 'services/GioHangService';

function CheckoutForm() {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [dataHDCT, setDataHDCT] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const [valuesKhuyenMai, setValuesKhuyenMai] = useState({
    khuyenMai: {
      ma: '',
      tien: 0
    },
    hoaDon: {
      id: id
    },
    tienGiam: 0
  });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get('https://vapi.vnappmob.com/api/province');
        setProvinces(response.data.results);
      } catch (error) {
        console.error(error);
        toast.error('Đã xảy ra lỗi khi lấy danh sách tỉnh thành');
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    getAllHDById(id);
  }, [id]);

  useEffect(() => {
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0;
    dataHDCT.forEach((d) => {
      sum += d.soLuong * d.donGia;
    });
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum);
  }, [dataHDCT]);

  console.log(valuesKhuyenMai);

  const handleChangeValuesKM = () => {
    addVToHD(valuesKhuyenMai);
  };

  const handleProvinceChange = async (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    try {
      const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
      setDistricts(response.data.results);
      setWards([]);
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi lấy danh sách quận huyện');
    }
  };

  const handleDistrictChange = async (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    try {
      const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
      setWards(response.data.results);
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi lấy danh sách phường xã');
    }
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
  };

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(number);
  }

  const handleBackToCart = () => {
    backToCart(id);
  };

  const addVToHD = async (value) => {
    const res = await addKhuyenMai(value);
    if (res.data === 'error') {
      toast.error('Mã khuyễn mãi không hợp lệ');
    } else {
      toast.success('Thêm mã thành công');
    }
  };

  const backToCart = async (idHD) => {
    const res = await deleteByIdHD(idHD);
    if (res) {
      setDataHDCT(res.data);
    }
  };

  const getAllHDById = async (idHD) => {
    const res = await getById(idHD);
    if (res) {
      setDataHDCT(res.data);
    }
  };

  return (
    <div className="site-section">
      <div className="container ctn">
        <div className="row">
          <div className="col-md-6 mb-5 mb-md-0">
            <h2 className="h3 mb-3 text-black">Thông Tin Khách Hàng</h2>
            <div className="p-3 p-lg-5 border">
              <div className="form-group row fgr">
                <div className="col-md-12">
                  <label htmlFor="full_name" className="text-black">
                    Họ và Tên <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control fct" id="full_name" name="full_name" placeholder="Họ và Tên" />
                </div>
              </div>

              <div className="form-group row fgr">
                <div className="col-md-12">
                  <label htmlFor="phone" className="text-black">
                    Số Điện Thoại <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control fct" id="phone" name="phone" placeholder="Số Điện Thoại" />
                </div>
              </div>

              <div className="form-group row fgr">
                <div className="col-md-12">
                  <label htmlFor="address" className="text-black">
                    Địa Chỉ <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control fct" id="address" name="address" placeholder="Địa chỉ" />
                </div>
              </div>

              <div className="col-md-12">
                <label htmlFor="province" className="text-black">
                  Tỉnh/Thành Phố <span className="text-danger">*</span>
                </label>
                <select id="province" className="form-select fsl" value={selectedProvince} onChange={handleProvinceChange}>
                  <option value="">-----Chọn tỉnh thành-----</option>
                  {provinces.map((province) => (
                    <option key={province.province_id} value={province.province_id}>
                      {province.province_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12 mt-3">
                <label htmlFor="district" className="text-black">
                  Quận/Huyện <span className="text-danger">*</span>
                </label>
                <select id="district" className="form-select fsl" value={selectedDistrict} onChange={handleDistrictChange}>
                  <option value="">----Chọn quận huyện-----</option>
                  {districts.map((district) => (
                    <option key={district.district_id} value={district.district_id}>
                      {district.district_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12 mt-3">
                <label htmlFor="ward" className="text-black">
                  Phường/Xã <span className="text-danger">*</span>
                </label>
                <select id="ward" className="form-select fsl" value={selectedWard} onChange={handleWardChange}>
                  <option value="">-----Chọn phường xã-----</option>
                  {wards.map((ward) => (
                    <option key={ward.ward_id} value={ward.ward_id}>
                      {ward.ward_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group row mb-5 fgr">
                <div className="col-md-12  mt-3">
                  <label htmlFor="order_notes" className="text-black">
                    Ghi Chú Đơn Hàng
                  </label>
                  <textarea
                    name="order_notes"
                    id="order_notes"
                    cols="30"
                    rows="5"
                    className="form-control fct"
                    placeholder="Nhập ghi chú của bạn ở đây..."
                  ></textarea>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <p
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/gio-hang');
                    handleBackToCart();
                  }}
                >
                  <i className="fa-solid fa-chevron-left"></i> Quay về giỏ hàng
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-5 mb-md-0">
            <div className="row mb-5">
              <div className="col-md-12">
                <h2 className="h3 mb-3 text-black">Đơn Hàng</h2>
                <div className="p-3 p-lg-5 border">
                  <table className="table site-block-order-table mb-5 tbl">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Sản Phẩm</th>
                        <th>Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataHDCT.map((d, i) => (
                        <tr key={i}>
                          <td className="product-image-col">
                            <img
                              src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                              alt="Product 1"
                              className="product-image"
                            />
                          </td>
                          <td>
                            <div className="product-details">
                              <span className="product-name">
                                {d.chiTietSanPham.sanPham.ten} <strong className="mx-2">x</strong> {d.soLuong}
                              </span>
                            </div>
                            <span>
                              {d.chiTietSanPham.kichCo.ten} -{' '}
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
                            </span>
                          </td>

                          <td>{convertToCurrency(d.donGia)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <table className="table site-block-order-table mb-5 tbl">
                    <tr>
                      <td className="text-black font-weight-bold" colSpan="3">
                        Mã Giảm Giá
                      </td>
                      <td className="text-black">
                        <div className="input-group w-75">
                          <input
                            type="text"
                            className="form-control fct"
                            id="c_code"
                            placeholder="Nhập mã giảm giá"
                            aria-label="Coupon Code"
                            aria-describedby="button-addon2"
                            value={valuesKhuyenMai.khuyenMai.ma}
                            onChange={(e) =>
                              setValuesKhuyenMai({
                                ...valuesKhuyenMai,
                                khuyenMai: {
                                  ma: e.target.value,
                                  tien: totalAmount
                                },
                                tienGiam: totalAmount
                              })
                            }
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-primary btn-sm px-4 btn-apply"
                              type="button"
                              id="button-addon2"
                              onClick={() => handleChangeValuesKM()}
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="text-black font-weight-bold" colSpan="3">
                        Tạm Tính
                      </td>
                      <td className="text-black">{convertToCurrency(totalAmount)}</td>
                    </tr>
                    <tr>
                      <td className="text-black font-weight-bold" colSpan="3">
                        Tổng Cộng
                      </td>
                      <td className="text-black font-weight-bold">{convertToCurrency(totalAmount)}</td>
                    </tr>
                    <tr>
                      <td className="text-black font-weight-bold" colSpan="3">
                        Thanh Toán
                      </td>
                      <td className="text-black">
                        <div className="custom-control custom-checkbox custom-control-inline" style={{ display: 'flex' }}>
                          <input
                            style={{ marginTop: '15px' }}
                            type="radio"
                            className="custom-control-input"
                            color="secondary"
                            id="vnpayradio"
                            name="paymentMethod"
                            value="vnpay"
                          />

                          <label className="custom-control-label" htmlFor="vnpayradio" style={{ marginLeft: '10px', marginTop: '15px' }}>
                            Thanh toán qua VNPay
                          </label>
                          <img
                            width={'50px'}
                            height={'50px'}
                            src="https://on.net.vn/web/image/3876184-2b57e083/202166185_2021396718013233_8499389898242103910_n.png"
                            alt="VNPay Logo"
                            className="payment-logo"
                          />
                        </div>
                        <div className="custom-control custom-checkbox custom-control-inline" style={{ display: 'flex' }}>
                          <input
                            style={{ marginTop: '12px' }}
                            type="radio"
                            className="custom-control-input"
                            color="secondary"
                            id="codradio"
                            name="paymentMethod"
                            value="cod"
                          />
                          <label className="custom-control-label" htmlFor="codradio" style={{ marginLeft: '10px', marginTop: '12px' }}>
                            Thanh toán COD
                          </label>

                          <img
                            width={'36px'}
                            height={'36px'}
                            style={{ marginTop: '8px', marginLeft: '56px' }}
                            src="https://symbols.vn/wp-content/uploads/2021/11/Bieu-tuong-tien-mat-doc-dao.png"
                            alt="COD Logo"
                            className="payment-logo"
                          />
                        </div>
                      </td>
                    </tr>
                  </table>
                  <div className="text-center">
                    <button className="btn btn-primary btn-lg btn-apply" type="button">
                      Thanh toán
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
