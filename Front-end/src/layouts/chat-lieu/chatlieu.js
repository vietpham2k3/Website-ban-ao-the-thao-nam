// bosstrap
import Table from "react-bootstrap/Table";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftBox from "components/SoftBox";
import { fetchAll } from "../../service/ServiceChatLieu";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import _ from "lodash";

// Soft UI Dashboard React compone  nts

// import AddChatLieu from './addchatlieu';

import ConfirmDelete from "./Deletechatlieu";

const ChatLieu = () => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [isShow, setIsShow] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  console.log(data);

  useEffect(() => {
    getAll();
  }, []);

  const handleClose = () => {
    setIsShow(false);
  };

  // const handleDelete = (id) => {
  //   setIsShow(true);
  //   setDataDelete(id);
  // };

  const getAll = async () => {
    const res = await fetchAll();
    if (res && res.data) {
      setData(res.data);
    }
  };

  // const search = async (key, page) => {
  //   const res = await searchCL(key, page);
  //   if (res) {
  //     setData(res.data.content);
  //     setTotalPages(res.data.totalPages);
  //   }
  // };

  // const handleSearchUsers = _.debounce(async (e) => {
  //   let term = e.target.value;
  //   // setKey(term); // Lưu từ khóa tìm kiếm vào state key
  //   if (term) {
  //     search(term, 0); // Gọi hàm search từ service
  //   } else {
  //     getAll(0);
  //   }
  // }, 100);

  // const handlePageClick = (event) => {
  //   getAll(event.selected);
  // };

  return (
    
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>MÃ</th>
                <th>TÊN</th>
                <th>TRẠNG THÁI</th>
                <th>NGÀY TẠO</th>
                <th>NGÀY SỬA</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => (
                <tr key={d.id}>
                  <td>{i + 1}</td>
                  <td>{d.ma}</td>
                  <td>{d.ten}</td>
                  <td>{d.trangThai}</td>
                  <td>{d.ngayTao}</td>
                  <td>{d.ngaySua}</td>
                  <td>
                    <button>UPDATE</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
              ;
            </tbody>
          </Table>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
};

export default ChatLieu;
