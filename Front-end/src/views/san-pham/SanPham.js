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
import { useState, useEffect } from 'react';
import { getAllCTSP, deleteCTSP, searchCTSP } from 'services/SanPhamService';
import '../../scss/SanPham.scss';
// import defaul from '../../assets/images/default-placeholder.png';
import { toast } from 'react-toastify';
import _ from 'lodash';
import Slider from 'react-slider';
import { Form, Row, Col } from 'react-bootstrap';
import { getAllListCL, getAllListCO, getAllListLSP, getAllListMS, getAllListNSX } from 'services/SanPhamService';

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
  const [mauSac, setMauSac] = useState('');
  const [chatLieu, setChatLieu] = useState('');
  const [loaiSanPham, setLoaiSanPham] = useState('');
  const [nhaSanXuat, setNhaSanXuat] = useState('');
  const [coAo, setCoAo] = useState('');

  const [listCL, setListCL] = useState([]);
  const [listNSX, setListNSX] = useState([]);
  const [listLSP, setListLSP] = useState([]);
  const [listCA, setListCA] = useState([]);
  const [listMS, setListMS] = useState([]);

  const navigate = useNavigate();

  const getAllList = async () => {
    const resCL = await getAllListCL();
    const resLSP = await getAllListLSP();
    const resCA = await getAllListCO();
    const resNSX = await getAllListNSX();
    const resMS = await getAllListMS();

    if (resCL || resLSP || resCA || resNSX || resMS) {
      setListCL(resCL.data);
      setListCA(resCA.data);
      setListLSP(resLSP.data);
      setListNSX(resNSX.data);
      setListMS(resMS.data);

      if (resCL.data.length > 0 || resCA.data.length > 0 || resLSP.data.length > 0 || resNSX.data.length > 0) {
        setValues({
          ...values,
          chatLieu: {
            id: resCL.data[0].id
          },
          coAo: {
            id: resCA.data[0].id
          },
          loaiSanPham: {
            id: resLSP.data[0].id
          },
          nhaSanXuat: {
            id: resNSX.data[0].id
          }
        });
      }
    }
  };
  console.log(values);

  useEffect(() => {
    getAll(0);
    getAllList();

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
  
    const res = await searchCTSP(term, status, values[0], values[1], mauSac, chatLieu, loaiSanPham, nhaSanXuat, coAo, 0);
    if (res && res.data) {
      setData(res.data.content);
      setTotalPages(res.data.totalPages);
    } else {
      getAll(0);
    }
    console.log(data);
  }, 100);

  useEffect(() => {
    handleSearchUsers();
  }, [term, status, values, mauSac, chatLieu, loaiSanPham, nhaSanXuat, coAo, 0]);

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
              className="input-search box col-auto"
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
          <Form>
            <Row>
              <Col>
                <Form.Select className="custom-select" onChange={(e) => setMauSac(e.target.value)} value={mauSac}>
                  <option>MÀU SẮC</option>
                  {listMS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.ten}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="custom-select" onChange={(e) => setChatLieu(e.target.value)} value={chatLieu}>
                  <option>CHẤT LIỆU</option>
                  {listCL.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.ten}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="custom-select" onChange={(e) => setLoaiSanPham(e.target.value)} value={loaiSanPham}>
                  <option>LOẠI SẢN PHẨM</option>
                  {listLSP.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.ten}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="custom-select" onChange={(e) => setNhaSanXuat(e.target.value)} value={nhaSanXuat}>
                  <option>NHÀ SẢN XUẤT</option>
                  {listNSX.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.ten}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="custom-select" onChange={(e) => setCoAo(e.target.value)} value={coAo}>
                  <option>CỔ ÁO</option>
                  {listCA.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.ten}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form>

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
                  <th>Màu SẮC</th>
                  <th>CHẤT LIỆU</th>
                  <th>LOẠI SẢN PHẨM</th>
                  <th>NHÀ SẢN XUẤT</th>
                  <th>CỔ ÁO</th>
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
                    <td>{d.mauSac.ten}</td>
                    <td>{d.chatLieu.ten}</td>
                    <td>{d.loaiSanPham.ten}</td>
                    <td>{d.nhaSanXuat.ten}</td>
                    <td>{d.coAo.ten}</td>
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
