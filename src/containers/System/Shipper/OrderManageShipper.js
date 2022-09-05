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

// import Slider from "react-slick";
import '../Admin/Manage.scss'
import _ from 'lodash';
import { useLocation } from 'react-router';
function OrderManageShipper() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCheckoutData = useSelector(selectors.selectorAllCheckoutData)
    const userInfo = useSelector(selectors.selectorUserInfo)

    const dispatch = useDispatch()
    const location = useLocation()

    //dispatch actions
    useEffect(() => {
        if (location.pathname === pathSystem.ORDERS3) {
            dispatch(actions.fetchAllCheckoutStart('All', 'ShipperS3'))
        } else if (location.pathname === pathSystem.ORDERS4) {
            dispatch(actions.fetchAllCheckoutStart('All', 'ShipperS4'))
        } else if (location.pathname === pathSystem.ORDERS5) {
            dispatch(actions.fetchAllCheckoutStart('All', 'ShipperS5'))
        }
    }, [dispatch, location])

    const [listAllCheckout, setListAllCheckout] = useState([]);
    console.log("listAllCheckout", listAllCheckout)
    // get AllCheckout
    useEffect(() => {
        let result = []
        if (userInfo && !_.isEmpty(userInfo)) {
            result = allCheckoutData.filter(checkout => checkout.city_id === userInfo.city_id)
        }
        setListAllCheckout(result)
    }, [allCheckoutData, userInfo])

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
            if (location.pathname === pathSystem.ORDERS3) {
                dispatch(actions.fetchAllCheckoutStart('All', 'ShipperS3'))
            } else if (location.pathname === pathSystem.ORDERS4) {
                dispatch(actions.fetchAllCheckoutStart('All', 'ShipperS4'))
            } else if (location.pathname === pathSystem.ORDERS5) {
                dispatch(actions.fetchAllCheckoutStart('All', 'ShipperS5'))
            }
            setIsShow(false)
        } else {
            alert(resp.errMessage)
        }
    }

    return (
        <div id="OrderManageShipper">
            <Modal
                isOpen={isShow}
                toggle={toggle}
                size="lg"
                className='modal_user-container'
            >
                <ModalHeader>
                    Chi tiết đơn hàng
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="container-row">
                            <div className='product'>
                                <h6>Danh sách sản phẩm</h6>
                                <ul className='product_list'>
                                    {
                                        !_.isEmpty(detailInfo) && detailInfo.orderDetailArr && detailInfo.orderDetailArr.length > 0 &&
                                        detailInfo.orderDetailArr.map(order => (
                                            <li key={order.id}>
                                                <div className='image-name'>
                                                    <div className='image-product'>
                                                        <img src={!_.isEmpty(order.productData) && order.productData.image} alt='product' />
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
                    <Button
                        className='btn-user'
                        color="primary"
                        onClick={() => handleUpdateStatusCheckout(detailInfo)}
                    >
                        {
                            (detailInfo.statusId === 'S3' && 'Xác nhận đi lấy hàng') ||
                            (detailInfo.statusId === 'S4' && 'Xác nhận đi giao hàng') ||
                            (detailInfo.statusId === 'S5' && 'Xác nhận đã giao xong')
                        }
                    </Button>
                    {' '}
                    <Button
                        onClick={toggle}
                        className='btn-user'
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <div className='orderManageShipper'>
                <h3 className='title text-center'>
                    {
                        (location.pathname === pathSystem.ORDERS3 &&
                            <FormattedMessage id="menu.shipper.order-manage-shipper-s3" />) ||
                        (location.pathname === pathSystem.ORDERS4 &&
                            <FormattedMessage id="menu.shipper.order-manage-shipper-s4" />) ||
                        (location.pathname === pathSystem.ORDERS5 &&
                            <FormattedMessage id="menu.shipper.order-manage-shipper-s5" />)
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
                                                <h6>Ngày đặt hàng</h6>
                                                <p className='date'>{moment(new Date(Number(item.date))).format('DD/MM/YYYY')}</p>
                                                <h6>Tình trạng</h6>
                                                <p className='status'>
                                                    {
                                                        !_.isEmpty(item.statusData) && lang === LANGUAGES.VI ?
                                                            item.statusData.valueVi :
                                                            item.statusData.valueEn
                                                    }
                                                </p>
                                                <h6>Thông tin khách hàng</h6>
                                                <p className='email'>Email: {!_.isEmpty(item.clientData) && item.clientData.email}</p>
                                                <p className='fullname'>Họ tên: {!_.isEmpty(item.clientData) && item.clientData.fullname}</p>
                                                <p className='phoneNumber'>Số điện thoại: {!_.isEmpty(item.clientData) && item.clientData.phoneNumber}</p>
                                            </div>
                                            <div className='col'>
                                                <h6>Địa chỉ khách hàng</h6>
                                                <p className='noi_nhan'>Nơi nhận: {item.noi_nhan}</p>
                                                <p className='ghi_chú'>Ghi chú: {item.ghi_chu}</p>
                                                <p className='city_id'>ID thành phố: {item.city_id}</p>
                                                <p className='district_id'>ID quận: {item.district_id}</p>
                                            </div>
                                            <div className='col'>
                                                <h6>Phương thức giao hàng: </h6>
                                                <p className='delivery'>
                                                    {
                                                        !_.isEmpty(item.deliveryData) && lang === LANGUAGES.VI ?
                                                            item.deliveryData.valueVi :
                                                            item.deliveryData.valueEn
                                                    }
                                                </p>
                                                <h6>Phương thức thanh toán: </h6>
                                                <p className='payment'>
                                                    {
                                                        !_.isEmpty(item.paymentData) && lang === LANGUAGES.VI ?
                                                            item.paymentData.valueVi :
                                                            item.paymentData.valueEn
                                                    }
                                                </p>
                                                <h6>Tổng giá: </h6>
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
                                                    Xem chi tiết
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )) :
                                <span>Không có đơn hàng !!!</span>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default OrderManageShipper