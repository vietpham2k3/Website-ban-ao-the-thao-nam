import axios from "../custommize-axios"

const getAllPageDH = (page) => {
    return axios.get(`/api/hoa-don/hien-thi-page?page=${page}`)
}

const getAllHD = () => {
    return axios.get("/api/hoa-don/hien-thi")
}

const detailMS = (id) => {
    return axios.get(`/api/mau-sac/detail/` + id)
}

const postMS = (values) => {
    return axios.post("/api/mau-sac/add", values)
}

const putMS = (id, values) => {
    return axios.put(`/api/mau-sac/update/` + id, values)
}

const deleteMS = (id, values) => {
    return axios.put(`/api/mau-sac/delete/` + id, values)
}

const searchMS = (key,trangThai, page) => {
    return axios.get(`/api/mau-sac/hien-thi-page-search?key=${key}&trangThai=${trangThai}&page=${page}`);
  };

export { getAllHD, getAllPageDH, searchMS, postMS, putMS, detailMS  }