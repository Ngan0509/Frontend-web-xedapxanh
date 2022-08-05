import actionTypes from './actionTypes';
import * as userService from "../../services/userService"

//---------------------------------------------------------------
export const fetchAllcodeStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLCODE_START })
            let respPriceSpace = await userService.getAllCodeService('PRICESPACE')
            let respBrand = await userService.getAllCodeService('BRAND')
            let respUseTarget = await userService.getAllCodeService('USETARGET')
            let respWeelSize = await userService.getAllCodeService('WEELSIZE')
            let respFrameMaterial = await userService.getAllCodeService('FRAMEMATERIAL')
            let respriderHeight = await userService.getAllCodeService('RIDERHEIGHT')
            let respBrake = await userService.getAllCodeService('BRAKE')

            if (
                respPriceSpace && respPriceSpace.errCode === 0 &&
                respBrand && respBrand.errCode === 0 &&
                respUseTarget && respUseTarget.errCode === 0 &&
                respWeelSize && respWeelSize.errCode === 0 &&
                respFrameMaterial && respFrameMaterial.errCode === 0 &&
                respriderHeight && respriderHeight.errCode === 0 &&
                respBrake && respBrake.errCode === 0
            ) {
                let data = {
                    listPriceSpace: respPriceSpace.data,
                    listBrand: respBrand.data,
                    listUseTarget: respUseTarget.data,
                    listWeelSize: respWeelSize.data,
                    listFrameMaterial: respFrameMaterial.data,
                    listRiderHeight: respriderHeight.data,
                    listBrake: respBrake.data,
                }

                dispatch(fetchAllcodeSuccess(data))
            } else {
                dispatch(fetchAllcodeFailed())
            }
        } catch (error) {
            dispatch(fetchAllcodeFailed())
        }
    }
}

export const fetchAllcodeSuccess = (AllcodeData) => ({
    type: actionTypes.FETCH_ALLCODE_SUCCESS,
    data: AllcodeData
})

export const fetchAllcodeFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_FAILED
})

//---------------------------------------------------------------
export const fetchAllcodeAccessoryStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLCODE_ACCESSORY_START })
            let respBicycleAs = await userService.getAllCodeService('BICYCLE_AS')
            let respRiderAs = await userService.getAllCodeService('RIDER_AS')
            let respAccessary = await userService.getAllCodeService('ACCESSARY')

            if (
                respBicycleAs && respBicycleAs.errCode === 0 &&
                respRiderAs && respRiderAs.errCode === 0 &&
                respAccessary && respAccessary.errCode === 0
            ) {
                let data = {
                    listBicycleAs: respBicycleAs.data,
                    listRiderAs: respRiderAs.data,
                    listAccessary: respAccessary.data
                }

                dispatch(fetchAllcodeAccessorySuccess(data))
            } else {
                dispatch(fetchAllcodeAccessoryFailed())
            }
        } catch (error) {
            dispatch(fetchAllcodeAccessoryFailed())
        }
    }
}

export const fetchAllcodeAccessorySuccess = (AllcodeAccessoryData) => ({
    type: actionTypes.FETCH_ALLCODE_ACCESSORY_SUCCESS,
    data: AllcodeAccessoryData
})

export const fetchAllcodeAccessoryFailed = () => ({
    type: actionTypes.FETCH_ALLCODE_ACCESSORY_FAILED
})

//-------------------------------------------------------

export const fetchAllcodeUserStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLCODEUSER_START })
            let respRole = await userService.getAllCodeService('ROLE')
            let respGender = await userService.getAllCodeService('GENDER')

            if (
                respRole && respRole.errCode === 0 &&
                respGender && respGender.errCode === 0
            ) {
                let data = {
                    listRole: respRole.data,
                    listGender: respGender.data,
                }

                dispatch(fetchAllcodeUserSuccess(data))
            } else {
                dispatch(fetchAllcodeUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllcodeUserFailed())
        }
    }
}

