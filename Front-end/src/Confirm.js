import { Button, Modal } from 'react-bootstrap';
import { deleteUser } from './service/Service';
import { toast } from 'react-toastify';

const Confirm = (props) => {

    const { handleClose, show, dataDelete, getAll } = props

    const handleConfirm = async (event) => {
        let res = await deleteUser(dataDelete)
        if (res) {
            toast.success('Delete success!')
            handleClose()
            getAll(0);
        } else {
            toast.error('Error!')
        }
    }

    return (
        <div>
            <Modal show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Mày có chắc muốn xoá không?
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm()}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Confirm
