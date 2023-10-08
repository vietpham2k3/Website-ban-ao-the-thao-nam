import { Route, Routes } from 'react-router';
import DetailSanPham from 'views/sanpham/DetailSanPham';
import TrangChu from 'views/home/TrangChu';
import SanPham from 'views/sanpham/SanPham';
<<<<<<< HEAD
import Cart from 'views/giohang/gio-hang';
=======
import GioHang from 'views/giohang/GioHang';
>>>>>>> 1be65a57414b3bad3d6cca2af17ca7137fd95c75
import '../src/scss/Router.scss';

const App1 = () => {
  return (
    <div className="full-screen-div">
      <Routes>
        <Route path="/trang-chu" element={<TrangChu />}></Route>
        <Route path="/san-pham/web" element={<SanPham />}></Route>
<<<<<<< HEAD
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/detail/:id" element={<DetailSanPham />}></Route>
=======
        <Route path="/detail/:id/:idSP/:idMS" element={<DetailSanPham />}></Route>
        <Route path="/gio-hang" element={<GioHang />}></Route>
>>>>>>> 1be65a57414b3bad3d6cca2af17ca7137fd95c75
      </Routes>
    </div>
  );
};

export default App1;
