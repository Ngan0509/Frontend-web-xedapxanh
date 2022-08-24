const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin
    FETCH_ALLCODE_START: 'FETCH_ALLCODE_START',
    FETCH_ALLCODE_SUCCESS: 'FETCH_ALLCODE_SUCCESS',
    FETCH_ALLCODE_FAILED: 'FETCH_ALLCODE_FAILED',

    FETCH_ALLCODE_ACCESSORY_START: 'FETCH_ALLCODE_ACCESSORY_START',
    FETCH_ALLCODE_ACCESSORY_SUCCESS: 'FETCH_ALLCODE_ACCESSORY_SUCCESS',
    FETCH_ALLCODE_ACCESSORY_FAILED: 'FETCH_ALLCODE_ACCESSORY_FAILED',

    FETCH_ALLCODEUSER_START: 'FETCH_ALLCODEUSER_START',
    FETCH_ALLCODEUSER_SUCCESS: 'FETCH_ALLCODEUSER_SUCCESS',
    FETCH_ALLCODEUSER_FAILED: 'FETCH_ALLCODEUSER_FAILED',

    FETCH_CATEGORY_START: 'FETCH_CATEGORY_START',
    FETCH_CATEGORY_SUCCESS: 'FETCH_CATEGORY_SUCCESS',
    FETCH_CATEGORY_FAILED: 'FETCH_CATEGORY_FAILED',

    FETCH_ALLUSER_START: 'FETCH_ALLUSER_START',
    FETCH_ALLUSER_SUCCESS: 'FETCH_ALLUSER_SUCCESS',
    FETCH_ALLUSER_FAILED: 'FETCH_ALLUSER_FAILED',

    FETCH_ALLBICYCLE_START: 'FETCH_ALLBICYCLE_START',
    FETCH_ALLBICYCLE_SUCCESS: 'FETCH_ALLBICYCLE_SUCCESS',
    FETCH_ALLBICYCLE_FAILED: 'FETCH_ALLBICYCLE_FAILED',

    FETCH_ALL_ACCESSORIES_START: 'FETCH_ALL_ACCESSORIES_START',
    FETCH_ALL_ACCESSORIES_SUCCESS: 'FETCH_ALL_ACCESSORIES_SUCCESS',
    FETCH_ALL_ACCESSORIES_FAILED: 'FETCH_ALL_ACCESSORIES_FAILED',

    FETCH_ALL_FILTER_START: 'FETCH_ALL_FILTER_START',
    FETCH_ALL_FILTER_SUCCESS: 'FETCH_ALL_FILTER_SUCCESS',
    FETCH_ALL_FILTER_FAILED: 'FETCH_ALL_FILTER_FAILED',

    FETCH_ALL_CART_START: 'FETCH_ALL_CART_START',
    FETCH_ALL_CART_SUCCESS: 'FETCH_ALL_CART_SUCCESS',
    FETCH_ALL_CART_FAILED: 'FETCH_ALL_CART_FAILED',
})

export default actionTypes;