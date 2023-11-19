import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// @mui material components
import Card from '@mui/material/Card';
import MainCard from 'ui-component/cards/MainCard';
// React components

//  React examples
import { Button } from 'react-bootstrap';
import { postKM } from 'services/ServiceKhuyenMai';

function AddKhuyenMai() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ma: '',
    ten: '',
    mucGiam: '',
    tien: '',
    thoiGianBatDau: '',
    thoiGianKetThuc: '',
    moTa: '',
    trangThai: 0,
    loaiGiam: ''
  });

  // const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (values.loaiGiam === '') {
      toast.error('Vui lòng chọn loại giảm');
      return;
    }

    if (values.loaiGiam === false && (values.mucGiam < 0 || values.mucGiam > 100)) {
      toast.error('Nhập số % giảm sai, vui lòng nhập lại');
      return;
    }
    await post(values); // Gọi hàm post nếu dữ liệu hợp lệ
  };

  // const handleLoaiGiamChange = (event) => {
  //   const loaiGiam = event.target.value;
  //   setValues({ ...values, loaiGiam });
  //   setError(false); // Reset lỗi khi loại giảm được chọn
  // };

  const handleMucGiamChange = (event) => {
    const mucGiam = event.target.value;
    setValues({ ...values, mucGiam });
    // setError(false); // Reset lỗi khi giá trị thay đổi
  };

  const post = async (value) => {
    const res = await postKM(value);
    if (res) {
      toast.success('Thêm thành công !');
      navigate('/voucher');
    }
  };

  return (
    <div>
      <MainCard>
        <Card>
          <center>
            <h4>Tạo mới Khuyến mãi</h4>
          </center>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <label htmlFor="a" className="form-label">
                  Mã:
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={values.ma}
                  disabled
                  onChange={(event) => setValues({ ...values, ma: event.target.value })}
                  style={{ fontWeight: 'bold' }}
                />
              </div>

              <div className="col-6">
                <label htmlFor="a" className="form-label">
                  Tên:
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={values.ten}
                  onChange={(event) => setValues({ ...values, ten: event.target.value })}
                />
              </div>

              <div className="col-md-6" style={{ paddingTop: 10 }}>
                <label htmlFor="a" className="form-label" style={{ display: 'flex' }}>
                  Mức giảm:
                  <div className="form-check" style={{ marginLeft: 15, marginRight: 15 }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={true}
                      checked={values.loaiGiam === true}
                      onChange={() => setValues({ ...values, loaiGiam: true })}
                    />
                    <label htmlFor="a" className="form-check-label">
                      Tiền giảm
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={false}
                      checked={values.loaiGiam === false}
                      onChange={() => setValues({ ...values, loaiGiam: false })}
                    />
                    <label htmlFor="a" className="form-check-label">
                      % giảm
                    </label>
                  </div>
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={values.mucGiam}
                  onChange={handleMucGiamChange}
                  disabled={values.loaiGiam === ''} // Disable nếu loại giảm không được chọn
                />
              </div>

              <div className="col-md-6" style={{ paddingTop: 10 }}>
                <label htmlFor="a" className="form-label">
                  Tối thiểu:
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={values.tien}
                  onChange={(event) => setValues({ ...values, tien: event.target.value })}
                />
              </div>

              <div className="col-md-6" style={{ paddingTop: 10 }}>
                <label htmlFor="a" className="form-label">
                  Thời gian bắt đầu:
                </label>
                <input
                  className="form-control"
                  type="datetime-local"
                  value={values.thoiGianBatDau}
                  onChange={(event) => setValues({ ...values, thoiGianBatDau: event.target.value })}
                />
              </div>

              <div className="col-md-6" style={{ paddingTop: 10 }}>
                <label htmlFor="a" className="form-label">
                  Thời gian kết thúc:
                </label>
                <input
                  className="form-control"
                  type="datetime-local"
                  value={values.thoiGianKetThuc}
                  onChange={(event) => setValues({ ...values, thoiGianKetThuc: event.target.value })}
                />
              </div>

              <div className="col-md-6" style={{ paddingTop: 10 }}>
                <label htmlFor="a" className="form-label">
                  Mô tả:
                </label>
                <textarea
                  className="form-control"
                  value={values.moTa}
                  onChange={(event) => setValues({ ...values, moTa: event.target.value })}
                />
              </div>
            </div>
            <br></br>
            <div className="col-12">
              <Button type="submit" variant="primary">
                Tạo mới
              </Button>{' '}
            </div>
          </form>
        </Card>
      </MainCard>
    </div>
  );
}
export default AddKhuyenMai;
