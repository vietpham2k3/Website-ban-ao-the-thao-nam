import Anhuser from '../../assets/images/bieutuong.jpg';
import '../../scss/information.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';
import React, { useState } from 'react';
import Modal from 'react-modal';

function DiaChi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
              <h1>Địa Chỉ Của Tôi</h1> <button onClick={handleOpenModal}>Thêm Địa Chỉ Mới</button>
              <br></br>
              <br></br>
              <h4>Sổ Địa Chỉ</h4>
              <p>Đỗ Mạnh Hùng</p>
              <p>Giới Tính: Huyện Thạch Thất, Hà Nội</p>
              <Modal isOpen={isModalOpen} contentLabel="Địa chỉ" className="modal">
                <h2>Biểu mẫu Địa chỉ</h2>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="u">Chọn Quận/Huyện:</label>
                  <select name="district">
                    {/* {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))} */}
                  </select>

                  <label htmlFor="i">Chọn Thành phố:</label>
                  <select name="city">
                    {/* {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))} */}
                  </select>

                  <button type="submit">Lưu địa chỉ</button>
                  <button type="button" onClick={handleCancel}>
                    Hủy
                  </button>
                </form>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DiaChi;
