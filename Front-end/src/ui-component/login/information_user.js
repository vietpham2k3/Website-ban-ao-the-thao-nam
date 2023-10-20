import Anhuser from '../../assets/images/bieutuong.jpg';
import '../../scss/information.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';
import React, { useState } from 'react';
import Modal from 'react-modal';

function UserAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const handleUpdate = () => {
    setIsModalOpen(true);
  };
  const handleCapNhat = () => {
    setIsChangePasswordModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsChangePasswordModalOpen(false);
  };
  const handleSubmit = () => {
    setIsModalOpen(false);
    setIsChangePasswordModalOpen(false);
  };
  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));

  function formatDate(dateString) {
    const dateObject = new Date(dateString);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    const year = dateObject.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }
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
            </ul>
          </div>

          <div className="separator"></div>
          <div className="col-9">
            <div className="user-details">
              <h1>THÔNG TIN TÀI KHOẢN</h1>
              <p>Họ Và Tên: {dataLogin.tenKhachHang}</p>
              <p>Email: {dataLogin.email}</p>
              <p>Ngày sinh: {formatDate(dataLogin.ngaySinh)}</p>
              <p>Giới Tính: {dataLogin.gioiTinh === true ? 'Nam' : 'Nữ'}</p>
              <button onClick={handleUpdate}>Cập nhật</button>

              <Modal isOpen={isModalOpen} contentLabel="Update User Information" className="right-aligned-modal">
                <div className="modal-content">
                  <h2>Chỉnh sửa thông tin tài khoản</h2>
                  <form>
                    <div>
                      <label htmlFor="name">Họ Và Tên:</label>
                      <input type="text" id="name" />
                    </div>
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input type="text" id="email" />
                    </div>
                    <div>
                      <label htmlFor="birthdate">Ngày sinh:</label>
                      <input type="date" id="birthdate" />
                    </div>
                    <div>
                      <label htmlFor="gender">Giới Tính:</label>
                      <select id="gender">
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                      </select>
                    </div>
                  </form>
                  <br></br>
                  <div className="button1">
                    <button onClick={handleCloseModal}>Đóng</button>
                    <button onClick={handleSubmit}>Cập nhật</button>
                  </div>
                </div>
              </Modal>
            </div>
            <br></br>
            <br></br>
            <div className="user-details">
              <h1>THÔNG TIN ĐĂNG NHẬP</h1>
              <p>Email: {dataLogin.email}</p>
              <label htmlFor="password">Mật khẩu:</label>
              <div className="i">
                <input type="password" id="password" value={dataLogin.matKhau} required />
              </div>

              <br></br>
              <button onClick={handleCapNhat}>Cập nhật</button>
              <Modal
                isOpen={isChangePasswordModalOpen}
                contentLabel="Update User Information"
                className="right-aligned-modal" // Apply your CSS class here
              >
                <div className="modal-content">
                  <h2>ĐỔI MẬT KHẨU</h2>
                  <form>
                    <input type="password" placeholder="Mật Khẩu Cũ" />
                    <input type="password" placeholder="Mật Khẩu Mới" />
                    <input type="password" placeholder="Xác Nhận Mật Khẩu Mới" />
                  </form>
                  <br></br>
                  <div className="button1">
                    <button onClick={handleCloseModal}>Đóng</button>
                    <button onClick={handleSubmit}>Cập nhật</button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserAccount;
