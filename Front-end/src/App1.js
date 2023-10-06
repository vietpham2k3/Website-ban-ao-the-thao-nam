import { Route, Routes } from 'react-router';
import DetailSanPham from 'views/sanpham/DetailSanPham';
import TrangChu from 'views/home/TrangChu';
import SanPham from 'views/sanpham/SanPham';
import Cart from 'views/giohang/gio-hang';
import '../src/scss/Router.scss';

const App1 = () => {
  return (
    <div className="full-screen-div">
      <Routes>
        <Route path="/trang-chu" element={<TrangChu />}></Route>
        <Route path="/san-pham/web" element={<SanPham />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/detail/:id" element={<DetailSanPham />}></Route>
      </Routes>
    </div>
  );
};

export default App1;
