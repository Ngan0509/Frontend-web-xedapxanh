import actionTypes from '../actions/actionTypes';

const initialState = {
    allcodeData: {},
    allcodeUserData: {},
    categoryData: [],
    allUserData: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALLCODE_SUCCESS:
            return {
                ...state,
                allcodeData: action.data
            }
        case actionTypes.FETCH_ALLCODE_FAILED:
            return {
                ...state,
                allcodeData: {}
            }

        //---------------------------------------

        case actionTypes.FETCH_ALLCODEUSER_SUCCESS:
            return {
                ...state,
                allcodeUserData: action.data
            }
        case actionTypes.FETCH_ALLCODEUSER_FAILED:
            return {
                ...state,
                allcodeUserData: {}
            }

        //---------------------------------------

        case actionTypes.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryData: action.data
            }
        case actionTypes.FETCH_CATEGORY_FAILED:
            return {
                ...state,
                categoryData: []
            }

        //---------------------------------------

        case actionTypes.FETCH_ALLUSER_SUCCESS:
            return {
                ...state,
                allUserData: action.data
            }
        case actionTypes.FETCH_ALLUSER_FAILED:
            return {
                ...state,
                allUserData: []
            }
        default:
            return state;
    }
}

export default adminReducer;