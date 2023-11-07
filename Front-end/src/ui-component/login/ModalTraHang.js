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
  const { show, handleClose, dataHDCT, convertToCurrency, setCounts, counts, setValuesTH, valuesTH } = props;

  // useEffect(() => {
  //   // Tính tổng tiền khi valuesSanPham thay đổi
  //   let sum = 0;
  //   let count = 0;
  //   dataHDCT.forEach((d) => {
  //     sum += d.soLuong * d.donGia;
  //     count += d.soLuong;
  //   });
  //   setValuesTH({ ...valuesTH,  });
  // }, [show]);

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Trả hàng/Hoàn tiền</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataHDCT.map((d, i) => (
            <div key={i} className="d-flex">
              <div>
                <img src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`} alt="" style={{ width: 120 }} />
              </div>
              <div className="mt-3" style={{ width: 230 }}>
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
                  value={counts[i] || 0} // Sử dụng counts[i] thay vì count
                  onChange={(e) => {
                    const newCounts = [...counts]; // Tạo một bản sao của mảng counts
                    newCounts[i] = e; // Cập nhật giá trị cho sản phẩm thứ i
                    setCounts(newCounts); // Cập nhật mảng counts
                  }}
                  variant={'dark'}
                  size="sm"
                />
              </div>
              <div className="d-flex align-items-center justify-content-center ms-5">
                <p style={{ color: 'red' }}>{convertToCurrency(d.donGia)}</p>
              </div>
              <div className="d-flex align-items-center justify-content-center ms-5">
                <p style={{ color: 'red' }}>{convertToCurrency(d.donGia * counts[i] || 0)}</p>
              </div>
            </div>
          ))}
          <TextField
            style={{ width: '100%' }}
            label="Lý do trả hàng đơn hàng"
            variant="outlined"
            //   onChange={(e) => setGhiChu({ ghiChu: e.target.value })}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Huỷ
          </Button>
          <Button variant="primary">Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalTraHang;
