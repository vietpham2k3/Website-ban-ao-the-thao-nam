import React from 'react';
function SignUpForm() {
  const [state, setState] = React.useState({
    name: '',
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

    const { name, email, password } = state;
    alert(`You are sign up with name: ${name} email: ${email} and password: ${password}`);

    for (const key in state) {
      setState({
        ...state,
        [key]: ''
      });
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit} className="frm">
        <h1 id="title">Đăng ký</h1>
        <input className="ipt" type="text" name="name" value={state.name} onChange={handleChange} placeholder="Name" />
        <input className="ipt" type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" />
        <input className="ipt" type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" />
        <button className="button-login">Đăng ký</button>
      </form>
    </div>
  );
}

export default SignUpForm;
