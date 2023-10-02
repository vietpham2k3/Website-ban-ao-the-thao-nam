import React from 'react';
// import { Image } from 'react-bootstrap';
import '../../scss/Content.scss';
import { getAll } from '../../services/SanPhamService';
import { useState, useEffect } from 'react';

function Content() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllCTSP();
  }, []);

  const getAllCTSP = async () => {
    const res = await getAll();
    if (res) {
      setData(res.data);
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

  // const filteredData = data.filter((product) => product.trangThai === 'kinh doanh');

  return (
    // <div className="container">
    <>
      <section className="product">
        <h1 className="title">Sản Phẩm</h1>
        <div className="container">
          <div className="row">
            {data.slice(0, 12).map((product, index) => {
              return (
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item" key={index}>
                  <div className="card">
                    <img src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`} className="card-img-top" alt="..." />
                    <div className="card-body">
                      <h5 className="tenAo">{product.sanPham.ten}</h5>
                      <p className="giaBan">{convertToCurrency(product.giaBan)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button className="btn btn1">Xem tất cả </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Content;
