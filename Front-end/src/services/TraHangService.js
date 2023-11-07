import axios from '../custommize-axios';

const taoDonTraHang = (values) => {
  return axios.post(`/api/tra-hang/tao-don-tra-hang`, values);
};

export { taoDonTraHang };
