/* eslint-disable react/prop-types */
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../scss/AddQuickly.scss';
import { getAllListMS } from 'services/SanPhamService';
import { useState } from 'react';
import { useEffect } from 'react';

function AddMSKCCTSP(props) {
  const { onHide, handleSubmit, values, setValues } = props;
  const [listMS, setListMS] = useState([]);

  useEffect(() => {
    getAllList();
  }, []);

  const getAllList = async () => {
    const res = await getAllListMS();
    if (res) {
      setListMS(res.data);
    }
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Thêm thuộc tính</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-12">
            <div className="form-inline">
              <label style={{ fontWeight: 'bold' }} className="form-label me-3">
                Màu sắc:{' '}
              </label>
              {listMS.map((d, i) => (
                <div key={i} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id={d.id}
                    value={d.id}
                    onChange={() =>
                      setValues({
                        ...values,
                        mauSac: {
                          id: d.id
                        }
                      })
                    }
                  />
                  <label className="form-check-label" htmlFor={d.id}>
                    <div style={{ backgroundColor: d.ten, width: 50, borderRadius: '10px' }}>&nbsp;</div>
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12">
            <div className="form-inline">
              <label style={{ fontWeight: 'bold' }} className="form-label me-3">
                Kích cỡ:{' '}
              </label>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                <label className="form-check-label" htmlFor="inlineRadio1">
                  1
                </label>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="form-inline">
              <label style={{ fontWeight: 'bold' }} className="form-label me-3">
                Số lượng:{' '}
              </label>
              <div className="form-check form-check-inline">
                <input
                  type="number"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Nhập số lượng"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      soLuong: e.target.value
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <Button type="submit" className="btn btn-primary" onClick={onHide}>
              Thêm
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddMSKCCTSP;
