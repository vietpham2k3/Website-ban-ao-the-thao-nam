/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { TextField } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import InputSpinner from 'react-bootstrap-input-spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalTraHang(props) {
  const { show, handleClose, dataHDCT, convertToCurrency, setValuesTH, valuesTH, setDataHDCT, handleTraHang, setIsUpdate } = props;

  const handleChange = (e, i) => {
    // Cập nhật số lượng vào sản phẩm d
    const updatedDataHDCT = [...dataHDCT];
    updatedDataHDCT[i].soLuongHangTra = e;
    setDataHDCT(updatedDataHDCT);
    setIsUpdate(true);
    let sum = 0;
    let count = 0;
    updatedDataHDCT.forEach((d) => {
      sum += d.soLuongHangTra * d.donGia;
      count += d.soLuongHangTra;
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
          <Modal.Title>Trả hàng/Hoàn tiền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataHDCT.map((d, i) => (
            <div key={i} className="d-flex">
              <div>
                <img src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`} alt="" style={{ width: 120 }} />
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
                  value={d.soLuongHangTra || 0} // Sử dụng counts[i] thay vì count
                  onChange={(e) => handleChange(e, i)}
                  variant={'dark'}
                  size="sm"
                />
              </div>
              <div className="d-flex align-items-center justify-content-center ms-5">
                <p style={{ color: 'red' }}>{convertToCurrency(d.donGia)}</p>
              </div>
              <div className="d-flex align-items-center justify-content-center ms-5">
                <p style={{ color: 'red' }}>{convertToCurrency(d.donGia * d.soLuongHangTra || 0)}</p>
              </div>
            </div>
          ))}
          <TextField
            style={{ width: '100%' }}
            label="Lý do trả hàng đơn hàng"
            variant="outlined"
            onChange={(e) => setValuesTH({ ...valuesTH, lichSuHoaDon: { ghiChu: e.target.value } })}
          />
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
