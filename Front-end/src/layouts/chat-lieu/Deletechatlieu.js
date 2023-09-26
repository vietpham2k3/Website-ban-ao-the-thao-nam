/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../../service/ServiceChatLieu";
import { toast } from "react-toastify";

const ConfirmDelete = (props) => {
  const { handleClose, show, dataDelete, getAll } = props;

  const handleConfirm = async () => {
    let res = await deleteUser(dataDelete);
    if (res) {
      toast.success("Delete success!");
      handleClose();
      getAll(0);
    } else {
      toast.error("Error!");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">Mày có chắc muốn xoá không?</div>
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

export default ConfirmDelete;