export const fetchAllcodeUserSuccess = (AllcodeUserData) => ({
    type: actionTypes.FETCH_ALLCODEUSER_SUCCESS,
    data: AllcodeUserData
})

export const fetchAllcodeUserFailed = () => ({
    type: actionTypes.FETCH_ALLCODEUSER_FAILED
})

//-------------------------------------------------------
export const fetchCategoryStart = (inputType) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_CATEGORY_START })
            let resp = await userService.getCategory(inputType)
            if (resp && resp.errCode === 0) {
                dispatch(fetchCategorySuccess(resp.data))
            } else {
                dispatch(fetchCategoryFailed())
            }
        } catch (error) {
            dispatch(fetchCategoryFailed())
        }
    }
}

export const fetchCategorySuccess = (CategoryData) => ({
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    data: CategoryData
})

export const fetchCategoryFailed = () => ({
    type: actionTypes.FETCH_CATEGORY_FAILED
})

//-------------------------------------------------------
export const fetchAllUserStart = (inputId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLUSER_START })
            let resp = await userService.handleGetAllUser(inputId)
            console.log('resp all user', resp.data)
            if (resp && resp.errCode === 0) {
                dispatch(fetchAllUserSuccess(resp.data))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())
        }
    }
}

export const fetchAllUserSuccess = (AllUserData) => ({
    type: actionTypes.FETCH_ALLUSER_SUCCESS,
    data: AllUserData
})

export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALLUSER_FAILED
})

//-------------------------------------------------------
export const fetchAllBicycleStart = (inputId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLBICYCLE_START })
            let resp = await userService.handleGetAllBicycle(inputId)
            console.log('resp all Bicycle', resp.data)
            if (resp && resp.errCode === 0) {
                dispatch(fetchAllBicycleSuccess(resp.data))
            } else {
                dispatch(fetchAllBicycleFailed())
            }
        } catch (error) {
            dispatch(fetchAllBicycleFailed())
        }
    }
}

export const fetchAllBicycleSuccess = (AllBicycleData) => ({
    type: actionTypes.FETCH_ALLBICYCLE_SUCCESS,
    data: AllBicycleData
})

export const fetchAllBicycleFailed = () => ({
    type: actionTypes.FETCH_ALLBICYCLE_FAILED
})

//-------------------------------------------------------
export const fetchAllAccessoriesStart = (inputId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_ACCESSORIES_START })
            let resp = await userService.handleGetAllAccessory(inputId)
            console.log('resp all accessories', resp.data)
            if (resp && resp.errCode === 0) {
                dispatch(fetchAllAccessoriesSuccess(resp.data))
            } else {
                dispatch(fetchAllAccessoriesFailed())
            }
        } catch (error) {
            dispatch(fetchAllAccessoriesFailed())
        }
    }
}

export const fetchAllAccessoriesSuccess = (AllAccessoriesData) => ({
    type: actionTypes.FETCH_ALL_ACCESSORIES_SUCCESS,
    data: AllAccessoriesData
})

export const fetchAllAccessoriesFailed = () => ({
    type: actionTypes.FETCH_ALL_ACCESSORIES_FAILED
})

//-------------------------------------------------------
export const fetchAllFilterStart = (inputId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_FILTER_START })
            let resp = await userService.handleGetAllFilter(inputId)
            console.log('resp all Filter', resp.data)
            if (resp && resp.errCode === 0) {
                dispatch(fetchAllFilterSuccess(resp.data))
            } else {
                dispatch(fetchAllFilterFailed())
            }
        } catch (error) {
            dispatch(fetchAllFilterFailed())
        }
    }
}

export const fetchAllFilterSuccess = (AllFilterData) => ({
    type: actionTypes.FETCH_ALL_FILTER_SUCCESS,
    data: AllFilterData
})

export const fetchAllFilterFailed = () => ({
    type: actionTypes.FETCH_ALL_FILTER_FAILED
})