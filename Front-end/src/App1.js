import { Route, Routes } from 'react-router';
import DetailSanPham from 'views/sanpham/DetailSanPham';
import TrangChu from 'views/home/TrangChu';
import SanPham from 'views/sanpham/SanPham';
import GioHang from 'views/giohang/GioHang';
import '../src/scss/Router.scss';
import Checkout from 'views/checkout/CheckOut';

const App1 = () => {
  return (
    <div className="full-screen-div">
      <Routes>
        <Route path="/trang-chu" element={<TrangChu />}></Route>
        <Route path="/san-pham/web" element={<SanPham />}></Route>

        <Route path="/detail/:id" element={<DetailSanPham />}></Route>

        <Route path="/detail/:id/:idSP/:idMS" element={<DetailSanPham />}></Route>
        <Route path="/gio-hang" element={<GioHang />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
      </Routes>
    </div>
  );
};

export default App1;
