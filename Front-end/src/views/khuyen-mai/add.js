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
    trangThai: 0
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    post(values);
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
            </div>

            <div className="row">
              <div className="col-12">
                <label htmlFor="a" className="form-label">
                  Mức giảm:
                </label>
                <input
                  className="form-control"
                  type="number"
                  value={values.mucGiam}
                  onChange={(event) => setValues({ ...values, mucGiam: event.target.value })}
                />
              </div>
            </div>

            <div className="col-md-12">
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

            <div className="col-md-12">
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

            <div className="col-md-12">
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

            <div className="col-md-12">
              <label htmlFor="a" className="form-label">
                Mô tả:
              </label>
              <textarea
                className="form-control"
                value={values.moTa}
                onChange={(event) => setValues({ ...values, moTa: event.target.value })}
              />
            </div>

            {/* <div className="col-md-6">
                  <label>
                    Trạng thái:
                    <select
                      value={trangThai}
                      onChange={(event) => setTrangThai(event.target.value)}
                    >
                      <option value="0">Hoạt động</option>
                      <option value="1">Không hoạt động</option>
                    </select>
                  </label>
                </div> */}
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
