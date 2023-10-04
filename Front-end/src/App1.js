import { Route, Routes } from 'react-router';
import Cart from 'views/giohang/gio-hang';
import TrangChu from 'views/home/TrangChu';
import SanPham from 'views/sanpham/SanPham';

const App1 = () => {
  return (
    <Routes>
      <Route path="/trang-chu" element={<TrangChu />}></Route>
<<<<<<< HEAD
      <Route path="/cart" element={<Cart />}></Route>
=======
      <Route path="/san-pham/web" element={<SanPham />}></Route>
>>>>>>> 3ee8b915a9bebf1006f1c3055beb2bed8026789b
    </Routes>
  );
};

export default App1;
