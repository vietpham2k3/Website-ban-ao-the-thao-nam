/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import '../../scss/DonHang.scss';
import { Table } from 'react-bootstrap';
import { useState } from 'react';
import _ from 'lodash';
import { useEffect } from 'react';
import { searchCTSP } from 'services/SanPhamService';
import SearchResult from './SearchResultList';
import { getById } from 'services/ServiceDonHang';

function DonHang(props) {
  // eslint-disable-next-line react/prop-types
  const { id } = props;
  const [inputValue, setInputValue] = useState('');
  const [values, setValues] = useState([]);
  const [valuesSanPham, setValuesSanPham] = useState([]);

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

  const handleSearchUsers = _.debounce(async () => {
    if (inputValue !== '') {
      // Kiểm tra nếu inputValue không rỗng
      const res = await searchCTSP(inputValue, '', '', '', '');
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
              <tr className="text-center">
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
                  <tr key={i} className="text-center">
                    <td>{i + 1}</td>
                    <td>{d.chiTietSanPham.ma}</td>
                    <td>
                      <img
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                        className="product-image"
                        style={{ width: '70px', height: '100px' }}
                      />
                    </td>
                    <td>{d.chiTietSanPham.sanPham.ten}</td>
                    <td>{d.soLuong}</td>
                    <td>{convertToCurrency(d.donGia)}</td>
                    <td>{convertToCurrency(d.soLuong * d.donGia)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}

export default DonHang;
