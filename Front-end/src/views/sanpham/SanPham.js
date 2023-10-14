import Content from 'ui-component/sanpham/Content';
import Banner from 'ui-component/trangchu/Banner';
import Footer from 'ui-component/trangchu/Footer';
import Header from 'ui-component/trangchu/Header';
import { useState } from 'react';
import { useEffect } from 'react';

function SanPham() {
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
      <Banner />
      <Content />
      <Footer />
    </div>
  );
}
export default SanPham;
