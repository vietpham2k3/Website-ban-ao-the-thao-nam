import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import '../../scss/ForgotPasswordModal.scss';
import { forgotPasswordKH } from 'services/ForgotPassword';

const ForgotPasswordModal = ({ show, onHide }) => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleResetPassword = () => {
    // Kiểm tra trường email rỗng
    if (!email) {
      setErrorMessage('Email không được bỏ trống.');
      setSuccessMessage('');
      return;
    }

    forgotPasswordKH(email)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage('Mật khẩu mới đã được gửi đến email của bạn.');
          setErrorMessage('');
        } else if (response.status === 404) {
          setErrorMessage('Email không tồn tại trong hệ thống.');
          setSuccessMessage('');
        }
      })
      .catch((error) => {
        console.error('Lỗi khi gọi API:', error);
        setErrorMessage('Email không tồn tại trong hệ thống.');
        setSuccessMessage('');
      });
  };

  const resetForm = () => {
    setEmail('');
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div className="custom">
      <Modal show={show}>
        <Modal.Header closeButton>
          <Modal.Title>Quên mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage ? (
            <p className="text-success">{successMessage}</p>
          ) : (
            <div>
              <p>Nhập địa chỉ email của bạn để đặt lại mật khẩu:</p>
              <input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmailChange} />
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {successMessage ? (
            <Button
              className="close-button"
              variant="secondary"
              onClick={() => {
                onHide();
                resetForm();
              }}
            >
              Đóng
            </Button>
          ) : (
            <div>
              <Button
                className="close-button"
                variant="secondary"
                onClick={() => {
                  onHide();
                  resetForm();
                }}
              >
                Đóng
              </Button>
              <Button className="submit-button" variant="primary" onClick={handleResetPassword}>
                Gửi yêu cầu
              </Button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ForgotPasswordModal;
