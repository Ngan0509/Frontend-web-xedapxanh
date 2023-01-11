import axios from "../axios";

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const handleLogInClient = (email, password) => {
    return axios.post('/api/login-client', { email, password })
}

const handleSignUpClient = (data) => {
    return axios.post('/api/signup-client', data)
}

const handleDeleteNewClient = (clientId) => {
    return axios.delete(`/api/delete-client?id=${clientId}`)
}

const handleUpdateNewClient = (editData) => {
    return axios.put('/api/update-client', editData)
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

const handleGetDetailBicycle = (inputId) => {
    return axios.get(`/api/get-detail-bicycle?id=${inputId}`)
}

const handleCreateMarkDownBicycle = (data) => {
    return axios.post('/api/create-markdown-bicycle', data)
}

const handleCreateSpecificationsBicycle = (data) => {
    return axios.post('/api/create-specifications-bicycle', data)
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

const handleGetDetailAccessory = (inputId) => {
    return axios.get(`/api/get-detail-accessory?id=${inputId}`)
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

const handleGetAllFilter = (inputId) => {
    return axios.get(`/api/get-all-filter?id=${inputId}`)
}

const handleCreateNewFilter = (data) => {
    return axios.post('/api/create-new-filter', data)
}

const handleDeleteNewFilter = (filterId) => {
    return axios.delete(`/api/delete-filter?id=${filterId}`)
}

const handleUpdateNewFilter = (editData) => {
    return axios.put('/api/update-filter', editData)
}

const handleGetAllCart = (inputId) => {
    return axios.get(`/api/get-all-cart?id=${inputId}`)
}

const handleCreateNewCart = (data) => {
    return axios.post('/api/create-new-cart', data)
}

const handleDeleteNewCart = (cartId) => {
    return axios.delete(`/api/delete-cart?id=${cartId}`)
}

const handleUpdateNewCart = (editData) => {
    return axios.put('/api/update-cart', editData)
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

const handleGetAllCheckout = (inputId, role) => {
    return axios.get(`/api/get-all-checkout?id=${inputId}&role=${role}`)
}

const handleCreateNewCheckout = (data) => {
    return axios.post('/api/create-new-checkout', data)
}

const handleUpdateStatusIdCheckout = (data) => {
    return axios.post('/api/update-statusId-checkout', data)
}

const handleGetAllComment = (product_id, type) => {
    return axios.get(`/api/get-all-comment?product_id=${product_id}&type=${type}`)
}

const handleCreateNewComment = (data) => {
    return axios.post('/api/create-new-comment', data)
}

const handleDeleteNewComment = (commentId) => {
    return axios.delete(`/api/delete-comment?id=${commentId}`)
}

const handleUpdateNewComment = (editData) => {
    return axios.put('/api/update-comment', editData)
}

const handleGetAllStore = (inputId) => {
    return axios.get(`/api/get-all-store?id=${inputId}`)
}

const handleCreateNewStore = (data) => {
    return axios.post('/api/create-new-store', data)
}

const handleDeleteNewStore = (storeId) => {
    return axios.delete(`/api/delete-store?id=${storeId}`)
}

const handleUpdateNewStore = (editData) => {
    return axios.put('/api/update-store', editData)
}

const handleCreateNewFavorite = (data) => {
    return axios.post('/api/create-new-favorite', data)
}

const handleGetMultiImage = (productId, type) => {
    return axios.get(`/api/get-multi-image?id=${productId}&type=${type}`)
}

const handleCreateMultiImage = (data) => {
    return axios.post('/api/create-multi-image', data)
}

const handleDeleteMultiImage = (name) => {
    return axios.delete(`/api/delete-multi_image?name=${name}`)
}

export {
    handleLogin, getAllCodeService, getCategory, handleGetAllUser, handleGetTypeAllCode,
    handleCreateNewUser, handleDeleteNewUser, handleUpdateNewUser,
    handleGetAllBicycle, handleCreateNewBicycle, handleDeleteNewBicycle, handleUpdateNewBicycle,
    handleGetAllAccessory, handleCreateNewAccessory, handleDeleteNewAccessory, handleUpdateNewAccessory,
    handleGetAllFilter, handleCreateNewFilter, handleUpdateNewFilter, handleDeleteNewFilter,
    handleGetDetailBicycle, handleCreateMarkDownBicycle, handleCreateSpecificationsBicycle,
    handleGetAllCart, handleCreateNewCart, handleDeleteNewCart, handleUpdateNewCart,
    handleLogInClient, handleSignUpClient, handleDeleteNewClient, handleUpdateNewClient,
    handleGetAllCheckout, handleCreateNewCheckout, handleUpdateStatusIdCheckout,
    handleGetAllComment, handleCreateNewComment, handleDeleteNewComment, handleUpdateNewComment,
    handleGetAllStore, handleCreateNewStore, handleUpdateNewStore, handleDeleteNewStore,
    handleCreateNewFavorite, handleGetDetailAccessory, handleGetMultiImage, handleCreateMultiImage, handleDeleteMultiImage
}