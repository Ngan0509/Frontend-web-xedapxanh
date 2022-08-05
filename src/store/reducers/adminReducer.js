import actionTypes from '../actions/actionTypes';

const initialState = {
    allcodeData: {},
    allcodeAccessoryData: {},
    allcodeUserData: {},
    categoryData: [],
    allUserData: [],
    allBicycleData: [],
    allAccessoriesData: []
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

        case actionTypes.FETCH_ALLCODE_ACCESSORY_SUCCESS:
            return {
                ...state,
                allcodeAccessoryData: action.data
            }
        case actionTypes.FETCH_ALLCODE_ACCESSORY_FAILED:
            return {
                ...state,
                allcodeAccessoryData: {}
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

        //---------------------------------------

        case actionTypes.FETCH_ALLBICYCLE_SUCCESS:
            return {
                ...state,
                allBicycleData: action.data
            }
        case actionTypes.FETCH_ALLBICYCLE_FAILED:
            return {
                ...state,
                allBicycleData: []
            }

        //---------------------------------------

        case actionTypes.FETCH_ALL_ACCESSORIES_SUCCESS:
            return {
                ...state,
                allAccessoriesData: action.data
            }
        case actionTypes.FETCH_ALL_ACCESSORIES_FAILED:
            return {
                ...state,
                allAccessoriesData: []
            }
        default:
            return state;
    }
}

export default adminReducer;