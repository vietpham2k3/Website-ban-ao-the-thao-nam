import axios from '../custommize-axios';

const doanhThuTongTheoNgay = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tong-ngay-hien-tai`);
};

const doanhThuTongTheoThang = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tong-thang-hien-tai`);
};

const doanhThuTongTheoNam = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tong-nam-hien-tai`);
};

export { doanhThuTongTheoNgay, doanhThuTongTheoThang, doanhThuTongTheoNam };
