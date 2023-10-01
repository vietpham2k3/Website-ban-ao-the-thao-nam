import { Route, Routes } from 'react-router';
import TrangChu from 'views/home/TrangChu';

const App1 = () => {
  return (
    <Routes>
      <Route path="/trang-chu" element={<TrangChu />}></Route>
    </Routes>
  );
};

export default App1;
