import axios from '../custommize-axios';

const login = (email, password) => {
  return axios.post(`/api/login?email=${email}&matKhau=${password}`);
};

const loginGoogle = (value) => {
  return axios.post(`/api/loginGoogle`, value);
};

const SignUp = (data) => {
  return axios.post(`/api/SignUp`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export { login, SignUp, loginGoogle };
