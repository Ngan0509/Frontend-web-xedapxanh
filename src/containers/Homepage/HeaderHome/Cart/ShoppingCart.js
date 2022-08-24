import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'
import "./Cart.scss"
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import logoTempest from '../../../../assets/images/E6TkEIRUcAMnlfa.jpg'
import * as userService from "../../../../services/userService"
import _ from 'lodash';

function ShoppingCart() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCartData = useSelector(selectors.selectorAllCartData)

    const dispatch = useDispatch()
    let history = useHistory();

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

    const handleClickMinus = async (cartItem) => {
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

    const handleClickPlus = async (cartItem) => {
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

    // const handleClickPushPage = (item) => {

    // }
    return (
        <div id="ShoppingCart">
            <div className="shoppingCart_bg">
                <div className="shoppingCart">
                    <div className='row'>
                        <div className='col-7'>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Tổng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listAllCart && listAllCart.length > 0 &&
                                        listAllCart.map(item => (
                                            <tr>
                                                <td>
                                                    <div className='product-wrap'>
                                                        <div className='icon-close'>
                                                            <i className='bx bx-x-circle'></i>
                                                        </div>
                                                        <div className='product-img'>
                                                            <img src={
                                                                item.productData && !_.isEmpty(item.productData) && item.productData.image
                                                            } alt='product' />
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
                                                        <span>{item.price}</span>
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
                                                        <span>{item.sum_price}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <div className='btn-wrap'>
                                <button className='home_btn'>Trở về trang chủ</button>
                                <button
                                    onClick={() => handleUpdateCart()}
                                    className='update_btn'>Cập nhật giỏ hàng</button>
                            </div>
                        </div>
                        <div className='col-5'>
                            <div className='checkout'>
                                <div className='number'>
                                    <span className='label'>Số lượng</span>
                                    <span className='num'>3</span>
                                </div>
                                <div className='sum'>
                                    <span className='label'>Tổng phụ</span>
                                    <span className='price'>29.370.000VND</span>
                                </div>
                                <button className='checkout_btn'>Tiến hành thanh toán</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCart