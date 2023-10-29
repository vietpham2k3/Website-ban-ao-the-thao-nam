import React from 'react';
import Anhuser from '../assets/images/bieutuong.jpg';

function SlideBar() {
  return (
    <div>
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
      </ul>
    </div>
  );
}

export default SlideBar;
