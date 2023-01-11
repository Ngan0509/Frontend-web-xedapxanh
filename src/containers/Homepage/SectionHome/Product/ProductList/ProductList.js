import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../../store/selectors"
// import * as actions from "../../../../../store/actions";
import { LANGUAGES } from '../../../../../utils/constant'
import { useParams } from 'react-router';

// import Slider from "react-slick";
import _ from 'lodash'
import xedap from '../../../../../assets/images/RINCON-2-2022-grey-fix.jpg'
import './ProductList.scss'
import NumberFormat from 'react-number-format';
import { useHistory } from "react-router-dom";

function ProductList(props) {
    const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()
    let history = useHistory();

    let { id } = useParams()
    if (!id) {
        id = 'All'
    }
    const { items } = props

    const handleClickPushDetailBicycle = (item) => {
        history.push(`/home/bicycle/detail/${item.id}`);
    }

    const handleClickPushDetailAccessories = (item) => {
        history.push(`/home/accessories/detail/${item.id}`);
    }

    const arrStar = [{ num: 1, isYellow: false }, { num: 2, isYellow: false }, { num: 3, isYellow: false }, { num: 4, isYellow: false }, { num: 5, isYellow: false }]

    return (
        <div id="ProductList">
            <div className="productList">
                {
                    ((id === '1' || id === '2' || id === '3' || id === 'All') &&
                        <div className='bicycleList'>
                            <div className="row">
                                {
                                    items && items.length > 0 &&
                                    items.map(item => (
                                        <div
                                            onClick={() => handleClickPushDetailBicycle(item)}
                                            key={item.id} className="col-lg-3 col-md-4 col-sm-6 col">
                                            <div className="productList_item">
                                                <div className='productList_item-wrap'>
                                                    <div className="image">
                                                        <img src={(item.image) || xedap} alt="productList_item" />
                                                    </div>

                                                    <div className='product_info'>
                                                        <div className="name">
                                                            {
                                                                item.categoryData && !_.isEmpty(item.categoryData) &&
                                                                    lang === LANGUAGES.VI ? `${item.categoryData.valueVi} ${item.name}` : `${item.categoryData.valueEn} ${item.name}`
                                                            }
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
                                                    <div className='favorite'>
                                                        {
                                                            arrStar && arrStar.length > 0 &&
                                                            arrStar
                                                                .map(star => {
                                                                    if (item.num_star_avg > 0 && star.num <= item.num_star_avg) {
                                                                        star.isYellow = true
                                                                    } else {
                                                                        star.isYellow = false
                                                                    }
                                                                    return star
                                                                })
                                                                .map(star => (
                                                                    <span
                                                                        key={star.num} className={`${star.isYellow ? 'icon-star active' : 'icon-star'}`}>
                                                                        <i className='bx bxs-leaf'></i>
                                                                    </span>
                                                                ))
                                                        }
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
                                        <div
                                            onClick={() => handleClickPushDetailAccessories(item)}
                                            key={item.id} className="col-lg-3 col-md-4 col-sm-6 col">
                                            <div className="productList_item">
                                                <div className='productList_item-wrap'>
                                                    <div className="image">
                                                        <img src={(item.image) || xedap} alt="productList_item" />
                                                    </div>

                                                    <div className='product_info'>
                                                        <div className="name">
                                                            {
                                                                item.categoryData && !_.isEmpty(item.categoryData) &&
                                                                    lang === LANGUAGES.VI ? `${item.categoryData.valueVi} ${item.name}` : `${item.categoryData.valueEn} ${item.name}`
                                                            }
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