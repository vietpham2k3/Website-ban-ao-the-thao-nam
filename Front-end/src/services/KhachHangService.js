import axios from '../custommize-axios';

const getAllPageKH = (page) => {
  return axios.get(`/api/khach-hang/getAllPage?page=${page}`);
};

const getAllKH = (id) => {
  return axios.get('/api/khach-hang/getAll' + id);
};

const addKH = (values) => {
  return axios.post('/api/khach-hang/add', values);
};

const deleteKH = (id) => {
  return axios.put(`http://localhost:8080/api/khach-hang/delete/${id}`);
};

const updateKH = (id, values) => {
  return axios.put('/api/khach-hang/update/' + id, values);
};

const detailKH = (id) => {
  return axios.get('/api/khach-hang/detail/' + id);
};

const searchKh = (key, trangThai, page) => {
  return axios.get(`/api/khach-hang/searchKH?key=${key}&trangThai=${trangThai}&page=${page}`);
};

export { getAllKH, addKH, deleteKH, detailKH, updateKH, getAllPageKH, searchKh };
