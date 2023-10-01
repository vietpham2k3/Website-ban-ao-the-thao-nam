import { Image } from 'react-bootstrap';
import '../../scss/HeaderBottom.scss';
import Carousel from 'react-bootstrap/Carousel';

function HeaderBottom() {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg ">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="headerBottom navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Áo Bóng Đá
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Áo Cầu Lông
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Áo Bóng Chuyền
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Áo Có Cổ
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Áo Dài Tay
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Áo Khoác Thể thao
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Carousel className="banner">
        <Carousel.Item interval={1000}>
          <Image
            src="https://file.hstatic.net/1000253775/file/banner_web_ngang_72efc8a132d840ad932685c6fd17f1bd_master.jpg"
            className="d-block w-100"
            alt="Anh1"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <Image
            src="https://file.hstatic.net/1000253775/file/banner_ngang_sale_a490f569d86b4acdb5716721581cfe8c_master.jpg"
            className="d-block w-100"
            alt="Anh2"
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            src="https://file.hstatic.net/1000253775/file/banner_web_ngang_72efc8a132d840ad932685c6fd17f1bd_master.jpg"
            className="d-block w-100"
            alt="Anh3"
          />
        </Carousel.Item>
      </Carousel>
    </header>
  );
}
export default HeaderBottom;
