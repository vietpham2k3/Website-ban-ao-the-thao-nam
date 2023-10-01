/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { deleteMSKCCTSP } from 'services/SanPhamService';

const TableKCMS = (props) => {
  const { handleClose, show, dataDelete, getAll, id } = props;

  const handleConfirm = async () => {
    let res = await deleteMSKCCTSP(dataDelete);
    if (res) {
      toast.success('Delete success!');
      handleClose();
      getAll(id);
    } else {
      toast.error('Error!');
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            Bạn có chắc muốn xoá <strong>vĩnh viễn</strong> thuộc tính này không?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="danger" onClick={() => handleConfirm()}>
            Xoá
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableKCMS;
