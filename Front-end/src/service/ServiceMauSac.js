import axios from "../custommize-axios"

const getAllPageMS = (page) => {
    return axios.get(`/api/mau-sac/hien-thi-page?page=${page}`)
}

const getAllMS = () => {
    return axios.get("/api/mau-sac/hien-thi")
}

const postMS = (values) => {
    return axios.post("/add", values)
}

const putMS = (id, values) => {
    return axios.put("/update/" + id, values)
}

const deleteMS = (id) => {
    return axios.put(`/api/mau-sac/delete/` + id)
}

const searchMS = (key, page) => {
    return axios.get(`/api/mau-sac/hien-thi-page-search?key=${key}&page=${page}`);
  };

export { getAllPageMS, getAllMS, searchMS, deleteMS, postMS, putMS }