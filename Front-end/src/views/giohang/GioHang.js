import Footer from 'ui-component/trangchu/Footer';
import Header from 'ui-component/trangchu/Header';
import Cart from 'ui-component/giohang/Cart';
import { useState } from 'react';
import { useEffect } from 'react';

function GioHang() {
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
      <Cart setProductCount={setProductCount} productCount={productCount} />
      <Footer />
    </div>
  );
}
export default GioHang;
