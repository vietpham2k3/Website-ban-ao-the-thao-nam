// import axios from 'axios'
import axios from '../custommize-axios';

const getAllCTSP = (page) => {
  return axios.get(`/api/chi-tiet-san-pham/getAll?page=${page}`);
};

const postCO = (values) => {
  return axios.post('/api/chi-tiet-san-pham/add', values);
};

const putCO = (id, values) => {
  return axios.put('/api/chi-tiet-san-pham/update/' + id, values);
};

const deleteCO = (id) => {
  return axios.delete(`/api/chi-tiet-san-pham/delete/${id}`);
};

const searchCO = (key, page) => {
  return axios.get(`/api/chi-tiet-san-pham/search?key=${key}&page=${page}`);
};

const detailCO = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/detail/${id}`);
};

const getAllListCO = () => {
  return axios.get(`/api/chi-tiet-san-pham/getAllList`);
};

export { getAllCTSP, postCO, putCO, deleteCO, searchCO, detailCO, getAllListCO };
