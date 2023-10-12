// import { useEffect } from 'react';
// import { useState } from 'react';

// import Footer from 'ui-component/trangchu/Footer';
// import Header from 'ui-component/trangchu/Header';
import CheckoutForm from 'ui-component/checkout/CheckOut';

function Checkout() {
  // const [productCount, setProductCount] = useState(0);

  // useEffect(() => {
  //   const storedProductList = JSON.parse(localStorage.getItem('product'));
  //   if (storedProductList) {
  //     const totalCount = storedProductList.reduce((count, product) => count + product.soLuong, 0);
  //     setProductCount(totalCount);
  //   }
  // }, []);
  return (
    <div>
      {/* <Header productCount={productCount} /> */}
      <CheckoutForm />
      {/* <Footer /> */}
    </div>
  );
}
export default Checkout;
