// import { Image } from 'react-bootstrap';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { count } from 'services/GioHangService';
import { useEffect } from 'react';
import '../../scss/Header.scss';
import { useNavigate } from 'react-router';

function Header() {
  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));
  const navigate = useNavigate();
  const [productCount, setProductCount] = useState(0);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const idGH = localStorage.getItem('idGH') || '';

  useEffect(() => {
    if (!dataLogin) {
      const storedProductList = JSON.parse(localStorage.getItem('product'));
      if (storedProductList) {
        const totalCount = storedProductList.reduce((count, product) => count + product.soLuong, 0);
        setProductCount(totalCount);
      }
    }

    // Kiểm tra nếu idGH không tồn tại thì không gọi countSP
    if (idGH) {
      countSP(idGH);
    }
  }, [dataLogin, idGH]);

  const countSP = async (id) => {
    const res = await count(id);
    if (res) {
      setProductCount(res.data);
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleLogout = () => {
    navigate('/login');
    localStorage.removeItem('dataLogin');
    localStorage.removeItem('idGH');
  };

  return (
    <div className="header-content-container">
      <header className="header">
        <nav className="navbar navbar-expand-lg nav-1">
          <div style={{ paddingRight: '120px' }}>
            <a className="navbar-brand nameShop" href="/trang-chu">
              Sports Shop
            </a>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item mx-3">
                <a className="nav-link" href="/trang-chu">
                  Trang Chủ
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="/san-pham/web">
                  Sản Phẩm
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">
                  Giới Thiệu
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">
                  Hỗ Trợ
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">
                  Thông Tin Liên Hệ
                </a>
              </li>
              <li className="nav-item mx-3">
                <a className="nav-link" href="#">
                  Tin Tức
                </a>
              </li>
            </ul>
          </div>
          <div style={{ paddingLeft: '100px' }}>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <button
                    type="button"
                    className="btn btn-primary position-relative icon-login btn-login"
                    style={{ paddingTop: '8px', paddingRight: '30px' }}
                    onClick={toggleSearchInput} // Khi nhấn nút, gọi hàm để hiển thị/ẩn ô tìm kiếm
                  >
                    <i className="fa-solid fa-magnifying-glass"></i>
                  </button>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active container" aria-current="page" href="#">
                  {dataLogin && dataLogin.role === 'KH' ? (
                    <DropdownButton id="dropdown-basic-button" title={<i className="fa-solid fa-user"></i>}>
                      <Dropdown.Item style={{ color: 'yellowgreen' }}>{dataLogin.tenKhachHang}</Dropdown.Item>
                      <hr />
                      <Dropdown.Item onClick={() => navigate('/thong-tin_user')}>Tài khoản của tôi</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate('/history')}>Đơn hàng</Dropdown.Item>
                      <Dropdown.Item onClick={() => navigate('/diachi')}>Địa chỉ</Dropdown.Item>
                      <hr />
                      <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                    </DropdownButton>
                  ) : (
                    <DropdownButton id="dropdown-basic-button" title={<i className="fa-solid fa-user"></i>}>
                      <Dropdown.Item onClick={() => navigate('/login')}>Đăng nhập</Dropdown.Item>
                    </DropdownButton>
                  )}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/gio-hang">
                  <button type="button" className="btn btn-primary position-relative icon-login btn-login">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">
                      {!dataLogin ? productCount : productCount || 0}
                    </span>
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      {showSearchInput && (
        <div className="search-container">
          <input type="search" placeholder="Tìm kiếm..." className="search-input" />
        </div>
      )}
    </div>
  );
}

export default Header;
