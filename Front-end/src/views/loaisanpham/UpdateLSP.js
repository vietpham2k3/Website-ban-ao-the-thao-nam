import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { detail, updateLSP } from 'services/LoaiSanPhamService';

import { useNavigate } from 'react-router-dom';
import MainCard from 'ui-component/cards/MainCard';

// @mui material components
import Card from '@mui/material/Card';

//  React examples
import { Button } from 'react-bootstrap';

function UpdateLSP() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    ten: '',
    trangThai: ''
  });

  const { id } = useParams();

  useEffect(() => {
    detailLSP(id);
  }, [id]);

  const detailLSP = async (id) => {
    const res = await detail(id);
    if (res) {
      setValues(res.data);
    }
  };

  const put = async (id, value) => {
    const res = await updateLSP(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      navigate('/san-pham/loai-san-pham');
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
          <div className="body flex-grow-1 px-3">
            <form className="row g-3" onSubmit={handleSubmit}>
              <div className="col-md-6">
                <span className="form-label">Tên Loại</span>
                <input
                  type="text"
                  className="form-control"
                  value={values.ten}
                  onChange={(e) => setValues({ ...values, ten: e.target.value })}
                />
              </div>
              <div className="col-6">
                <span style={{ fontWeight: 'bold' }} className="form-label">
                  Trạng thái:{' '}
                </span>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="0"
                    checked={values.trangThai === 0}
                    onChange={() => setValues({ ...values, trangThai: 0 })}
                  />
                  <span className="form-check-label">Kích hoạt</span>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="1"
                    checked={values.trangThai === 1}
                    onChange={() => setValues({ ...values, trangThai: 1 })}
                  />
                  <span className="form-check-label">Ngừng kích hoạt</span>
                </div>
              </div>
              <div className="col-12">
                <Button type="submit" className="btn btn-bg-info">
                  Update
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </MainCard>
    </div>
  );
}

export default UpdateLSP;
