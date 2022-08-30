import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    clientInfo: null
}

const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CLIENT_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                clientInfo: action.clientInfo
            }
        case actionTypes.CLIENT_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                clientInfo: null
            }
        case actionTypes.CLIENT_PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                clientInfo: null
            }
        default:
            return state;
    }
}

export default clientReducer;