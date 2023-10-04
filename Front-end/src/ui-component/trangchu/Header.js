import '../../scss/Header.scss';
import { Image } from 'react-bootstrap';

function Header() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary nav-1">
        <div className="">
          <a className="navbar-brand nameShop ms-5" href="/trang-chu">
            <Image style={{ width: 60, height: 60 }} src="https://i.imgur.com/r5WRVvP.png" alt="Shop" />
            Sports Shop
          </a>
        </div>
        <div>
          <form className="d-flex" role="search" style={{ width: 700, paddingLeft: 150 }}>
            <div className="box-search1">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="search" placeholder="Tìm kiếm sản phẩm..." className="input-seach1" style={{ width: '100%' }} />
            </div>
          </form>
        </div>
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <i className="fa-solid fa-user"></i>Tài Khoản
              </a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link active" aria-current="page" href="#">
                <i className="fa-solid fa-cart-shopping"></i>Giỏ hàng
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <nav className="navbar navbar-expand-lg ">
        <ul className="navbar-nav ">
          <li className="nav-item">
            <a className="nav-link" href="/trang-chu">
              Trang Chủ
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/san-pham/web">
              Sản Phẩm
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Giới Thiệu
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Hỗ Trợ
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Thông Tin Liên Hệ
            </a>
          </li>
          <li className="nav-item">
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
