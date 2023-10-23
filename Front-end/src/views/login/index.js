import React from 'react';
import Footer from 'ui-component/trangchu/Footer';
import Header from 'ui-component/trangchu/Header';
import IndexLogin from 'ui-component/login';
import { useState } from 'react';
import { useEffect } from 'react';

function Login() {
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
      <IndexLogin />
      <Footer />
    </div>
  );
}

export default Login;
