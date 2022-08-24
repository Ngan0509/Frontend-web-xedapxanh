import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'
import "./Cart.scss"
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

function CheckoutDetails() {
    const lang = useSelector(selectors.selectorLanguages)

    const dispatch = useDispatch()
    let history = useHistory();

    // const handleClickPushPage = (item) => {

    // }
    return (
        <div id="CheckoutDetails">
            <div className="checkoutDetails_bg">
                <div className="checkoutDetails">
                    CheckoutDetails
                </div>
            </div>
        </div>
    )
}

export default CheckoutDetails