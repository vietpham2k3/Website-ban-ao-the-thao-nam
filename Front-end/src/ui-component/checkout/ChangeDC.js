/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button, Modal } from 'react-bootstrap';

const ChangeDC = ({ handleClose, show, dataDC, setValuesDC, valuesDC, handleAddDC, thanhPho, setValuesId, setIsShowUpdate, setIdDC }) => {
  const handleChange = (diaChi, phuongXa, quanHuyen, tinhThanh) => {
    setValuesDC({ ...valuesDC, diaChi: diaChi, phuongXa: phuongXa, quanHuyen: quanHuyen, tinhThanh: tinhThanh });
    thanhPho.forEach((province) => {
      if (province.NameExtension[1] === tinhThanh) {
        setValuesId({
          province_id: province.ProvinceID
        });
      }
    });
  };

  const handleShowDC = (id, quanHuyen, tinhThanh) => {
    setValuesDC({ ...valuesDC, quanHuyen: quanHuyen });
    handleClose();
    setIdDC(id);
    setIsShowUpdate(true);
    thanhPho.forEach((province) => {
      if (province.NameExtension[1] === tinhThanh) {
        setValuesId({
          province_id: province.ProvinceID
        });
      }
    });
  };

  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Địa chỉ của tôi</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: 500 }}>
          {dataDC.map((d, i) => (
            <div key={i} className="dia-chi-checkout container">
              <p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    onChange={() => handleChange(d.diaChi, d.phuongXa, d.quanHuyen, d.tinhThanh)}
                  />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
                    {d.diaChi}, {d.phuongXa}, {d.quanHuyen}, {d.tinhThanh}
                  </label>
                  <br />
                  {d.trangThai === 1 ? <p className="text-default-dc">Mặc định</p> : ''}
                </div>
              </p>
              <span className="change-dc change-dc-modal" onClick={() => handleShowDC(d.id, d.quanHuyen, d.tinhThanh)}>
                Thay đổi
              </span>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAddDC}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ChangeDC;
