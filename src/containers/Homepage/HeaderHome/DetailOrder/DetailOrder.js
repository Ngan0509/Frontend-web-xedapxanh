import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"

import { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import Header from '../Header';
import '../../Homepage.scss'
import './DetailOrder.scss'
import _ from 'lodash';

import Notify from '../DetailOrder/Notify'
import Orders from '../DetailOrder/Orders'
import Account from '../DetailOrder/Account'
import avatar from '../../../../assets/images/avatar.webp'

import {
    NavLink
} from "react-router-dom";
import { path } from '../../../../utils'

function DetailOrder() {
    // const lang = useSelector(selectors.selectorLanguages)
    const clientInfoSelect = useSelector(selectors.selectorClientInfo)

    // const dispatch = useDispatch()
    // let history = useHistory();

    const [clientInfo, setClientInfo] = useState({});
    // get clientInfo
    useEffect(() => {
        setClientInfo(clientInfoSelect)
    }, [clientInfoSelect])

    return (
        <div id="DetailOrder">
            <Header />
            <div className="detailOrder_bg">
                <div className="detailOrder">
                    <div className='row'>
                        <div className='col-lg-3 category'>

                            <div className='user'>
                                <span className='user_img'>
                                    <img src={!_.isEmpty(clientInfo) ? clientInfo.image ? clientInfo.image : avatar : undefined} alt='user' />
                                </span>
                                <span className='user_name'>{!_.isEmpty(clientInfo) && clientInfo.fullname}</span>
                            </div>

                            <div className='topnav'>
                                <div className='account'>
                                    <NavLink to={path.ACCOUNT} activeClassName="active" exact={true}>
                                        <FormattedMessage id="order-manage.account" />
                                    </NavLink>
                                </div>
                                <div className='order'>
                                    <NavLink to={path.ORDERS} activeClassName="active" exact={true}>
                                        <FormattedMessage id="order-manage.order" />
                                    </NavLink>
                                </div>
                                <div className='notify'>
                                    <NavLink to={path.NOTIFY} activeClassName="active" exact={true}>
                                        <FormattedMessage id="order-manage.notify" />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-9 col-12 component'>
                            <div className='component_bg'>
                                <Switch>
                                    <Route path={path.ACCOUNT} component={(Account)} />
                                    <Route path={path.ORDERS} component={(Orders)} />
                                    <Route path={path.NOTIFY} component={(Notify)} />
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailOrder