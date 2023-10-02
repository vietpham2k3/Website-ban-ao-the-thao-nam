import axios from '../custommize-axios';

const getAllPageDH = (page) => {
  return axios.get(`/api/hoa-don/hien-thi-page?page=${page}`);
};

const findVIP = (key, tuNgay, denNgay, minSL, maxSL, minTT, maxTT, trangThai, loaiDon, page) => {
  return axios.get(`/api/hoa-don/hien-thi-page-find?key=${key}&tuNgay=${tuNgay}&denNgay=${denNgay}
  &trangThai=${trangThai}&loaiDon=${loaiDon}&minSL=${minSL}&maxSL=${maxSL}&minTT=${minTT}&maxTT=${maxTT}&page=${page}`);
};

const getAllHD = () => {
  return axios.get('/api/hoa-don/hien-thi');
};

const detailHD = (id) => {
  return axios.get(`/api/hoa-don/detail/` + id);
};

const detailLSHD = (id) => {
  return axios.get(`/api/hoa-don/hien-thi-list-lshd/` + id);
};

const printExcel = (values) => {
  return axios.get('/api/hoa-don/print-excel', values);
};

const updateKHDH = (id, values) => {
  return axios.put(`/api/hoa-don/updateKH/` + id, values);
};

const addHD = () => {
  return axios.post('/api/hoa-don/add', {});
};

const getById = (id) => {
  return axios.get(`/api/hoa-don/getById/${id}`);
};

const addSP = (id, values) => {
  return axios.post(`/api/hoa-don/add-sp/${id}`, values);
};

const getALLTT = (id, idSP) => {
  return axios.get(`/api/api/hoa-don/getAllTT?id=${id}&idSP=${idSP}`);
};

// const searchMS = (key,trangThai, page) => {
//     return axios.get(`/api/mau-sac/hien-thi-page-search?key=${key}&trangThai=${trangThai}&page=${page}`);
//   };

export { getAllHD, getAllPageDH, printExcel, updateKHDH, detailLSHD, detailHD, addHD, getById, addSP, findVIP, getALLTT };
