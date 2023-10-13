/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// import Accordion from 'react-bootstrap/Accordion';
import React, { useState, useEffect } from 'react';
import '../../scss/CheckOut.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router';
import { getById, getKmById } from 'services/ServiceDonHang';
import { deleteByIdHD, addKhuyenMai, thanhToan } from 'services/GioHangService';
import { getTP, getQH, getP, getServices, getFee } from 'services/ApiGHNService';
import { payOnline } from 'services/PayService';

function CheckoutForm() {
  const [dataHDCT, setDataHDCT] = useState([]);
  const [thanhPho, setThanhPho] = useState([]);
  const [quan, setQuan] = useState([]);
  const [phuong, setPhuong] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [urlPay, setUrlPay] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [tongTienKhiGiam, setTongTienKhiGiam] = useState(0);
  const [dataHDKM, setDataHDKM] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [isUpdatingDiaChi, setIsUpdatingDiaChi] = useState(false);
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
  const [valuesUpdateHD, setValuesUpdateHD] = useState({
    tenNguoiNhan: '',
    soDienThoai: '',
    diaChi: '',
    tongTien: 0,
    tongTienKhiGiam: 0,
    trangThai: 0,
    ghiChu: '',
    tienShip: 0,
    hinhThucThanhToan: {
      tien: 0,
      ten: '',
      trangThai: 1
    }
  });
  const [diaChi, setDiaChi] = useState({
    tinh: '',
    quan: '',
    xa: ''
  });
  const [errors, setErrors] = useState({
    tenNguoiNhan: true,
    soDienThoai: true,
    diaChi: true,
    tinh: true,
    quan: true,
    xa: true,
    pttt: true
  });

  useEffect(() => {
    getThanhPho();
  }, []);

  useEffect(() => {
    getService(valuesServices);
  }, [valuesServices]);

  useEffect(() => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setTongTienKhiGiam(totalAmount - totalGiam + valuesUpdateHD.tienShip);

    setValuesUpdateHD({
      ...valuesUpdateHD,
      tongTien: totalAmount + valuesUpdateHD.tienShip,
      tongTienKhiGiam: totalAmount - totalGiam + valuesUpdateHD.tienShip
    });
  }, [valuesUpdateHD.tienShip]);

  useEffect(() => {
    fee(valuesFee);
  }, [valuesFee.to_ward_code]);

  useEffect(() => {
    getAllHDById(id);
    findAllKM(id);
  }, [id]);

  useEffect(() => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0;
    dataHDCT.forEach((d) => {
      sum += d.soLuong * d.donGia;
    });
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum);
    setTongTienKhiGiam(sum - totalGiam + valuesUpdateHD.tienShip);
  }, [dataHDCT, dataHDKM]);

  useEffect(() => {
    if (isUpdatingDiaChi) {
      // Ngừng cập nhật địa chỉ
      setIsUpdatingDiaChi(false);

      // Gọi thanhToanHD khi địa chỉ đã được cập nhật hoàn toàn
      thanhToanHD(id, valuesUpdateHD);
      navigate('/checkout/thankyou');
      localStorage.removeItem('product');
    }
    VNP(tongTienKhiGiam);
  }, [valuesUpdateHD]);

  console.log(urlPay);

  const handleChangeValuesKM = () => {
    addVToHD(valuesKhuyenMai);
  };

  const handleChange = (value) => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setTongTienKhiGiam(totalAmount - totalGiam + valuesUpdateHD.tienShip);
    setValuesKhuyenMai({
      ...valuesKhuyenMai,
      khuyenMai: {
        ma: value,
        tien: totalAmount
      }
    });
  };

  const handleProvinceChange = async (event) => {
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
      setDiaChi({
        ...diaChi,
        tinh: selectedProvinceName
      });
    }
    setErrors({
      ...errors,
      tinh: true
    });
  };

  const handleDistrictChange = async (event) => {
    const districtId = {
      district_id: event.target.value
    };
    setSelectedDistrict(event.target.value);
    setValuesServices({
      ...valuesServices,
      to_district: parseInt(event.target.value, 10)
    });
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
      setDiaChi({
        ...diaChi,
        quan: selectedProvinceName
      });
    }
    setErrors({
      ...errors,
      quan: true
    });
  };

  const handleWardChange = (event) => {
    const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
    setSelectedWard(event.target.value);
    setValuesFee({
      ...valuesFee,
      insurance_value: totalAmount,
      to_ward_code: event.target.value
    });
    setTongTienKhiGiam(totalAmount - totalGiam + valuesUpdateHD.tienShip);
    const selectedProvinceId = event.target.value;
    const selectedProvince = phuong.find((province) => province.WardCode === selectedProvinceId);

    if (selectedProvince) {
      // Lấy thông tin tỉnh/thành phố được chọn
      const selectedProvinceName = selectedProvince.WardName;
      setDiaChi({
        ...diaChi,
        xa: selectedProvinceName
      });
    }
    setErrors({
      ...errors,
      xa: true
    });
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
    } else if (res.data === 'ff') {
      toast.error('Bạn đang sử dụng mã này');
    } else {
      findAllKM(id);
      const totalGiam = dataHDKM.reduce((total, d) => total + d.tienGiam, 0);
      setTongTienKhiGiam(totalAmount - totalGiam + valuesUpdateHD.tienShip);
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

  const getService = async (value) => {
    const res = await getServices(value);
    if (res) {
      setValuesFee({
        ...valuesFee,
        service_id: res.data.data[0].service_id
      });
    }
  };

  const fee = async (value) => {
    const res = await getFee(value);
    if (res) {
      setValuesUpdateHD({
        ...valuesUpdateHD,
        tienShip: res.data.data.total
      });
    }
  };

  const getThanhPho = async () => {
    const res = await getTP();
    if (res) {
      setThanhPho(res.data.data);
    }
  };

  const getQuanHuyen = async (value) => {
    const res = await getQH(value);
    if (res) {
      setQuan(res.data.data);
    }
  };

  const getPhuong = async (value) => {
    const res = await getP(value);
    if (res) {
      setPhuong(res.data.data);
    }
  };

  const findAllKM = async (id) => {
    const res = await getKmById(id);
    if (res) {
      setDataHDKM(res.data);
    }
  };

  const thanhToanHD = async (id, value) => {
    const res = await thanhToan(id, value);
    if (res) {
      toast.success('Thành công');
    }
  };

  const VNP = async (tien) => {
    const res = await payOnline(tien);
    if (res) {
      setUrlPay(res.data);
      console.log(res.data);
    }
  };

  const handleThanhToan = () => {
    if (valuesUpdateHD.tenNguoiNhan === '') {
      setErrors({
        ...errors,
        tenNguoiNhan: false
      });
      return;
    } else if (valuesUpdateHD.soDienThoai === '') {
      setErrors({
        ...errors,
        soDienThoai: false
      });
      return;
    } else if (valuesUpdateHD.diaChi === '') {
      setErrors({
        ...errors,
        diaChi: false
      });
      return;
    } else if (diaChi.tinh === '') {
      setErrors({
        ...errors,
        tinh: false
      });
      return;
    } else if (diaChi.quan === '') {
      setErrors({
        ...errors,
        quan: false
      });
      return;
    } else if (diaChi.xa === '') {
      setErrors({
        ...errors,
        xa: false
      });
      return;
    } else if (valuesUpdateHD.hinhThucThanhToan.ten === '') {
      toast.error('Hãy chọn phương thức thanh toán');
      return;
    }

    // Bắt đầu cập nhật địa chỉ
    setIsUpdatingDiaChi(true);

    // Cập nhật giá trị diaChi
    setValuesUpdateHD((prev) => ({
      ...prev,
      diaChi: prev.diaChi + ', ' + diaChi.xa + ', ' + diaChi.quan + ', ' + diaChi.tinh
    }));
  };

  const handleThanhToanWithNVP = () => {
    window.location.href = urlPay;
    if (valuesUpdateHD.tenNguoiNhan === '') {
      setErrors({
        ...errors,
        tenNguoiNhan: false
      });
      return;
    } else if (valuesUpdateHD.soDienThoai === '') {
      setErrors({
        ...errors,
        soDienThoai: false
      });
      return;
    } else if (valuesUpdateHD.diaChi === '') {
      setErrors({
        ...errors,
        diaChi: false
      });
      return;
    } else if (diaChi.tinh === '') {
      setErrors({
        ...errors,
        tinh: false
      });
      return;
    } else if (diaChi.quan === '') {
      setErrors({
        ...errors,
        quan: false
      });
      return;
    } else if (diaChi.xa === '') {
      setErrors({
        ...errors,
        xa: false
      });
      return;
    } else if (valuesUpdateHD.hinhThucThanhToan.ten === '') {
      toast.error('Hãy chọn phương thức thanh toán');
      return;
    }

    // Bắt đầu cập nhật địa chỉ
    setIsUpdatingDiaChi(true);

    // Cập nhật giá trị diaChi
    setValuesUpdateHD((prev) => ({
      ...prev,
      diaChi: prev.diaChi + ', ' + diaChi.xa + ', ' + diaChi.quan + ', ' + diaChi.tinh
    }));
  };

  console.log(valuesUpdateHD.hinhThucThanhToan.ten);

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
                  <input
                    type="text"
                    className="form-control fct"
                    id="full_name"
                    name="full_name"
                    placeholder="Họ và Tên"
                    value={valuesUpdateHD.tenNguoiNhan}
                    onChange={(e) => {
                      setValuesUpdateHD({ ...valuesUpdateHD, tenNguoiNhan: e.target.value });
                      setErrors({
                        ...errors,
                        tenNguoiNhan: true
                      });
                    }}
                  />
                </div>
                <span style={{ display: errors.tenNguoiNhan ? 'none' : '', color: 'red' }}>Không được để trống</span>
              </div>
              <div className="form-group row fgr">
                <div className="col-md-12">
                  <label htmlFor="phone" className="text-black">
                    Số Điện Thoại <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control fct"
                    id="phone"
                    name="phone"
                    placeholder="Số Điện Thoại"
                    value={valuesUpdateHD.soDienThoai}
                    onChange={(e) => {
                      setValuesUpdateHD({ ...valuesUpdateHD, soDienThoai: e.target.value });
                      setErrors({
                        ...errors,
                        soDienThoai: true
                      });
                    }}
                  />
                </div>
                <span style={{ display: errors.soDienThoai ? 'none' : '', color: 'red' }}>Không được để trống</span>
              </div>
              <div className="form-group row fgr">
                <div className="col-md-12">
                  <label htmlFor="address" className="text-black">
                    Địa Chỉ <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control fct"
                    id="address"
                    name="address"
                    placeholder="Địa chỉ"
                    value={valuesUpdateHD.diaChi}
                    onChange={(e) => {
                      setValuesUpdateHD({ ...valuesUpdateHD, diaChi: e.target.value });
                      setErrors({
                        ...errors,
                        diaChi: true
                      });
                    }}
                  />
                </div>
                <span style={{ display: errors.diaChi ? 'none' : '', color: 'red' }}>Không được để trống</span>
              </div>

              <div className="col-md-12">
                <label htmlFor="province" className="text-black">
                  Tỉnh/Thành Phố <span className="text-danger">*</span>
                </label>
                <select id="province" className="form-select fsl" value={selectedProvince} onChange={handleProvinceChange}>
                  <option value="">-----Chọn tỉnh thành-----</option>
                  {thanhPho.map((province) => (
                    <option key={province.ProvinceID} value={province.ProvinceID}>
                      {province.NameExtension[1]}
                    </option>
                  ))}
                </select>
                <span style={{ display: errors.tinh ? 'none' : '', color: 'red' }}>Không được để trống</span>
              </div>

              <div className="col-md-12 mt-3">
                <label htmlFor="district" className="text-black">
                  Quận/Huyện <span className="text-danger">*</span>
                </label>
                <select id="district" className="form-select fsl" value={selectedDistrict} onChange={(e) => handleDistrictChange(e)}>
                  <option value="">----Chọn quận huyện-----</option>
                  {quan.map((district) => (
                    <option key={district.DistrictID} value={district.DistrictID}>
                      {district.DistrictName}
                    </option>
                  ))}
                </select>
                <span style={{ display: errors.quan ? 'none' : '', color: 'red' }}>Không được để trống</span>
              </div>

              <div className="col-md-12 mt-3">
                <label htmlFor="ward" className="text-black">
                  Phường/Xã <span className="text-danger">*</span>
                </label>
                <select id="ward" className="form-select fsl" value={selectedWard} onChange={handleWardChange}>
                  <option value="">-----Chọn phường xã-----</option>
                  {phuong.map((ward) => (
                    <option key={ward.WardCode} value={ward.WardCode}>
                      {ward.WardName}
                    </option>
                  ))}
                </select>
                <span style={{ display: errors.xa ? 'none' : '', color: 'red' }}>Không được để trống</span>
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
                    value={valuesUpdateHD.ghiChu}
                    onChange={(e) => setValuesUpdateHD({ ...valuesUpdateHD, ghiChu: e.target.value })}
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
                            onChange={(e) => handleChange(e.target.value)}
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
                    {dataHDKM.map((d, i) => (
                      <tr key={i} style={{ color: 'red' }}>
                        <td className=" font-weight-bold" colSpan="3">
                          Tiền giảm
                        </td>
                        <td>-{convertToCurrency(d.tienGiam)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="text-black font-weight-bold" colSpan="3">
                        Tiền ship
                      </td>
                      <td className="text-black font-weight-bold">{convertToCurrency(valuesUpdateHD.tienShip)}</td>
                    </tr>
                    <tr style={{ fontSize: 18 }}>
                      <td className="text-black font-weight-bold" colSpan="3">
                        Tổng Cộng
                      </td>
                      <td className="text-black font-weight-bold" style={{ fontWeight: 'bold' }}>
                        {convertToCurrency(tongTienKhiGiam)}
                      </td>
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
                            onChange={() =>
                              setValuesUpdateHD({
                                ...valuesUpdateHD,
                                ...valuesUpdateHD.hinhThucThanhToan,
                                hinhThucThanhToan: {
                                  ten: 'VNPay'
                                }
                              })
                            }
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
                            value="Tiền mặt"
                            // checked={true}
                            onChange={() =>
                              setValuesUpdateHD({
                                ...valuesUpdateHD,
                                ...valuesUpdateHD.hinhThucThanhToan,
                                hinhThucThanhToan: {
                                  ten: 'Tiền mặt'
                                }
                              })
                            }
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
                    {valuesUpdateHD.hinhThucThanhToan.ten === 'Tiền mặt' || valuesUpdateHD.hinhThucThanhToan.ten === '' ? (
                      <button className="btn btn-primary btn-lg btn-apply" type="button" onClick={() => handleThanhToan()}>
                        Thanh toán
                      </button>
                    ) : (
                      <button className="btn btn-primary btn-lg btn-apply" type="button" onClick={() => handleThanhToanWithNVP()}>
                        Thanh toán
                      </button>
                    )}
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
