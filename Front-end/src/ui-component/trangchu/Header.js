import '../../scss/Header.scss';
import { Image } from 'react-bootstrap';

function Header() {
  return (
<<<<<<< HEAD
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand nameShop" href="#">
          <Image style={{ width: 60, height: 60 }} src="https://i.imgur.com/r5WRVvP.png" alt="Shop" />
          Sports Sh<span style={{ fontFamily: "'Material Icons'", fontSize: 'inherit' }}>op</span>
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                <i className="fa-solid fa-user"></i>Tài Khoản
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/cart">
                <i className="fa-solid fa-cart-shopping"></i>Giỏ hàng
              </a>
            </li>
          </ul>
=======
    <header className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand nameShop" href="#">
            <Image style={{ width: 60, height: 60 }} src="https://i.imgur.com/r5WRVvP.png" alt="Shop" />
            Sports Sh<span style={{ fontFamily: "'Material Icons'", fontSize: 'inherit' }}>op</span>
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" role="search" style={{ width: 700, paddingLeft: 150 }}>
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <i className="fa-solid fa-user"></i>Tài Khoản
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  <i className="fa-solid fa-cart-shopping"></i>Giỏ hàng
                </a>
              </li>
            </ul>
          </div>
>>>>>>> 3ee8b915a9bebf1006f1c3055beb2bed8026789b
        </div>
      </nav>

      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid headerBottom">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Trang Chủ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
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
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
