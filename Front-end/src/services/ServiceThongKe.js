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

const doanhThuTQTheoNgay = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tai-quay-ngay-hien-tai`);
};

const doanhThuTQTheoThang = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tai-quay-thang-hien-tai`);
};

const doanhThuTQTheoNam = () => {
  return axios.get(`/api/thong-ke/doanh-thu-tai-quay-nam-hien-tai`);
};

const doanhThuOnlineTheoNgay = () => {

  return axios.get(`/api/thong-ke/doanh-thu-online-ngay-hien-tai`);
};

const doanhThuOnineTheoThang = () => {
  return axios.get(`/api/thong-ke/doanh-thu-online-thang-hien-tai`);
};

const doanhThuOnlineTheoNam = () => {
  return axios.get(`/api/thong-ke/doanh-thu-online-nam-hien-tai`);
};

export {
  doanhThuTongTheoNgay,
  doanhThuTongTheoThang,
  doanhThuTongTheoNam,
  doanhThuOnineTheoThang,
  doanhThuOnlineTheoNam,
  doanhThuOnlineTheoNgay,
  doanhThuTQTheoNam,
  doanhThuTQTheoNgay,
  doanhThuTQTheoThang
};
