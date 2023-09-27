import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import '../../scss/MauSac.scss';
import { getAllPageDH } from 'services/ServiceDonHang';

// import _ from 'lodash';
import MainCard from 'ui-component/cards/MainCard';

//  React examples

function DonHang() {
  // const [filterStatus, setFilterStatus] = useState('');
  // const [currentPage, setCurrentPage] = useState(0);

  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    getAll(0);
  }, []);

  const navigate = useNavigate();

  const getAll = async (page) => {
    const res = await getAllPageDH(page);
    if (res && res.data) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  // const search = async (key, trangThai, page) => {
  //   setCurrentPage(page);
  //   const res = await searchMS(key, trangThai, page);
  //   if (res) {
  //     setData(res.data.content);
  //     setTotalPages(res.data.totalPages);
  //   }
  // };

  // const handleSearchMS = _.debounce(async (e) => {
  //   let term = e.target.value;
  //   if (term || filterStatus !== 0) {
  //     search(term, filterStatus, currentPage);
  //   } else {
  //     search('', 0, currentPage);
  //   }
  // }, 100);

  const handlePageClick = (event) => {
    getAll(event.selected);
  };

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    return formatter.format(number);
  }

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
    // const seconds = dateObject.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
  }

  return (
    <div>
      <MainCard>
        <Card>
          <div className="w-auto rounded bg-white border shadow p-4">
            <div className="col-12 row">
              <div className="page-title-box">
                <div className="page-title-center">
                  <h1 className="page-title" style={{ textAlign: 'center', fontSize: '200%', marginBottom: '50px', fontWeight: 'bold' }}>
                    Hóa Đơn
                  </h1>
                </div>
              </div>
            </div>

            {/* <div className="d-flex justify-content-between">
              <div className="search">
                <input
                  style={{ borderRadius: 15, width: 300 }}
                  type="text"
                  className="input-search"
                  placeholder=" Nhập tên, mã màu cần tìm..."
                  onChange={handleSearchMS}
                />
              </div>
              <div style={{ marginRight: 50 }}>
                <span style={{ fontWeight: 'bold', marginRight: 25 }} className="form-check-label">
                  Trạng Thái:
                </span>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    checked={filterStatus === ''}
                    onChange={() => {
                      setFilterStatus('');
                      search('', '', 0);
                    }}
                  />
                  <span style={{ marginLeft: 10 }} className="form-check-label">
                    Tất Cả
                  </span>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    checked={filterStatus === 0}
                    onChange={() => {
                      setFilterStatus(0);
                      search('', 0, 0);
                    }}
                  />
                  <span className="form-check-label">Đang kích hoạt</span>
                </div>
                <div style={{ marginLeft: 10 }} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    checked={filterStatus === 1}
                    onChange={() => {
                      setFilterStatus(1);
                      search('', 1, 0);
                    }}
                  />
                  <span className="form-check-label">Ngừng kích hoạt</span>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button onClick={() => navigate('/san-pham/mau-sac/add')} className="btn btn-primary ">
                  Thêm <i className="fa-solid fa-plus fa-beat fa-lg"></i>
                </button>
              </div>
            </div> */}

            <table style={{ textAlign: 'center' }} className="table table-hover">
              <tr>
                <th>#</th>
                <th>Mã Đơn Hàng</th>
                <th>Tên Khách Hàng</th>
                <th>Ngày Tạo Đơn</th>
                <th>Tổng tiền</th>
                <th>Trạng Thái</th>
                <th>Loại Đơn</th>
                <th>Hình Thức Thanh Toán</th>
                <th>Action</th>
              </tr>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.ma}</td>
                    <td>{d.ten_nguoi_nhan}</td>
                    <td>{formatDate(d.ngay_tao)}</td>
                    <td>{convertToCurrency(d.tong_tien_sau_khi_giam)}</td>
                    <td
                      style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}
                      className="align-middle"
                    >
                      {d.trang_thai === 0 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                        >
                          Đang chờ xác nhận
                        </span>
                      )}
                      {d.trang_thai === 1 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-success status-completed"
                        >
                          Đã xác nhận
                        </span>
                      )}
                      {d.trang_thai === 2 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
                        >
                          Đã hủy đơn
                        </span>
                      )}
                      {d.trang_thai === 3 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                        >
                          Chờ giao hàng
                        </span>
                      )}
                      {d.trang_thai === 4 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-warning status-pending"
                        >
                          Đang giao hàng
                        </span>
                      )}
                      {d.trang_thai === 5 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-success status-completed"
                        >
                          Giao hàng thành công
                        </span>
                      )}
                      {d.trang_thai === 6 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-danger status-cancelled"
                        >
                          Giao hàng thất bại
                        </span>
                      )}
                      {d.trang_thai === 7 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-success status-completed"
                        >
                          Thanh toán thành công
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        justifyItems: 'center'
                      }}
                      className="align-middle"
                    >
                      {d.loai_don === 0 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',

                            alignItems: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-dark status-completed"
                        >
                          Tại Quầy
                        </span>
                      )}
                      {d.loai_don === 1 && (
                        <span
                          style={{
                            width: '200px',
                            pointerEvents: 'none',
                            height: '30px',
                            borderRadius: '20px',

                            alignItems: 'center'
                          }}
                          className="btn btn-labeled shadow-button btn btn-primary status-completed"
                        >
                          Đặt Hàng Online
                        </span>
                      )}
                    </td>
                    <td>{d.ten}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/don-hang/chi-tiet/${d.id}`)}
                        style={{ color: '#0c5460' }}
                        className="fa-solid fa-circle-info fa-shake fa-lg fa-khenh"
                      ></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
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
          </div>
        </Card>
      </MainCard>
    </div>
  );
}

export default DonHang;
