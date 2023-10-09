import axios from '../custommize-axios';

const postGH = (values) => {
  return axios.post('/api/gio-hang', values);
};
export { postGH };
