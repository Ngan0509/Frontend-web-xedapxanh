import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../../store/selectors"
// import * as actions from "../../../../../store/actions";
import { LANGUAGES } from '../../../../../utils/constant'
import { useParams } from 'react-router';

// import Slider from "react-slick";
import _ from 'lodash'
import logoTempest from '../../../../../assets/images/E6TkEIRUcAMnlfa.jpg'
import './ProductList.scss'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";

function ProductList(props) {
    const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()
    let history = useHistory();

    let { id } = useParams()
    const { items } = props
    console.log("items", items)

    const handleClickPushDetailBicycle = (item) => {
        history.push(`/home/bicycle/detail/${item.id}`);
    }
    return (
        <div id="ProductList">
            <div className="productList">
                {
                    ((id === '1' || id === '2' || id === '3') &&
                        <div className='bicycleList'>
                            <div className="row">
                                {
                                    items && items.length > 0 &&
                                    items.map(item => (
                                        <div
                                            onClick={() => handleClickPushDetailBicycle(item)}
                                            key={item.id} className="col-3">
                                            <div className="productList_item">
                                                <div className='productList_item-wrap'>
                                                    <div className="image">
                                                        <img src={logoTempest} alt="productList_item" />
                                                    </div>

                                                    <div className='product_info'>
                                                        <div className="name">
                                                            {item.name}
                                                        </div>

                                                        <div className="label">
                                                            <span>
                                                                {
                                                                    item.weelSizeData && !_.isEmpty(item.weelSizeData) &&
                                                                        lang === LANGUAGES.VI ? item.weelSizeData.valueVi : item.weelSizeData.valueEn
                                                                }
                                                            </span>
                                                            <span>
                                                                {
                                                                    item.frameMaterialData && !_.isEmpty(item.frameMaterialData) &&
                                                                        lang === LANGUAGES.VI ? item.frameMaterialData.valueVi : item.frameMaterialData.valueEn
                                                                }
                                                            </span>
                                                        </div>

                                                        <div className="priceOld">
                                                            <span className="price">
                                                                <NumberFormat
                                                                    value={item.price_old}
                                                                    className="foo"
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={'VND'}
                                                                />
                                                            </span>
                                                            <span className="discout">{item.discout}%</span>
                                                        </div>

                                                        <div className="priceNew">
                                                            <span className="price">
                                                                <NumberFormat
                                                                    value={item.price_new}
                                                                    className="foo"
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={'VND'}
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='product_info-more'>
                                                    <div className="evaluate">
                                                        <span className="icon-star">
                                                            <i className='bx bxs-leaf'></i>
                                                        </span>
                                                        <span className="icon-star">
                                                            <i className='bx bxs-leaf'></i>
                                                        </span>
                                                        <span className="icon-star">
                                                            <i className='bx bxs-leaf'></i>
                                                        </span>
                                                        <span className="icon-star">
                                                            <i className='bx bxs-leaf'></i>
                                                        </span>
                                                        <span className="icon-star">
                                                            <i className='bx bxs-leaf'></i>
                                                        </span>
                                                    </div>

                                                    <ul className="desc_list">
                                                        <li>
                                                            <FormattedMessage id="bicycle-manage.bike-type" />: &nbsp;
                                                            {
                                                                item.categoryData && !_.isEmpty(item.categoryData) &&
                                                                    lang === LANGUAGES.VI ? item.categoryData.valueVi : item.categoryData.valueEn
                                                            }
                                                        </li>
                                                        <li>
                                                            <FormattedMessage id="bicycle-manage.brake-type" />: &nbsp;
                                                            {
                                                                item.brakeData && !_.isEmpty(item.brakeData) &&
                                                                    lang === LANGUAGES.VI ? item.brakeData.valueVi : item.brakeData.valueEn
                                                            }
                                                        </li>
                                                        <li><FormattedMessage id="bicycle-manage.weight" />: 120kg</li>
                                                        <li><FormattedMessage id="bicycle-manage.origin" />: Việt Nam</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>)
                    ||
                    ((id === '4' || id === '5' || id === '6') &&
                        <div className='bicycleList'>
                            <div className="row">
                                {
                                    items && items.length > 0 &&
                                    items.map(item => (
                                        <div key={item.id} className="col-3">
                                            <div className="productList_item">
                                                <div className='productList_item-wrap'>
                                                    <div className="image">
                                                        <img src={logoTempest} alt="productList_item" />
                                                    </div>

                                                    <div className='product_info'>
                                                        <div className="name">
                                                            {item.name}
                                                        </div>

                                                        <div className="priceNew">
                                                            <span className="price">

                                                                <NumberFormat
                                                                    value={item.price_new}
                                                                    className="foo"
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={'VND'}
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>)
                }
            </div>
        </div>
    )
}

export default ProductList