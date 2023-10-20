import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { Card } from '@mui/material';

import { toast } from 'react-toastify';
import { addKH } from 'services/KhachHangService';
import { getP, getQH, getTP } from 'services/ApiGHNService';

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

  //Lấy tên
  const [selectedProvinceName, setSelectedProvinceName] = useState('');
  const [selectedDistrictName, setSelectedDistrictName] = useState('');
  const [selectedWardName, setSelectedWardName] = useState('');

  const getThanhPho = async () => {
    try {
      const res = await getTP();
      if (res) {
        setProvinces(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuanHuyen = async (value) => {
    try {
      const res = await getQH(value);
      if (res) {
        setDistricts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPhuong = async (value) => {
    try {
      const res = await getP(value);
      if (res) {
        setWards(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getThanhPho();
  }, []);

  const handleProvinceChange = async (event) => {
    const provinceId = {
      province_id: event.target.value
    };
    setSelectedProvince(event.target.value);
    setSelectedProvinceName(event.target.options[event.target.selectedIndex].text);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setSelectedDistrictName('');
    setSelectedWardName('');
    getQuanHuyen(provinceId);
  };

  const handleDistrictChange = async (event) => {
    const districtId = {
      district_id: event.target.value
    };
    setSelectedDistrict(event.target.value);
    setSelectedDistrictName(event.target.options[event.target.selectedIndex].text);
    setSelectedWard(null);
    setSelectedWardName('');
    getPhuong(districtId);
  };

  const handleWardChange = (event) => {
    setSelectedWard(event.target.value);
    setSelectedWardName(event.target.options[event.target.selectedIndex].text);
  };

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
    diaChi: '',
    khachHang: {
      maKhachHang: '',
      tenKhachHang: '',
      sdt: '',
      email: '',
      ngaySinh: '',
      gioiTinh: '',
      trangThai: 1
    }
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
    formData.append('gioiTinh', values.khachHang.gioiTinh);
    formData.append('trangThai', values.khachHang.trangThai);
    if (anh) {
      formData.append('anh', anh);
    }
    formData.append('diaChi', values.diaChi);
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
            <div className="col-md-6">
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

            <div className="col-md-6">
              <div className="col-md-12" style={{ paddingBottom: 10 }}>
                <label htmlFor="address" className="text-black" style={{ paddingBottom: 5 }}>
                  Địa Chỉ
                </label>
                <input
                  type="text"
                  className="form-control fct"
                  id="address"
                  value={values.diaChi}
                  onChange={(e) =>
                    setValues({
                      ...values,
                      diaChi: e.target.value
                    })
                  }
                  name="address"
                  placeholder="Địa chỉ..."
                />
              </div>
              <div className="col-md-12" style={{ paddingBottom: 10 }}>
                <label htmlFor="ward" className="form-label">
                  Tỉnh/Thành Phố
                </label>
                <select id="province" className="form-select fsl" value={selectedProvince} onChange={handleProvinceChange}>
                  <option value="">Chọn tỉnh thành</option>
                  {provinces.map((province) => (
                    <option key={province.ProvinceID} value={province.ProvinceID}>
                      {province.NameExtension[1]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12" style={{ paddingBottom: 10 }}>
                <label htmlFor="ward" className="form-label">
                  Quận Huyện
                </label>
                <select
                  id="district"
                  className="form-select fsl"
                  value={selectedDistrict || ''}
                  onChange={(e) => handleDistrictChange(e)}
                  disabled={!selectedProvince}
                >
                  <option value="">Chọn quận huyện</option>
                  {districts.map((district) => (
                    <option key={district.DistrictID} value={district.DistrictID}>
                      {district.DistrictName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-12" style={{ paddingBottom: 10 }}>
                <label htmlFor="ward" className="form-label">
                  Phường xã
                </label>
                <select
                  id="ward"
                  className="form-select fsl"
                  value={selectedWard || ''}
                  onChange={handleWardChange}
                  disabled={!selectedDistrict || !selectedProvince}
                >
                  <option value="">Chọn phường xã</option>
                  {wards.map((ward) => (
                    <option key={ward.WardCode} value={ward.WardCode}>
                      {ward.WardName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-6">
              <label htmlFor="a" className="form-label">
                Ảnh
              </label>
              <input type="file" id="anh" className="form-control" accept="image/*" name="anh" onChange={handlePreviewAnh} />
              {anh && <img src={anh.preview} alt="" width="70%"></img>}
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
