import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { Card } from '@mui/material';

import { toast } from 'react-toastify';
import { addKH } from 'services/KhachHangService';
import axios from 'axios';

function AddKhachHang() {
  const navigate = useNavigate();

  const [anh, setAnh] = useState(null);

  // Lấy danh sách tỉnh thành từ API
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
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

  useEffect(() => {
    return () => {
      anh && URL.revokeObjectURL(anh.preview);
    };
  }, [anh]);

  const handlePreviewAnh = (event) => {
    const file = event.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAnh(file);
  };

  const [values, setValues] = useState({
    tinhThanh: '',
    quanHuyen: '',
    phuongXa: '',
    khachHang: {
      maKhachHang: '',
      tenKhachHang: '',
      sdt: '',
      email: '',
      ngaySinh: '',
      matKhau: '',
      gioiTinh: '',
      trangThai: 1
    },
    trangThai: 1
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValues((prevValues) => ({
      ...prevValues,
      tinhThanh: selectedProvinceName,
      quanHuyen: selectedDistrictName,
      phuongXa: selectedWardName
    }));
    const formData = new FormData();
    formData.append('tenKhachHang', values.khachHang.tenKhachHang);
    formData.append('sdt', values.khachHang.sdt);
    formData.append('email', values.khachHang.email);
    formData.append('ngaySinh', values.khachHang.ngaySinh);
    formData.append('matKhau', values.khachHang.matKhau);
    formData.append('gioiTinh', values.khachHang.gioiTinh);
    formData.append('trangThai', values.khachHang.trangThai);
    if (anh) {
      formData.append('anh', anh);
    }
    formData.append('tinhThanh', selectedProvinceName);
    formData.append('quanHuyen', selectedDistrictName);
    formData.append('phuongXa', selectedWardName);
    try {
      const res = await addKH(formData);
      if (res) {
        toast.success('Thêm thành công');
        navigate('/khach-hang');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã xảy ra lỗi khi thêm khách hàng');
    }
  };

  return (
    <MainCard>
      <Card>
        <div className="div">
          <h1>Thêm Khách Hàng</h1>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="a" className="form-label">
                Tên Khách Hàng
              </label>
              <input
                type="text"
                className="form-control"
                value={values.khachHang.tenKhachHang}
                onChange={(e) =>
                  setValues({
                    ...values,
                    khachHang: {
                      ...values.khachHang,
                      tenKhachHang: e.target.value
                    }
                  })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="a" className="form-label">
                Số Điện Thoại
              </label>
              <input
                type="text"
                className="form-control"
                value={values.khachHang.sdt}
                onChange={(e) =>
                  setValues({
                    ...values,
                    khachHang: {
                      ...values.khachHang,
                      sdt: e.target.value
                    }
                  })
                }
              />
            </div>
            <div className="col-6">
              <label htmlFor="a" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                value={values.khachHang.email}
                onChange={(e) =>
                  setValues({
                    ...values,
                    khachHang: {
                      ...values.khachHang,
                      email: e.target.value
                    }
                  })
                }
              />
            </div>
            <div className="col-6">
              <label htmlFor="a" className="form-label">
                Ngày Sinh
              </label>
              <input
                type="date"
                className="form-control"
                value={values.khachHang.ngaySinh}
                onChange={(e) =>
                  setValues({
                    ...values,
                    khachHang: {
                      ...values.khachHang,
                      ngaySinh: e.target.value
                    }
                  })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="a" className="form-label" style={{ paddingRight: 5 }}>
                Giới tính:{' '}
              </label>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions2"
                  id="inlineRadio3"
                  value={true}
                  checked={values.khachHang.gioiTinh === true}
                  onChange={() =>
                    setValues({
                      ...values,
                      khachHang: {
                        ...values.khachHang,
                        gioiTinh: true
                      }
                    })
                  }
                />
                <label htmlFor="a" className="form-check-label">
                  Nam
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="inlineRadioOptions2"
                  id="inlineRadio4"
                  value={false}
                  checked={values.khachHang.gioiTinh === false}
                  onChange={() =>
                    setValues({
                      ...values,
                      khachHang: {
                        ...values.khachHang,
                        gioiTinh: false
                      }
                    })
                  }
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
                type="password"
                className="form-control"
                value={values.khachHang.matKhau}
                onChange={(e) =>
                  setValues({
                    ...values,
                    khachHang: {
                      ...values.khachHang,
                      matKhau: e.target.value
                    }
                  })
                }
              />
            </div>

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

            <div className="col-6">
              <label htmlFor="a" className="form-label">
                Ảnh
              </label>
              <input type="file" id="anh" className="form-control" accept="image/*" name="anh" onChange={handlePreviewAnh} />
              {anh && <img src={anh.preview} alt="" width="70%"></img>}
            </div>
            <div className="col-12">
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
                  checked={true}
                  onChange={() =>
                    setValues({
                      ...values,
                      khachHang: {
                        ...values.khachHang,
                        trangThai: 1
                      }
                    })
                  }
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
                  onChange={() =>
                    setValues({
                      ...values,
                      khachHang: {
                        ...values.khachHang,
                        trangThai: 0
                      }
                    })
                  }
                />
                <label htmlFor="a" className="form-check-label">
                  Không hoạt động
                </label>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                Add
              </button>
            </div>
          </form>
        </div>
      </Card>
    </MainCard>
  );
}

export default AddKhachHang;
