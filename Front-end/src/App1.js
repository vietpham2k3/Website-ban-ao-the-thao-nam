import { Route, Routes } from 'react-router';
import Cart from 'views/giohang/gio-hang';
import TrangChu from 'views/home/TrangChu';

const App1 = () => {
  return (
    <Routes>
      <Route path="/trang-chu" element={<TrangChu />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
    </Routes>
  );
};

export default App1;
