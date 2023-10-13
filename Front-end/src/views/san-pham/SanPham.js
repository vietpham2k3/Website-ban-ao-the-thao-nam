/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import ReactPaginate from 'react-paginate';
import Table from 'react-bootstrap/Table';
import '../../scss/SanPham.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAllCTSP, deleteCTSP, searchCTSP } from 'services/SanPhamService';
import { useEffect } from 'react';
import '../../scss/SanPham.scss';
// import defaul from '../../assets/images/default-placeholder.png';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Slider from 'react-slider';

const MIN = 0;
const MAX = 999999;

function SanPham() {
  const [data, setData] = useState([]);
  // const [imageErrors, setImageErrors] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [values, setValues] = useState([MIN, MAX]);
  const [term, setTerm] = useState('');
  const [status, setStatus] = useState('');
  const [radio, setRadio] = useState('');
  // const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getAll(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAll = async (page) => {
    const res = await getAllCTSP(page);
    try {
      if (res) {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      // Errors
    } finally {
      // setIsLoading(false);
    }
  };

  // const handleImageError = (index) => {
  //   const updatedErrors = [...imageErrors];
  //   updatedErrors[index] = true;
  //   setImageErrors(updatedErrors);
  // };

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

  const deletesp = async (idSP) => {
    const res = await deleteCTSP(idSP);
    if (res) {
      toast.success('Xoá thành công');
    }
  };

  const handleDelete = async (id) => {
    await deletesp(id);
    getAll(0);
  };

  const handleSearchUsers = _.debounce(async () => {
    const res = await searchCTSP(term, status, values[0], values[1], '0');
    if (res && res.data) {
      setData(res.data.content);
    } else {
      getAll(0);
    }
  }, 100);

  useEffect(() => {
    handleSearchUsers();
  }, [term, status, values]);

  const handleInputChange = (e) => {
    setTerm(e.target.value);
  };

  const handleRadioChange = (e) => {
    setStatus(e.target.value);
    setRadio(e.target.value);
  };

  const handleAllClick = () => {
    setStatus('');
    setRadio('');
  };

  const handleUpdate = (idSp, id) => {
    navigate(`/san-pham/chi-tiet-san-pham/detail/${id}/${idSp}`);
    localStorage.setItem('idSP', idSp);
  };

  return (
    <div>
      <MainCard>
        <div className="row">
          <div className="col-6 search d-flex align-items-center row">
            <input
              type="text"
              className="input-search-sp box col-auto"
              placeholder="Search..."
              value={term}
              onChange={handleInputChange}
              style={{ width: '500px' }}
            />
            <div className="box d-flex flex-row col-auto">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  checked={radio === ''}
                  value=""
                  onClick={handleAllClick}
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="exampleRadios1" style={{ width: '60px' }}>
                  Tất cả
                </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" checked={radio === '0'} value="0" onChange={handleRadioChange} />
                <label className="form-check-label" htmlFor="exampleRadios2" style={{ width: '120px' }}>
                  Ngừng kinh doanh
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadios"
                  checked={radio === '1'}
                  value="1"
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="exampleRadios3" style={{ width: '120px' }}>
                  Đang kinh doanh
                </label>
              </div>
            </div>
            <div className="box col-auto" style={{ marginLeft: '120px', width: '200px' }}>
              <div className="values">
                <strong>Khoảng giá:</strong> {convertToCurrency(values[0]) + ' - ' + convertToCurrency(values[1])}
              </div>
              <Slider className="slider" onChange={setValues} value={values} min={MIN} max={MAX}></Slider>
            </div>
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
                      <img
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${d.id}`}
                        className="product-image"
                        style={{ width: '70px', height: '100px' }}
                      />
                    </td>
                    <td>{d.sanPham.ma}</td>
                    <td>{d.sanPham.ten}</td>
                    <td>{d.soLuong || 0}</td>
                    <td>{convertToCurrency(d.giaBan)}</td>
                    <td>{d.sanPham.trangThai === 1 ? 'Kinh doanh' : 'Ngừng kinh doanh'}</td>
                    <td>
                      <button onClick={() => handleUpdate(d.sanPham.id, d.id)} className="fa-solid fa-pen"></button>
                      <button onClick={() => handleDelete(d.sanPham.id)} className="fa-solid fa-trash mx-3"></button>
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
