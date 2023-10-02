/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button, Modal } from 'react-bootstrap';
import '../../scss/TableMSKC.scss';

const TableKCMS = (props) => {
  const { handleClose, show, values, setValuesAdd, handleAdd, valuesAdd, handleDetail, dataDetail, inputDetail } = props;

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
          <Modal.Title>Chọn loại của sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Thuộc tính
              </label>
              {values.map((d, i) => (
                <div className="form-check" key={i}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    onChange={() => handleDetail(d.id)}
                  />
                  <label className="form-check-label custom-label" htmlFor="flexRadioDefault1">
                    <div style={{ backgroundColor: d.mauSac.ten, width: 50, borderRadius: '10px' }}>&nbsp;</div>&nbsp;- {d.kichCo.ten}
                  </label>
                </div>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Số lượng:{' '}
                <small>
                  Còn lại <strong>{dataDetail.soLuong}</strong>
                </small>
              </label>
              <input
                className="form-control"
                id="exampleFormControlTextarea1"
                type="number"
                style={{ display: `${inputDetail !== null ? '' : 'none'}` }}
                onChange={(e) => setValuesAdd({ ...valuesAdd, soLuong: e.target.value })}
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => handleAdd()}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableKCMS;
