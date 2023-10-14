import React from 'react';
import '../../scss/ThankYou.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';

function ThankYou() {
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const storedProductList = JSON.parse(localStorage.getItem('product'));
    if (storedProductList) {
      const totalCount = storedProductList.reduce((count, product) => count + product.soLuong, 0);
      setProductCount(totalCount);
    }
  }, []);

  return (
    <div>
      <Header productCount={productCount}></Header>
      <div className="container text-center thong-bao-thanh-cong">
        <i className="fa-regular fa-circle-check fa-xl icon-succsess"></i>
        <h3 className="title-tks mt-4">Cảm ơn bạn đã đặt hàng</h3>
        <p className="text mt-3">Chúng tôi sẽ liên hệ Quý khách để xác nhận đơn hàng trong thời gian sớm nhất</p>
        <button type="button" className="btn btn-warning" onClick={() => navigate('/trang-chu')}>
          Tiếp tục mua sắm
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default ThankYou;
