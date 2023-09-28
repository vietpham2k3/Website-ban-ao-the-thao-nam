import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import MainCard from 'ui-component/cards/MainCard';
import { Card } from '@mui/material';
import { getAllPageNV, deleteNhanVien, searchNV } from 'services/NhanVienService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// import DeleteKhachHang from "./DeleteKhachHang";

const NhanVien = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState(' ');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  // const [isShow, setIsShow] = useState(false)
  // const [dataDelete, setDataDelete] = useState({
  //   ma: ""
  // })

  useEffect(() => {
    getAll(0);
  }, []);

  const getAll = async (page) => {
    const res = await getAllPageNV(page);
    if (res && res.data) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  const del = async (id) => {
    const res = await deleteNhanVien(id);
    if (res) {
      toast.success('Xóa thành công!');
      getAll(0);
    }
  };

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
    search(searchTerm, status, 0);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    search(term, filterStatus, 0);
  };

  const search = async (term, trangThai, page) => {
    const res = await searchNV(term, trangThai, page);
    if (res && res.data) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  const handleDeleteKH = (id) => {
    del(id);
  };

  const handlePageClick = (event) => {
    getAll(event.selected);
  };

  function formatDate(dateString) {
    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    const year = dateObject.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

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
                  value={searchTerm}
                  placeholder="Nhập tên, mã màu cần tìm..."
                  onChange={handleSearch}
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
                    onChange={() => handleFilterStatusChange('')}
                  />
                  <label htmlFor="all" style={{ marginLeft: 10 }} className="form-check-label">
                    Tất Cả
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inactive"
                    checked={filterStatus === 0}
                    onChange={() => handleFilterStatusChange(0)}
                  />
                  <label htmlFor="inactive" className="form-check-label">
                    Hoạt động
                  </label>
                </div>
                <div style={{ marginLeft: 10 }} className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="active"
                    checked={filterStatus === 1}
                    onChange={() => handleFilterStatusChange(1)}
                  />
                  <label htmlFor="active" className="form-check-label">
                    Không Hoạt động
                  </label>
                </div>
              </div>
              <div color="blue">
                <button className="btn btn-primary" onClick={() => navigate('/nhan-vien/add')}>
                  Add
                </button>
              </div>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Mã</th>
                  <th>Tên</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Địa Chỉ</th>
                  <th>Ngày Sinh</th>
                  <th>Vai Trò</th>
                  <th>Trạng Thái</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={d.id}>
                    <td>{i + 1}</td>
                    <td>{d.ma}</td>
                    <td>{d.ten}</td>
                    <td>{d.sdt}</td>
                    <td>{d.email}</td>
                    <td>{d.diaChi}</td>
                    <td>{formatDate(d.ngaySinh)}</td>
                    <td>{d.vaiTro.ten}</td>
                    <td>{d.trangThai === 0 ? 'Hoạt động' : 'Không hoạt động'}</td>
                    <td>
                      <img src={`http://localhost:8080/api/nhanvien/getAll/${d.id}`} alt="" style={{ width: '90px', height: '100px' }} />
                    </td>

                    <td>
                      <Link className="mx-2" to={`/nhan-vien/detail/${d.id}`}>
                        <i style={{ color: 'aqua' }} className="fa-regular fa-pen-to-square fa-lg"></i>
                      </Link>
                      {/* <button className="mx-2"  to={`/nhan-vien/detail/${d.id}`}>
                                                <i style={{ color: 'aqua' }} className="fa-regular fa-pen-to-square fa-lg"></i>
                                            </button> */}
                      <button className="mx-2" onClick={() => handleDeleteKH(d.id)}>
                        <i style={{ color: '#ff1744' }} className="fa-solid fa-trash"></i>
                      </button>
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
};

export default NhanVien;

// import { useState, useEffect } from 'react';
// import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'
// import ReactPaginate from 'react-paginate'
// import { useParams } from "react-router-dom";
// import { Link } from 'react-router-dom'
// import _ from 'lodash';
// import { toast } from "react-toastify";

// //  React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import { fetchAllPage } from 'service/ServiceNhanVien';
// import { searchNhanVien } from 'service/ServiceNhanVien';
// import { deleteNhanVien } from 'service/ServiceNhanVien';

// function NhanVien() {
//     const [filterStatus, setFilterStatus] = useState('');
//     const [data, setData] = useState([]);
//     const [totalPages, setTotalPages] = useState(0)
//     const [isShow, setIsShow] = useState(false)
//     const [dataDelete, setDataDelete] = useState({ ma: "", })

//     useEffect(() => {
//         getAll(0);
//     }, []);

//     const handleClose = () => {
//         setIsShow(false)
//     }

//     const handleDelete = (id) => {
//         setIsShow(true)
//         setDataDelete(id)
//     }

//     const getAll = async (page) => {
//         const res = await fetchAllPage(page)
//         if (res && res.data) {
//             setData(res.data.content)
//             setTotalPages(res.data.totalPages)
//         }
//     }

//     const search = async (key, trangThai, page) => {
//         const res = await searchNhanVien(key, trangThai, page);
//         if (res) {
//             setData(res.data.content);
//             setTotalPages(res.data.totalPages);
//         }
//     };

//     const handleSearchNhanVien = _.debounce(async (e) => {
//         let term = e.target.value;
//         if (term || filterStatus) {
//             search(term, filterStatus, 0); // Đã cập nhật tham số trangThai thành radio
//         } else {
//             getAll(0);
//         }
//     }, 100);

//     const handlePageClick = (event) => {
//         getAll(event.selected)
//     }

//     const { id } = useParams();

//     const del = async (id, values) => {
//         const res = await deleteNhanVien(id, values);
//         if (res) {
//             toast.success("Xóa thành công !");
//             getAll(0);
//         }
//     };

//     const handleSubmit = (id) => {
//         del(id, dataDelete);
//     };

//     function formatDate(dateString) {
//         if (dateString === null) {
//             return ""; // Trả về chuỗi rỗng nếu giá trị là null
//         }

//         const dateObject = new Date(dateString);

//         const day = dateObject.getDate();
//         const month = dateObject.getMonth() + 1;
//         const year = dateObject.getFullYear();

//         const hours = dateObject.getHours();
//         const minutes = dateObject.getMinutes();
//         const seconds = dateObject.getSeconds();

//         const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

//         return formattedDate;
//     }

//     return (
//         <DashboardLayout>
//             <DashboardNavbar />
//             <div className="w-auto rounded bg-white border shadow p-4">
//                 <div className="d-flex justify-content-between">
//                     <div className="search">
//                         <input
//                             style={{ borderRadius: 15, width: 300 }}
//                             type="text"
//                             className="input-search"
//                             placeholder=" Nhập tên, mã màu cần tìm..."
//                             onChange={handleSearchNhanVien}
//                         />
//                     </div>
//                     <div style={{ marginRight: 50 }}>
//                         <label
//                             style={{ fontWeight: "bold", marginRight: 25 }}
//                             className="form-check-label"
//                         >
//                             Trạng Thái:
//                         </label>

//                         <div className="form-check form-check-inline">
//                             <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="inlineRadioOptions"
//                                 id="inlineRadio1"
//                                 checked={filterStatus === ''}
//                                 onChange={() => {
//                                     setFilterStatus('');
//                                     search('', '', 0);
//                                 }}
//                             />
//                             <label style={{ marginLeft: 10 }} className="form-check-label">
//                                 Tất Cả
//                             </label>
//                         </div>
//                         <div className="form-check form-check-inline">
//                             <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="inlineRadioOptions"
//                                 id="inlineRadio1"
//                                 checked={filterStatus === 0}
//                                 onChange={() => {
//                                     setFilterStatus(0);
//                                     search('', 0, 0);
//                                 }}
//                             />
//                             <label className="form-check-label">Đang kích hoạt</label>
//                         </div>
//                         <div style={{ marginLeft: 10 }} className="form-check form-check-inline">
//                             <input
//                                 className="form-check-input"
//                                 type="radio"
//                                 name="inlineRadioOptions"
//                                 id="inlineRadio2"
//                                 checked={filterStatus === 1}
//                                 onChange={() => {
//                                     setFilterStatus(1);
//                                     search('', 1, 0);
//                                 }}
//                             />
//                             <label className="form-check-label">Ngừng kích hoạt</label>
//                         </div>
//                     </div>

//                     <div className="d-flex justify-content-end">
//                         <Link to="/nhan-vien/add" className="btn btn-primary">
//                             Thêm <i className="fa-solid fa-plus fa-beat fa-lg"></i>
//                         </Link>

//                     </div>
//                 </div>

//                 <table style={{ textAlign: "center", marginTop: 50 }} className="table table-hover">
//                     <tr>
//                         <th>#</th>
//                         <th>Mã</th>
//                         <th>Tên</th>
//                         <th>Phone</th>
//                         <th>Email</th>
//                         <th>Địa Chỉ</th>
//                         <th>Ngày Sinh</th>
//                         <th>Vai Trò</th>
//                         <th>Trạng Thái</th>
//                         <th>Action</th>
//                     </tr>
//                     <tbody>
//                         {data.map((nv, i) => (
//                             <tr key={i}>
//                                 <td>{i + 1}</td>
//                                 <td>{nv.ma}</td>
//                                 <td>{nv.ten}</td>
//                                 <td>{nv.sdt}</td>
//                                 <td>{nv.email}</td>
//                                 <td>{nv.diaChi}</td>
//                                 <td>{formatDate(nv.ngaySinh)}</td>
//                                 <td>{nv.vaiTro.ten}</td>
//                                 <td>{nv.trangThai === 0 ? "Đang kích hoạt" : "Ngừng kích hoạt"}</td>
//                                 <td>{nv.anh}</td>
//                                 <td>
//                                     <Link className="mx-2" to={`/nhan-vien/detail/${nv.id}`}>
//                                         <i
//                                             style={{ color: "aqua" }}
//                                             className="fa-regular fa-pen-to-square fa-lg"
//                                         >up</i>
//                                     </Link>

//                                     <Link className="mx-2" onClick={() => handleSubmit(nv.id, { id: nv.id })}>
//                                         <i style={{ color: "#ff1744" }} className="fa-solid fa-trash">de</i>
//                                     </Link>

//                                     {/* <Link><i className="fa-solid fa-trash"
//                     onClick={() => handleDelete(d.id)}></i></Link> */}
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 <ReactPaginate
//                     breakLabel="..."
//                     nextLabel="Next >"
//                     onPageChange={handlePageClick}
//                     pageRangeDisplayed={5}
//                     pageCount={totalPages}
//                     previousLabel="< Previous"
//                     pageClassName="page-item"
//                     pageLinkClassName="page-link"
//                     previousClassName="page-item"
//                     previousLinkClassName="page-link"
//                     nextClassName="page-item"
//                     nextLinkClassName="page-link"
//                     breakClassName="page-item"
//                     breakLinkClassName="page-link"
//                     containerClassName="pagination justify-content-center"
//                     activeClassName="active"
//                 />

//                 {/* <ConfirmDelete
//           show={isShow}
//           handleClose={handleClose}
//           dataDelete={dataDelete}
//           getAll={getAll}
//         >
//         </ConfirmDelete> */}
//             </div>
//             <Footer />
//         </DashboardLayout>
//     );
// }

// export default NhanVien;
