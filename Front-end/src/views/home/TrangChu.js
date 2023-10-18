import Banner from 'ui-component/trangchu/Banner';
import Content from 'ui-component/trangchu/Content';
import Footer from 'ui-component/trangchu/Footer';
import Header from 'ui-component/trangchu/Header';
import { useState } from 'react';
import { useEffect } from 'react';
import { count } from 'services/GioHangService';

function TrangChu() {
  const [productCount, setProductCount] = useState(0);

  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));

  useEffect(() => {
    if (!dataLogin) {
      const storedProductList = JSON.parse(localStorage.getItem('product'));
      if (storedProductList) {
        const totalCount = storedProductList.reduce((count, product) => count + product.soLuong, 0);
        setProductCount(totalCount);
      }
    } else {
      countSP('');
    }
  }, [dataLogin]);

  const countSP = async (id) => {
    const res = await count(id);
    if (res) {
      setProductCount(res.data);
    }
  };

  return (
    <div>
      <Header productCount={productCount} />
      <Banner />
      <Content />
      <Footer />
    </div>
  );
}
export default TrangChu;
