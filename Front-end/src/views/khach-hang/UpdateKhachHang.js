/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Card } from '@mui/material';
import { detailKH, getAllDcKh, deleteDC, updateDC, addDC, detailDC } from 'services/KhachHangService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'react-bootstrap';

function UpdateKhachHang() {
  //Lấy các giá trị
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  //Lấy Id
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  //Lấy tên
  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedWardName, setSelectedWardName] = useState('');

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

  const handleProvinceChange = async (event) => {
    const provinceId = event.target.value;
    setSelectedProvince(provinceId);
    setSelectedProvinceName(event.target.options[event.target.selectedIndex].text);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedDistrictName('');
    setSelectedWardName('');
    try {
      if (provinceId) {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
        setDistricts(response.data.results);
        setWards([]);
      } else {
        setDistricts([]);
        setWards([]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi lấy danh sách quận huyện');
    }
  };

  const handleDistrictChange = async (event) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    setSelectedDistrictName(event.target.options[event.target.selectedIndex].text);
    setSelectedWard(null);
    setSelectedWardName('');
    try {
      if (districtId) {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
        setWards(response.data.results);
      } else {
        setWards([]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi lấy danh sách phường xã');
    }
  };

  const handleWardChange = (event) => {
    const wardId = event.target.value;
    setSelectedWard(wardId);
    setSelectedWardName(event.target.options[event.target.selectedIndex].text);
  };

  const filteredDistricts = districts.filter((district) => district.province_id === selectedProvince);
  const filteredWards = wards.filter((ward) => ward.district_id === selectedDistrict);

  const [valueDC, setValueDC] = useState();
  const [idDC, setIdDc] = useState();

  const detailDCKH = async (idDC) => {
    const res = await detailDC(idDC);
    if (res) {
      setValueDC(res.data);
    }
  };

  useEffect(() => {
    if (valueDC) {
      setSelectedProvince(valueDC.tinhThanh);
      setSelectedDistrict(valueDC.quanHuyen);
      setSelectedWard(valueDC.phuongXa);
    }
  }, [valueDC]);

  useEffect(() => {
    detailDCKH(idDC);
  }, [idDC]);

  const updateDCKH = async (idDC, value) => {
    const res = await updateDC(idDC, value);
    if (res) {
      toast.success('Cập nhật thành công !');
    }
  };

  const handleSubmitDC = async (event) => {
    event.preventDefault();
    setValueDC(() => ({
      tinhThanh: selectedProvinceName,
      quanHuyen: selectedProvinceName,
      phuongXa: selectedProvinceName
    }));
    updateDCKH(idDC, values);
  };

  //Địa chỉ
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);

  const handleClose1 = () => {
    setShow1(false);
  };

  const handleShow1 = (dc) => {
    setSelectedProvince(dc.tinhThanh);
    setSelectedProvinceName(dc.tinhThanh);
    setSelectedDistrict(dc.quanHuyen);
    setSelectedDistrictName(dc.quanHuyen);
    setSelectedWard(dc.phuongXa);
    setSelectedWardName(dc.phuongXa);
    setIdDc(dc.id);
    console.log(dc.tinhThanh);
    setShow1(true);
  };

  // Địa Chỉ
  const [dc, setDc] = useState([]);

  const hienThiDiaChi = async (id) => {
    const res = await getAllDcKh(id);
    if (res && res.data) {
      setDc(res.data);
    }
  };

  const handleDeleteDC = (id) => {
    del(id);
  };

  const del = async (idDC) => {
    const res = await deleteDC(idDC);
    if (res) {
      toast.success('Xóa thành công!');
      hienThiDiaChi(id);
    }
  };

  const navigate = useNavigate();
  const [values, setValues] = useState({
    tenKhachHang: '',
    sdt: '',
    email: '',
    ngaySinh: '',
    matKhau: '',
    gioiTinh: '',
    trangThai: ''
  });

  const [anh, setAnh] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    detail(id);
    hienThiDiaChi(id);
  }, [id]);

  const updateKHFormData = async (id, formData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/khach-hang/update/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('tenKhachHang', values.tenKhachHang);
    formData.append('sdt', values.sdt);
    formData.append('email', values.email);
    formData.append('ngaySinh', values.ngaySinh);
    formData.append('matKhau', values.matKhau);
    formData.append('gioiTinh', values.gioiTinh);
    formData.append('trangThai', values.trangThai);
    formData.append('anh', anh);

    try {
      const res = await updateKHFormData(id, formData);
      if (res) {
        toast.success('Cập nhật thành công!');
        navigate('/khach-hang');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi cập nhật khách hàng');
    }
  };

  const handlePreviewAnh = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAnh(file);
  };

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().slice(0, 10);
  };

  const detail = async (id) => {
    const res = await detailKH(id);
    if (res) {
      const { ngaySinh, ...values } = res.data;
      setValues({
        ...values,
        ngaySinh: formatDate(ngaySinh)
      });
    }
  };

  //ADD địa chỉ

  const handleSubmitADD = async (event) => {
    // Tạo đối tượng địa chỉ mới
    event.preventDefault();
    const newAddress = {
      tinhThanh: selectedProvinceName,
      quanHuyen: selectedDistrictName,
      phuongXa: selectedWardName
    };
    await addDCKH(id, newAddress);
  };

  const addDCKH = async (id, value) => {
    const res = await addDC(id, value);
    if (res) {
      toast.success('Thêm thành công !');
      setShow(false);
      hienThiDiaChi(id);
    }
  };

  return (
    <MainCard>
      <Card>
        <div className="div">
          <div className="body flex-grow-1 px-3">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <label htmlFor="a" className="form-label">
                  Mã Khách Hàng
                </label>
                <input
                  type="text"
                  disabled
                  className="form-control"
                  value={values.maKhachHang}
                  onChange={(e) => setValues({ ...values, maKhachHang: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="a" className="form-label">
                  Tên Khách Hàng
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={values.tenKhachHang}
                  onChange={(e) => setValues({ ...values, tenKhachHang: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="a" className="form-label">
                  Số Điện Thoại
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={values.sdt}
                  onChange={(e) => setValues({ ...values, sdt: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="a" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={values.email}
                  onChange={(e) => setValues({ ...values, email: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="a" className="form-label">
                  Ngày Sinh
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={values.ngaySinh}
                  onChange={(e) => setValues({ ...values, ngaySinh: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="a" className="form-label me-3">
                  Giới Tính:{' '}
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions3"
                    id="inlineRadio4"
                    value={false}
                    checked={values.gioiTinh === false}
                    onChange={() => setValues({ ...values, gioiTinh: false })}
                  />
                  <label htmlFor="a" className="form-check-label">
                    Nam
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions3"
                    id="inlineRadio3"
                    value={true}
                    checked={values.gioiTinh === true}
                    onChange={() => setValues({ ...values, gioiTinh: true })}
                  />
                  <label htmlFor="a" className="form-check-label">
                    Nữ
                  </label>
                </div>
              </div>

              <div className="col-6">
                <label htmlFor="a" className="form-label">
                  Mật khẩu
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={values.matKhau}
                  onChange={(e) => setValues({ ...values, matKhau: e.target.value })}
                />
              </div>
              <div className="col-6">
                <label htmlFor="a" className="form-label">
                  Ảnh
                </label>
                <input type="file" id="anh" className="form-control" name="anh" onChange={handlePreviewAnh} />
                {anh && <img src={anh.preview} alt="" width="70%"></img>}
              </div>
              <div className="col-6">
                <label htmlFor="a" className="form-label me-3">
                  Trạng thái:{' '}
                </label>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="1"
                    checked={values.trangThai === 1} // Kiểm tra nếu trạng thái là "1" thì được chọn
                    onChange={() => setValues({ ...values, trangThai: 1 })}
                  />
                  <label htmlFor="a" className="form-check-label">
                    Hoạt động
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="0"
                    checked={values.trangThai === 0} // Kiểm tra nếu trạng thái là "0" thì được chọn
                    onChange={() => setValues({ ...values, trangThai: 0 })}
                  />
                  <label htmlFor="a" className="form-check-label">
                    Không hoạt động
                  </label>
                </div>
              </div>

              <div className="col-6">
                <div>
                  <label htmlFor="a" className="form-label">
                    Địa Chỉ
                  </label>
                  <span className="fa-solid fa-plus mx-3" onClick={handleShow}></span>
                  <div>
                    <ul>
                      <li style={{ width: 500 }}>
                        {dc.map((dc, index) => (
                          <div
                            key={dc.id}
                            style={{
                              border: '2px solid skyblue',
                              borderRadius: 10,
                              height: 50,
                              paddingTop: 8,
                              marginTop: index > 0 ? 20 : 0 // Thêm khoảng cách 20px cho phần tử từ thứ 2 trở đi
                            }}
                          >
                            <h7 style={{ paddingLeft: 15, paddingRight: 10 }}>
                              <label style={{ fontSize: 15, fontStyle: 'italic' }} htmlFor="dc">
                                {' '}
                                {dc.tinhThanh}, {dc.quanHuyen}, {dc.phuongXa}
                              </label>
                            </h7>
                            <span
                              className="mx-2"
                              onClick={() => {
                                handleShow1(dc);
                              }}
                            >
                              <i style={{ color: 'aqua' }} className="fa-regular fa-pen-to-square fa-lg"></i>
                            </span>
                            <span className="mx-2" onClick={() => handleDeleteDC(dc.id)}>
                              <i style={{ color: '#ff1744' }} className="fa-solid fa-trash"></i>
                            </span>
                          </div>
                        ))}
                      </li>
                    </ul>
                  </div>
                  <Modal style={{ marginTop: 120, marginLeft: 150 }} show={show1} onHide={handleClose1}>
                    <Modal.Header>
                      <Modal.Title style={{ marginLeft: 175 }}>Sửa Địa Chỉ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ width: 500, maxHeight: 390, overflow: 'auto' }}>
                      <div className="div">
                        <div className="body flex-grow-1 px-3">
                          <form className="row g-3">
                            <div className="col-md-4">
                              <label htmlFor="province" className="form-label">
                                Tỉnh thành
                              </label>
                              <select id="province" className="form-select" value={selectedProvince} onChange={handleProvinceChange}>
                                <option value="">Chọn tỉnh thành</option>
                                {provinces.map((province) => (
                                  <option key={province.province_id} value={province.province_id}>
                                    {province.province_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="col-md-4">
                              <label htmlFor="district" className="form-label">
                                Quận huyện
                              </label>
                              <select
                                id="district"
                                className="form-select"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={!selectedProvince}
                              >
                                <option value="">Chọn quận huyện</option>
                                {districts.map((district) => (
                                  <option key={district.district_id} value={district.district_id}>
                                    {district.district_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="col-md-4">
                              <label htmlFor="ward" className="form-label">
                                Phường xã
                              </label>
                              <select
                                id="ward"
                                className="form-select"
                                value={selectedWard}
                                onChange={handleWardChange}
                                disabled={!selectedDistrict || !selectedProvince}
                              >
                                <option value="">Chọn phường xã</option>
                                {wards.map((ward) => (
                                  <option key={ward.ward_id} value={ward.ward_id}>
                                    {ward.ward_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="col-6" style={{ display: 'flex' }}>
                              <div className="text-start">
                                <button type="submit" onClick={handleSubmitDC} className="btn btn-primary">
                                  Update
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>

                  <Modal style={{ marginTop: 120, marginLeft: 150 }} show={show} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title style={{ marginLeft: 150 }}>Thêm Mới Địa Chỉ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ width: 500, maxHeight: 390, overflow: 'auto' }}>
                      <div className="div">
                        <div className="body flex-grow-1 px-3">
                          <form className="row g-3">
                            <div className="col-md-4">
                              <label htmlFor="province" className="form-label">
                                Tỉnh thành
                              </label>
                              <select id="province" className="form-select" value={selectedProvince} onChange={handleProvinceChange}>
                                <option value="">Chọn tỉnh thành</option>
                                {provinces.map((province) => (
                                  <option key={province.province_id} value={province.province_id}>
                                    {province.province_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="col-md-4">
                              <label htmlFor="district" className="form-label">
                                Quận huyện
                              </label>
                              <select
                                id="district"
                                className="form-select"
                                value={selectedDistrict}
                                onChange={handleDistrictChange}
                                disabled={!selectedProvince}
                              >
                                <option value="">Chọn quận huyện</option>
                                {filteredDistricts.map((district) => (
                                  <option key={district.district_id} value={district.district_id}>
                                    {district.district_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="col-md-4">
                              <label htmlFor="ward" className="form-label">
                                Phường xã
                              </label>
                              <select
                                id="ward"
                                className="form-select"
                                value={selectedWard}
                                onChange={handleWardChange}
                                disabled={!selectedDistrict || !selectedProvince}
                              >
                                <option value="">Chọn phường xã</option>
                                {filteredWards.map((ward) => (
                                  <option key={ward.ward_id} value={ward.ward_id}>
                                    {ward.ward_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="text-start">
                              <button type="button" className="btn btn-primary" onClick={handleSubmitADD}>
                                Thêm
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>

              <div className="col-6" style={{ display: 'flex' }}>
                <div className="text-start">
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </MainCard>
  );
}

export default UpdateKhachHang;
