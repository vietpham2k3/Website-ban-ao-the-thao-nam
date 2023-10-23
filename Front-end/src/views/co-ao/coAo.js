/* eslint-disable react-hooks/exhaustive-deps */
// bosstrap
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { Card } from '@mui/material';
import '../../scss/SanPham.scss';
import { fetchAllList, searchCA } from 'services/ServiceCoAo';
import { deleteCA } from 'services/ServiceCoAo';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import MainCard from 'ui-component/cards/MainCard';

// Soft UI Dashboard React compone  nts

// import AddChatLieu from './addchatlieu';

const CoAo = () => {
  const [filterStatus, setFilterStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const navigate = useNavigate();
  // const [isShow, setIsShow] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    ma: ''
  });

  console.log(data);

  useEffect(() => {
    getAll(0);
    setDataDelete();
  }, []);

  // const handleClose = () => {
  //   setIsShow(false);
  // };

  // const handleDelete = (id) => {
  //   setIsShow(true);
  //   setDataDelete(id);
  // };

  const getAll = async (page) => {
    setCurrentPage(page);
    const res = await fetchAllList(page);
    if (res && res.data) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
      console.log(data);
    }
  };

  const search = async (key, trangThai, page) => {
    const res = await searchCA(key, trangThai, page);
    if (res) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  const handleSearchCL = _.debounce(async (e) => {
    let term = e.target.value;
    if (term || filterStatus !== 0) {
      search(term, filterStatus, currentPage);
    } else {
      search('', 0, currentPage);
    }
  }, 100);
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    if (filterStatus === '') {
      getAll(selectedPage);
    } else {
      search('', filterStatus, selectedPage);
    }
  };

  // const { id } = useParams();

  const del = async (id, values) => {
    const res = await deleteCA(id, values);
    if (res) {
      toast.success('Xóa thành công !');
      getAll(0);
    }
  };

  const handleSubmit = (id) => {
    del(id, dataDelete);
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
      <MainCard>
        <Card>
          <div className="w-auto rounded bg-white border shadow p-4">
            <div className="d-flex justify-content-between">
              <div className="search">
                <input
                  style={{ borderRadius: 15, width: 300 }}
                  type="text"
                  className="input-search"
                  placeholder=" Nhập tên, mã màu cần tìm..."
                  onChange={handleSearchCL}
                />
              </div>
              <div style={{ marginRight: 50 }}>
                <label htmlFor="all" style={{ fontWeight: 'bold', marginRight: 25 }} className="form-check-label">
                  Trạng Thái:
                </label>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="all"
                    checked={filterStatus === ''}
                    onChange={() => {
                      setFilterStatus('');
                      search('', '', 0);
                    }}
                  />
                  <lable htmlFor="all" style={{ marginLeft: 10 }} className="form-check-label">
                    Tất Cả
                  </lable>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inactive"
                    checked={filterStatus === 0}
                    onChange={() => {
                      setFilterStatus(0);
                      search('', 0, 0);
                    }}
                  />
                  <label htmlFor="inactive" className="form-check-label">
                    Đang kích hoạt
                  </label>
                </div>
                <div style={{ marginLeft: 10 }} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="active"
                    checked={filterStatus === 1}
                    onChange={() => {
                      setFilterStatus(1);
                      search('', 1, 0);
                    }}
                  />
                  <label htmlFor="active" className="form-check-label">
                    Ngừng kích hoạt
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button onClick={() => navigate('/san-pham/co-ao/add')} className="btn btn-primary ">
                  Thêm <i className="fa-solid fa-plus fa-beat fa-lg"></i>
                </button>
              </div>
            </div>

            <table style={{ textAlign: 'center', marginTop: 30 }} className="table table-hover">
              <tr>
                <th>#</th>
                <th>Mã</th>
                <th>Tên Cổ ÁO</th>
                <th>Ngày Tạo</th>
                <th>Ngày Sửa</th>
                <th>Trạng Thái</th>
                <th>Action</th>
              </tr>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {d.ma}</td>
                    <td>{d.ten}</td>
                    <td>{formatDate(d.ngayTao)}</td>
                    <td>{formatDate(d.ngaySua)}</td>
                    <td>{d.trangThai === 0 ? 'Đang kích hoạt' : 'Ngừng kích hoạt'}</td>
                    <td>
                      <button
                        onClick={() => navigate(`/san-pham/co-ao/detail/${d.id}`)}
                        style={{ color: 'aqua' }}
                        className="fa-regular fa-pen-to-square fa-lg fa-khenh"
                      ></button>

                      <button
                        onClick={() => handleSubmit(d.id, { ma: d.ma })}
                        style={{ color: '#ff1744' }}
                        className="fa-solid fa-trash fa-khenh"
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

            {/* <ConfirmDelete
          show={isShow}
          handleClose={handleClose}
          dataDelete={dataDelete}
          getAll={getAll}
        >
        </ConfirmDelete> */}
          </div>
        </Card>
      </MainCard>
    </div>
  );
};

export default CoAo;
