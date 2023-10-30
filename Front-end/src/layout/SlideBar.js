import React from 'react';
import Anhuser from '../assets/images/bieutuong.jpg';
import { useNavigate } from 'react-router';

function SlideBar() {
  const navigate = useNavigate();
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
          <button onClick={() => navigate('/thong-tin_user')} className="no-border">
            Tài khoản của tôi
          </button>
        </li>
        <li>
          <button onClick={() => navigate('/history')} className="no-border">
            Đơn Hàng của tôi
          </button>
        </li>
        <li>
          <button onClick={() => navigate('/diachi')} className="no-border">
            Địa Chỉ
          </button>
        </li>
        <li>
          <button onClick={() => navigate('/thong-tin_user')} className="no-border">
            Đăng xuất
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SlideBar;
