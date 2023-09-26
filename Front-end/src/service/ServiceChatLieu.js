import axios from "../custommize-axios";

const fetchAll = () => {
  return axios.get(`/api/chatlieu/getAll`);
};
const fetchAllList = (page) => {
  return axios.get(`/api/chatlieu?page=${page}`);
};

const postCreate = (values) => {
  return axios.post("/api/chatlieu/add", values);
};

const putUpdateCL = (id, values) => {
  return axios.put("/api/chatlieu/update/" + id, values);
};

const deleteCL = (id) => {
  return axios.delete(`/api/chatlieu/delete/${id}`);
};

const searchCL = (key, page) => {
  return axios.get(`/api/chatlieu/search?page=${page}&key=${key}`);
};

export { fetchAll, fetchAllList, postCreate, putUpdateCL, deleteCL, searchCL };
