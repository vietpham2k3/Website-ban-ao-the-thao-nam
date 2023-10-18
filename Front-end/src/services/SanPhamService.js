// import axios from 'axios'
import axios from '../custommize-axios';

const getAll = () => {
  return axios.get('/api/chi-tiet-san-pham/getAllCTSP?sort=ngay_tao,desc');
};

const getAllBestseller = () => {
  return axios.get('/api/chi-tiet-san-pham/getAllBestseller');
};

const getAllSPNEW = () => {
  return axios.get('/api/chi-tiet-san-pham/getAllSPNEW');
};

const getAllCTSPWeb = (page) => {
  return axios.get(`/api/chi-tiet-san-pham/getAllWeb?page=${page}`);
};

const getAllProduct = () => {
  return axios.get('/api/chi-tiet-san-pham/getAllProduct');
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

const getAllByIdSPTT = (id) => {
  return axios.get(`/api/chi-tiet-san-pham/getAllByIdSPTT/${id}`);
};

const updateSL = (id, soLuong) => {
  return axios.put(`/api/chi-tiet-san-pham/update-sl-sp/${id}?soLuong=${soLuong}`);
};

// const locCTSP = (mauSac, kichCo, chatLieu, coAo, nhaSanXuat, page) => {
//   // Xác minh và mã hóa các tham số để tránh lỗi khi chúng không có giá trị
//   const params = new URLSearchParams();
//   if (mauSac) params.append('mauSac', mauSac);
//   if (kichCo) params.append('kichCo', kichCo);
//   if (chatLieu) params.append('chatLieu', chatLieu);
//   if (coAo) params.append('coAo', coAo);
//   if (nhaSanXuat) params.append('nhaSanXuat', nhaSanXuat);

//   // Thực hiện cuộc gọi API sử dụng các tham số đã xác minh
//   return axios.get(`/api/chi-tiet-san-pham/locCTSP?page=${page}`, { params });
// };

// const locCTSP = (mauSac, kichCo, chatLieu, coAo, nhaSanXuat, page) => {
//   // Xác minh và mã hóa các tham số để tránh lỗi khi chúng không có giá trị
//   const params = new URLSearchParams();
//   if (mauSac) params.append('mauSac', mauSac);
//   if (kichCo) params.append('kichCo', kichCo);
//   if (chatLieu) params.append('chatLieu', chatLieu);
//   if (coAo) params.append('coAo', coAo);
//   if (nhaSanXuat) params.append('nhaSanXuat', nhaSanXuat);
  
//   // Thêm tham số page vào URL truy vấn
//   params.append('page', page);

//   // Thực hiện cuộc gọi API sử dụng các tham số đã xác minh
//   return axios.get('/api/chi-tiet-san-pham/locCTSP', { params });
// };

const locCTSP = (filters, page) => {
  // Tạo một đối tượng params để lưu trữ tất cả các tham số truy vấn
  const params = {};

  // Duyệt qua các bộ lọc và thêm chúng vào đối tượng params nếu chúng tồn tại
  if (filters.mauSac) params.mauSac = filters.mauSac;
  if (filters.kichCo) params.kichCo = filters.kichCo;
  if (filters.chatLieu) params.chatLieu = filters.chatLieu;
  if (filters.coAo) params.coAo = filters.coAo;
  if (filters.nhaSanXuat) params.nhaSanXuat = filters.nhaSanXuat;
  if (filters.minGiaBan) params.minGiaBan = filters.minGiaBan;
  if (filters.maxGiaBan) params.maxGiaBan = filters.maxGiaBan;

  // Thêm tham số page vào đối tượng params
  params.page = page;

  // Thực hiện cuộc gọi API sử dụng các tham số đã được xác định
  return axios.get('/api/chi-tiet-san-pham/locCTSP', { params });
};



export {
  getAll,
  updateSL,
  deleteMSKC,
  getAllByIdSPTT,
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
  getAllSPNEW,
  getAllBestseller,
  getAllProduct,
  getAllCTSPWeb,
  locCTSP
};
