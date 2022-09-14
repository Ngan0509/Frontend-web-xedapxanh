import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
// import { LANGUAGES } from '../../../../utils/constant'
import "./Cart.scss"
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import xedap from '../../../../assets/images/RINCON-2-2022-grey-fix.jpg'
import * as userService from "../../../../services/userService"
import _ from 'lodash';
import NumberFormat from 'react-number-format';


function ShoppingCart() {
    // const lang = useSelector(selectors.selectorLanguages)
    const isLoggedInClient = useSelector(selectors.selectorIsLoggedInClient)
    const allCartData = useSelector(selectors.selectorAllCartData)

    const dispatch = useDispatch()
    let history = useHistory();

    useEffect(() => {
        return () => {
            setListAllCart([])
            setArrCartId([])
        };
    }, []);

    useEffect(() => {
        dispatch(actions.fetchAllCartStart('All'))
    }, [dispatch])

    const [listAllCart, setListAllCart] = useState([]);
    console.log("listAllCart", listAllCart)

    // get AllCart
    useEffect(() => {
        setListAllCart(allCartData)
    }, [allCartData])

    const [arrCartId, setArrCartId] = useState([])
    console.log("arrCartId", arrCartId)

    const handleClickMinus = (cartItem) => {
        const result = listAllCart.map(item => {
            if (item.id === cartItem.id) {
                if (item.so_luong > 1) {
                    item.so_luong--
                }
            }
            return item
        })
        setListAllCart(result)
        arrCartId.push(cartItem.id)
        const menuItems = [...new Set(arrCartId.map((item) => item))];

        setArrCartId(menuItems)
    }

    const handleClickPlus = (cartItem) => {
        const result = listAllCart.map(item => {
            if (item.id === cartItem.id) {
                item.so_luong++
            }
            return item
        })
        setListAllCart(result)

        arrCartId.push(cartItem.id)
        const menuItems = [...new Set(arrCartId.map((item) => item))];

        setArrCartId(menuItems)
    }

    const handleUpdateCart = () => {
        if (arrCartId.length > 0) {
            let arrCart = arrCartId.map(id => {
                let obj = {}
                listAllCart.forEach(item => {
                    if (id === item.id) {
                        obj = {
                            id: item.id,
                            so_luong: item.so_luong,
                            price: item.price
                        }
                    }
                })
                return obj
            })

            arrCart.forEach(async (item) => {
                const sum_price = item.so_luong * item.price
                const data = {
                    id: item.id,
                    so_luong: item.so_luong,
                    sum_price
                }
                await userService.handleUpdateNewCart(data)
                dispatch(actions.fetchAllCartStart('All'))
            })
        }

        setArrCartId([])
    }

    const handleDeleteCart = async (id) => {
        await userService.handleDeleteNewCart(id)
        dispatch(actions.fetchAllCartStart('All'))
    }

    const sumSo_luong = () => {
        let sum = 0
        listAllCart.forEach(item => {
            sum += item.so_luong
        })
        return sum
    }

    const sumPrice = () => {
        let sum = 0
        listAllCart.forEach(item => {
            sum += item.sum_price
        })
        return sum
    }

    const handleClickCheckout = () => {
        if (isLoggedInClient) {
            history.push("/home/cart/checkoutdetails")
        } else {
            alert("Bạn cần phải đăng nhập thì mới có thể thanh toán")
            history.push("/home/login");
        }
    }

    const handlePushPageHome = () => {
        history.push("/home");
    }
    return (
        <div id="ShoppingCart">
            <div className="shoppingCart_bg">
                <div className="shoppingCart">
                    <div className='row'>
                        <div className='col-7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id="bicycle-manage.productName" /></th>
                                        <th><FormattedMessage id="bicycle-manage.priceNew" /></th>
                                        <th><FormattedMessage id="bicycle-manage.so_luong" /></th>
                                        <th><FormattedMessage id="order-manage.sum-price" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listAllCart && listAllCart.length > 0 &&
                                        listAllCart.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <div className='product-wrap'>
                                                        <div
                                                            onClick={() => handleDeleteCart(item.id)}
                                                            className='icon-close'>
                                                            <i className='bx bx-x-circle'></i>
                                                        </div>
                                                        <div className='product-img'>
                                                            <img src={(item.productData && !_.isEmpty(item.productData) && item.productData.image) || xedap} alt='product' />
                                                        </div>
                                                        <div className='product-title'>
                                                            <span>
                                                                {
                                                                    item.productData && !_.isEmpty(item.productData) && item.productData.name
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='product-price'>
                                                        <span>
                                                            <NumberFormat
                                                                value={item.price}
                                                                className="foo"
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'VND'}
                                                            />
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='product-num'>
                                                        <button
                                                            onClick={() => handleClickMinus(item)}
                                                            className='minus'>-</button>
                                                        <span>{item.so_luong}</span>
                                                        <button
                                                            onClick={() => handleClickPlus(item)}
                                                            className='plus'>+</button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='price-sum'>
                                                        <span>
                                                            <NumberFormat
                                                                value={item.sum_price}
                                                                className="foo"
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'VND'}
                                                            />
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <div className='btn-wrap'>
                                <button
                                    onClick={() => handlePushPageHome()}
                                    className='home_btn'><FormattedMessage id="headerHome.back-home" /></button>
                                <button
                                    onClick={() => handleUpdateCart()}
                                    className='update_btn'><FormattedMessage id="headerHome.update-cart" /></button>
                            </div>
                        </div>
                        <div className='col-5'>
                            <div className='checkout'>
                                <div className='number'>
                                    <span className='label'><FormattedMessage id="bicycle-manage.so_luong" /></span>
                                    <span className='num'>{sumSo_luong()}</span>
                                </div>
                                <div className='sum'>
                                    <span className='label'><FormattedMessage id="order-manage.sum-price-all" /></span>
                                    <span className='price'>
                                        <NumberFormat
                                            value={sumPrice()}
                                            className="foo"
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'VND'}
                                        />
                                    </span>
                                </div>
                                <button
                                    onClick={handleClickCheckout}
                                    className='checkout_btn'
                                >
                                    <FormattedMessage id="order-manage.make-payment" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart