// bosstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import { toast } from "react-toastify";
import { fetchAllList, searchCL } from "../../service/ServiceChatLieu";
import { deleteCL } from "../../service/ServiceChatLieu";
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import { Link } from "react-router-dom";
import _ from "lodash";

// Soft UI Dashboard React compone  nts

// import AddChatLieu from './addchatlieu';

const ChatLieu = (page) => {
  const [filterStatus, setFilterStatus] = useState("");
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  // const [isShow, setIsShow] = useState(false);
  const [dataDelete, setDataDelete] = useState({
    ma: "",
  });

  console.log(data);

  useEffect(() => {
    getAll(0);
  }, []);

  const handleClose = () => {
    setIsShow(false);
  };

  // const handleDelete = (id) => {
  //   setIsShow(true);
  //   setDataDelete(id);
  // };

  const getAll = async (page) => {
    const res = await fetchAllList(page);
    if (res && res.data) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
      console.log(data);
    }
  };

  const search = async (key, trangThai, page) => {
    const res = await searchCL(key, trangThai, page);
    if (res) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    }
  };

  const handleSearchCL = _.debounce(async (e) => {
    let term = e.target.value;
    if (term || filterStatus) {
      search(term, filterStatus, 0); // Đã cập nhật tham số trangThai thành radio
    } else {
      getAll(0);
    }
  }, 100);

  const handlePageClick = (event) => {
    getAll(event.selected);
  };

  // const { id } = useParams();

  const del = async (id, values) => {
    const res = await deleteCL(id, values);
    if (res) {
      toast.success("Xóa thành công !");
      getAll(0);
    }
  };

  const handleSubmit = (id) => {
    del(id, dataDelete);
  };

  function formatDate(dateString) {
    if (dateString === null) {
      return ""; // Trả về chuỗi rỗng nếu giá trị là null
    }

    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;

    return formattedDate;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
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
                  <label
                    style={{ fontWeight: "bold", marginRight: 25 }}
                    className="form-check-label"
                  >
                    Trạng Thái:
                  </label>

                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      checked={filterStatus === ""}
                      onChange={() => {
                        setFilterStatus("");
                        search("", "", 0);
                      }}
                    />
                    <label style={{ marginLeft: 10 }} className="form-check-label">
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
                        search("", 0, 0);
                      }}
                    />
                    <label className="form-check-label">Đang kích hoạt</label>
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
                        search("", 1, 0);
                      }}
                    />
                    <label className="form-check-label">Ngừng kích hoạt</label>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <Link to="/san-pham/chatlieu/add" className="btn btn-primary">
                    Thêm <i className="fa-solid fa-plus fa-beat fa-lg"></i>
                  </Link>
                </div>
              </div>

              <table style={{ textAlign: "center" }} className="table table-hover">
                <tr>
                  <th>#</th>
                  <th>Mã</th>
                  <th>Tên Chất Liệu</th>
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
                      <td>{d.trangThai === 0 ? "Đang kích hoạt" : "Ngừng kích hoạt"}</td>
                      <td>
                        <Link className="mx-2" to={`/san-pham/chatlieu/detail/${d.id}`}>
                          <i
                            style={{ color: "aqua" }}
                            className="fa-regular fa-pen-to-square fa-lg"
                          ></i>
                        </Link>

                        <Link className="mx-2" onClick={() => handleSubmit(d.id, { ma: d.ma })}>
                          <i style={{ color: "#ff1744" }} className="fa-solid fa-trash"></i>
                        </Link>
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
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ChatLieu;
