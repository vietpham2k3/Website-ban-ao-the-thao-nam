import Content from 'ui-component/cart/ContentCart';
import Footer from 'ui-component/cart/FooterCart';
import Header from 'ui-component/cart/HeaderCart';
import '../../scss/ContentCart.scss';
function Cart() {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
export default Cart;
