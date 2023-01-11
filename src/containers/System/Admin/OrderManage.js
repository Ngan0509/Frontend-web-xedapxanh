import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import * as userService from '../../../services/userService'
import NumberFormat from 'react-number-format';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { pathSystem } from '../../../utils'
import xedap from '../../../assets/images/RINCON-2-2022-grey-fix.jpg'

// import Slider from "react-slick";
import '../Admin/Manage.scss'
import _ from 'lodash';
import { useLocation } from 'react-router';
function OrderManage() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCheckoutData = useSelector(selectors.selectorAllCheckoutData)

    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => {
        return () => {
            setListAllCheckout([])
            setIsShow(false)
            setDetailInfo({})
        }
    }, [])

    //dispatch actions
    useEffect(() => {
        if (location.pathname === pathSystem.ORDERS2) {
            dispatch(actions.fetchAllCheckoutStart('All', 'AdminS2'))
        } else if (location.pathname === pathSystem.ORDERAll) {
            dispatch(actions.fetchAllCheckoutStart('All'))
        } else if (location.pathname === pathSystem.ORDERS6) {
            dispatch(actions.fetchAllCheckoutStart('All', 'AdminS6'))
        }
    }, [dispatch, location])

    const [listAllCheckout, setListAllCheckout] = useState([]);

    // get AllCheckout
    useEffect(() => {
        setListAllCheckout(allCheckoutData)
    }, [allCheckoutData])

    const [isShow, setIsShow] = useState(false)
    const toggle = () => {
        setIsShow(state => !state)
    }

    const [detailInfo, setDetailInfo] = useState({})

    const handleViewDetail = (item) => {
        toggle()
        setDetailInfo(item)
    }

    const handleUpdateStatusCheckout = async (item) => {
        let token = item.token
        let statusId = item.statusId
        const resp = await userService.handleUpdateStatusIdCheckout({ token, statusId })
        if (resp && resp.errCode === 0) {
            alert(resp.errMessage)
            if (location.pathname === pathSystem.ORDERS2) {
                dispatch(actions.fetchAllCheckoutStart('All', 'AdminS2'))
            } else if (location.pathname === pathSystem.ORDERAll) {
                dispatch(actions.fetchAllCheckoutStart('All'))
            } else if (location.pathname === pathSystem.ORDERS6) {
                dispatch(actions.fetchAllCheckoutStart('All', 'AdminS6'))
            }
            setIsShow(false)
        } else {
            alert(resp.errMessage)
        }
    }

    const handleDeleteCheckout = (item) => {
        console.log(`Delete checkout item id: ${item.id}`)
    }

    return (
        <div id="OrderManage">
            <Modal
                isOpen={isShow}
                toggle={toggle}
                size="lg"
                className='modal_user-container'
            >
                <ModalHeader>
                    <FormattedMessage id="order-manage.detail-order" />
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="container-row">
                            <div className='product'>
                                <h6><FormattedMessage id="order-manage.list-product" /></h6>
                                <ul className='product_list'>
                                    {
                                        !_.isEmpty(detailInfo) && detailInfo.orderDetailArr && detailInfo.orderDetailArr.length > 0 &&
                                        detailInfo.orderDetailArr.map(order => (
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
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {
                        (location.pathname !== pathSystem.ORDERAll &&
                            <Button
                                className='btn-user'
                                color="primary"
                                onClick={() => detailInfo.statusId === 'S6' ? handleDeleteCheckout(detailInfo) : handleUpdateStatusCheckout(detailInfo)}
                            >
                                {
                                    detailInfo.statusId === 'S6' ? 'Xóa đơn hàng' : 'Xác nhận đơn hàng'
                                }
                            </Button>)
                    }
                    {' '}
                    <Button
                        onClick={toggle}
                        className='btn-user'
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <div className='orderManage'>
                <h3 className='title text-center'>
                    {
                        (location.pathname === pathSystem.ORDERS2 &&
                            <FormattedMessage id="menu.admin.order-manage-s2" />) ||
                        (location.pathname === pathSystem.ORDERAll &&
                            <FormattedMessage id="menu.admin.order-manage" />) ||
                        (location.pathname === pathSystem.ORDERS6 &&
                            <FormattedMessage id="menu.admin.order-manage-s6" />)
                    }

                </h3>

                <div className='orders'>
                    <ul className='order-list'>
                        {
                            listAllCheckout && listAllCheckout.length > 0 ?
                                listAllCheckout.map(item => (
                                    <li key={item.id}>
                                        <div className='row client_info-shipper'>
                                            <div className='col'>
                                                <h6><FormattedMessage id="order-manage.order-date" /></h6>
                                                <p className='date'>{moment(new Date(Number(item.date))).format('DD/MM/YYYY')}</p>
                                                <h6><FormattedMessage id="order-manage.status" /></h6>
                                                <p className='status'>
                                                    {
                                                        !_.isEmpty(item.statusData) && lang === LANGUAGES.VI ?
                                                            item.statusData.valueVi :
                                                            item.statusData.valueEn
                                                    }
                                                </p>
                                                <h6><FormattedMessage id="order-manage.info-client" /></h6>
                                                <p className='email'>Email: {!_.isEmpty(item.clientData) && item.clientData.email}</p>
                                                <p className='fullname'>Họ tên: {!_.isEmpty(item.clientData) && item.clientData.fullname}</p>
                                                <p className='phoneNumber'>Số điện thoại: {!_.isEmpty(item.clientData) && item.clientData.phoneNumber}</p>
                                            </div>
                                            <div className='col'>
                                                <h6><FormattedMessage id="order-manage.address-client" /></h6>
                                                <p className='noi_nhan'>Nơi nhận: {item.noi_nhan}</p>
                                                <p className='ghi_chú'>Ghi chú: {item.ghi_chu}</p>
                                                <p className='city_id'>ID thành phố: {item.city_id}</p>
                                                <p className='district_id'>ID quận: {item.district_id}</p>
                                            </div>
                                            <div className='col'>
                                                <h6><FormattedMessage id="order-manage.method-ship" /></h6>
                                                <p className='delivery'>
                                                    {
                                                        !_.isEmpty(item.deliveryData) && lang === LANGUAGES.VI ?
                                                            item.deliveryData.valueVi :
                                                            item.deliveryData.valueEn
                                                    }
                                                </p>
                                                <h6><FormattedMessage id="order-manage.method-payment" /></h6>
                                                <p className='payment'>
                                                    {
                                                        !_.isEmpty(item.paymentData) && lang === LANGUAGES.VI ?
                                                            item.paymentData.valueVi :
                                                            item.paymentData.valueEn
                                                    }
                                                </p>
                                                <h6><FormattedMessage id="order-manage.sum-price" /></h6>
                                                <p className='sum_price'>
                                                    <NumberFormat
                                                        value={item.sum_price}
                                                        className="foo"
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'VND'}
                                                    />
                                                </p>
                                                <button
                                                    onClick={() => handleViewDetail(item)}
                                                    className='view-detail'>
                                                    <FormattedMessage id="order-manage.view-detail" />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )) :
                                <span className='notify'><FormattedMessage id="order-manage.not-order" /> !!!</span>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OrderManage