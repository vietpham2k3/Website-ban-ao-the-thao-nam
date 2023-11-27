import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { getAllPageHL } from 'services/HangLoiService';
import MainCard from 'ui-component/cards/MainCard';

function HangLoi() {
  //   const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [data, setData] = useState([]);
  useEffect(() => {
    getAll(0);
  }, []);

  const getAll = async (page) => {
    // setCurrentPage(page);
    const res = await getAllPageHL(page);
    if (res) {
      console.log(res);
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

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
        <Table style={{ textAlign: 'center', marginTop: 50 }}>
          <tr>
            <th>#</th>
            <th>Sản phẩm</th>
            <th>Mã hoá đơn</th>
            <th>Số lượng</th>
            <th>Ghi chú</th>
            <th>Ngày tạo</th>
            <th>Người tạo</th>
          </tr>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td></td>
                <td>{d.hoaDon.ma}</td>
                <td>{d.hangLoi.soHangLoi}</td>
                <td>{d.hangLoi.ghiChu}</td>
                <td>{formatDate(d.hangLoi.ngayTao)}</td>
                <td>{d.hangLoi.nguoiTao}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <ReactPaginate
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
        />
      </MainCard>
    </div>
  );
}

export default HangLoi;
