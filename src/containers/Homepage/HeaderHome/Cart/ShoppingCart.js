import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
// import { LANGUAGES } from '../../../../utils/constant'
import "./Cart.scss"
import { useHistory } from "react-router-dom";
import xedap from '../../../../assets/images/RINCON-2-2022-grey-fix.jpg'
import _ from 'lodash';
import NumberFormat from 'react-number-format';
import { useMemo } from 'react';


function ShoppingCart({ listAllCart, onGetAllCartData }) {
    // const lang = useSelector(selectors.selectorLanguages)
    const isLoggedInClient = useSelector(selectors.selectorIsLoggedInClient)

    // const dispatch = useDispatch()
    let history = useHistory();

    const handleClickMinus = (cartItem) => {
        const result = listAllCart.map(item => {
            if (item.id === cartItem.id) {
                if (item.so_luong > 1) {
                    item.so_luong--;
                    cartItem.sum_price = cartItem.price * cartItem.so_luong;
                }
            }
            return item
        })

        localStorage.setItem("arrCart", JSON.stringify(result));
        onGetAllCartData()
    }

    const handleClickPlus = (cartItem) => {
        const result = listAllCart.map(item => {
            if (item.id === cartItem.id) {
                item.so_luong++;
                cartItem.sum_price = cartItem.price * cartItem.so_luong;
            }
            return item
        })

        localStorage.setItem("arrCart", JSON.stringify(result));
        onGetAllCartData()
    }

    const handleDeleteCart = async (id) => {
        const result = listAllCart.filter(item => item.id !== id);

        localStorage.setItem("arrCart", JSON.stringify(result));
        onGetAllCartData()
    }

    const sumSo_luong = useMemo(() => {
        let sum = 0
        listAllCart.forEach(item => {
            sum += item.so_luong
        })
        return sum
    }, [listAllCart])

    const sumPrice = useMemo(() => {
        let sum = 0
        listAllCart.forEach(item => {
            sum += item.sum_price
        })
        return sum
    }, [listAllCart])

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
    const handleDetailPage = (id) => {
        history.push(`/home/bicycle/detail/${id}`);
    }

    return (
        <div id="ShoppingCart">
            <div className="shoppingCart_bg">
                <div className="shoppingCart">
                    <div className='row'>
                        <div className='col-12'>
                            <table>
                                <thead>
                                    <tr>
                                        <th><FormattedMessage id="bicycle-manage.productName" /></th>
                                        <th className='price_new_th'><FormattedMessage id="bicycle-manage.priceNew" /></th>
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
                                                    <div
                                                        className='product-wrap'>
                                                        <div
                                                            onClick={() => handleDeleteCart(item.id)}
                                                            className='icon-close'>
                                                            <i className='bx bx-x-circle'></i>
                                                        </div>
                                                        <div
                                                            onClick={() => handleDetailPage(item.product_id)}
                                                            className='product-img'>
                                                            <img src={(item.productData && !_.isEmpty(item.productData) && item.productData.image) || xedap} alt='product' />
                                                        </div>
                                                        <div
                                                            onClick={() => handleDetailPage(item.product_id)}
                                                            className='product-title'>
                                                            <span>
                                                                {
                                                                    item.productData && !_.isEmpty(item.productData) && item.productData.name
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='price_new_th'>
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
                                {/* <button
                                    onClick={() => handleUpdateCart()}
                                    className='update_btn'><FormattedMessage id="headerHome.update-cart" /></button> */}
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className='checkout'>
                                <div className='number'>
                                    <span className='label'><FormattedMessage id="bicycle-manage.so_luong" /></span>
                                    <span className='num'>{sumSo_luong}</span>
                                </div>
                                <div className='sum'>
                                    <span className='label'><FormattedMessage id="order-manage.sum-price-all" /></span>
                                    <span className='price'>
                                        <NumberFormat
                                            value={sumPrice}
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