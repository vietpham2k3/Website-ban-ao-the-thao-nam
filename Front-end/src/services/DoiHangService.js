import axios from '../custommize-axios';

const taoDonTraHang = (values) => {
  return axios.post(`/api/tra-hang/tao-don-tra-hang`, values);
};

const getAll = (id) => {
  return axios.get(`/api/doi-hang/getAll/${id}`);
};

const update = (values) => {
  return axios.put(`/api/doi-hang/update`, values);
};

const yeuCauTraHang = (id, values) => {
  return axios.post(`/api/tra-hang/yeu-cau-tra-hang/${id}`, values);
};

export { taoDonTraHang, update, yeuCauTraHang, getAll };
