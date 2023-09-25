// import axios from "axios"
import axios from "./custommize-axios"

const fetchAll = (page) => {
    return axios.get(`/?page=${page}`)
}

const postCreate = (values) => {
    return axios.post("/add", values)
}

const putUpdateUser = (id, values) => {
    return axios.put("/update/" + id, values)
}

const deleteUser = (id) => {
    return axios.delete(`delete/` + id)
}

const searchUser = (key, page) => {
    return axios.get(`search?page=${page}&key=${key}`)
}

export { fetchAll, postCreate, putUpdateUser, deleteUser, searchUser }