import '../../scss/Header.scss';
// import { Image } from 'react-bootstrap';

function Header() {
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
                <a className="nav-link active" aria-current="page" href="#">
                  <i className="fa-solid fa-user"></i>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/gio-hang">
                  <i className="fa-solid fa-cart-shopping"></i>
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
