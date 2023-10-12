/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import InputSpinner from 'react-bootstrap-input-spinner';
import { Link } from 'react-router-dom';

function Cart(props) {
  // const [quantity, setQuantity] = useState(1);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productList, setProductList] = useState([]);
  // eslint-disable-next-line react/prop-types
  const { setProductCount, productCount } = props;

  useEffect(() => {
    const storedProductList = JSON.parse(localStorage.getItem('product'));
    if (storedProductList) {
      setProductList(storedProductList);
    }
  }, []);

  function convertToCurrency(number) {
    // Chuyển đổi số thành định dạng tiền Việt Nam
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(number);
  }

  useEffect(() => {
    // Tính tổng tiền khi valuesSanPham thay đổi
    let sum = 0;
    productList.forEach((d) => {
      sum += d.soLuong * d.giaBan;
    });
    // Cập nhật giá trị tổng tiền
    setTotalAmount(sum);
  }, [productList]);

  const handleDelete = (id, soLuong) => {
    const storedData = JSON.parse(localStorage.getItem('product'));
    const updatedData = storedData.filter((item) => item.id !== id);
    setProductCount(productCount - soLuong);
    localStorage.setItem('product', JSON.stringify(updatedData));
    const storedProductList = JSON.parse(localStorage.getItem('product'));
    if (storedProductList) {
      setProductList(storedProductList);
    }
  };

  const handleUpdate = (e, id) => {
    // Lấy giá trị số lượng mới
    const newQuantity = e;

    // Lấy danh sách sản phẩm từ local
    const storedProductList = JSON.parse(localStorage.getItem('product'));

    // Tìm sản phẩm tương ứng
    const productIndex = storedProductList.findIndex((product) => product.id === id);

    // Cập nhật số lượng sản phẩm
    storedProductList[productIndex].soLuong = newQuantity;

    // Lưu danh sách sản phẩm vào local
    localStorage.setItem('product', JSON.stringify(storedProductList));

    // Cập nhật danh sách sản phẩm trong state
    setProductList(storedProductList);
    const totalCount = storedProductList.reduce((count, product) => count + product.soLuong, 0);

    // Cập nhật biến productCount
    setProductCount(totalCount);
  };

  return (
    <div>
      <div className="container">
        <div>
          <p style={{ paddingLeft: 30, fontSize: 20, paddingTop: 30, display: 'flex' }}>
            <Link to="/trang-chu" style={{ color: 'black', textDecorationLine: 'none' }}>
              <p className="trangChu">Trang chủ</p>
            </Link>{' '}
            |{' '}
            <p style={{ textDecorationLine: 'none' }} className="sanPham">
              Giỏ hàng
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
                  {productList.map((product, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                          className="img-cart"
                          style={{ width: '70px', height: '100px', borderRadius: '15px' }}
                        />
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span>{product.sanPham.ten}</span>
                          <span style={{ marginLeft: '10px' }}>[{product.kichCo.ten} -</span>
                          <div
                            style={{
                              backgroundColor: product.mauSac.ten,
                              width: '30px',
                              borderRadius: '10px',
                              marginLeft: '10px'
                            }}
                          >
                            &nbsp;
                          </div>
                          <span>]</span>
                        </div>
                      </td>
                      <td>{convertToCurrency(product.giaBan)}</td>
                      <td>
                        <div className="product-count">
                          <div className="inputSpinner" style={{ width: 140, paddingRight: 25 }}>
                            <InputSpinner
                              max={product.tongSoLuong}
                              min={1}
                              className="input-spinner"
                              step={1}
                              variant={'dark'}
                              type="real"
                              size="md"
                              value={product.soLuong}
                              onChange={(e) => handleUpdate(e, product.id, product.soLuong)}
                            />
                          </div>
                        </div>
                      </td>
                      <td>{convertToCurrency(product.giaBan * product.soLuong)}</td>
                      <td>
                        <button onClick={() => handleDelete(product.id, product.soLuong)} className="fa-solid fa-trash mx-3"></button>
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
                <button type="button" className="btn btn-success">
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
