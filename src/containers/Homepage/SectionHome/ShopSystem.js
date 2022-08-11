// import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import * as selectors from "../../../store/selectors"
// import * as actions from "../../../store/actions";
// import { LANGUAGES } from '../../../utils/constant'

import "./ShopSystem.scss"
import shoppingBag from '../../../assets/images/shopping-bag.png'

function ShopSystem() {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()

    return (
        <div id="ShopSystem">
            <div className="shopSystem_bg">
                <div className="shopSystem">
                    <h3><FormattedMessage id="headerHome.store-system" /></h3>

                    <div className="row">
                        <div className="col">
                            <div className="shopSystem_item">
                                <div className="shopSystem_image">
                                    <img src={shoppingBag} alt="shopSystem" />
                                </div>
                                <div className="shopSystem_info">
                                    <div className="city">
                                        TP.Hồ Chí Minh
                                    </div>
                                    <div className="tel">
                                        Tel: 028.3535.2458
                                    </div>
                                    <div className="address">
                                        458 Nguyễn Thị Thập, phường Tân Quy, Quận 7, TP. Hồ Chí Minh
                                    </div>
                                    <div className="time">
                                        Thứ 2 - Chủ nhật: 9 AM - 9 PM
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="shopSystem_item">
                                <div className="shopSystem_image">
                                    <img src={shoppingBag} alt="shopSystem" />
                                </div>
                                <div className="shopSystem_info">
                                    <div className="city">
                                        TP.Hồ Chí Minh
                                    </div>
                                    <div className="tel">
                                        Tel: 028.3535.2458
                                    </div>
                                    <div className="address">
                                        458 Nguyễn Thị Thập, phường Tân Quy, Quận 7, TP. Hồ Chí Minh
                                    </div>
                                    <div className="time">
                                        Thứ 2 - Chủ nhật: 9 AM - 9 PM
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="shopSystem_item">
                                <div className="shopSystem_image">
                                    <img src={shoppingBag} alt="shopSystem" />
                                </div>
                                <div className="shopSystem_info">
                                    <div className="city">
                                        TP.Hồ Chí Minh
                                    </div>
                                    <div className="tel">
                                        Tel: 028.3535.2458
                                    </div>
                                    <div className="address">
                                        458 Nguyễn Thị Thập, phường Tân Quy, Quận 7, TP. Hồ Chí Minh
                                    </div>
                                    <div className="time">
                                        Thứ 2 - Chủ nhật: 9 AM - 9 PM
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopSystem