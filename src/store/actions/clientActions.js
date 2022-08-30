import actionTypes from './actionTypes';

export const addClientSuccess = () => ({
    type: actionTypes.ADD_CLIENT_SUCCESS
})

export const clientLoginSuccess = (clientInfo) => ({
    type: actionTypes.CLIENT_LOGIN_SUCCESS,
    clientInfo: clientInfo
})

export const clientLoginFail = () => ({
    type: actionTypes.CLIENT_LOGIN_FAIL
})

export const clientProcessLogout = () => ({
    type: actionTypes.CLIENT_PROCESS_LOGOUT
})