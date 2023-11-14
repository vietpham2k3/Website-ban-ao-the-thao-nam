/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';
import React from 'react';
import InputSpinner from 'react-bootstrap-input-spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tooltip from '@mui/material/Tooltip';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

function ModalTraHang(props) {
  const { show, handleClose, dataHDCT, convertToCurrency, setValuesTH, valuesTH, setDataHDCT, handleTraHang, setIsUpdate, listLyDo } =
    props;
  const [value, setValue] = useState('');

  const handleChange = (e, i) => {
    // Cập nhật số lượng vào sản phẩm d
    const updatedDataHDCT = [...dataHDCT];
    updatedDataHDCT[i].soLuongHangDoi = e;
    setDataHDCT(updatedDataHDCT);
    setIsUpdate(true);
    let sum = 0;
    let count = 0;
    updatedDataHDCT.forEach((d) => {
      sum += d.soLuongHangDoi * d.donGia;
      count += d.soLuongHangDoi;
    });
    setValuesTH({
      ...valuesTH,
      trangThai: 15,
      tienTra: sum,
      tienCanTra: sum,
      soHangTra: count
    });
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="lg" keyboard={false} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            Đổi hàng{'   '}
            <Tooltip title="Bạn chỉ có thể đổi hàng trong vòng 15 ngày" placement="right">
              <i style={{ fontSize: 16 }} className="fa-regular fa-circle-question"></i>
            </Tooltip>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: '100%' }}>
          {dataHDCT.map((d, i) => (
            <div key={i} className="d-flex">
              <div className="me-3 mb-3" style={{}}>
                <img
                  src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                  alt=""
                  style={{ width: 120, borderRadius: 15 }}
                />
              </div>
              <div className="mt-3" style={{ width: 200 }}>
                <p>
                  {d.chiTietSanPham.sanPham.ten}
                  <br />
                  {d.chiTietSanPham.kichCo.ten} -{' '}
                  <span style={{ backgroundColor: d.chiTietSanPham.mauSac.ten, borderRadius: '50%' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </p>
              </div>
              <div style={{ width: 130 }} className="d-flex align-items-center justify-content-center ms-5">
                <InputSpinner
                  key={d.id}
                  type={'real'}
                  max={d.soLuong}
                  min={0}
                  step={1}
                  value={d.soLuongHangDoi || 0} // Sử dụng counts[i] thay vì count
                  onChange={(e) => handleChange(e, i)}
                  variant={'dark'}
                  size="sm"
                />
              </div>
              <div className="d-flex align-items-center justify-content-center ms-5">
                <p style={{ color: 'red' }}>{convertToCurrency(d.donGia)}</p>
              </div>
              <div className="d-flex align-items-center justify-content-center ms-5">
                <p style={{ color: 'red' }}>{convertToCurrency(d.donGia * d.soLuongHangDoi || 0)}</p>
              </div>
            </div>
          ))}
          <hr />
          <FormControl required sx={{ mb: 1, width: '100%' }}>
            <InputLabel id="demo-simple-select-required-label">Lý do trả hàng đơn hàng</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={value || 'Khác'} // Nếu ghiChu không có giá trị hoặc không khớp với bất kỳ label nào, sử dụng 'Khác'
              label="Lý do trả hàng đơn hàng *"
              onChange={(e) => {
                setValuesTH({ ...valuesTH, ghiChu: e.target.value });
                setValue(e.target.value);
              }}
            >
              {listLyDo.map((d, i) => (
                <MenuItem key={i} value={d.label}>
                  {d.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {(value === 'Khác' || valuesTH.ghiChu === '') && (
            <TextField
              style={{ width: '100%' }}
              label="Lý do trả hàng đơn hàng"
              variant="outlined"
              onChange={(e) => setValuesTH({ ...valuesTH, ghiChu: e.target.value })}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary" onClick={handleTraHang}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalTraHang;
