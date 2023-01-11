// import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import * as selectors from "../../../../store/selectors"
// import * as actions from "../../../../store/actions";
// import { LANGUAGES } from '../../../../utils/constant'
import "./Cart.scss"
import { useState } from 'react';
import { Switch, Route } from "react-router-dom";
import Header from '../Header';
import '../../Homepage.scss'

import ShoppingCart from './ShoppingCart';
import CheckoutDetails from './CheckoutDetails';
import OrderComplete from './OrderComplete';
import {
    NavLink
} from "react-router-dom";
import { path } from '../../../../utils'

function Cart() {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()
    // let history = useHistory();

    // const handleClickPushPage = (item) => {

    // }

    const handleClick = (e) => {
        e.preventDefault()
    }

    const [listAllCart, setListAllCart] = useState(() => {
        const allCartData = JSON.parse(localStorage.getItem("arrCart")) || [];
        return allCartData;
    });

    const handleAllCartData = () => {
        setListAllCart(JSON.parse(localStorage.getItem("arrCart")) || []);
    }

    return (
        <div id="Cart">
            <Header allCartData={listAllCart} />
            <div className="cart_bg">
                <div className="cart">
                    <div className="topnav">
                        <NavLink to={path.SHOPPINGCART} activeClassName="active" exact={true}>
                            Shopping Cart
                        </NavLink>
                        <i className='bx bx-chevron-right'></i>
                        <NavLink to={path.CHECKOUTDETAILS} activeClassName="active">
                            Checkout Details
                        </NavLink>
                        <i className='bx bx-chevron-right'></i>
                        <NavLink onClick={handleClick} to={path.ORDERCOMPLETE} activeClassName="active">
                            Order Complete
                        </NavLink>
                    </div>

                    <Switch>
                        <Route path={path.SHOPPINGCART}>
                            <ShoppingCart
                                onGetAllCartData={handleAllCartData}
                                listAllCart={listAllCart}
                            />
                        </Route>
                        <Route path={path.CHECKOUTDETAILS}>
                            <CheckoutDetails listAllCart={listAllCart} />
                        </Route>
                        <Route path={path.ORDERCOMPLETE}>
                            <OrderComplete onGetAllCartData={handleAllCartData} />
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default Cart