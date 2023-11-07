import axios from '../custommize-axios';

const taoDonTraHang = (values) => {
  return axios.post(`/api/tra-hang/tao-don-tra-hang`, values);
};

const update = (values) => {
  return axios.put(`/api/tra-hang/update`, values);
};

const yeuCauTraHang = (id, values) => {
  return axios.post(`/api/tra-hang/yeu-cau-tra-hang/${id}`, values);
};

export { taoDonTraHang, update, yeuCauTraHang };
