/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import '../../scss/SanPham.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAllCTSP } from 'services/SanPhamService';
import { useEffect } from 'react';
import '../../scss/SanPham.scss';
import defaul from '../../assets/images/default-placeholder.png';

function SanPham() {
  const [data, setData] = useState([]);
  const [imageErrors, setImageErrors] = useState([]);
  const [totalPages, setTotalPages] = useState();
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
      setTotalPages(res.data.totalPages);
      console.log(res);
    }
  };

  const handleImageError = (index) => {
    const updatedErrors = [...imageErrors];
    updatedErrors[index] = true;
    setImageErrors(updatedErrors);
  };

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

  // const handleDelete = (id) => {
  //   setIsShow(true);
  //   setDataDelete(id);
  // };

  console.log(data);
  return (
    <div>
      <MainCard>
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
                <tr className="text-center">
                  <th>#</th>
                  <th>Ảnh</th>
                  <th>Mã</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá bán</th>
                  <th>Trạng thái</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((d, i) => (
                  <tr key={i} className="text-center">
                    <td>{i + 1}</td>
                    <td>
                      {!imageErrors[i] ? (
                        <img
                          src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
                          alt="Hình ảnh sản phẩm"
                          onError={() => handleImageError(i)}
                          className="product-image"
                          style={{ width: '70px', height: '100px' }}
                        />
                      ) : (
                        <img src={defaul} alt="Ảnh mặc định" className="product-image" style={{ width: '70px', height: '100px' }} />
                      )}
                    </td>
                    <td>{d.ma}</td>
                    <td>{d.sanPham.ten}</td>
                    <td>{d.soLuong}</td>
                    <td>{convertToCurrency(d.giaBan)}</td>
                    <td>{d.trangThai === 1 ? 'Kinh doanh' : 'Ngừng kinh doanh'}</td>
                    <td>
                      <button onClick={() => navigate(`/san-pham/chi-tiet-san-pham/detail/${d.id}`)} className="fa-solid fa-pen"></button>
                      <button onClick={() => navigate(`/san-pham/chi-tiet-san-pham/delete/${d.id}`)} className="fa-solid fa-trash"></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <ReactPaginate
              breakLabel="..."
              nextLabel="next"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={totalPages}
              previousLabel="previous"
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
        </div>
      </MainCard>
    </div>
  );
}

export default SanPham;
