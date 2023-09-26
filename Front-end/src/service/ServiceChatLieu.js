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

const putUpdateUser = (id, values) => {
  return axios.put("/api/chatlieu/update/" + id, values);
};

const deleteUser = (id) => {
  return axios.delete(`/api/chatlieu/delete/${id}`);
};

const searchUser = (key, page) => {
  return axios.get(`/api/chatlieu/search?page=${page}&key=${key}`);
};

export { fetchAll, fetchAllList, postCreate, putUpdateUser, deleteUser, searchUser };
