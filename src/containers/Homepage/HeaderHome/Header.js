import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';

import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import './Header.scss'
import logo from '../../../assets/images/logo-xe-dap.png'
import shoppingBag from '../../../assets/images/shopping-bag.png'
import _ from 'lodash';
import NumberFormat from 'react-number-format';

import CustomScrollbars from '../../../components/CustomScrollbars';

import {
    NavLink
} from "react-router-dom";
import { path } from '../../../utils'

function Header() {
    const lang = useSelector(selectors.selectorLanguages)
    const isLoggedInClient = useSelector(selectors.selectorIsLoggedInClient)
    const clientInfoSelect = useSelector(selectors.selectorClientInfo)
    const allBicycleData = useSelector(selectors.selectorAllBicycleData)
    const allCartData = useSelector(selectors.selectorAllCartData)

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')
    const [isFocus, setIsFocus] = useState(false)

    useEffect(() => {
        dispatch(actions.fetchAllBicycleStart('All'))
    }, [dispatch])

    const [listAllBicycle, setListAllBicycle] = useState([]);

    // get AllBicycle
    useEffect(() => {
        setListAllBicycle(allBicycleData)
    }, [allBicycleData])

    useEffect(() => {
        return () => {
            setListAllCart([])
            setClientInfo({})
        };
    }, []);

    const changeLanguage = (language) => {
        dispatch(actions.changeLanguageApp(language))
    }

    useEffect(() => {
        dispatch(actions.fetchAllCartStart('All'))
    }, [dispatch])

    const [listAllCart, setListAllCart] = useState([]);

    // get AllCart
    useEffect(() => {
        setListAllCart(allCartData)
    }, [allCartData])

    const [clientInfo, setClientInfo] = useState({});
    // get clientInfo
    useEffect(() => {
        setClientInfo(clientInfoSelect)
    }, [clientInfoSelect])

    let history = useHistory();

    const handleClickAdmin = () => {
        history.push("/system/admin");
    }

    const handleClickShipper = () => {
        history.push("/system/shipper");
    }

    const handleClickLogoHome = () => {
        history.push("/home");
    }

    const handleClickViewCart = () => {
        history.push("/home/cart/shoppingcart")
    }

    const handleClickCheckout = () => {
        if (isLoggedInClient) {
            history.push("/home/cart/checkoutdetails")
        } else {
            alert("Bạn cần phải đăng nhập thì mới có thể thanh toán")
            history.push("/home/login");
        }
    }

    const handlePushSignUp = () => {
        history.push("/home/signup")
    }

    const handlePushLogIn = () => {
        history.push("/home/login")
    }

    const handleClickLogout = (e) => {
        e.preventDefault()
        dispatch(actions.clientProcessLogout())
        history.push('/home')
    }

    return (
        <>
            <div
                onClick={() => setIsFocus(false)}
                className={`${isFocus ? 'overplay active' : 'overplay'}`}>
            </div>
            <div id="Header">
                <div className='header_bg'>
                    <div className='header_author'>
                        <div className='left-content'>
                            <ul className='nav'>
                                <li
                                    onClick={handleClickAdmin}
                                >
                                    <FormattedMessage id="headerHome.pageAdmin" />
                                </li>
                                <li
                                    onClick={handleClickShipper}
                                >
                                    <FormattedMessage id="headerHome.pageShipper" />
                                </li>
                                <li>
                                    <i className='bx bx-map'></i>
                                    <FormattedMessage id="headerHome.find-store-address" />
                                </li>
                            </ul>
                        </div>
                        <div className='right-content'>
                            <ul className='nav'>
                                <div className='languages'>
                                    <i className='bx bx-globe' ></i>
                                    <span onClick={() => changeLanguage(LANGUAGES.VI)} className={lang === LANGUAGES.VI ? 'vietnam active' : 'vietnam'}>VI</span>
                                    <span onClick={() => changeLanguage(LANGUAGES.EN)} className={lang === LANGUAGES.EN ? 'english active' : 'english'}>EN</span>
                                </div>
                                <li>
                                    <i className='bx bx-headphone'></i>
                                    <FormattedMessage id='headerHome.contact' />
                                </li>
                                {
                                    !isLoggedInClient ?
                                        <li className='user_not-login'>
                                            <span
                                                onClick={() => handlePushSignUp()}
                                            >
                                                <FormattedMessage id='headerHome.signup' />
                                            </span>
                                            <span
                                                onClick={() => handlePushLogIn()}
                                            >
                                                <FormattedMessage id='headerHome.login' />
                                            </span>
                                        </li>
                                        :
                                        <li className='user_login'>
                                            <div className='wrap'>
                                                <span className='user_img'>
                                                    <img src={!_.isEmpty(clientInfo) ? clientInfo.image : undefined} alt='user' />
                                                </span>
                                                <span className='user_name'>{!_.isEmpty(clientInfo) && clientInfo.fullname}</span>
                                            </div>
                                            <ul className='user_box'>
                                                <li>
                                                    <NavLink to={path.ACCOUNT} activeClassName="active" exact={true}>
                                                        Tài khoản
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to={path.ORDERS} activeClassName="active" exact={true}>
                                                        Đơn hàng
                                                    </NavLink>
                                                </li>
                                                <li onClick={(e) => handleClickLogout(e)}><a>Đăng xuất</a></li>
                                            </ul>
                                        </li>
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='header_home'>
                        <div
                            onClick={() => handleClickLogoHome()}
                            className='logo'>
                            <img src={logo} alt='logo-xedapxanh' />
                        </div>

                        <div
                            onFocus={() => setIsFocus(true)}
                            className={`${isFocus ? 'search active' : 'search'}`}>
                            <div
                                className='search_wrap'>
                                <FormattedMessage id='headerHome.search'>
                                    {(msg) => (<input
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder={msg} />)}
                                </FormattedMessage>
                                <i className='bx bx-search'></i>
                            </div>

                            <div
                                className='list_wrap'>
                                <CustomScrollbars>
                                    <ul className='listProduct-search'>
                                        {
                                            listAllBicycle && listAllBicycle.length > 0 &&
                                            listAllBicycle
                                                .filter((item) => item.name.match(new RegExp(search, "i")))
                                                .map(item => (
                                                    <li key={item.id}>
                                                        <div className='image-name'>
                                                            <div className='image-product'>
                                                                <img src={item.image} alt='product' />
                                                            </div>
                                                            <div className='name-product'>
                                                                {item.name}
                                                            </div>
                                                        </div>
                                                        <div className='price'>
                                                            <NumberFormat
                                                                value={item.price_new}
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
                                </CustomScrollbars>
                            </div>
                        </div>

                        <div className='news'>
                            <span className='news_icon'>
                                <i className='bx bx-news' ></i>
                                <FormattedMessage id="headerHome.news" />
                            </span>
                        </div>
                        <div className='cart'>
                            <div className='cart_wrap'>
                                <span className='cart_icon'>
                                    <i className='bx bx-cart'></i>
                                    <FormattedMessage id="headerHome.cart" />
                                    <span className='amount'>{listAllCart.length}</span>
                                </span>
                                <div className='cart_info'>
                                    {
                                        listAllCart && listAllCart.length > 0 ?
                                            <div className='cart_have-product'>
                                                <h5>Danh sách sản phẩm</h5>
                                                <CustomScrollbars style={{ height: '250px', width: '100%' }}>
                                                    <ul className='product_list'>
                                                        {
                                                            listAllCart && listAllCart.length > 0 &&
                                                            listAllCart.map(item => (
                                                                <li key={item.id} className='product_list-item'>
                                                                    <div className='product_img'>
                                                                        <img src={
                                                                            item.productData && !_.isEmpty(item.productData) && item.productData.image
                                                                        } alt='product' />
                                                                    </div>
                                                                    <div className='product_info'>
                                                                        <div className='product_title'>
                                                                            {
                                                                                item.productData && !_.isEmpty(item.productData) && item.productData.name
                                                                            }
                                                                        </div>

                                                                        <div className='product_price'>
                                                                            <span className='old_price'>
                                                                                <NumberFormat
                                                                                    value=
                                                                                    {
                                                                                        item.productData && !_.isEmpty(item.productData) && item.productData.price_old
                                                                                    }
                                                                                    className="foo"
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={true}
                                                                                    suffix={'VND'}
                                                                                />
                                                                            </span>
                                                                            <span className='new_price'>
                                                                                <NumberFormat
                                                                                    value=
                                                                                    {
                                                                                        item.productData && !_.isEmpty(item.productData) && item.productData.price_new
                                                                                    }
                                                                                    className="foo"
                                                                                    displayType={'text'}
                                                                                    thousandSeparator={true}
                                                                                    suffix={'VND'}
                                                                                />
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </CustomScrollbars>
                                                <button
                                                    onClick={() => handleClickViewCart()}
                                                    className='btn btn-view_cart'>
                                                    <FormattedMessage id="headerHome.view-cart" />
                                                </button>

                                                <button
                                                    onClick={() => handleClickCheckout()}
                                                    className='btn btn-checkout'>
                                                    <FormattedMessage id="headerHome.checkout" />
                                                </button>
                                            </div>
                                            :
                                            <div className='cart_not-product'>
                                                <div className='cart_not-product-img'>
                                                    <img src={shoppingBag} alt='shopping-bag' />
                                                </div>
                                                <span>Chưa có sản phẩm trong giỏ hàng</span>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Header