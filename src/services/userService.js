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

const handleGetAllBicycle = (inputId) => {
    return axios.get(`/api/get-all-bicycle?id=${inputId}`)
}

const handleCreateNewBicycle = (data) => {
    return axios.post('/api/create-new-bicycle', data)
}

const handleDeleteNewBicycle = (bicycleId) => {
    return axios.delete(`/api/delete-bicycle?id=${bicycleId}`)
}

const handleUpdateNewBicycle = (editData) => {
    return axios.put('/api/update-bicycle', editData)
}

const handleGetAllAccessory = (inputId) => {
    return axios.get(`/api/get-all-accessory?id=${inputId}`)
}

const handleCreateNewAccessory = (data) => {
    return axios.post('/api/create-new-accessory', data)
}

const handleDeleteNewAccessory = (accessoryId) => {
    return axios.delete(`/api/delete-accessory?id=${accessoryId}`)
}

const handleUpdateNewAccessory = (editData) => {
    return axios.put('/api/update-accessory', editData)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/get-all-code?type=${inputType}`)
}

const getCategory = (inputType) => {
    return axios.get(`/api/get-category?type=${inputType}`)
}

const handleGetTypeAllCode = () => {
    return axios.get('/api/get-type-allcode')
}

export {
    handleLogin, getAllCodeService, getCategory, handleGetAllUser, handleGetTypeAllCode,
    handleCreateNewUser, handleDeleteNewUser, handleUpdateNewUser,
    handleGetAllBicycle, handleCreateNewBicycle, handleDeleteNewBicycle, handleUpdateNewBicycle,
    handleGetAllAccessory, handleCreateNewAccessory, handleDeleteNewAccessory, handleUpdateNewAccessory,
}