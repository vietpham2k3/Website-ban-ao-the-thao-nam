import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function UpdateModal(props) {
  const { show, handleClose, values, setValues, handleUpdate } = props;

  // Sử dụng useEffect để theo dõi sự thay đổi của giá trị show
  useEffect(() => {
    if (show) {
      // Nếu modal được hiển thị, cập nhật lại giá trị tên và trạng thái
      setValues({
        ten: values.ten,
        trangThai: values.trangThai,
      });
    }
  }, [show, setValues, values.ten, values.trangThai]);

  return (
    <Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Cập Nhật Vai Trò</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form>
      <div className="col-md-6">
        <label htmlFor="ten" className="form-label">
          TÊN
        </label>
        <input
          type="text"
          className="form-control"
          id="ten"
          value={values.ten} // Hiển thị tên
          onChange={(e) => setValues({ ...values, ten: e.target.value })}
        />
      </div>
      <div className="col-6">
        <div className="form-inline">
          <label style={{ fontWeight: 'bold' }} className="form-label me-3" htmlFor="inlineRadio">
            Trạng thái:
          </label>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              value="1"
              checked={values.trangThai === 1} // Hiển thị trạng thái
              onChange={() => setValues({ ...values, trangThai: 1 })}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Kích hoạt
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input pb-2"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              value="0"
              checked={values.trangThai === 0} // Hiển thị trạng thái
              onChange={() => setValues({ ...values, trangThai: 0 })}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Ngừng kích hoạt
            </label>
          </div>
        </div>
      </div>
    </form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Đóng
    </Button>
    <Button variant="primary" onClick={handleUpdate}>
      Lưu Thay Đổi
    </Button>
  </Modal.Footer>
</Modal>

  );
}

export default UpdateModal;
