import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import React from 'react';
import { Card } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { getAllPageKM, searchKM } from 'services/ServiceKhuyenMai';
// import ConfirmDelete from './ConfirmDelete';
import _ from 'lodash';

// @mui material components

// React components

//  React examples
import { deleteKM } from 'services/ServiceKhuyenMai';
function KhuyenMai() {
  const [filterStatus, setFilterStatus] = useState('');
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  // const [isShow, setIsShow] = useState(false);
  const [dataDelete] = useState({
    ma: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    getAll(0);
  }, []);

  const getAll = async (page) => {
    const res = await getAllPageKM(page);
    if (res) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };
  //Xoas
  const del = async (id, values) => {
    const res = await deleteKM(id, values);
    if (res) {
      toast.success('Xóa thành công !');
      getAll(0);
    }
  };

  //Search
  const search = async (key, trangThai, page) => {
    const res = await searchKM(key, trangThai, page);
    if (res) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  const handleSearchKM = _.debounce(async (e) => {
    let term = e.target.value;
    if (term || filterStatus !== 0) {
      search(term, filterStatus, 0); // Đã cập nhật tham số trangThai thành radio
    } else {
      getAll(0);
    }
  }, 100);

  const handlePageClick = (event) => {
    getAll(event.selected);
  };

  const handleSubmit = (id) => {
    del(id, dataDelete);
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
    <MainCard>
      <Card>
        {/* //noi dung */}
        <div className="search">
          <input
            style={{ borderRadius: 15, width: 300 }}
            type="text"
            className="input-search"
            placeholder=" Nhập tên cần tìm..."
            onChange={handleSearchKM}
          />
        </div>
        <div style={{ marginRight: 50 }}>
          <label htmlFor="a" style={{ fontWeight: 'bold', marginRight: 25 }} className="form-check-label">
            Trạng Thái:
          </label>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              checked={filterStatus === ''}
              onChange={() => {
                setFilterStatus('');
                search('', '', 0);
              }}
            />
            <label htmlFor="a" style={{ marginLeft: 10 }} className="form-check-label">
              Tất Cả
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              checked={filterStatus === 0}
              onChange={() => {
                setFilterStatus(0);
                search('', 0, 0);
              }}
            />
            <label htmlFor="a" className="form-check-label">
              Đang kích hoạt
            </label>
          </div>
          <div style={{ marginLeft: 10 }} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              checked={filterStatus === 1}
              onChange={() => {
                setFilterStatus(1);
                search('', 1, 0);
              }}
            />
            <label htmlFor="a" className="form-check-label">
              Ngừng kích hoạt
            </label>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          {/* <Link to="/khuyen-mai/add" className="btn btn-primary">
            Thêm <i className="fa-solid fa-plus fa-beat fa-lg"></i>
          </Link> */}
          <button onClick={() => navigate('/voucher/add')} className="btn btn-primary">
            Thêm <i className="fa-solid fa-plus fa-beat fa-lg"></i>
          </button>
        </div>

        <Table style={{ textAlign: 'center', marginTop: 50 }} className="table table-hover">
          <tr>
            <th>#</th>
            <th>Mã</th>
            <th>Tên</th>
            <th>Mức giảm</th>
            <th>Tối thiểu</th>
            <th>Bắt đầu</th>
            <th>Kết thúc</th>
            <th>Mô tả</th>
            <th>Trạng Thái</th>
            <th>Action</th>
          </tr>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  {' '}
                  <span className="color-code">{d.ma}</span>
                </td>
                <td className="color-code">{d.ten}</td>
                <td className="color-code">{d.mucGiam}</td>
                <td className="color-code">{d.tien}</td>
                <td>{formatDate(d.thoiGianBatDau)}</td>
                <td>{formatDate(d.thoiGianKetThuc)}</td>
                <td className="color-code">{d.moTa}</td>
                <td>{d.trangThai === 0 ? 'Đang kích hoạt' : 'Ngừng kích hoạt'}</td>
                <td>
                  {/* <Link className="mx-2" to={`/khuyen-mai/detail/${d.id}`}>
                    <i style={{ color: 'aqua' }} className="fa-regular fa-pen-to-square fa-lg"></i>
                  </Link> */}
                  <button className="mx-2" onClick={() => navigate(`/voucher/detail/${d.id}`)}>
                    <i style={{ color: 'aqua' }} className="fa-regular fa-pen-to-square fa-lg"></i>
                  </button>
                  {/* <Link className="mx-2" onClick={() => handleSubmit(d.id, { ma: d.ma })}>
                    <i style={{ color: '#ff1744' }} className="fa-solid fa-trash"></i>
                  </Link> */}
                  <button className="mx-2" onClick={() => handleSubmit(d.id, { ma: d.ma })}>
                    <i style={{ color: '#ff1744' }} className="fa-solid fa-trash"></i>
                  </button>

                  {/* <Link><i className="fa-solid fa-trash" 
                    onClick={() => handleDelete(d.id)}></i></Link> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
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
        {/* //end  */}
      </Card>
    </MainCard>
  );
}

export default KhuyenMai;
