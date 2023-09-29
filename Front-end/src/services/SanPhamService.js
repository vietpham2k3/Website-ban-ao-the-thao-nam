// import axios from 'axios'
import axios from '../custommize-axios';

const getAllCTSP = (page) => {
  return axios.get(`/api/chi-tiet-san-pham/getAll?page=${page}`);
};

const postCTSP = (values) => {
  return axios.post('/api/chi-tiet-san-pham/add', values);
};

const putCTSP = (id, values) => {
  return axios.put('/api/chi-tiet-san-pham/update/' + id, values);
};

const searchCO = (key, page) => {
  return axios.get(`/api/chi-tiet-san-pham/search?key=${key}&page=${page}`);
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
  return axios.get(`/api/nha-san-xuat/getAll`);
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
const getAllMSKCCTSP = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/getAllMSKCCTSP/${id}`);
};
const addAllMSKCCTSP = (values) => {
  return axios.post('/api/chi-tiet-san-pham/addAllMSKCCTSP', values);
};

const deleteMSKCCTSP = (id) => {
  return axios.delete(`/api/chi-tiet-san-pham/deleteAllMSKCCTSP/${id}`);
};

const putMSKCCTSP = (id, values) => {
  return axios.put('/api/chi-tiet-san-pham/updateAllMSKCCTSP/' + id, values);
};

const detailMSKCCTSP = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/detailMSKCCTSP/${id}`);
};
export {
  getAllCTSP,
  getAllListKC,
  detailMSKCCTSP,
  addAllMSKCCTSP,
  putMSKCCTSP,
  getAllMSKCCTSP,
  listAnh,
  addAnh,
  postCTSP,
  deleteAnh,
  putCTSP,
  deleteMSKCCTSP,
  searchCO,
  detailCTSP,
  getAllListCO,
  getAllListCL,
  getAllListMS,
  getAllListLSP,
  getAllListNSX
};
