import { Route, Routes } from 'react-router';
import Cart from 'views/giohang/gio-hang';
import TrangChu from 'views/home/TrangChu';
import SanPham from 'views/sanpham/SanPham';

const App1 = () => {
  return (
    <Routes>
      <Route path="/trang-chu" element={<TrangChu />}></Route>

      <Route path="/cart" element={<Cart />}></Route>

      <Route path="/san-pham/web" element={<SanPham />}></Route>
    </Routes>
  );
};

export default App1;
