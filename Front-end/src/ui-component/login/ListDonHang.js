/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React from 'react';
import { useEffect } from 'react';
import { requestHuyDon, nhanHang, searchByTrangThai } from 'services/ServiceDonHang';
import '../../scss/CheckOut.scss';
import Button from 'react-bootstrap/Button';
import ButtonMUI from '@mui/material/Button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ModalHuyDon from './ModalHuyDon';
import { useNavigate } from 'react-router';

function ListDonHang(props) {
  const { tabs, data, dataLogin, values, setValues, size } = props;
  const [show, setShow] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();
  const [ghiChu, setGhiChu] = useState({
    ghiChu: ''
  });

  useEffect(() => {
    searchByTT(dataLogin.id, data.trangThai);
  }, []);

  useEffect(() => {
    searchByTT(dataLogin.id, data.trangThai);
  }, []);

  const searchByTT = async (id, values) => {
    const res = await searchByTrangThai(id, values);
    if (res) {
      // Sắp xếp mảng values sao cho trạng thái 14 lên đầu
      const sortedValues = res.data.hoaDonList.sort((a, b) => {
        // Đặt ưu tiên cho các phần tử có trạng thái 14 lên đầu
        if (a.hoaDon.trangThai === 14 && b.hoaDon.trangThai !== 14) {
          return -1;
        } else if (a.hoaDon.trangThai !== 14 && b.hoaDon.trangThai === 14) {
          return 1;
        } else {
          // Sắp xếp theo trạng thái khác (nếu cần)
          return a.hoaDon.trangThai - b.hoaDon.trangThai;
        }
      });

      setValues(sortedValues);
    }
  };

  const huyDon = async (id, value) => {
    const res = await requestHuyDon(id, value);
    if (res) {
      toast.success('Huỷ đơn thành công !');
      setShow(false);
      searchByTT(dataLogin.id, data.trangThai);
      setGhiChu();
      tabs.forEach((d) => {
        size(dataLogin.id, d.trangThai);
      });
    }
  };

  const nhanDonHang = async (id, value) => {
    const res = await nhanHang(id, value);
    if (res) {
      toast.success('Nhận đơn hàng thành công !');
      setShow(false);
      searchByTT(dataLogin.id, data.trangThai);
      setGhiChu();
      tabs.forEach((d) => {
        size(dataLogin.id, d.trangThai);
      });
    }
  };

  const handleClose = () => setShow(false);

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(number);
  }

  const handleOpenModal = (id) => {
    setShow(true);
    setId(id);
  };

  const handleNhanDonHang = (id) => {
    nhanDonHang(id, ghiChu);
  };

  const handleHuyDon = () => {
    if (!ghiChu.ghiChu) {
      toast.error('Vui lòng nhập lý do huỷ đơn');
      return;
    }
    huyDon(id, ghiChu);
  };

  return (
    <div>
      {values.map((d, i) => (
        <div key={i} className="card-box row" style={{ marginTop: '20px' }}>
          <div className="col-md-12 card-box-center">
            <div className=" d-flex justify-content-between" style={{ borderBottom: '1px solid gray', alignItems: 'center' }}>
              <Button variant="outline-info ms-3 mt-3 mb-3" onClick={() => navigate(`/history/${d.hoaDon.id}`)}>
                Chi tiết
              </Button>
              <p className="mt-3 me-3 mb-3" style={{ color: 'red' }}>
                {d.hoaDon.trangThai === 0
                  ? 'Chờ xác nhận'
                  : d.hoaDon.trangThai === 1
                  ? 'Chờ giao hàng'
                  : d.hoaDon.trangThai === 2
                  ? 'Huỷ đơn'
                  : d.hoaDon.trangThai === 3 || d.hoaDon.trangThai === 8 || d.hoaDon.trangThai === 9 || d.hoaDon.trangThai === 10
                  ? 'Đang giao hàng'
                  : d.hoaDon.trangThai === 5 || d.hoaDon.trangThai === 1 || d.hoaDon.trangThai === 12 || d.hoaDon.trangThai === 13
                  ? 'Đang giao hàng'
                  : d.hoaDon.trangThai === 4
                  ? 'Giao hàng thành công'
                  : d.hoaDon.trangThai === 14
                  ? 'Yêu cầu huỷ đơn'
                  : d.hoaDon.trangThai === 6
                  ? 'Thanh toán thành công'
                  : 'Hoàn thành'}
              </p>
            </div>
          </div>
          <div className="col-md-12 card-box-center">
            {d.hoaDonChiTiet.map((h, i) => (
              <div key={i} className="card-box-center card-hdct mt-3 me-3">
                <div className="d-flex">
                  <img
                    src={`http://localhost:8080/api/chi-tiet-san-pham/${h.chiTietSanPham.id}`}
                    className="img-history rounded-start"
                    alt="..."
                  />
                  <div className="mt-1">
                    <h5>{h.chiTietSanPham.sanPham.ten}</h5>
                    <span>
                      {h.chiTietSanPham.kichCo.ten} -{' '}
                      <span
                        className="color-circle"
                        style={{
                          backgroundColor: h.chiTietSanPham.mauSac.ten,
                          display: 'inline-block',
                          verticalAlign: 'middle'
                        }}
                      ></span>
                    </span>
                    <p>x{h.soLuong}</p>
                  </div>
                </div>
                <div>
                  <span style={{ color: 'red' }}>{convertToCurrency(h.donGia)}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-12 card-box-center">
            <div className="d-flex justify-content-end mt-5" style={{ borderTop: '1px solid gray', height: '100%', alignItems: 'center' }}>
              <h5 className="me-3">
                Tổng tiền: <strong style={{ color: 'red' }}>{convertToCurrency(d.hoaDon.tongTienKhiGiam)}</strong>
              </h5>
            </div>
          </div>
          <div className="col-md-12 card-box-center">
            <div className="d-flex justify-content-end mb-5" style={{ height: '100%', alignItems: 'center' }}>
              {d.hoaDon.trangThai === 4 && (
                <ButtonMUI className="mt-2 me-3" variant="contained" color="primary" onClick={() => handleNhanDonHang(d.hoaDon.id)}>
                  Nhận hàng
                </ButtonMUI>
              )}
              {d.hoaDon.trangThai === 0 || d.hoaDon.trangThai === 6 ? (
                <ButtonMUI className="mt-2 me-3" variant="contained" color="error" onClick={() => handleOpenModal(d.hoaDon.id)}>
                  Huỷ đơn
                </ButtonMUI>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      ))}
      <ModalHuyDon handleClose={handleClose} show={show} handleHuyDon={handleHuyDon} setGhiChu={setGhiChu}></ModalHuyDon>
    </div>
  );
}

export default ListDonHang;
