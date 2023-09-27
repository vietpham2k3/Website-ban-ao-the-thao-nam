/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Card } from '@mui/material';
// import ReactPaginate from 'react-paginate'
// project imports
import MainCard from 'ui-component/cards/MainCard';
import Table from 'react-bootstrap/Table';
import '../../scss/SanPham.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAllCTSP } from 'services/SanPhamService';
import { useEffect } from 'react';

function SanPham() {
  const [data, setData] = useState([]);
  // const [totalPages, setTotalPages] = useState();
  // const [isShow, setIsShow] = useState(false);
  // const [dataDelete, setDataDelete] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getAll(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAll = async (page) => {
    const res = await getAllCTSP(page);
    if (res) {
      setData(res.data.content);
      console.log(res);
    }
  };

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });

    return formatter.format(number);
  }

  // const handleDelete = (id) => {
  //   setIsShow(true);
  //   setDataDelete(id);
  // };

  console.log(data);
  return (
    <div>
      <MainCard>
        <Card>
          <div className="row">
            <div className="col-6 search">
              <input type="text" className="input-search" placeholder="Search..." />
            </div>
            <div className="col-6 d-none d-md-block">
              <div color="blue" className="float-end">
                <Link className="btn btn-outline-primary" to={'/san-pham/chi-tiet-san-pham/add'}>
                  Add +
                </Link>
              </div>
            </div>
            <div className="col-12">
              <Table striped hover className="my-4">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Ảnh</th>
                    <th>Mã</th>
                    <th>Tên sản phẩm</th>
                    <th>Chất liệu</th>
                    <th>Màu sắc</th>
                    <th>Loại sản phẩm</th>
                    <th>Nhà sản xuất</th>
                    <th>Cổ áo</th>
                    <th>Số lượng</th>
                    <th>Giá bán</th>
                    <th>Trạng thái</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((d, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>ảnh</td>
                      <td>{d.ma}</td>
                      <td>{d.sanPham.ten}</td>
                      <td>Chất liệu</td>
                      <td>{d.mauSac.ten}</td>
                      <td>{d.loaiSanPham.ten}</td>
                      <td>{d.nhaSanXuat.ten}</td>
                      <td>{d.coAo.ten}</td>
                      <td>{d.soLuong}</td>
                      <td>{convertToCurrency(d.giaBan)}</td>
                      <td>{d.trangThai === 1 ? 'Kinh doanh' : 'Ngừng kinh doanh'}</td>
                      <td>
                        <button onClick={() => navigate('/lồn')} className="fa-solid fa-pen"></button>
                        <button onClick={() => navigate('/lồn')} className="fa-solid fa-trash"></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Card>
      </MainCard>
    </div>
  );
}

export default SanPham;
