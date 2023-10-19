/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import InputSpinner from 'react-bootstrap-input-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { deleteSPInGH, getAllGH, postGH, updateSLGH } from 'services/GioHangService';
import { updateSL } from 'services/SanPhamService';
import { toast } from 'react-toastify';
// import { toast } from 'react-toastify';

function Cart(props) {
  // const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [check, setCheck] = useState(false);
  const [idGHCT, setIdGHCT] = useState('');
  const [productList, setProductList] = useState([]);
  const [listSP, setListSP] = useState([]);
  const navigate = useNavigate();
  // eslint-disable-next-line react/prop-types
  const { setProductCount, productCount, idGH, dataLogin, countSP } = props;
  const [valuesUpdateGH, setValuesUpdateGH] = useState({
    chiTietSanPham: {
      id: ''
    },
    soLuong: 1
  });
  const hoaDonChiTietList = productList.map((product) => {
    return {
      chiTietSanPham: {
        id: product.id
        // Các trường khác của chi tiết sản phẩm nếu cần
      },
      soLuong: product.soLuong, // Thêm số lượng
      donGia: product.soLuong * product.giaBan // Thêm giá bán
    };
  });

  useEffect(() => {
    const storedProductList = JSON.parse(localStorage.getItem('product'));
    if (storedProductList) {
      setProductList(storedProductList);
    }
  }, []);

  useEffect(() => {
    if (idGH) {
      getAll(idGH);
    }
  }, [idGH]);

  useEffect(() => {
    if (check) {
      update(idGHCT, valuesUpdateGH);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesUpdateGH]);

  useEffect(() => {
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0;
    if (dataLogin) {
      listSP.forEach((d) => {
        sum += d.soLuong * d.donGia;
      });
      // Cập nhật giá trị tổng tiền
      setTotalAmount(sum);
    } else {
      productList.forEach((d) => {
        sum += d.soLuong * d.giaBan;
      });
      // Cập nhật giá trị tổng tiền
      setTotalAmount(sum);
    }
  }, [productList, listSP, dataLogin]);

  const handleTaoHoaDon = () => {
    taoHoaDon(hoaDonChiTietList);
  };

  const taoHoaDon = async (value) => {
    const res = await postGH(value);
    if (res) {
      navigate(`/checkout/${res.data}`);
    }
  };

  const putSl = async (idCTSP, soLuong) => {
    try {
      await updateSL(idCTSP, soLuong);
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const getAll = async (id) => {
    try {
      const res = await getAllGH(id);
      if (res) {
        setListSP(res.data);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const update = async (id, value) => {
    try {
      const res = await updateSLGH(id, value);
      if (res) {
        countSP(idGH);
        getAll(idGH);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const handleUpdate = (e, id, soLuong, tongSoLuong, idCTSP) => {
    if (dataLogin) {
      setIdGHCT(id);
      setCheck(true);
      setValuesUpdateGH({
        ...valuesUpdateGH,
        chiTietSanPham: {
          id: idCTSP
        },
        soLuong: e
      });
    } else {
      // Lấy giá trị số lượng mới
      const newQuantity = e;

      // Lấy danh sách sản phẩm từ local
      const storedProductList = JSON.parse(localStorage.getItem('product'));

      // Tìm sản phẩm tương ứng
      const productIndex = storedProductList.findIndex((product) => product.id === id);

      // Lấy số lượng hiện tại
      const currentQuantity = storedProductList[productIndex].soLuong;

      // Cập nhật số lượng sản phẩm
      storedProductList[productIndex].soLuong = newQuantity;
      // Lưu danh sách sản phẩm vào local
      localStorage.setItem('product', JSON.stringify(storedProductList));

      // Cập nhật danh sách sản phẩm trong state
      setProductList(storedProductList);
      const totalCount = storedProductList.reduce((count, product) => count + product.soLuong, 0);

      // Cập nhật biến productCount
      setProductCount(totalCount);

      if (newQuantity > currentQuantity) {
        storedProductList[productIndex].tongSoLuong = tongSoLuong - (newQuantity - currentQuantity);
      } else {
        storedProductList[productIndex].tongSoLuong = tongSoLuong + (currentQuantity - newQuantity);
      }

      // Lưu lại danh sách sản phẩm đã được cập nhật
      localStorage.setItem('product', JSON.stringify(storedProductList));

      // Gọi hàm để cập nhật tổng số lượng trong local storage
      putSl(id, storedProductList[productIndex].tongSoLuong);
    }
  };

  const deleteProductInCart = async (id) => {
    try {
      const res = await deleteSPInGH(id);
      if (res) {
        toast.success('Xoá thành công');
        getAll(idGH);
        countSP(idGH);
      }
    } catch (error) {
      // Xử lý lỗi nếu cần
    }
  };

  const handleDelete = (id, soLuong, tongSoLuong) => {
    if (dataLogin) {
      deleteProductInCart(id);
    } else {
      putSl(id, tongSoLuong + soLuong);
      const storedData = JSON.parse(localStorage.getItem('product'));
      const updatedData = storedData.filter((item) => item.id !== id);
      setProductCount(productCount - soLuong);
      localStorage.setItem('product', JSON.stringify(updatedData));
      const storedProductList = JSON.parse(localStorage.getItem('product'));
      if (storedProductList) {
        setProductList(storedProductList);
      }
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

  return (
    <div>
      <div className="container">
        <div>
          <p style={{ paddingLeft: 30, fontSize: 20, paddingTop: 30, display: 'flex' }}>
            <Link to="/trang-chu" style={{ color: 'black', textDecorationLine: 'none' }}>
              <p className="trangChu">Trang chủ&nbsp;</p>
            </Link>{' '}
            {'>'}
            <p style={{ textDecorationLine: 'none' }} className="sanPham">
              &nbsp;Giỏ hàng
            </p>
          </p>
        </div>
        <hr></hr>
      </div>
      <div className="wrapper container">
        <div className="row">
          <div className="col-md-8">
            <div className="cart-san-pham">
              <div className="col-12 d-flex justify-content-start title-gio-hang">
                <h1 style={{ fontSize: '25px' }}>Giỏ hàng</h1>
              </div>
              <div className="col-12" style={{ paddingLeft: '25px', paddingBottom: '10px', paddingRight: '25px' }}>
                <Table striped hover className="my-2">
                  <tr>
                    <td>Sản phẩm</td>
                    <td>&nbsp;</td>
                    <td>Đơn giá</td>
                    <td>Số lượng</td>
                    <td>Thành tiền</td>
                    <td>Action</td>
                  </tr>
                  {dataLogin
                    ? listSP.map((product, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={`http://localhost:8080/api/chi-tiet-san-pham/${product.chiTietSanPham.id}`}
                              className="img-cart"
                              style={{ width: '70px', height: '100px', borderRadius: '15px' }}
                            />
                          </td>
                          <td>
                            {product.chiTietSanPham.sanPham.ten} <br />
                            {product.chiTietSanPham.kichCo.ten} -{' '}
                            <span
                              className="color-circle"
                              style={{
                                backgroundColor: product.chiTietSanPham.mauSac.ten,
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                height: '2px',
                                width: '10px'
                              }}
                            ></span>
                          </td>
                          <td>{convertToCurrency(product.donGia)}</td>
                          <td>
                            <div
                              className="input-spinner"
                              style={{ display: 'flex', alignItems: 'center', width: 140, justifyContent: 'center' }}
                            >
                              <InputSpinner
                                max={product.chiTietSanPham.soLuong + product.soLuong}
                                min={1}
                                className="input-spinner"
                                step={1}
                                variant={'dark'}
                                type="real"
                                size="md"
                                value={product.soLuong}
                                onChange={(e) =>
                                  handleUpdate(e, product.id, product.soLuong, product.chiTietSanPham.soLuong, product.chiTietSanPham.id)
                                }
                              />
                            </div>
                          </td>
                          <td>{convertToCurrency(product.donGia * product.soLuong)}</td>
                          <td>
                            <button
                              onClick={() => handleDelete(product.id, product.soLuong, product.chiTietSanPham.soLuong)}
                              className="fa-solid fa-trash mx-3"
                            ></button>
                          </td>
                        </tr>
                      ))
                    : productList.map((product, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                              className="img-cart"
                              style={{ width: '70px', height: '100px', borderRadius: '15px' }}
                            />
                          </td>
                          <td>
                            {product.sanPham.ten} <br />
                            {product.kichCo.ten} -{' '}
                            <span
                              className="color-circle"
                              style={{
                                backgroundColor: product.mauSac.ten,
                                display: 'inline-block',
                                verticalAlign: 'middle',
                                height: '2px',
                                width: '10px'
                              }}
                            ></span>
                          </td>
                          <td>{convertToCurrency(product.giaBan)}</td>
                          <td>
                            <div
                              className="input-spinner"
                              style={{ display: 'flex', alignItems: 'center', width: 140, justifyContent: 'center' }}
                            >
                              <InputSpinner
                                max={product.tongSoLuong + product.soLuong}
                                min={1}
                                className="input-spinner"
                                step={1}
                                variant={'dark'}
                                type="real"
                                size="md"
                                value={product.soLuong}
                                onChange={(e) => handleUpdate(e, product.id, product.soLuong, product.tongSoLuong)}
                              />
                            </div>
                          </td>
                          <td>{convertToCurrency(product.giaBan * product.soLuong)}</td>
                          <td>
                            <button
                              onClick={() => handleDelete(product.id, product.soLuong, product.tongSoLuong)}
                              className="fa-solid fa-trash mx-3"
                            ></button>
                          </td>
                        </tr>
                      ))}
                </Table>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="cart-san-pham">
              <div className="col-12 tong-tien-cart">
                <div className="text-total">
                  <p>
                    Tổng tiền: <strong>{convertToCurrency(totalAmount)}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => {
                    // navigate('/checkout');
                    handleTaoHoaDon();
                  }}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
