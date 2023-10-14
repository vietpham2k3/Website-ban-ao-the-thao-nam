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
  const [listCA, setListCO] = useState([]);
  const [listMS, setListMS] = useState([]);

  const [chatLieuDefaultSelected, setChatLieuDefaultSelected] = useState(false); // Biến để theo dõi giá trị mặc định chất liệu
  const [loaiSanPhamDefaultSelected, setLoaiSanPhamDefaultSelected] = useState(false);
  const [nhaSanXuatDefaultSelected, setNhaSanXuatDefaultSelected] = useState(false);
  const [coAoDefaultSelected, setCoAoDefaultSelected] = useState(false);
  const [mauSacDefaultSelected, setMauSacDefaultSelected] = useState(false);
  const navigate = useNavigate();
  const maxPrice = findMaxPrice(data);

  useEffect(() => {
    getAll(0);
    getListCO();
    getListLSP();
    getListMS();
    getListNSX();
    getListCL();
  }, []);

  function findMaxPrice(data) {
    if (data.length === 0) {
      return null;
    }

    const maxPrice = data.reduce((max, product) => {
      return product.giaBan > max ? product.giaBan : max;
    }, data[0].giaBan);

    return maxPrice;
  }

  const getListCL = async () => {
    try {
      const response = await getAllListCL();
      if (response && response.data) {
        setListCL(response.data);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const getListLSP = async () => {
    try {
      const response = await getAllListLSP(); // Gọi API hoặc thực hiện tác vụ lấy danh sách loại sản phẩm
      if (response && response.data) {
        setListLSP(response.data);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const getListCO = async () => {
    try {
      const response = await getAllListCO();
      if (response && response.data) {
        setListCO(response.data);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const getListMS = async () => {
    try {
      const response = await getAllListMS(); // Gọi API hoặc thực hiện tác vụ lấy danh sách màu sắc
      if (response && response.data) {
        setListMS(response.data);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };
  const getListNSX = async () => {
    try {
      const response = await getAllListNSX(); // Gọi API hoặc thực hiện tác vụ lấy danh sách NSX
      if (response && response.data) {
        setListNSX(response.data);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };
  const getAll = async (page) => {
    try {
      const res = await getAllCTSP(term, status, values, mauSac, chatLieu, loaiSanPham, nhaSanXuat, coAo, page);

      if (res) {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
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
    try {
      const res = await searchCTSP(term, status, values[0], values[1], mauSac, chatLieu, loaiSanPham, nhaSanXuat, coAo, '0');

      if (res && res.data) {
        setData(res.data.content);
        setTotalPages(res.data.totalPages);
      } else {
        getAll(0);
      }
    } catch (error) {
      // Xử lý lỗi nếu có
    }
  }, 100);

  useEffect(() => {
    handleSearchUsers();
  }, [term, status, values, mauSac, chatLieu, loaiSanPham, nhaSanXuat, coAo]);

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

  const handleSubstring = (selectedValue) => {
    return selectedValue.replace('#', '');
  };

  const handleMauSacChange = (e) => {
    const selectedValue = e.target.value;

    const mauSacWithoutHash = handleSubstring(selectedValue);
    setMauSac(mauSacWithoutHash);

    if (selectedValue === '' || selectedValue === 'default') {
      // Nếu bạn muốn điền lại giá trị, sử dụng selectedValue đã lưu trữ
      setMauSacDefaultSelected(true);
      getAll(0);
      // Để hiển thị giá trị đúng trong combobox, bạn có thể sử dụng
    } else {
      setMauSacDefaultSelected(false);
    }
  };

  // ...

  // Trong JSX của combobox, bạn có thể hiển thị selectedValue thay vì mauSac.

  const handleChatLieuChange = (e) => {
    const selectedValue = e.target.value;
    setChatLieu(selectedValue);
    if (selectedValue === '') {
      getAll(0);
      setChatLieuDefaultSelected(true);
    } else {
      setChatLieuDefaultSelected(false);
    }
  };
  const handleLoaiSanPhamChange = (e) => {
    const selectedValue = e.target.value;
    setLoaiSanPham(selectedValue);
    if (selectedValue === '') {
      getAll(0);
      setLoaiSanPhamDefaultSelected(true);
    } else {
      setLoaiSanPhamDefaultSelected(false);
    }
  };

  const handleNhaSanXuatChange = (e) => {
    const selectedValue = e.target.value;
    setNhaSanXuat(selectedValue);
    if (selectedValue === '') {
      getAll(0);
      setNhaSanXuatDefaultSelected(true);
    } else {
      setNhaSanXuatDefaultSelected(false);
    }
  };

  const handleCoAoChange = (e) => {
    const selectedValue = e.target.value;
    setCoAo(selectedValue);
    if (selectedValue === '') {
      getAll(0);
      setCoAoDefaultSelected(true);
    } else {
      setCoAoDefaultSelected(false);
    }
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
              <Slider className="slider" onChange={setValues} value={values} min={MIN} max={maxPrice}></Slider>
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
                <Form.Select className="custom-select" onChange={handleChatLieuChange} value={chatLieu}>
                  <option value="" disabled={chatLieuDefaultSelected}>
                    CHẤT LIỆU
                  </option>
                  {listCL.map((c) => (
                    <option key={c.ten} value={c.ten}>
                      {c.ten}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="custom-select" onChange={handleLoaiSanPhamChange} value={loaiSanPham}>
                  <option value="" disabled={loaiSanPhamDefaultSelected}>
                    LOẠI SẢN PHẨM
                  </option>
                  {listLSP.map((c) => (
                    <option key={c.ten} value={c.ten}>
                      {c.ten}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="custom-select" onChange={handleNhaSanXuatChange} value={nhaSanXuat}>
                  <option value="" disabled={nhaSanXuatDefaultSelected}>
                    NHÀ SẢN XUẤT
                  </option>
                  {listNSX.map((c) => (
                    <option key={c.ten} value={c.ten}>
                      {c.ten}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="custom-select" onChange={handleCoAoChange} value={coAo}>
                  <option value="" disabled={coAoDefaultSelected}>
                    CỔ ÁO
                  </option>
                  {listCA.map((c) => (
                    <option key={c.ten} value={c.ten}>
                      {c.ten}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select className="custom-select" onChange={handleMauSacChange} value={mauSac}>
                  {listMS.map((c) => (
                    <option key={c.ten} value={c.ten} className="color-code" style={{ background: c.ten }}>
                      &nbsp;{c.ten}
                    </option>
                  ))}
                  <option value="" disabled={mauSacDefaultSelected}>
                    MÀU SẮC
                  </option>
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
                    {/* <td><div style={{ backgroundColor: d.mauSac.ten, width: 50, borderRadius: '10px' }}>&nbsp;</div>{d.mauSac.ten}</td>
                    <td>{d.chatLieu.ten}</td>
                    <td>{d.loaiSanPham.ten}</td>
                    <td>{d.nhaSanXuat.ten}</td>
                    <td>{d.coAo.ten}</td> */}
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
