import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
// import { LANGUAGES } from '../../../utils/constant'

import "./ShopSystem.scss"
import shoppingBag from '../../../assets/images/shopping-bag.png'

function ShopSystem() {
    // const lang = useSelector(selectors.selectorLanguages)
    const allStoreData = useSelector(selectors.selectorAllStoreData)

    const dispatch = useDispatch()

    // array
    const [listAllStore, setListAllStore] = useState([]);

    // dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllStoreStart('All'))
    }, [dispatch])

    // get AllStore
    useEffect(() => {
        setListAllStore(allStoreData)
    }, [allStoreData])

    return (
        <div id="ShopSystem">
            <div className="shopSystem_bg">
                <div className="shopSystem">
                    <h3><FormattedMessage id="headerHome.store-system" /></h3>

                    <div className="row">
                        {
                            listAllStore && listAllStore.length > 0 &&
                            listAllStore.map(item => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-12">
                                    <div className="shopSystem_item">
                                        <div className="shopSystem_image">
                                            <img src={shoppingBag} alt="shopSystem" />
                                        </div>
                                        <div className="shopSystem_info">
                                            <div className="city">
                                                {item.name}
                                            </div>
                                            <div className="tel">
                                                Tel: {item.phoneNumber}
                                            </div>
                                            <div className="address">
                                                {item.address}
                                            </div>
                                            <div className="time">
                                                Thứ 2 - Chủ nhật: 9 AM - 9 PM
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopSystem