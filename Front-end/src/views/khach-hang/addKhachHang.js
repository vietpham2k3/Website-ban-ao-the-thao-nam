import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';
import { Card } from '@mui/material';

import { toast } from 'react-toastify';
import { addKH } from 'services/KhachHangService';

function AddKhachHang() {
  const navigate = useNavigate();

  const [anh, setAnh] = useState(null);

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
    maKhachHang: '',
    tenKhachHang: '',
    sdt: '',
    email: '',
    ngaySinh: '',
    matKhau: '',
    trangThai: 1
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!anh) {
      toast.error('Vui lòng chọn ảnh');
      return;
    }

    const formData = new FormData();
    // formData.append("maKhachHang", values.maKhachHang);
    formData.append('tenKhachHang', values.tenKhachHang);
    formData.append('sdt', values.sdt);
    formData.append('email', values.email);
    formData.append('ngaySinh', values.ngaySinh);
    formData.append('matKhau', values.matKhau);
    formData.append('trangThai', values.trangThai);
    formData.append('anh', anh);

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

  // const handleFileChange = (event) => {
  //   setValues({
  //     ...values,
  //   })
  //   event.target.files[0];
  // };

  return (
    <MainCard>
      <Card>
        <div className="div">
          <h1>Thêm Khách Hàng</h1>
          <form className="row g-3" onSubmit={handleSubmit}>
            {/* <div className="col-md-6">
            <label className="form-label">Mã Khách Hàng</label>
            <input
              type="text"
              className="form-control"
              value={values.maKhachHang}
              onChange={(e) => setValues({ ...values, maKhachHang: e.target.value })}
            />
          </div> */}
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
                  checked={true}
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
                  onChange={() => setValues({ ...values, trangThai: 0 })}
                />
                <label htmlFor="a" className="form-check-label">
                  Không hoạt động
                </label>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
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
