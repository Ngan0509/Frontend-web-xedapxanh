// import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import * as selectors from "../../../store/selectors"
// import * as actions from "../../../store/actions";
// import { LANGUAGES } from '../../../utils/constant'

import "./Sliders.scss"
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from '../ArrowButtons/ArrowButtons'
import slider1 from "../../../assets/images/800x200-800x200-49.png"
import slider2 from "../../../assets/images/800x200-800x200-11.png"

function Sliders() {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()

    let settings = {
        dots: true,
        infinite: true,

        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000
    };

    let settingsArrow = {
        nextArrow: <SampleNextArrow slidesToShow={settings.slidesToShow} />,
        prevArrow: <SamplePrevArrow />
    }

    settings = { ...settings, ...settingsArrow }

    return (
        <div id="Sliders">
            <div className="sliders_bg">
                <div className="sliders">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="row">
                                <Slider {...settings}>
                                    <div className="col-12">
                                        <div className="silder">
                                            <a href="/">
                                                <div className="silder_img">
                                                    <img src={slider1} alt="slider" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="silder">
                                            <a href="/">
                                                <div className="silder_img">
                                                    <img src={slider2} alt="slider" />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </Slider>
                            </div>
                        </div>
                        <div className="col-lg-4 hidden-xs">
                            <div className="row">
                                <div className="col-lg-12 col-md-6 col-sm-6">
                                    <div className="banner">
                                        <a href="/">
                                            <div className="banner_img">
                                                <img src={slider1} alt="slider" />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-12 col-md-6 col-sm-6">
                                    <div className="banner">
                                        <a href="/">
                                            <div className="banner_img">
                                                <img src={slider2} alt="slider" />
                                            </div>
                                        </a>
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

export default Sliders