// import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import * as selectors from "../../../store/selectors"
// import * as actions from "../../../store/actions";
// import { LANGUAGES } from '../../../utils/constant'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from '../ArrowButtons/ArrowButtons'
import Slider from "react-slick";
import "./Knowledge.scss"
import know from "../../../assets/images/NVL-ĐN.jpg"

function Knowledge() {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    let settingsArrow = {
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    }

    settings = { ...settings, ...settingsArrow }

    return (
        <div id="Knowledge">
            <div className="knowledge_bg">
                <div className="knowledge">
                    <h3><FormattedMessage id="headerHome.news" /></h3>
                    <div className="row">
                        <Slider {...settings}>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        1 Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        2 Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        3 Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        4 Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        5 Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        6 Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        7 Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        8 Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Knowledge