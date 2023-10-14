import axios from '../custommize-axios';

const getAllPageDH = (page) => {
  return axios.get(`/api/hoa-don/hien-thi-page?page=${page}`);
};

const findVIP = (key, tuNgay, denNgay, trangThai, loaiDon, page) => {
  return axios.get(`/api/hoa-don/hien-thi-page-find?key=${key}&tuNgay=${tuNgay}&denNgay=${denNgay}
  &trangThai=${trangThai}&loaiDon=${loaiDon}&page=${page}`);
};

const getAllHD = () => {
  return axios.get('/api/hoa-don/hien-thi');
};

const getAllSP = () => {
  return axios.get('/api/hoa-don/hien-thi-san-pham');
};

const getAllKH = () => {
  return axios.get('/api/hoa-don/getAll');
};

const getAllKCByIdMSAndIdSP = (idMS, idSP) => {
  return axios.get(`/api/hoa-don/getAllKCByIdMSAndIdSP/${idMS}/${idSP}`);
};

const findAllAnhByIdMSAndIdSP = (idMS, idSP) => {
  return axios.get(`/api/hoa-don/findAllAnhByIdMSAndIdSP/${idMS}/${idSP}`);
};

const getAllMSByIdSP = (id) => {
  return axios.get(`/api/hoa-don/getAllMSByIdSP/${id}`);
};

const searchCTSPofDH = (key) => {
  return axios.get(`/api/hoa-don/searchSP?key=${key}`);
};

const searchKHofDH = (key) => {
  return axios.get(`/api/hoa-don/searchKHinBH?key=${key}`);
};

const detailHD = (id) => {
  return axios.get(`/api/hoa-don/detail/` + id);
};

const detailLSHD = (id) => {
  return axios.get(`/api/hoa-don/hien-thi-list-lshd/` + id);
};

const addKH2 = (id, values) => {
  return axios.post(`/api/hoa-don/addKHinBH/` + id, values);
};

const updateKHDH = (id, values) => {
  return axios.put(`/api/hoa-don/updateKH/` + id, values);
};

const xacNhanDH = (id, values) => {
  return axios.post(`/api/hoa-don/xac-nhan/` + id, values);
};

const huyDonHang = (id, values) => {
  return axios.post(`/api/hoa-don/huy-don/` + id, values);
};

const xacNhanListIds = (values) => {
  return axios.post(`/api/hoa-don/xac-nhan`, values);
};

const huyDonListIds = (values) => {
  return axios.post(`/api/hoa-don/huy-don`, values);
};

const xacNhanGiao = (id, values) => {
  return axios.post(`/api/hoa-don/xac-nhan-giao-hang/` + id, values);
};

const xacNhanThanhToan = (id, values) => {
  return axios.post(`/api/hoa-don/xac-nhan-thanh-toan/` + id, values);
};

const addHD = () => {
  return axios.post('/api/hoa-don/add', {});
};

const getById = (id) => {
  return axios.get(`/api/hoa-don/getById/${id}`);
};

const addSP = (values) => {
  return axios.post(`/api/hoa-don/add-sp`, values);
};

const updateSL = (id, values) => {
  return axios.put(`/api/hoa-don/update-sl/${id}`, values);
};

const getALLTT = (id, idSP) => {
  return axios.get(`/api/api/hoa-don/getAllTT?id=${id}&idSP=${idSP}`);
};

const deleteHDCT = (id) => {
  return axios.delete(`/api/hoa-don/delete-hdct/${id}`);
};

const updateHD = (id, values) => {
  return axios.put(`/api/hoa-don/update-hd/${id}`, values);
};

const getKmById = (id) => {
  return axios.get(`/api/hoa-don/getKmById/${id}`);
};

const addKM = (values) => {
  return axios.post(`/api/hoa-don/addKM`, values);
};

const thanhToan = (id) => {
  return axios.put(`/api/hoa-don/thanh-toan/${id}`);
};

// const searchMS = (key,trangThai, page) => {
//     return axios.get(`/api/mau-sac/hien-thi-page-search?key=${key}&trangThai=${trangThai}&page=${page}`);
//   };

export {
  getAllHD,
  thanhToan,
  updateHD,
  addKM,
  getKmById,
  getAllPageDH,
  xacNhanThanhToan,
  xacNhanGiao,
  huyDonHang,
  updateKHDH,
  detailLSHD,
  detailHD,
  addHD,
  getById,
  addSP,
  findVIP,
  getALLTT,
  updateSL,
  deleteHDCT,
  xacNhanDH,
  getAllSP,
  searchCTSPofDH,
  getAllKCByIdMSAndIdSP,
  getAllMSByIdSP,
  getAllKH,
  searchKHofDH,
  addKH2,
  xacNhanListIds,
  huyDonListIds,
  findAllAnhByIdMSAndIdSP
};
