import axios from '../custommize-axios';

const getAllPageHL = (page) => {
  return axios.get(`/api/hang-loi/getAll?page=${page}`);
};

export { getAllPageHL };
