/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../../scss/DonHang.scss';
import { Table } from 'react-bootstrap';
import { useState } from 'react';
import _ from 'lodash';
import { useEffect } from 'react';
import { searchCTSP } from 'services/SanPhamService';
import SearchResult from './SearchResultList';
import { getById, updateSL, deleteHDCT, updateHD } from 'services/ServiceDonHang';
// import { toast } from 'react-toastify';
import InputSpinner from 'react-bootstrap-input-spinner';
import TableKM from './TableKM';
import { getAllKM } from 'services/ServiceKhuyenMai';
// import { toast } from 'react-toastify';

function DonHang(props) {
  // eslint-disable-next-line react/prop-types
  const { id } = props;
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);
  const [inputKH, setInputKH] = useState('');
  const [idHDCT, setIdHDCT] = useState('');
  const [values, setValues] = useState([]);
  const [dataKM, setDataKM] = useState([]);
  const [valuesSanPham, setValuesSanPham] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [tongSoLuong, setTongSoLuong] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [valuesUpdateHD, setValuesUpdateHD] = useState({
    tongTien: ''
  });
  const [valuesUpdate, setValuesUpdate] = useState({
    chiTietSanPham: {
      id: ''
    },
    hoaDon: {
      id: id
    },
    soLuong: ''
  });

  useEffect(() => {
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0;
    let count = 0;
    valuesSanPham.forEach((d) => {
      sum += d.soLuong * d.donGia;
      count += d.soLuong;
    });
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum);
    setTongSoLuong(count);
  }, [valuesSanPham]);

  useEffect(() => {
    setValuesUpdateHD({ ...valuesUpdateHD, tongTien: totalAmount });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalAmount]);

  useEffect(() => {
    handleSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    getAllById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    update(idHDCT, valuesUpdate);
  }, [valuesUpdate]);

  useEffect(() => {
    handleUpdateHD();
  }, [valuesUpdateHD]);

  useEffect(() => {
    getKM();
  }, []);

  const handleUpdateHD = () => {
    updateTTHD(id, valuesUpdateHD);
  };

  const updateTTHD = async (idHD, value) => {
    await updateHD(idHD, value);
  };

  const getAllById = async (idHD) => {
    const res = await getById(idHD);
    if (res) {
      setValuesSanPham(res.data);
    }
  };

  const getKM = async () => {
    const res = await getAllKM();
    if (res) {
      setDataKM(res.data);
    }
  };

  const handleUpdateSl = (id, idHD, idCTSP, soLuong) => {
    setIdHDCT(id);
    setValuesUpdate({
      ...valuesUpdate,
      chiTietSanPham: {
        id: idCTSP
      },
      hoaDon: {
        id: idHD
      },
      soLuong: soLuong
    });
  };

  const update = async (idHDCT, values) => {
    const res = await updateSL(idHDCT, values);
    if (res) {
      getAllById(id);
    }
  };

  const deleteHD = async (idHDCT) => {
    const res = await deleteHDCT(idHDCT);
    if (res) {
      getAllById(id);
    }
  };

  const handleSearchUsers = _.debounce(async () => {
    if (inputValue !== '') {
      // Kiểm tra nếu inputValue không rỗng
      const res = await searchCTSP(inputValue, '1', '', '', '');
      if (res && res.data) {
        setValues(res.data.content);
      }
    } else {
      setValues([]); // Nếu inputValue rỗng, đặt giá trị values là một mảng rỗng để không hiển thị dữ liệu
    }
  }, 100);

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    return formatter.format(number);
  }

  const handleDelete = (id) => {
    deleteHD(id);
  };

  const handleAddKM = () => {
    setShow(false);
    setActiveIndex(null);
  };

  const handleDivClick = (index) => {
    setActiveIndex(index);
  };

  function formatDate(dateString) {
    if (dateString === null) {
      return ''; // Trả về chuỗi rỗng nếu giá trị là null
    }

    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
  }

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <div className="box-search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="search"
              placeholder="Tìm kiếm sản phẩm..."
              className="input-seach"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          {values.length > 0 && (
            <div className="search-result">
              <SearchResult
                result={values}
                id={id}
                getAllById={getAllById}
                handleSearchUsers={handleSearchUsers}
                setInputValue={setInputValue}
                setValuesSearch={setValues}
              />
            </div>
          )}
          <div className="table-container">
            <Table striped hover className="my-4">
              <tr className="ps-3">
                <th>#</th>
                <th>Mã</th>
                <th>Ảnh</th>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Tổng tiền</th>
              </tr>
              <tbody>
                {valuesSanPham.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.chiTietSanPham.sanPham.ma}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                        className="product-image"
                        style={{ width: '70px', height: '100px' }}
                      />
                    </td>
                    <td>
                      {d.chiTietSanPham.sanPham.ten} <br /> {d.chiTietSanPham.kichCo.ten} <br />
                      <div style={{ backgroundColor: d.chiTietSanPham.mauSac.ten, width: 30, borderRadius: '10px' }}>&nbsp;</div>
                    </td>
                    <td>
                      <div
                        className="input-spinner"
                        style={{ display: 'flex', alignItems: 'center', width: 120, justifyContent: 'center' }}
                      >
                        <InputSpinner
                          key={d.id} // Đặt key duy nhất cho mỗi InputSpinner
                          type={'real'}
                          max={d.chiTietSanPham.soLuong + d.soLuong}
                          min={1}
                          step={1}
                          value={d.soLuong}
                          onChange={(e) => handleUpdateSl(d.id, d.hoaDon.id, d.chiTietSanPham.id, e)}
                          variant={'dark'}
                          size="sm"
                        />
                      </div>
                      {d.chiTietSanPham.soLuong < 10 ? (
                        <span style={{ color: 'red' }}>
                          Số sản phẩm còn lại: <strong>{d.chiTietSanPham.soLuong}</strong>
                        </span>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{convertToCurrency(d.donGia)}</td>
                    <td>{convertToCurrency(d.soLuong * d.donGia)}</td>
                    <td>
                      <button onClick={() => handleDelete(d.id)} className="fa-solid fa-trash mx-3"></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-4">
          <div className="box-search" style={{ width: '100%' }}>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Tìm kiếm khách hàng..."
              className="input-seach"
              value={inputKH}
              onChange={(e) => setInputKH(e.target.value)}
            />
            <button className="fa-solid fa-plus mx-3"></button>
          </div>
          <br /> <br />
          <div className="ma-giam-gia">
            <div>
              <h6>Mã giảm giá</h6>
            </div>
            <div>
              <p>
                <input type="text" disabled={true} style={{ border: 'none', borderBottom: '1px solid gray' }} />{' '}
                <button className="fa-solid fa-plus" onClick={() => setShow(true)}></button>
              </p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Số lượng sản phẩm</h6>
            </div>
            <div>
              <p>{tongSoLuong}</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Tổng tiền</h6>
            </div>
            <div>
              <p>{convertToCurrency(totalAmount)}</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h5>Khách phải trả</h5>
            </div>
            <div>
              <p style={{ fontSize: 'large', fontWeight: 'bold' }}>{convertToCurrency(totalAmount)}</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Tiền khách đưa</h6>
            </div>
            <div>
              <input type="text" style={{ border: 'none', borderBottom: '1px solid gray', textAlign: 'right' }} />
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <select className="form-select" aria-label="Default select example">
                <option selected>Tiền mặt</option>
                <option value="1">QR</option>
              </select>
            </div>
          </div>
          <div className="ma-giam-gia">
            <div>
              <h6>Tiền thừa</h6>
            </div>
            <div>
              <p>0</p>
            </div>
          </div>
          <div className="ma-giam-gia">
            {dataKM.map((d, i) => (
              <div key={i} className={`col-10 card-voucher card-width`} onClick={() => handleDivClick(i)} style={{ cursor: 'pointer' }}>
                <h6 style={{ color: 'red', wordWrap: 'break-word' }}>
                  Giảm {convertToCurrency(d.mucGiam)} cho đơn tối thiểu {convertToCurrency(d.tien)}
                </h6>
                <div className="text-voucher">
                  <p style={{ fontSize: '13px', color: 'gray' }}>HSD: {formatDate(d.thoiGianKetThuc)}</p>
                  <button type="button" className="btn btn-outline-primary">
                    Áp dụng
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="button-thanh-toan">
            <button type="button" className="btn btn-success">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
      <TableKM
        show={show}
        handleClose={() => setShow(false)}
        dataKM={dataKM}
        convertToCurrency={convertToCurrency}
        handleDivClick={handleDivClick}
        activeIndex={activeIndex}
        handleAddKM={handleAddKM}
        formatDate={formatDate}
      ></TableKM>
    </div>
  );
}

export default DonHang;
