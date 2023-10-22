import Anhuser from '../../assets/images/bieutuong.jpg';
import '../../scss/diachi.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';
import React, { useState } from 'react';
import Modal from 'react-modal';

function DiaChi() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAddress, setNewAddress] = useState({});

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress({ ...newAddress, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the submission of the new address, e.g., send it to the server
    console.log('New Address:', newAddress);

    // Close the modal
    handleCloseModal();
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
              <h1>Địa Chỉ Của Tôi</h1>
              <div className="button2">
                <button onClick={handleOpenModal}>Thêm Địa Chỉ Mới</button>
              </div>
              <br></br>
              <br></br>
              <h4>Sổ Địa Chỉ</h4>
              <p>Đỗ Mạnh Hùng</p>
              <p> Huyện Thạch Thất, Hà Nội</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <Modal isOpen={isModalOpen} contentLabel="Update User Information" className="right-aligned-modal" shouldCloseOnOverlayClick={true}>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="modal-content">
          <h2>Thêm Địa Chỉ Mới</h2>

          <form onSubmit={handleSubmit}>
            <div className="input1">
              <div>
                <label htmlFor="name">Tên:</label>
                <input type="text" id="name" name="name" onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="sdt">Số Điện Thoại:</label>
                <input type="text" id="sdt" name="sdt" onChange={handleInputChange} />
              </div>
              <div>
                <label htmlFor="address">Địa chỉ:</label>
                <input type="text" id="address" name="address" onChange={handleInputChange} />
              </div>
              <div>
                <div>
                  <label htmlFor="province">Tỉnh/Thành Phố:</label>
                  <select id="province" name="province" onChange={handleInputChange}>
                    <option value="province1">Chọn Tỉnh/Thành</option>
                    <option value="province1">Province 1</option>
                    <option value="province2">Province 2</option>
                    <option value="province3">Province 3</option>
                  </select>
                </div>
                <label htmlFor="district">Quận/Huyện:</label>
                <select id="district" name="district" onChange={handleInputChange}>
                  <option value="district1">Chọn Quận/Huyện</option>
                  <option value="district2">District 2</option>
                  <option value="district3">District 3</option>
                </select>
              </div>

              <div>
                <label htmlFor="country">Phường/Xã:</label>
                <select id="country" name="country" onChange={handleInputChange}>
                  <option value="country1">Chọn Phường/Xã</option>
                  <option value="country2">Country 2</option>
                  <option value="country3">Country 3</option>
                </select>
              </div>

              <br></br>
              <div>
                <div className="button3">
                  <button type="submit">Lưu Địa Chỉ</button>
                  <div className="button4">
                    <button onClick={handleCloseModal}>Đóng</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default DiaChi;
