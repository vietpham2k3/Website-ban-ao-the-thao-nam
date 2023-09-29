import { postCreate, fetchAllCTSP } from 'services/KichCoService';
import { toast } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '@mui/material'; // Import Button from '@mui/material'

import MainCard from 'ui-component/cards/MainCard';

function AddKichCo() {
  const navigate = useNavigate();
  const [KichCos, setCTSP] = useState([]);
  const [values, setValues] = useState({
    ma: '',
    ten: '',
    chiTietSanPham: '',
    trangThai: 0
  });

  useEffect(() => {
    getAllCTSP();
  }, []);

  const getAllCTSP = async () => {
    let res = await fetchAllCTSP();
    if (res) {
      setCTSP(res.data);
    }
  };

  const post = async (value) => {
    const res = await postCreate(value);
    if (res) {
      toast.success('Add thành công');
      navigate('/san-pham/kich-co');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    post(values);
  };

  return (
    <div>
      <MainCard>
        <Card>
          <div className="body flex-grow-1 px-3">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <span className="form-label">MÃ</span>
                <input
                  type="text"
                  className="form-control"
                  value={values.ma}
                  onChange={(e) => setValues({ ...values, ma: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <span className="form-label">TÊN</span>
                <input
                  type="text"
                  className="form-control"
                  value={values.ten}
                  onChange={(e) => setValues({ ...values, ten: e.target.value })}
                />
              </div>
              <div className="col-6">
                <div className="mb-2">
                  <label htmlFor="chiTietSanPham">MÃ SẢN PHẨM</label>
                  <select
                    id="chiTietSanPham"
                    className="form-select"
                    aria-label="Default select example"
                    value={values.chiTietSanPham}
                    onChange={(e) => setValues({ ...values, chiTietSanPham: e.target.value })}
                  >
                    <option>Chọn mã Sản Phẩm</option>
                    {KichCos.map((d, i) => (
                      <option key={i} value={d.id}>
                        {d.ma}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-6">
                <br></br>
                <span style={{ fontWeight: 'bold' }} className="form-label me-3">
                  Trạng thái:{' '}
                </span>
                <br></br>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="0"
                    checked={true}
                    onChange={() => setValues({ ...values, trangThai: 0 })}
                  />
                  <span className="form-check-label">Kích hoạt</span>
                </div>
                <br></br>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="1"
                    onChange={() => setValues({ ...values, trangThai: 1 })}
                  />
                  <span className="form-check-label">Ngừng kích hoạt</span>
                </div>
              </div>
              <div className="col-12">
                <Button type="submit" className="btn btn-primary">
                  Thêm
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </MainCard>
    </div>
  );
}

export default AddKichCo;
