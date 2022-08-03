import axios from "../axios";

const handleLogin = (email, password) => {
    console.log(email, password)
    return axios.post('/api/login', { email, password })
}

const handleGetAllUser = (inputId) => {
    return axios.get(`/api/get-all-user?id=${inputId}`)
}

const handleCreateNewUser = (data) => {
    return axios.post('/api/create-new-user', data)
}

const handleDeleteNewUser = (userId) => {
    return axios.delete(`/api/delete-user?id=${userId}`)
}

const handleUpdateNewUser = (editData) => {
    return axios.put('/api/update-user', editData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/get-all-code?type=${inputType}`)
}

const getCategory = () => {
    return axios.get('/api/get-category')
}

export {
    handleLogin, getAllCodeService, getCategory, handleGetAllUser,
    handleCreateNewUser, handleDeleteNewUser, handleUpdateNewUser
}