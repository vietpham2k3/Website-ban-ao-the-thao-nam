import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../../scss/DonHang.scss';
import { getAllPageDH } from 'services/ServiceDonHang';
import MainCard from 'ui-component/cards/MainCard';

function DonHang() {
  // const [filterStatus, setFilterStatus] = useState('');
  // const [currentPage, setCurrentPage] = useState(0);

  //hien thi
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

  //in hoa don

  // const [values, setValues] = useState({});
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setValues(values);
  //   post(values);
  // };

  // const post = async (value) => {
  //   const res = await printExcel(value);
  //   if (res) {
  //     toast.success('In hóa đơn thành công !');
  //     navigate('/don-hang');
  //   }
  // };

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
        <div className="col-12 row">
          <div className="page-title-box">
            <div className="page-title-center">
              <h1 className="page-title" style={{ textAlign: 'center', fontSize: '200%', marginBottom: '50px', fontWeight: 'bold' }}>
                Đơn Hàng
              </h1>
            </div>
          </div>
        </div>
        <Card>
          <div className="w-auto rounded bg-white border shadow p-4">
            {/* <form className="export-form">
              <button
                onClick={handleSubmit}
                style={{ border: '1px solid black', background: 'greenyellow', borderRadius: '10px' }}
                data-toggle="tooltip"
                title="In hóa đơn Excel"
                className="shadow-button"
                type="submit"
                
              >
                <button
                onClick={() => navigate(`/don-hang/print-excel`)}>
                  <img  width="30px" height="30px" alt="" />
                </button>
                <span className="separator">|</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold' }} className="btn-text">
                  In Excel
                </span>
              </button>
            </form> */}


            <table style={{ textAlign: 'center', alignItems: 'center',
             cursor: "pointer" }} className="table table-hover">
              <tr>
                <th>#</th>
                <th>Mã Đơn Hàng</th>
                <th>Tên Khách Hàng</th>
                <th>Ngày Tạo Đơn</th>
                <th>Tổng tiền</th>
                <th>Trạng Thái</th>
                <th>Loại Đơn</th>
                <th>Hình Thức Thanh Toán</th>
              </tr>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i} onClick={() => navigate(`/don-hang/chi-tiet/${d.id}`)}>
                    <td>{i + 1}</td>
                    <td>{d.ma}</td>
                    <td>{d.ten_nguoi_nhan}</td>
                    <td>{formatDate(d.ngay_tao)}</td>
                    <td>{convertToCurrency(d.tong_tien_sau_khi_giam)}</td>
                    <td
                      style={{ fontSize: '14px', fontWeight: 'bold', justifyContent: 'center', display: 'flex' }}
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
                            justifyContent: 'center',
                            fontWeight: 'bold'
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
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-primary status-completed"
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
                            justifyContent: 'center',
                            fontWeight: 'bold'
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
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-secondary status-pending"
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
                            justifyContent: 'center',
                            fontWeight: 'bold'
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
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-info status-completed"
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
                            justifyContent: 'center',
                            fontWeight: 'bold'
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
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                          className="btn btn-labeled shadow-button btn btn-info status-completed"
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
                        verticalAlign: 'middle'
                      }}
                      className="align-middle"
                    >
                      <div style={{ display: 'inline-block', textAlign: 'left' }}>
                        {d.loai_don === 0 && (
                          <span
                            style={{
                              width: '200px',
                              pointerEvents: 'none',
                              height: '30px',
                              borderRadius: '20px',
                              display: 'flex',
                              justifyContent: 'center',
                              justifyItems: 'center',
                              alignItems: 'center',
                              verticalAlign: 'middle',
                              fontWeight: 'bold'
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
                              display: 'flex',
                              justifyContent: 'center',
                              justifyItems: 'center',
                              verticalAlign: 'middle',
                              alignItems: 'center',
                              fontWeight: 'bold',
                              backgroundColor: '#126e3bff',
                              color: 'white'
                            }}
                            className="btn btn-labeled shadow-button btn status-completed"
                          >
                            Đặt Hàng Online
                          </span>
                        )}
                      </div>
                    </td>
                    <td>{d.ten}</td>
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
