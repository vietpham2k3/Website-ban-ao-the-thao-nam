import axios from '../custommize-axios';

const getAllPageHL = (page) => {
  return axios.get(`/api/hang-loi/getAll?page=${page}`);
};
const search = (key, page) => {
  return axios.get(`/api/hang-loi/search?key=${key}&page=${page}`);
};

export { getAllPageHL, search };
