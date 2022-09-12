import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import React from 'react';
import * as userService from '../../../../services/userService'
import xedap from '../../../../assets/images/RINCON-2-2022-grey-fix.jpg'

function Orders() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCheckoutData = useSelector(selectors.selectorAllCheckoutData)
    const clientInfoSelect = useSelector(selectors.selectorClientInfo)

    const dispatch = useDispatch()
    let history = useHistory();
    let client_id = !_.isEmpty(clientInfoSelect) && clientInfoSelect.id
    //dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllCheckoutStart(client_id, 'Client'))
    }, [dispatch, client_id])

    const [listAllCheckout, setListAllCheckout] = useState([]);
    console.log("listAllCheckout", listAllCheckout)

    // get AllCheckout
    useEffect(() => {
        setListAllCheckout(allCheckoutData)
    }, [allCheckoutData])

    // const handleClickPushPage = (item) => {

    // }

    const categoryStatus = [
        {
            nameVi: "Tất cả",
            nameEn: "All",
            keyMap: "All"
        },
        {
            nameVi: "Chờ xác nhận",
            nameEn: "Wait for confirmation",
            keyMap: "S2"
        },
        {
            nameVi: "Chờ lấy hàng",
            nameEn: "Waiting for the goods",
            keyMap: "S3"
        },
        {
            nameVi: "Đang giao",
            nameEn: "Delivering",
            keyMap: "S5"
        },
        {
            nameVi: "Đã giao",
            nameEn: "Delivered",
            keyMap: "S6"
        },
        {
            nameVi: "Đã hủy",
            nameEn: "Cancelled",
            keyMap: "S7"
        }
    ]

    const [keyStatus, setKeyStatus] = useState('All')
    const handleClickCategory = (key) => {
        setKeyStatus(key)
        dispatch(actions.fetchAllCheckoutStart(client_id, 'Client'))
    }

    // search checkout onChange

    const [checkout, setCheckout] = useState('')
    const handleOnChangeSearch = (e) => {
        setCheckout(e.target.value)
    }

    const handleCancelCheckout = async (item) => {
        let token = item.token
        let statusId = 'Cancel'
        const resp = await userService.handleUpdateStatusIdCheckout({ token, statusId })
        if (resp && resp.errCode === 0) {
            alert("Đã hủy đơn hàng")
            dispatch(actions.fetchAllCheckoutStart(client_id, 'Client'))
        } else {
            alert(resp.errMessage)
        }
    }

    const handleRestoreCheckout = async (item) => {
        let token = item.token
        let statusId = item.statusId
        const resp = await userService.handleUpdateStatusIdCheckout({ token, statusId })
        if (resp && resp.errCode === 0) {
            alert("Đã khôi phục đơn hàng")
            dispatch(actions.fetchAllCheckoutStart(client_id, 'Client'))
        } else {
            alert(resp.errMessage)
        }
    }

    return (
        <div id="Orders">
            <div className="orders_bg">
                <div className="orders">
                    <div className='categoryStatus'>
                        {
                            categoryStatus.map((item, i) => (
                                <div
                                    key={item.keyMap}
                                    onClick={() => handleClickCategory(item.keyMap)}
                                    className={`${keyStatus === item.keyMap ? 'item active' : 'item'}`}>
                                    {
                                        lang === LANGUAGES.VI ? item.nameVi : item.nameEn
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <div className='search_product'>
                        <div className='row'>
                            <div className='col form-group'>
                                <input
                                    value={checkout}
                                    onChange={(e) => handleOnChangeSearch(e)}
                                    type='text'
                                    className='form-control'
                                    placeholder='Tìm kiếm theo tên sản phẩm'
                                />
                            </div>
                        </div>
                    </div>

                    <div className='info_checkout'>
                        <ul className='checkout_list'>
                            {
                                listAllCheckout && listAllCheckout.length > 0 &&
                                listAllCheckout
                                    .filter((item) => {
                                        return (
                                            item.orderDetailArr && item.orderDetailArr.length > 0 &&
                                            item.orderDetailArr.some((order) => {
                                                if (!_.isEmpty(order.productData)) {
                                                    if (order.productData.name.match(new RegExp(checkout, "i"))) {
                                                        return true
                                                    }
                                                }
                                                return false
                                            })
                                        )
                                    })
                                    .filter(item => item.statusId === keyStatus || keyStatus === 'All')
                                    .map(item => (
                                        <li key={item.id}>
                                            <div className='row'>
                                                <div className='col-5 info'>
                                                    <p><span><FormattedMessage id="order-manage.status" />: </span>
                                                        {
                                                            !_.isEmpty(item.statusData) && lang === LANGUAGES.VI ?
                                                                item.statusData.valueVi :
                                                                item.statusData.valueEn
                                                        }
                                                    </p>
                                                    <p><span><FormattedMessage id="order-manage.noi_nhan" />: </span>{item.noi_nhan}</p>
                                                    <p><span><FormattedMessage id="order-manage.ghi_chu" />: </span>{item.ghi_chu}</p>
                                                    <p><span><FormattedMessage id="order-manage.method-ship" />: </span>
                                                        {
                                                            !_.isEmpty(item.deliveryData) && lang === LANGUAGES.VI ?
                                                                item.deliveryData.valueVi :
                                                                item.deliveryData.valueEn
                                                        }
                                                    </p>
                                                    <p><span><FormattedMessage id="order-manage.method-payment" />: </span>
                                                        {
                                                            !_.isEmpty(item.paymentData) && lang === LANGUAGES.VI ?
                                                                item.paymentData.valueVi :
                                                                item.paymentData.valueEn
                                                        }
                                                    </p>
                                                </div>

                                                <div className='col-7 product'>
                                                    <ul className='product_list'>
                                                        {
                                                            item.orderDetailArr && item.orderDetailArr.length > 0 &&
                                                            item.orderDetailArr.map(order => (
                                                                <li key={order.id}>
                                                                    <div className='image-name'>
                                                                        <div className='image-product'>
                                                                            <img src={(!_.isEmpty(order.productData) && order.productData.image) || xedap} alt='product' />
                                                                        </div>
                                                                        <div className='name-product'>
                                                                            {!_.isEmpty(order.productData) && order.productData.name}
                                                                        </div>

                                                                        <span className='so_luong'>x {order.so_luong}</span>
                                                                    </div>
                                                                    <div className='price'>
                                                                        <NumberFormat
                                                                            value={order.sum_price}
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
                                                    <div className='sum_price'>
                                                        <span><FormattedMessage id="order-manage.sum-price" />: </span>
                                                        <NumberFormat
                                                            value={item.sum_price}
                                                            className="foo"
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            suffix={'VND'}
                                                        />
                                                    </div>
                                                    {
                                                        ((item.statusId !== 'S7' && item.statusId !== 'S6' && item.statusId !== 'S5') &&
                                                            (<button
                                                                onClick={() => handleCancelCheckout(item)}
                                                                className='cancel-btn btn'>
                                                                Hủy đơn hàng
                                                            </button>))
                                                        ||
                                                        (item.statusId === 'S7' &&
                                                            <button
                                                                onClick={() => handleRestoreCheckout(item)}
                                                                className='restore-btn btn'>
                                                                Khôi phục đơn hàng
                                                            </button>)
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orders