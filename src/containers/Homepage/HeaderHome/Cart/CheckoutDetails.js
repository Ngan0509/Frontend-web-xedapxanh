import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'
import "./Cart.scss"
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Select from 'react-select';
import useFetch from '../../../../customizes/useFetch';
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import * as userService from '../../../../services/userService'

function CheckoutDetails() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCodeUserData = useSelector(selectors.selectorAllcodeUserData)
    const allCartData = useSelector(selectors.selectorAllCartData)
    const isLoggedInClient = useSelector(selectors.selectorIsLoggedInClient)
    const clientInfoSelect = useSelector(selectors.selectorClientInfo)
    let { data: cityData } = useFetch('https://provinces.open-api.vn/api/')
    let { data: districData } = useFetch('https://provinces.open-api.vn/api/d/')

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            setListAllCart([])
            setClientInfo({})
            setForm({
                noi_nhan: '',
                ghi_chu: ''
            })
            setSelects({
                city: '',
                district: ''
            })
            setListCity([])
            setListDistrict([])
            setListDelivery([])
            setListPayment([])
            setListProvince([])
            setErrorMessage('')
            setBlurId('')
            setDeliveryId('')
            setPaymentId('')
        };
    }, []);

    const [clientInfo, setClientInfo] = useState({});

    // get clientInfo
    useEffect(() => {
        if (clientInfoSelect && !_.isEmpty(clientInfoSelect))
            setClientInfo(clientInfoSelect)
    }, [clientInfoSelect])

    const buildInputData = useCallback((inputData, type) => {
        if (inputData && inputData.length > 0) {
            let result = inputData.map((item) => {
                let value, label

                if (type === 'CITY' || type === 'DISTRIC') {
                    label = lang === LANGUAGES.VI ? item.name : item.name
                    value = item.codename
                } else {
                    label = lang === LANGUAGES.VI ? item.valueVi : item.valueEn
                    value = item.keyMap
                }

                return {
                    label: label,
                    value: value
                }
            })
            return result
        }
    }, [lang])
    let history = useHistory();

    // input onChange
    const [form, setForm] = useState({
        noi_nhan: '',
        ghi_chu: ''
    })

    const { noi_nhan, ghi_chu } = form

    const handleOnChange = (e, id) => {
        let copyForm = { ...form }
        copyForm[id] !== '' && setErrorMessage('')
        copyForm[id] !== '' && setBlurId('')
        copyForm[id] = e.target.value
        setForm({ ...copyForm })

    }

    const [errMessage, setErrorMessage] = useState('')
    const [blurId, setBlurId] = useState('')
    const handleOnBlur = (id) => {
        validator(id)
    }

    const validator = (id) => {
        let isValid = false
        let copyForm = {
            noi_nhan,
            ghi_chu,
            city,
            district,
            deliveryId,
            paymentId
        }

        if (copyForm[id] === '') {
            isValid = true
            setBlurId(id)
            setErrorMessage('Trường này không được để trống')
        } else {
            isValid = false
            setBlurId('')
            setErrorMessage('')
        }

        return isValid

    }

    // array
    const [listCity, setListCity] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listProvince, setListProvince] = useState([])
    const [listAllCart, setListAllCart] = useState([]);
    const [listDelivery, setListDelivery] = useState([]);
    const [listPayment, setListPayment] = useState([]);

    // dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllcodeUserStart())
        dispatch(actions.fetchAllCartStart('All'))
    }, [dispatch])

    // Get Allcodeuser cho user
    useEffect(() => {
        setListDelivery(buildInputData(allCodeUserData.listDelivery))
        setListPayment(buildInputData(allCodeUserData.listPayment))

    }, [allCodeUserData, buildInputData])

    // Config API data province
    useEffect(() => {
        let result = cityData.map(city => {
            let districtArr = []
            districData.forEach(district => {
                if (city.code === district.province_code) {
                    districtArr.push(district)
                }
            })
            return {
                ...city,
                districts: districtArr
            }
        })
        setListProvince(result)
        setListCity(buildInputData(result, 'CITY'))
    }, [cityData, districData, buildInputData])

    // get AllCart
    useEffect(() => {
        setListAllCart(allCartData)
    }, [allCartData])

    // select onChange
    const [selects, setSelects] = useState({
        city: '',
        district: ''
    })

    const { city, district } = selects
    const handleChangeSelect = (selectedOption, name) => {
        setBlurId('')
        setErrorMessage('')
        let stateName = name.name;
        if (stateName === 'city') {
            let districtArr = []
            listProvince.forEach(province => {
                if (selectedOption.value === province.codename) {
                    districtArr = province.districts
                }
            })
            setListDistrict(buildInputData(districtArr, 'DISTRIC'))
        }
        let copySelects = { ...selects }
        copySelects[stateName] = selectedOption

        setSelects({ ...copySelects })
    }

    const sumPrice = () => {
        let sum = 0
        listAllCart.forEach(item => {
            sum += item.sum_price
        })
        return sum
    }

    const [deliveryId, setDeliveryId] = useState('')
    const [paymentId, setPaymentId] = useState('')

    const handleChangeDelivery = (value) => {
        setBlurId('')
        setErrorMessage('')
        setDeliveryId(value)
    }

    const handleChangePayment = (value) => {
        setBlurId('')
        setErrorMessage('')
        setPaymentId(value)
    }

    const handleSubmit = async () => {
        const sum_price = sumPrice()
        const date = new Date().getTime().toString()
        const client_id = clientInfo.id
        let keys = Object.keys({
            noi_nhan,
            ghi_chu,
            city,
            district,
            deliveryId,
            paymentId
        })

        let result = keys.every(key => validator(key) === false)
        if (!result) return

        const data = {
            noi_nhan,
            ghi_chu,
            city_id: city.value,
            district_id: district.value,
            delivery_id: deliveryId,
            payment_id: paymentId,
            client_id,
            sum_price,
            date,
            lang,
            statusId: 'S1'
        }

        console.log("data", data)

        const resp = await userService.handleCreateNewCheckout(data)
        if (resp && resp.errCode === 0) {
            alert('Thanh toán thành công')
            dispatch(actions.fetchAllCartStart('All'))
            history.push("/home/cart/ordercomplete")
        } else {
            alert(resp.errMessage)
        }

        setForm({
            noi_nhan: '',
            ghi_chu: ''
        })
        setSelects({
            city: '',
            district: ''
        })
        setDeliveryId('')
        setPaymentId('')
    }
    // const handleClickPushPage = (item) => {

    // }
    return (
        <>
            {
                (
                    listAllCart && listAllCart.length === 0 &&
                    <span className='notice'>Hiện giỏ hàng không có hàng, vui lòng thêm hàng vào giỏ</span>
                ) ||
                (
                    !isLoggedInClient &&
                    <span className='notice'>Vui lòng đăng nhập để thanh toán</span>
                ) ||
                <div id="CheckoutDetails">
                    <div className="checkoutDetails_bg">
                        <div className="checkoutDetails">
                            <div className='row'>
                                <div className='col-7'>
                                    <div className='row'>
                                        <div className='col-6 form-group'>
                                            <label>
                                                Thành phố
                                            </label>
                                            <Select
                                                value={city}
                                                name="city"
                                                onChange={handleChangeSelect}
                                                options={listCity}
                                            />
                                            <span className="form-message">
                                                {blurId === 'city' && errMessage}
                                            </span>
                                        </div>

                                        <div className='col-6 form-group'>
                                            <label>
                                                Quận
                                            </label>
                                            <Select
                                                value={district}
                                                name="district"
                                                onChange={handleChangeSelect}
                                                options={listDistrict}
                                            />
                                            <span className="form-message">
                                                {blurId === 'district' && errMessage}
                                            </span>
                                        </div>
                                        <div className='col-12 form-group'>
                                            <label>Địa chỉ nơi nhận</label>
                                            <input
                                                onBlur={() => handleOnBlur('noi_nhan')}
                                                value={noi_nhan}
                                                type='text'
                                                onChange={(e) => handleOnChange(e, 'noi_nhan')}
                                                className='form-control'
                                            />
                                            <span className="form-message">
                                                {blurId === 'noi_nhan' && errMessage}
                                            </span>
                                        </div>

                                        <div className='col-12 form-group'>
                                            <label>Ghi chú</label>
                                            <textarea
                                                onBlur={() => handleOnBlur('ghi_chu')}
                                                rows={4}
                                                value={ghi_chu}
                                                type='text'
                                                onChange={(e) => handleOnChange(e, 'ghi_chu')}
                                                className='form-control'
                                            />
                                            <span className="form-message">
                                                {blurId === 'ghi_chu' && errMessage}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-5'>
                                    <div className='detail_checkout'>
                                        <h5>ĐƠN HÀNG CỦA BẠN</h5>
                                        <div className='label'>
                                            <span>SẢN PHẨM</span>
                                            <span>TỔNG</span>
                                        </div>

                                        <ul className='list_product'>
                                            {
                                                listAllCart && listAllCart.length > 0 &&
                                                listAllCart.map(item => (
                                                    <li key={item.id}>
                                                        <div className='product_title'>
                                                            {
                                                                item.productData && !_.isEmpty(item.productData) && item.productData.name
                                                            }
                                                            <span>x{item.so_luong}</span>
                                                        </div>
                                                        <div className='sum_price'>
                                                            <NumberFormat
                                                                value={item.sum_price}
                                                                className="foo"
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'VND'}
                                                            />
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>

                                        <div className='sum_price_all'>
                                            <span className='sum_price_all-label'>Tổng phụ</span>
                                            <span>
                                                <NumberFormat
                                                    value={sumPrice()}
                                                    className="foo"
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    suffix={'VND'}
                                                />
                                            </span>
                                        </div>

                                        <div className='delivery'>
                                            <h5>GIAO HÀNG</h5>

                                            {
                                                listDelivery && listDelivery.length > 0 &&
                                                listDelivery.map(item => (
                                                    <div key={item.value} className='radio-wrap'>
                                                        <input
                                                            checked={deliveryId === item.value}
                                                            id={item.value}
                                                            type='radio'
                                                            onChange={() => handleChangeDelivery(item.value)}
                                                        />
                                                        <label htmlFor={item.value}>{item.label}</label>
                                                    </div>
                                                ))
                                            }
                                            <span className="form-message">
                                                {blurId === 'deliveryId' && errMessage}
                                            </span>
                                        </div>

                                        <div className='payment'>
                                            <h5>PHƯƠNG THỨC THANH TOÁN</h5>
                                            {
                                                listPayment && listPayment.length > 0 &&
                                                listPayment.map(item => (
                                                    <div key={item.value} className='radio-wrap'>
                                                        <input
                                                            checked={paymentId === item.value}
                                                            id={item.value}
                                                            type='radio'
                                                            onChange={() => handleChangePayment(item.value)}
                                                        />
                                                        <label htmlFor={item.value}>{item.label}</label>
                                                    </div>
                                                ))
                                            }
                                            <span className="form-message">
                                                {blurId === 'paymentId' && errMessage}
                                            </span>
                                        </div>

                                        <button
                                            onClick={handleSubmit}
                                            className='btn-checkout'>
                                            Thanh toán
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default CheckoutDetails