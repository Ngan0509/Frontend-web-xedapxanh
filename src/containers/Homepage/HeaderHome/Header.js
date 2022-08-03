import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import './Header.scss'
import logo from '../../../assets/images/logo-xe-dap.png'
import avatar from '../../../assets/images/avatar.webp'
import shoppingBag from '../../../assets/images/shopping-bag.png'

import CustomScrollbars from '../../../components/CustomScrollbars';

function Header() {
    const lang = useSelector(selectors.selectorLanguages)

    const dispatch = useDispatch()

    const changeLanguage = (language) => {
        dispatch(actions.changeLanguageApp(language))
    }

    let history = useHistory();

    const handleClickAdmin = () => {
        history.push("/system/admin");
    }

    const handleClickShipper = () => {
        history.push("/system/shipper");
    }
    return (
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
                            <li className='user_not-login'>
                                <span><FormattedMessage id='headerHome.signup' /></span>
                                <span><FormattedMessage id='headerHome.login' /></span>
                            </li>
                            {/* <li className='user_login'>
                                <span className='user_img'>
                                    <img src={avatar} alt='user' />
                                </span>
                                <span className='user_name'>Lê Ngân</span>
                            </li> */}
                        </ul>
                    </div>
                </div>
                <div className='header_home'>
                    <div className='logo'>
                        <img src={logo} alt='logo-xedapxanh' />
                    </div>

                    <div className='search'>
                        <FormattedMessage id='headerHome.search'>
                            {(msg) => (<input placeholder={msg} />)}
                        </FormattedMessage>
                        <i className='bx bx-search'></i>
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
                                <span className='amount'>3</span>
                            </span>
                            <div className='cart_info'>
                                {/* <div className='cart_not-product'>
                                    <div className='cart_not-product-img'>
                                        <img src={shoppingBag} alt='shopping-bag' />
                                    </div>
                                    <span>Chưa có sản phẩm trong giỏ hàng</span>
                                </div> */}
                                <div className='cart_have-product'>
                                    <CustomScrollbars style={{ height: '300px', width: '100%' }}>
                                        <ul className='product_list'>
                                            <li className='product_list-item'>
                                                <div className='product_img'>
                                                    <img src={shoppingBag} alt='product' />
                                                </div>
                                                <div className='product_info'>
                                                    <div className='product_title'>
                                                        MTB Gammax 24-JIEBAO-3.0-21S
                                                    </div>
                                                    <div className='product_label'>
                                                        <span className='wheel'>Bánh 24</span>
                                                        <span className='frames'>Sườn thép</span>
                                                    </div>
                                                    <div className='product_price'>
                                                        <span className='old_price'>5.190.000</span>
                                                        <span className='new_price'>4.152.000₫</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='product_list-item'>
                                                <div className='product_img'>
                                                    <img src={shoppingBag} alt='product' />
                                                </div>
                                                <div className='product_info'>
                                                    <div className='product_title'>
                                                        MTB Gammax 24-JIEBAO-3.0-21S
                                                    </div>
                                                    <div className='product_label'>
                                                        <span className='wheel'>Bánh 24</span>
                                                        <span className='frames'>Sườn thép</span>
                                                    </div>
                                                    <div className='product_price'>
                                                        <span className='old_price'>5.190.000</span>
                                                        <span className='new_price'>4.152.000₫</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='product_list-item'>
                                                <div className='product_img'>
                                                    <img src={shoppingBag} alt='product' />
                                                </div>
                                                <div className='product_info'>
                                                    <div className='product_title'>
                                                        MTB Gammax 24-JIEBAO-3.0-21S
                                                    </div>
                                                    <div className='product_label'>
                                                        <span className='wheel'>Bánh 24</span>
                                                        <span className='frames'>Sườn thép</span>
                                                    </div>
                                                    <div className='product_price'>
                                                        <span className='old_price'>5.190.000</span>
                                                        <span className='new_price'>4.152.000₫</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='product_list-item'>
                                                <div className='product_img'>
                                                    <img src={shoppingBag} alt='product' />
                                                </div>
                                                <div className='product_info'>
                                                    <div className='product_title'>
                                                        MTB Gammax 24-JIEBAO-3.0-21S
                                                    </div>
                                                    <div className='product_label'>
                                                        <span className='wheel'>Bánh 24</span>
                                                        <span className='frames'>Sườn thép</span>
                                                    </div>
                                                    <div className='product_price'>
                                                        <span className='old_price'>5.190.000</span>
                                                        <span className='new_price'>4.152.000₫</span>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className='product_list-item'>
                                                <div className='product_img'>
                                                    <img src={shoppingBag} alt='product' />
                                                </div>
                                                <div className='product_info'>
                                                    <div className='product_title'>
                                                        MTB Gammax 24-JIEBAO-3.0-21S
                                                    </div>
                                                    <div className='product_label'>
                                                        <span className='wheel'>Bánh 24</span>
                                                        <span className='frames'>Sườn thép</span>
                                                    </div>
                                                    <div className='product_price'>
                                                        <span className='old_price'>5.190.000</span>
                                                        <span className='new_price'>4.152.000₫</span>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </CustomScrollbars>
                                    <button className='btn btn-view_cart'>
                                        <FormattedMessage id="headerHome.view-cart" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header