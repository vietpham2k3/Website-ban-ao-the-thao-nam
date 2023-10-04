import { Route, Routes } from 'react-router';
import DetailSanPham from 'views/sanpham/DetailSanPham';
import TrangChu from 'views/home/TrangChu';
import SanPham from 'views/sanpham/SanPham';

const App1 = () => {
  return (
    <Routes>
      <Route path="/trang-chu" element={<TrangChu />}></Route>
      <Route path="/san-pham/web" element={<SanPham />}></Route>
      <Route path="/detail/:id" element={<DetailSanPham />}></Route>
    </Routes>
  );
};

export default App1;