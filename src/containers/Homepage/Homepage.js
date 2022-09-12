// import { useDispatch, useSelector } from 'react-redux';
// import * as selectors from "../../store/selectors"
// import { FormattedMessage } from 'react-intl';
// import * as actions from "../../store/actions";
// import { LANGUAGES } from '../../utils/constant'
// import { useEffect, useState } from 'react'

import Header from './HeaderHome/Header'
import Sliders from './HeaderHome/Sliders'
import Category from './HeaderHome/Category'
import AllBicycle from './SectionHome/AllBicycle'
import Knowledge from './SectionHome/Knowledge'
import ShopSystem from './SectionHome/ShopSystem'
import Footer from './FooterHome/Footer'

import './Homepage.scss'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from '../Homepage/ArrowButtons/ArrowButtons'

function Homepage() {
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
        <div id="Homepage">
            <Header />
            <Sliders />
            <Category />
            <AllBicycle />
            <Knowledge settings={settings} />
            <ShopSystem />
            <Footer />
        </div>

    )
}

export default Homepage