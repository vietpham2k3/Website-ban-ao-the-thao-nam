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
import { getById, updateSL, deleteHDCT } from 'services/ServiceDonHang';
// import { toast } from 'react-toastify';
import InputSpinner from 'react-bootstrap-input-spinner';

function DonHang(props) {
  // eslint-disable-next-line react/prop-types
  const { id } = props;
  const [inputValue, setInputValue] = useState('');
  const [inputKH, setInputKH] = useState('');
  const [idHDCT, setIdHDCT] = useState('');
  const [values, setValues] = useState([]);
  const [valuesSanPham, setValuesSanPham] = useState([]);
  // const [debouncedUpdate, setDebouncedUpdate] = useState(null);
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
    handleSearchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  useEffect(() => {
    getAllById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getAllById = async (idHD) => {
    const res = await getById(idHD);
    if (res) {
      setValuesSanPham(res.data);
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

  useEffect(() => {
    update(idHDCT, valuesUpdate);
  }, [valuesUpdate]);

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
              <SearchResult result={values} id={id} getAllById={getAllById} handleSearchUsers={handleSearchUsers} />
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
                          type={'real'}
                          max={d.chiTietSanPham.soLuong + 1}
                          min={0}
                          step={1}
                          value={d.soLuong}
                          onChange={(e) => handleUpdateSl(d.id, d.hoaDon.id, d.chiTietSanPham.id, e)}
                          variant={'dark'}
                          size="sm"
                        />
                      </div>
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
              placeholder="Tìm kiếm sản phẩm..."
              className="input-seach"
              value={inputKH}
              onChange={(e) => setInputKH(e.target.value)}
            />
            <button className="fa-solid fa-plus mx-3"></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonHang;
