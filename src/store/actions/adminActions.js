import actionTypes from './actionTypes';
import * as userService from "../../services/userService"

//user---------------------------------------------------------------user
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
                    listriderHeight: respriderHeight.data,
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
export const fetchCategoryStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_CATEGORY_START })
            let resp = await userService.getCategory()
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