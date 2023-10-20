/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button, Modal } from 'react-bootstrap';

const UpdateDC = ({
  handleClose,
  show,
  handleProvinceChange,
  thanhPho,
  handleDistrictChange,
  quan,
  handleWardChange,
  phuong,
  dataDetailDC,
  setDataDetailDC,
  handleUpdateDC
}) => {
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
          <Modal.Title>Update địa chỉ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row fgr">
            <div className="col-md-12">
              <label htmlFor="address" className="text-black">
                Địa Chỉ <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control fct"
                id="address"
                name="address"
                placeholder="Địa chỉ"
                value={dataDetailDC.diaChi}
                onChange={(e) => setDataDetailDC({ ...dataDetailDC, diaChi: e.target.value })}
              />
            </div>
          </div>

          <div className="col-md-12">
            <label htmlFor="province" className="text-black">
              Tỉnh/Thành Phố <span className="text-danger">*</span>
            </label>
            <select id="province" className="form-select fsl" onChange={handleProvinceChange}>
              <option value="">-----Chọn tỉnh thành-----</option>
              {thanhPho.map((province) => (
                <option
                  key={province.ProvinceID}
                  value={province.ProvinceID}
                  selected={province.NameExtension[1] === dataDetailDC.tinhThanh}
                >
                  {province.NameExtension[1]}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-12 mt-3">
            <label htmlFor="district" className="text-black">
              Quận/Huyện <span className="text-danger">*</span>
            </label>
            <select id="district" className="form-select fsl" onChange={(e) => handleDistrictChange(e)}>
              <option value="">----Chọn quận huyện-----</option>
              {quan.map((district) => (
                <option key={district.DistrictID} value={district.DistrictID} selected={district.DistrictName === dataDetailDC.quanHuyen}>
                  {district.DistrictName}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-12 mt-3">
            <label htmlFor="ward" className="text-black">
              Phường/Xã <span className="text-danger">*</span>
            </label>
            <select id="ward" className="form-select fsl" onChange={handleWardChange}>
              <option value="">-----Chọn phường xã-----</option>
              {phuong.map((ward) => (
                <option key={ward.WardCode} value={ward.WardCode} selected={ward.WardName === dataDetailDC.phuongXa}>
                  {ward.WardName}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Trở lại
          </Button>
          <Button variant="primary" onClick={handleUpdateDC}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default UpdateDC;
