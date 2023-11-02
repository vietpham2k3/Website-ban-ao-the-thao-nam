/* eslint-disable react-hooks/exhaustive-deps */

import '../../scss/information.scss';
import Header from 'ui-component/trangchu/Header';
import Footer from 'ui-component/trangchu/Footer';
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

import { changePassword, detailKH, updateInfo, checkCurrentPassword } from 'services/KhachHangService';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SlideBar from 'layout/SlideBar';

function UserAccount() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleUpdate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/thong-tin_user');
  };
  const handleCloseModalmk = () => {
    setIsChangePasswordModalOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    navigate('/thong-tin_user');
  };

  const handleCapNhat = () => {
    setIsChangePasswordModalOpen(true);
  };

  const dataLogin = JSON.parse(localStorage.getItem('dataLogin'));

  const navigate = useNavigate();

  const [values, setValues] = useState({
    tenKhachHang: '',
    email: '',
    ngaySinh: '',
    gioiTinh: null,
    matKhau: ''
  });

  const handleGenderChange = (newValue) => {
    setValues({ ...values, gioiTinh: newValue });
  };
  function formatDate(date) {
    const dateObject = new Date(date);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0, cần cộng thêm 1
    const year = dateObject.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }
  const { id } = useParams();
  const detail = async (id) => {
    const res = await detailKH(id);
    if (res) {
      const { ngaySinh, ...values } = res.data;
      setValues({
        ...values,
        ngaySinh: formatDate(ngaySinh)
      });
    }
  };

  useEffect(() => {
    detail(dataLogin.id);
  }, [dataLogin.id]);

  const put = async (id, value) => {
    const res = await updateInfo(id, value);
    if (res) {
      toast.success('Cập nhật thành công !');
      navigate('/thong-tin_user');
    }

    setIsModalOpen(false);
  };
  const handlePasswordUpdate = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Mật khẩu mới và xác nhận mật khẩu mới không khớp');
      return;
    }

    try {
      const userId = dataLogin.id;
      const isCurrentPasswordValidResponse = await checkCurrentPassword({
        id: userId,
        currentPassword
      });

      if (isCurrentPasswordValidResponse.data === false) {
        toast.error('Mật khẩu hiện tại không hợp lệ');
        return;
      }

      if (newPassword === currentPassword) {
        toast.error('Mật khẩu mới không được trùng với mật khẩu cũ');
        return;
      }

      const passwordUpdateData = {
        currentPassword,
        newPassword,
        confirmPassword: confirmPassword
      };

      const passwordUpdateResponse = await changePassword(userId, passwordUpdateData);

      if (passwordUpdateResponse) {
        toast.success('Mật khẩu đã được cập nhật thành công');
        setIsChangePasswordModalOpen(false);
        navigate('/thong-tin_user');
        window.location.reload();
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error('Mật khẩu hiện tại không hợp lệ');
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    put(id, values);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row slide-bar">
          <div className="col-2 slide-bar-children">
            <SlideBar></SlideBar>
          </div>

          <div className="separator"></div>
          <div className="col-9">
            <div className="user-details">
              <h1>THÔNG TIN TÀI KHOẢN</h1>
              <p>Họ Và Tên: {values.tenKhachHang}</p>
              <p>Email: {values.email}</p>
              <p>Ngày sinh: {formatDate(values.ngaySinh)}</p>
              <p>
                Giới Tính:{' '}
                {values.gioiTinh === true ? 'Nam' : values.gioiTinh === false ? 'Nữ' : values.gioiTinh === null ? 'Không xác định' : ''}
              </p>

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
                        id="tenKhachHang"
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
                        id="ngaySinh"
                        value={values.ngaySinh}
                        onChange={(e) => setValues({ ...values, ngaySinh: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="gioiTinh">Giới Tính:</label>
                      <div>
                        <select
                          id="gioiTinh"
                          value={values.gioiTinh === true ? 'Nam' : values.gioiTinh === false ? 'Nữ' : 'null'}
                          onChange={(e) => handleGenderChange(e.target.value === 'null' ? null : e.target.value === 'Nam')}
                        >
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                          <option value="null">Không xác định</option>
                        </select>
                      </div>
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
              <p>Email: {values.email}</p>

              <label htmlFor="password" className="password-label">
                Mật khẩu:
              </label>
              <div className="i">
                <input type="password" id="password" value={values.matKhau} className="password-input" required />
              </div>

              <br></br>
              <button
                onClick={() => {
                  handleCapNhat();
                  navigate(`/khachhang-doiMatKhau/${dataLogin.id}`);
                }}
              >
                Cập nhật
              </button>
              <Modal
                isOpen={isChangePasswordModalOpen}
                contentLabel="Update User Information"
                className="right-aligned-modal" // Apply your CSS class here
              >
                <div className="modal-content">
                  <h2>ĐỔI MẬT KHẨU</h2>
                  <form>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Mật Khẩu Cũ"
                    />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mật Khẩu Mới"
                    />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Xác Nhận Mật Khẩu Mới"
                    />
                  </form>
                  <br></br>
                  <div className="button1">
                    <button onClick={handleCloseModalmk}>Đóng</button>
                    <button onClick={handlePasswordUpdate}>Cập nhật</button>
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
