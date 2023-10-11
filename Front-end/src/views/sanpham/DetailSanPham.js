import React from 'react';
import Footer from 'ui-component/trangchu/Footer';
import Header from 'ui-component/trangchu/Header';
import Detail from 'ui-component/sanpham/Detail';
import { useState } from 'react';
import { useEffect } from 'react';

function DetailSanPham() {
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
      <Header productCount={productCount} />
      <Detail setProductCount={setProductCount} productCount={productCount} />
      <Footer />
    </div>
  );
}

export default DetailSanPham;
