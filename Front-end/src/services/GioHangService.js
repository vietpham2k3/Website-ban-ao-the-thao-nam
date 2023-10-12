import axios from '../custommize-axios';

const postGH = (values) => {
  return axios.post('/api/gio-hang/tao-hoa-don', values);
};

const deleteByIdHD = (id) => {
  return axios.delete(`/api/gio-hang/delete/${id}`);
};

const addKhuyenMai = (values) => {
  return axios.post('/api/gio-hang/add-km', values);
};

export { postGH, deleteByIdHD, addKhuyenMai };
