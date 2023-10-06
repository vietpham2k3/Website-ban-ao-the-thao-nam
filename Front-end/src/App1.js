import { Route, Routes } from 'react-router';
import DetailSanPham from 'views/sanpham/DetailSanPham';
import TrangChu from 'views/home/TrangChu';
import SanPham from 'views/sanpham/SanPham';
import '../src/scss/Router.scss';

const App1 = () => {
  return (
    <div className="full-screen-div">
      <Routes>
        <Route path="/trang-chu" element={<TrangChu />}></Route>
        <Route path="/san-pham/web" element={<SanPham />}></Route>
        <Route path="/detail/:id/:idSP/:idMS" element={<DetailSanPham />}></Route>
      </Routes>
    </div>
  );
};

export default App1;
