// import axios from 'axios'
import axios from '../custommize-axios';

const getAll = () => {
  return axios.get('/api/chi-tiet-san-pham/getAllCTSP?sort=ngay_tao,desc');
};

const getAllSPNEW = () => {
  return axios.get('/api/chi-tiet-san-pham/getAllSPNEW');
};

const getAllCTSP = (page) => {
  return axios.get(`/api/chi-tiet-san-pham/getAll?page=${page}`);
};

const postCTSP = (values) => {
  return axios.post('/api/chi-tiet-san-pham/add', values);
};

const putCTSP = (id, values) => {
  return axios.put('/api/chi-tiet-san-pham/update/' + id, values);
};

const deleteCTSP = (id) => {
  return axios.put('/api/chi-tiet-san-pham/delete/' + id);
};

const deleteMSKC = (id) => {
  return axios.put('/api/chi-tiet-san-pham/deleteMSKC/' + id);
};

const searchCTSP = (key, trangThai, min, max, page) => {
  return axios.get(`/api/chi-tiet-san-pham/search?key=${key}&trangThai=${trangThai}&min=${min}&max=${max}&page=${page}`);
};

const detailCTSP = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/detail/${id}`);
};

const getAllListCO = () => {
  return axios.get(`/api/co-ao/getAll`);
};

const getAllListCL = () => {
  return axios.get(`/api/chatlieu/getAll`);
};

const getAllListKC = () => {
  return axios.get(`/api/kich-co/getAll`);
};

const getAllListMS = () => {
  return axios.get(`/api/mau-sac/hien-thi`);
};

const getAllListLSP = () => {
  return axios.get(`/api/loai-san-pham/getAll`);
};

const getAllListNSX = () => {
  return axios.get(`/api/nha-san-xuat/hien-thi`);
};
const addAnh = (values) => {
  return axios.post('/api/chi-tiet-san-pham/upload', values);
};

const listAnh = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/view-all-image/${id}`);
};

const deleteAnh = (id) => {
  return axios.delete(`/api/chi-tiet-san-pham/delete-img/${id}`);
};

const getAllByIdSP = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/getAllByIdSP/${id}`);
};

export {
  getAll,
  deleteMSKC,
  getAllByIdSP,
  getAllCTSP,
  getAllListKC,
  deleteCTSP,
  listAnh,
  addAnh,
  postCTSP,
  deleteAnh,
  putCTSP,
  searchCTSP,
  detailCTSP,
  getAllListCO,
  getAllListCL,
  getAllListMS,
  getAllListLSP,
  getAllListNSX,
  getAllSPNEW
};
