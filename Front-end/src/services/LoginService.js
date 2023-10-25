import axios from '../custommize-axios';

const login = (email, password) => {
  return axios.post(`/api/login?email=${email}&matKhau=${password}`);
};

export { login };
