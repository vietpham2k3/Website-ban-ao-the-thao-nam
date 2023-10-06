import React from 'react';
import { useState } from 'react';
import InputSpinner from 'react-bootstrap-input-spinner';
import { Link } from 'react-router-dom';

function Content() {
  const [quantity, setQuantity] = useState(1);
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
      <div
        className="wrapper container"
        style={{
          background: '#f3f5f9',
          position: 'relative',
          paddingLeft: 15,
          display: 'flex',
          fontFamily: 'Josefin Sans'
        }}
      >
        <div className="sidebar col-md-8" style={{ marginRight: 20 }}>
          <div className="mt-3">
            <table className="table">
              <thead>
                <tr>
                  <th style={{ paddingBottom: 15, fontSize: 20, background: '#f3f5f9' }}>Đơn hàng của bạn</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: 18 }}>
                <tr>
                  <td style={{ paddingLeft: 30 }}>Sản phẩm</td>
                  <td>Đơn giá</td>
                  <td style={{ paddingLeft: 40 }}>Số lượng</td>
                  <td>Thành tiền</td>
                  <td></td>
                </tr>
                <tr>
                  <td style={{ display: 'flex' }}>
                    <img
                      style={{ width: 150, height: 160 }}
                      src="https://savani.vn/images/products/2022/11/03/small/wbk006-3-c0075-2_1667445168.gif"
                      alt=""
                    />
                    <p style={{ paddingLeft: 15, width: 70 }}>Áo nỉ họa tiết Unlocked 3.DWTW009</p>
                  </td>
                  <td>329,000đ</td>
                  <td>
                    <div className="product-count">
                      <div className="inputSpinner" style={{ width: 135, paddingLeft: 25 }}>
                        <InputSpinner
                          min={1}
                          className="input-spinner"
                          step={1}
                          variant={'dark'}
                          type="real"
                          size="md"
                          value={quantity}
                          onChange={(value) => setQuantity(value)}
                        />
                      </div>
                    </div>
                  </td>
                  <td>329,000đ</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                  </td>
                </tr>
                <tr>
                  <td style={{ display: 'flex' }}>
                    <img
                      style={{ width: 150, height: 160 }}
                      src="https://savani.vn/images/products/2022/11/03/small/wbk006-3-c0075-2_1667445168.gif"
                      alt=""
                    />
                    <p style={{ paddingLeft: 15, width: 70 }}>Áo nỉ họa tiết Unlocked 3.DWTW009</p>
                  </td>
                  <td>329,000đ</td>
                  <td>
                    <div className="product-count">
                      <div className="inputSpinner" style={{ width: 135, paddingLeft: 25 }}>
                        <InputSpinner
                          min={1}
                          className="input-spinner"
                          step={1}
                          variant={'dark'}
                          type="real"
                          size="md"
                          value={quantity}
                          onChange={(value) => setQuantity(value)}
                        />
                      </div>
                    </div>
                  </td>
                  <td>329,000đ</td>
                  <td>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash3-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-4" style={{ marginTop: 60, marginBottom: 40, paddingLeft: 30, width: 400, background: '#fff' }}>
          <div className="container" style={{ display: 'flex', paddingTop: 40, paddingRight: 40 }}>
            <div className="col-sm-6">
              <p style={{ paddingBottom: 5, fontSize: 18 }}>Giá trị đơn hàng</p>
              <p style={{ paddingBottom: 5, fontSize: 18 }}>Khuyến mãi</p>
              <p style={{ paddingBottom: 5, fontSize: 18 }}>Tổng tiền</p>
            </div>
            <div className="col-sm-6">
              <p style={{ paddingBottom: 5, fontSize: 18, textAlign: 'right' }}>339,000đ</p>
              <p style={{ paddingBottom: 5, fontSize: 18, textAlign: 'right', color: 'red' }}>-33,000đ</p>
              <p style={{ paddingBottom: 5, fontSize: 18, textAlign: 'right' }}>309,000đ</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: 40 }}>
            <button
              className="btnThanhToan btn btn-default"
              type="button"
              style={{ background: '#EE4D2D', fontWeight: 'bold', textAlign: 'center', width: 200, height: 60, fontSize: 20 }}
            >
              Thanh Toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Content;
