import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// @mui material components
import Card from '@mui/material/Card';
import MainCard from 'ui-component/cards/MainCard';
// React components

//  React examples
import { Button } from 'react-bootstrap';
import { putKM } from 'services/ServiceKhuyenMai';
import { detailKM } from 'services/ServiceKhuyenMai';

function UpdateKhuyenMai() {
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

  const { id } = useParams();

  useEffect(() => {
    detail(id);
  }, [id]);

  const detail = async (id) => {
    const res = await detailKM(id);
    if (res) {
      const { thoiGianBatDau, thoiGianKetThuc } = res.data;

      // Chuyển đổi ngày tháng thành chuỗi ngày tháng hợp lệ
      const ngayBatDau = new Date(thoiGianBatDau).toISOString().split('T')[0];
      const gioBatDau = new Date(thoiGianBatDau).toISOString().split('T')[1].substring(0, 5);
      const ngayKetThuc = new Date(thoiGianKetThuc).toISOString().split('T')[0];
      const gioKetThuc = new Date(thoiGianKetThuc).toISOString().split('T')[1].substring(0, 5);

      setValues({
        ...res.data,
        thoiGianBatDau: ngayBatDau + 'T' + gioBatDau,
        thoiGianKetThuc: ngayKetThuc + 'T' + gioKetThuc
      });
    }
  };

  const put = async (id, value) => {
    const res = await putKM(id, value);
    if (res) {
      toast.success('Update thành công !');
      navigate('/voucher');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    put(id, values);
  };

  return (
    <div>
      <MainCard>
        <Card>
          <center>
            <h4>Update Khuyến mãi</h4>
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
                Update
              </Button>{' '}
            </div>
          </form>
        </Card>
      </MainCard>
    </div>
  );
}
export default UpdateKhuyenMai;
