import Anhuser from '../../assets/images/bieutuong.jpg';
import '../../scss/information.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';

function History() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <br></br>
          <div className="col-2">
            <ul>
              <li>
                <div className="user-column">
                  <div className="avatar">
                    <div className="avatar-image">
                      <img src={Anhuser} alt="Ảnh đại diện" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul>
              <li>
                <a href="thong-tin_user">
                  <button className="no-border">Tài khoản của tôi</button>
                </a>
              </li>
              <li>
                <a href="history">
                  <button className="no-border">Đơn Hàng của tôi</button>
                </a>
              </li>
              <li>
                <a href="diachi">
                  <button className="no-border">Địa Chỉ</button>
                </a>
              </li>
              <li>
                <a href="#">
                  <button className="no-border">ĐĂNG XUẤT</button>
                </a>
              </li>
              <li>
                <a href="#">
                  <button className="no-border"></button>
                </a>
              </li>
              <li>
                <a href="#">
                  <button className="no-border"></button>
                </a>
              </li>
            </ul>
          </div>

          <div className="separator"></div>
          <div className="col-9">
            <div className="user-details">
              <h1>Lịch Sử Đơn Hàng</h1>
              <br></br>
              <br></br>
              <h4>Đơn Hàng của bạn</h4>
              <p>Bạn chưa có đơn hàng nào....</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default History;
