// import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import * as selectors from "../../../../store/selectors"
// import * as actions from "../../../../store/actions";
// import { LANGUAGES } from '../../../../utils/constant'

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from '../../ArrowButtons/ArrowButtons'

import Header from "../../HeaderHome/Header"
import Category from "../../HeaderHome/Category"
import Knowledge from "../Knowledge"

import ProductList from "./ProductList/ProductList";
import '../../Homepage.scss'
import './Bicycle.scss'

function Bicycle() {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    let settingsArrow = {
        nextArrow: <SampleNextArrow slidesToShow={settings.slidesToShow} />,
        prevArrow: <SamplePrevArrow />
    }

    settings = { ...settings, ...settingsArrow }

    return (
        <div id="Bicycle">
            <Header />
            <Category />
            <div className="bicycle_bg">
                <div className="bicycle">
                    <div className="bicycle_filter">
                        <div className="item">
                            <span className="filter_label">Bộ lọc</span>
                            <div className="filter_box left">
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                            </div>
                        </div>

                        <div className="item">
                            <span className="filter_label">Bộ lọc</span>
                            <div className="filter_box ">
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                            </div>
                        </div>

                        <div className="item">
                            <span className="filter_label">Bộ lọc</span>
                            <div className="filter_box ">
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                            </div>
                        </div>

                        <div className="item">
                            <span className="filter_label">Bộ lọc</span>
                            <div className="filter_box ">
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                            </div>
                        </div>

                        <div className="item">
                            <span className="filter_label">Bộ lọc</span>
                            <div className="filter_box ">
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                            </div>
                        </div>

                        <div className="item">
                            <span className="filter_label">Bộ lọc</span>
                            <div className="filter_box ">
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                            </div>
                        </div>

                        <div className="item">
                            <span className="filter_label">Bộ lọc</span>
                            <div className="filter_box ">
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                            </div>
                        </div>

                        <div className="item">
                            <span className="filter_label">Bộ lọc</span>
                            <div className="filter_box ">
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                                <span className="filter_label">Lê Ngân</span>
                            </div>
                        </div>
                    </div>

                    <div className="bicycle_filter-more">
                        <div className="bicycle_amount">
                            <span>403</span>
                            Xe đạp
                        </div>
                        <div className="bicycle_discount">
                            <input type='checkbox' id='discount' value='discount' />
                            <label htmlFor="discount">Giảm giá</label>
                        </div>

                        <div className="bicycle_sort">
                            <select name="cars" id="cars">
                                <option value="" disabled selected hidden>Xếp theo: </option>
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                        </div>
                    </div>

                    <ProductList />
                </div>
            </div>
            <Knowledge settings={settings} />
        </div>
    )
}

export default Bicycle