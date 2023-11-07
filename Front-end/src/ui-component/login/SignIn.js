/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { detailGH } from 'services/GioHangService';
import { login } from 'services/LoginService';

// eslint-disable-next-line react/prop-types
function SignInForm(props) {
  const navigate = useNavigate();
  const { setState, state, openForgotPasswordModal } = props;

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const dangNhap = async (email, password) => {
    const res = await login(email, password);
    if (res.data === 'Not found') {
      toast.error('Sai tài khoản hoặc mật khẩu');
      return;
    }
    if (res.data.role === 'KH') {
      navigate('/trang-chu');
      toast.success('Đăng nhập thành công');
      localStorage.setItem('dataLogin', JSON.stringify(res.data));
      detail(res.data.id);
    } else if (res.data.role === 'NV') {
      navigate('/ban-hang-tai-quay');
      toast.success('Đăng nhập thành công');
      localStorage.setItem('dataLoginNV', JSON.stringify(res.data));
    } else {
      navigate('/thong-ke');
      toast.success('Đăng nhập thành công');
      localStorage.setItem('dataLoginAD', JSON.stringify(res.data));
    }
    console.log(res);
  };

  const detail = async (id) => {
    const res = await detailGH(id);
    if (res.data) {
      localStorage.setItem('idGH', res.data.id);
    }
  };

  const handleOnSubmit = () => {
    dangNhap(state.email, state.password);
  };

  return (
    <div className="form-container sign-in-container">
      <div className="frm">
        <h1 id="title">Đăng nhập</h1>
        <input className="ipt" type="email" placeholder="Email" name="email" value={state.email} onChange={handleChange} />
        <input className="ipt" type="password" name="password" placeholder="Password" value={state.password} onChange={handleChange} />
        <a onClick={openForgotPasswordModal} className="text-forgot">
          Quên mật khẩu?
        </a>
        <button className="button-login" onClick={handleOnSubmit}>
          Đăng nhập
        </button>
      </div>
    </div>
  );
}

export default SignInForm;
