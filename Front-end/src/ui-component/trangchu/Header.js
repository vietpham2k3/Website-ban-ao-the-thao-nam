// import { Image } from 'react-bootstrap';
import '../../scss/Header.scss';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Header(props) {
  // eslint-disable-next-line react/prop-types
  const { productCount } = props;

  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));

  const handleLogout = () => {
    window.location.reload();
    localStorage.removeItem('dataLogin');
  };
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary nav-1">
        <div className="container">
          <div>
            <a className="navbar-brand nameShop" href="/trang-chu">
              Sports Shop
            </a>
          </div>
          <div>
            <form className="d-flex" role="search" style={{ width: 700 }}>
              <div className="box-search1">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input type="search" placeholder="Tìm kiếm sản phẩm..." className="input-seach1" style={{ width: '100%' }} />
              </div>
            </form>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active container" aria-current="page" href="#">
                  {dataLogin && dataLogin.role === 'KH' ? (
                    <DropdownButton id="dropdown-basic-button" title={<i className="fa-solid fa-user"></i>}>
                      <Dropdown.Item style={{ color: 'yellowgreen' }}>{dataLogin.tenKhachHang}</Dropdown.Item>
                      <hr />
                      <Dropdown.Item href="/login">Tài khoản của tôi</Dropdown.Item>
                      <Dropdown.Item href="/login">Đổi mật khẩu</Dropdown.Item>
                      <Dropdown.Item href="/login">Địa chỉ</Dropdown.Item>
                      <hr />
                      <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                    </DropdownButton>
                  ) : (
                    <DropdownButton id="dropdown-basic-button" title={<i className="fa-solid fa-user"></i>}>
                      <Dropdown.Item href="/login">Đăng nhập</Dropdown.Item>
                    </DropdownButton>
                  )}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/gio-hang">
                  <button type="button" className="btn btn-primary position-relative icon-login btn-login">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger">{productCount}</span>
                  </button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg ">
        <ul className="navbar-nav ">
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
      </nav>
    </header>
  );
}

export default Header;
