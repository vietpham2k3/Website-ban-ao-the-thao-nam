/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import { getAllPageHL, search } from 'services/HangLoiService';
import MainCard from 'ui-component/cards/MainCard';

function HangLoi() {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAll(0);
  }, []);

  const getAll = async (page) => {
    setCurrentPage(page);
    const res = await getAllPageHL(page);
    if (res) {
      console.log(res);
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  const searchHL = async (key, page) => {
    const res = await search(key, page);
    if (res) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  const handleSearch = _.debounce(async (e) => {
    let term = e.target.value;
    if (term) {
      searchHL(term, currentPage);
    } else {
      searchHL('', currentPage);
    }
  }, 100);

  //Format date
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
      <MainCard>
        <div className="search">
          <input
            style={{ borderRadius: 15, width: 300, height: 40, paddingBottom: 3, paddingLeft: 10 }}
            type="text"
            className="input-search"
            placeholder=" Nhập tên, mã màu cần tìm..."
            onChange={handleSearch}
          />
        </div>
        <Table style={{ marginTop: 20 }}>
          <tr>
            <th style={{ textAlign: 'center' }}>#</th>
            <th>Sản phẩm</th>
            <th style={{ textAlign: 'center' }}>Mã hoá đơn</th>
            <th style={{ textAlign: 'center' }}>Số lượng</th>
            <th style={{ textAlign: 'center' }}>Ghi chú</th>
            <th style={{ textAlign: 'center' }}>Ngày tạo</th>
            <th style={{ textAlign: 'center' }}>Người tạo</th>
          </tr>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'center' }}>{i + 1}</td>
                <td>
                  <div className="d-flex justify-content-start">
                    <img
                      src={`http://localhost:8080/api/chi-tiet-san-pham/${d.chiTietSanPham.id}`}
                      className="product-image me-3"
                      style={{ width: '70px', height: '100px', borderRadius: 15 }}
                    />
                    <div>
                      {d.chiTietSanPham.sanPham.ten} <br />
                      {d.chiTietSanPham.kichCo.ten} -{' '}
                      <span style={{ backgroundColor: d.chiTietSanPham.mauSac.ten, borderRadius: 15, fontSize: 15 }}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </span>
                    </div>
                  </div>
                </td>
                <td style={{ textAlign: 'center', marginTop: 50 }}>{d.hoaDon.ma}</td>
                <td style={{ textAlign: 'center', marginTop: 50 }}>{d.hangLoi.soHangLoi}</td>
                <td style={{ textAlign: 'center', marginTop: 50 }}>{d.hangLoi.ghiChu}</td>
                <td style={{ textAlign: 'center', marginTop: 50 }}>{formatDate(d.hangLoi.ngayTao)}</td>
                <td style={{ textAlign: 'center', marginTop: 50 }}>{d.hangLoi.nguoiTao}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          count={totalPages}
          onChange={(event, page) => handlePageClick({ selected: page - 1 })}
          variant="text"
          color="primary"
          showFirstButton
          showLastButton
          className="d-flex justify-content-center"
        />
        {/* <ReactPaginate
          breakLabel="..."
          nextLabel="Next >"
          //   onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="< Previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination justify-content-center"
          activeClassName="active"
        /> */}
      </MainCard>
    </div>
  );
}

export default HangLoi;
