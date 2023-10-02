import Content from 'ui-component/sanpham/Content';
import Footer from 'ui-component/trangchu/Footer';
import Header from 'ui-component/trangchu/Header';
import HeaderBottom from 'ui-component/trangchu/HeaderBottom';

function SanPham() {
  return (
    <div>
      <Header />
      <HeaderBottom />
      <Content />
      <Footer />
    </div>
  );
}
export default SanPham;
