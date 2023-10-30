/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';

function ModalHuyDon(props) {
  const { handleClose, show, setGhiChu, handleHuyDon } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Huỷ đơn hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            style={{ width: '100%' }}
            label="Lý do huỷ đơn hàng"
            variant="outlined"
            onChange={(e) => setGhiChu({ ghiChu: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="danger" onClick={handleHuyDon}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalHuyDon;
