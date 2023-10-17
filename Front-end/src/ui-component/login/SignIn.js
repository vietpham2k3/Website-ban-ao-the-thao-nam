import React from 'react';
function SignInForm() {
  const [state, setState] = React.useState({
    email: '',
    password: ''
  });
  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: ''
      });
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit} className="frm">
        <h1 id="title">Đăng nhập</h1>
        <input className="ipt" type="email" placeholder="Email" name="email" value={state.email} onChange={handleChange} />
        <input className="ipt" type="password" name="password" placeholder="Password" value={state.password} onChange={handleChange} />
        <a href="#" className="text-forgot">
          Quên mật khẩu?
        </a>
        <button className="button-login">Đăng nhập</button>
      </form>
    </div>
  );
}

export default SignInForm;
