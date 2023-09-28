/* eslint-disable no-useless-catch */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Card } from '@mui/material';
import { detailKH } from 'services/KhachHangService';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function UpdateKhachHang() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    tenKhachHang: '',
    sdt: '',
    email: '',
    ngaySinh: '',
    matKhau: '',
    trangThai: ''
  });

  const [anh, setAnh] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    detail(id);
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

  // const update = async (id, value) => {
  //   const res = await updateKH(id, value);
  //   if (res) {
  //     toast.success("Update succses!");
  //     navigate("/khach-hang");
  //   }
  // };

  const formatDate = (date) => {
    const formattedDate = new Date(parseInt(date, 10)).toISOString().slice(0, 10);
    return formattedDate;
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
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </MainCard>
  );
}

export default UpdateKhachHang;
