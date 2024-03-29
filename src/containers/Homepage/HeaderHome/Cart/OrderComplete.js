import { useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
// import * as actions from "../../../../store/actions";
// import { LANGUAGES } from '../../../../utils/constant'
import "./Cart.scss"
import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import * as userService from '../../../../services/userService'
import _ from 'lodash';

function OrderComplete({ onGetAllCartData }) {
    // const lang = useSelector(selectors.selectorLanguages)
    const clientInfoSelect = useSelector(selectors.selectorClientInfo)

    // const dispatch = useDispatch()
    // let history = useHistory();

    let location = useLocation()

    const [notify, setNotify] = useState(`Bạn cần phải xác nhận đơn hàng trong email ${clientInfoSelect && !_.isEmpty(clientInfoSelect) && clientInfoSelect.email} sau khi thanh toán`)

    useEffect(() => {
        async function fetchData() {
            // You can await here
            if (location && location.search) {
                let urlParams = new URLSearchParams(location.search)
                let token = urlParams.get('token')
                let statusId = 'S1'
                let resp = await userService.handleUpdateStatusIdCheckout({ token, statusId })
                if (resp && resp.errCode === 0) {
                    setNotify('Đặt hàng thành công')
                    localStorage.removeItem("arrCart")
                    onGetAllCartData()
                } else {
                    alert(resp.errMessage)
                }
            }
            // ...
        }
        fetchData();
    }, [location, onGetAllCartData])
    // const handleClickPushPage = (item) => {

    // }
    return (
        <div id="OrderComplete">
            <div className="orderComplete_bg">
                <div className="orderComplete">
                    <h5 className='notify'>{notify}</h5>
                </div>
            </div>
        </div>
    )
}

export default OrderComplete