import Anhuser from '../../assets/images/bieutuong.jpg';
import '../../scss/information.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { detailKH } from 'services/KhachHangService';
import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
function UserAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsChangePasswordModalOpen(false);
  };

  //đổi mật khẩu
  const handleCapNhat = () => {
    setIsChangePasswordModalOpen(true);
  };
  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));

  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    tenKhachHang: '',
    email: '',
    ngaySinh: '',
    gioiTinh: ''
  });

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    return formattedDate.toISOString().slice(0, 10);
  };

  const detail = async (id) => {
    const res = await detailKH(id);
    if (res) {
      const { ngaySinh, ...values } = res.data;
      setValues({
        ...values,
        ngaySinh: formatDate(ngaySinh)
      });
    }
    console.log(detail);
  };
  useEffect(() => {
    detail(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = async (event) => {
    setIsModalOpen(false);
    setIsChangePasswordModalOpen(false);
    event.preventDefault();
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
              <button
                className="mx-2"
                onClick={() => {
                  handleUpdate();
                  navigate(`/khachhang-info/${dataLogin.id}`);
                }}
              >
                Cập Nhật
              </button>

              <Modal isOpen={isModalOpen} contentLabel="Update User Information" className="right-aligned-modal">
                <div className="modal-content">
                  <h2>Chỉnh sửa thông tin tài khoản</h2>
                  <form>
                    <div>
                      <label htmlFor="name">Họ Và Tên:</label>
                      <input
                        type="text"
                        id="name"
                        value={values.tenKhachHang}
                        onChange={(e) => setValues({ ...values, tenKhachHang: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="text"
                        id="email"
                        value={values.email}
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="birthdate">Ngày sinh:</label>
                      <input
                        type="date"
                        id="birthdate"
                        value={values.ngaySinh}
                        onChange={(e) => setValues({ ...values, ngaySinh: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="gender">Giới Tính:</label>
                      <select
                        id="gender"
                        value={values.gioiTinh ? 'Nam' : 'Nữ'} // Sử dụng giá trị từ dataLogin
                        onChange={(e) => {
                          const newGender = e.target.value === 'Nam';
                          setValues({ ...values, gioiTinh: newGender }); // Cập nhật giới tính
                        }}
                      >
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
                    <button onClick={handleCapNhat}>Cập nhật</button>
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
