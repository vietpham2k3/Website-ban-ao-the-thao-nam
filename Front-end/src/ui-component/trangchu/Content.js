import React from 'react';
// import { Image } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import '../../scss/Content.scss';
import { getAll, getAllSPNEW } from '../../services/SanPhamService';
import { useState, useEffect } from 'react';

function Content() {
  const [data, setData] = useState([]);
  const [productNew, setProductNew] = useState([]);

  useEffect(() => {
    getAllCTSP();
    getAllSP();
  }, []);

  const getAllCTSP = async () => {
    const res = await getAll();
    if (res && res.data) {
      setData(res.data);
    }
  };

  const getAllSP = async () => {
    const res = await getAllSPNEW();
    if (res && res.data) {
      setProductNew(res.data);
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
    <>
      <section className="product">
        <h1 className="title">Sản Phẩm Bán Chạy</h1>
        <div className="container">
          <div className="row">
            {data &&
              data.slice(0, 8).map((product, index) => {
                return (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item" key={index}>
                    <Card style={{ width: '260px', height: '400px' }}>
                      <Card.Img
                        style={{ textAlign: 'center', width: '250px', height: '300px' }}
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                      />
                      <Card.Body>
                        <Card.Title>{product.sanPham.ten}</Card.Title>
                        <Card.Text>
                          <span>{convertToCurrency(product.giaBan)}</span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
          </div>
          <div className="text-center">
            <button className="btn btn1">Xem tất cả </button>
          </div>
        </div>

        <h1 className="title">Sản Phẩm Mới Nhất</h1>
        <div className="container">
          <div className="row">
            {productNew &&
              productNew.slice(0, 8).map((product, i) => {
                return (
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 product-item" key={i}>
                    <Card style={{ width: '260px', height: '400px' }}>
                      <Card.Img
                        style={{ textAlign: 'center', width: '250px', height: '300px' }}
                        src={`http://localhost:8080/api/chi-tiet-san-pham/${product.id}`}
                      />
                      <Card.Body>
                        <Card.Title>{product.sanPham.ten}</Card.Title>
                        <Card.Text>
                          <span>{convertToCurrency(product.giaBan)}</span>
                        </Card.Text>
                      </Card.Body>
                    </Card>
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
