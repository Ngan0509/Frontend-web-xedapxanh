// import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import * as selectors from "../../../../store/selectors"
// import * as actions from "../../../../store/actions";
// import { LANGUAGES } from '../../../../utils/constant'
// import { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";
import './news.scss'
import logo from '../../../../assets/images/logo-xe-dap.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState } from 'react';
import { useRef } from 'react';

function News() {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()
    // let history = useHistory();

    const sliders = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    }

    const moreFrom = {
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }

    const today_highlights_list = {
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
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
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }

    const what_trending_list = {
        slidesToShow: 4,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
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
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }

    const [isOpen, setIsOpen] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)

    const search = useRef()
    const handleShowSearchBox = () => {
        setIsOpen(state => !state)
        search.current.focus()
    }

    return (
        <div id="News">
            <div className="news_bg">
                <div className="news">
                    <div className="app">
                        <div id="header_news">
                            <div className="header_news-bg">
                                <div className="header_news">
                                    <div className="author">
                                        <div className="left_content">
                                            <div className="social_icon">
                                                <a href="/"><i className='bx bxl-facebook'></i></a>
                                                <a href="/"><i className='bx bxl-twitter'></i></a>
                                                <a href="/"><i className='bx bxl-instagram'></i></a>
                                                <a href="/"><i className='bx bxl-youtube'></i></a>
                                            </div>
                                            <div className="nav">
                                                <a href="/">About</a>
                                                <a href="/">Contact</a>
                                                <a href="/">Buy Bicycle</a>
                                            </div>
                                        </div>
                                        <div className="right_content">
                                            <div className="nav">
                                                <a href="/">Login</a>
                                                <a href="/">Register</a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="home">
                                        <div className="logo_wrap">
                                            <div className="menu">
                                                <span
                                                    onClick={() => setIsOpenMenu(state => !state)}
                                                    className="menu-icon">
                                                    <i className='bx bx-menu'></i>
                                                </span>
                                            </div>
                                            <a href="/">
                                                <div className="logo">
                                                    <img src={logo} alt="logo" />
                                                </div>
                                            </a>
                                        </div>

                                        <div className="nav_list">
                                            <div className="wrap">
                                                <span>Demos</span>
                                            </div>
                                            <div className="wrap">
                                                <span>Features</span>
                                            </div>
                                            <div className="wrap">
                                                <span>Lifestyle</span>
                                            </div>
                                            <div className="wrap">
                                                <span>Travel</span>
                                            </div>
                                            <div className="wrap">
                                                <span>About</span>
                                            </div>
                                            <div className="wrap">
                                                <span>Contact</span>
                                            </div>
                                        </div>

                                        <div className={`${isOpen ? "search-box open" : "search-box"}`}>
                                            <input type="text" ref={search} className="search-input" />
                                            <button
                                                onClick={() => handleShowSearchBox()}
                                                className="search-btn">
                                                <i className="fas fa-search"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className={`${isOpenMenu ? "nav_list-mobile show" : "nav_list-mobile"}`}>
                                        <div className="wrap">
                                            <span>Demos</span>
                                        </div>
                                        <div className="wrap">
                                            <span>Features</span>
                                        </div>
                                        <div className="wrap">
                                            <span>Lifestyle</span>
                                        </div>
                                        <div className="wrap">
                                            <span>Travel</span>
                                        </div>
                                        <div className="wrap">
                                            <span>About</span>
                                        </div>
                                        <div className="wrap">
                                            <span>Contact</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="slider_news">
                            <div className="slider_news">
                                <div className="sliders">
                                    <Slider {...sliders}>
                                        <div className="slider one">
                                            <div className="slider_bg">
                                                <div className="text">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>
                                                    <a href="/">
                                                        <h3 className="slider_title">Apple expands and updates its ‘Everyone Can Code’ program
                                                        </h3>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By <a href="/">Ecobike</a></span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="slider two">
                                            <div className="slider_bg">
                                                <div className="text">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>
                                                    <a href="/">
                                                        <h3 className="slider_title">Apple expands and updates its ‘Everyone Can Code’ program
                                                        </h3>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By <a href="/">Ecobike</a></span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="slider three">
                                            <div className="slider_bg">
                                                <div className="text">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>
                                                    <a href="/">
                                                        <h3 className="slider_title">Apple expands and updates its ‘Everyone Can Code’ program
                                                        </h3>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By <a href="/">Ecobike</a></span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                        <div id="section_news">
                            <div className="section_news">
                                <div className="list_top-title_bg">
                                    <div className="list_top-title same">
                                        <div className="row">
                                            <div className="col-lg-3 col-md-6 col-12">
                                                <div className="child">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>

                                                    <a href="/">
                                                        <h5 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                            program
                                                        </h5>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By Ecobike</span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-12">
                                                <div className="child">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>

                                                    <a href="/">
                                                        <h5 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                            program
                                                        </h5>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By Ecobike</span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-12">
                                                <div className="child">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>

                                                    <a href="/">
                                                        <h5 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                            program
                                                        </h5>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By Ecobike</span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-md-6 col-12">
                                                <div className="child">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>

                                                    <a href="/">
                                                        <h5 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                            program
                                                        </h5>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By Ecobike</span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="resent_bg">
                                    <div className="resent same">
                                        <div className="row">
                                            <div className="col-lg-7 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can
                                                                Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                            <p className="desc">Graduating from a top accelerator or incubator can be as
                                                                career-defining for a startup founder as an elite university
                                                                diploma.
                                                                The intensive programmes, which…</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-5 col-12">
                                                <div className="recent-list">
                                                    <h4 className="recent_title">Recent</h4>
                                                    <ul className="list">
                                                        <li>
                                                            <a href="/">
                                                                <h5 className="child_title">Apple expands and updates its ‘Everyone Can
                                                                    Code’
                                                                    program</h5>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <a href="/">
                                                                <h5 className="child_title">Apple expands and updates its ‘Everyone Can
                                                                    Code’
                                                                    program</h5>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <a href="/">
                                                                <h5 className="child_title">Apple expands and updates its ‘Everyone Can
                                                                    Code’
                                                                    program</h5>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <a href="/">
                                                                <h5 className="child_title">Apple expands and updates its ‘Everyone Can
                                                                    Code’
                                                                    program</h5>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </li>

                                                        <li>
                                                            <a href="/">
                                                                <h5 className="child_title">Apple expands and updates its ‘Everyone Can
                                                                    Code’
                                                                    program</h5>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="technology_bg">
                                    <div className="technology same">
                                        <h4 className="section_title">Technology</h4>
                                        <p>TOP OF THE WEEK NEWS</p>

                                        <div className="row technology_list">
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="child">
                                                    <div className="image">
                                                        {/* <img src="" alt="abc"/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/" className="tag">
                                                            <span className="dot"></span>
                                                            business
                                                        </a>
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                        <div className="info_other">
                                                            <span>By Ecobike</span>
                                                            <span className="dot"></span>
                                                            <span>November 21, 2019</span>
                                                            <span className="dot"></span>
                                                            <span>4 Mins read</span>
                                                        </div>
                                                        <p className="desc">Graduating from a top accelerator or incubator can be as
                                                            career-defining for a startup founder as an elite university diploma.
                                                            The intensive programmes, which…</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="child">
                                                    <div className="image">
                                                        {/* <img src="" alt="abc"> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/" className="tag">
                                                            <span className="dot"></span>
                                                            business
                                                        </a>
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                        <div className="info_other">
                                                            <span>By Ecobike</span>
                                                            <span className="dot"></span>
                                                            <span>November 21, 2019</span>
                                                            <span className="dot"></span>
                                                            <span>4 Mins read</span>
                                                        </div>
                                                        <p className="desc">Graduating from a top accelerator or incubator can be as
                                                            career-defining for a startup founder as an elite university diploma.
                                                            The intensive programmes, which…</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="child">
                                                    <div className="image">
                                                        {/* <img src="" alt="abc"/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/" className="tag">
                                                            <span className="dot"></span>
                                                            business
                                                        </a>
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                        <div className="info_other">
                                                            <span>By Ecobike</span>
                                                            <span className="dot"></span>
                                                            <span>November 21, 2019</span>
                                                            <span className="dot"></span>
                                                            <span>4 Mins read</span>
                                                        </div>
                                                        <p className="desc">Graduating from a top accelerator or incubator can be as
                                                            career-defining for a startup founder as an elite university diploma.
                                                            The intensive programmes, which…</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="child">
                                                    <div className="image">
                                                        {/* <img src="" alt="abc"/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/" className="tag">
                                                            <span className="dot"></span>
                                                            business
                                                        </a>
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                        <div className="info_other">
                                                            <span>By Ecobike</span>
                                                            <span className="dot"></span>
                                                            <span>November 21, 2019</span>
                                                            <span className="dot"></span>
                                                            <span>4 Mins read</span>
                                                        </div>
                                                        <p className="desc">Graduating from a top accelerator or incubator can be as
                                                            career-defining for a startup founder as an elite university diploma.
                                                            The intensive programmes, which…</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="child">
                                                    <div className="image">
                                                        {/* <img src="" alt="abc"/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/" className="tag">
                                                            <span className="dot"></span>
                                                            business
                                                        </a>
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                        <div className="info_other">
                                                            <span>By Ecobike</span>
                                                            <span className="dot"></span>
                                                            <span>November 21, 2019</span>
                                                            <span className="dot"></span>
                                                            <span>4 Mins read</span>
                                                        </div>
                                                        <p className="desc">Graduating from a top accelerator or incubator can be as
                                                            career-defining for a startup founder as an elite university diploma.
                                                            The intensive programmes, which…</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="child">
                                                    <div className="image">
                                                        {/* <img src="" alt="abc"/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/" className="tag">
                                                            <span className="dot"></span>
                                                            business
                                                        </a>
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                        <div className="info_other">
                                                            <span>By Ecobike</span>
                                                            <span className="dot"></span>
                                                            <span>November 21, 2019</span>
                                                            <span className="dot"></span>
                                                            <span>4 Mins read</span>
                                                        </div>
                                                        <p className="desc">Graduating from a top accelerator or incubator can be as
                                                            career-defining for a startup founder as an elite university diploma.
                                                            The intensive programmes, which…</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="today_highlights_bg">
                                    <div className="today_highlights same">
                                        <h4 className="section_title">Today Highlights</h4>
                                        <p>TOP OF THE WEEK</p>

                                        <div className="row today_highlights_list">
                                            <Slider {...today_highlights_list}>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                                <div className="art_culture_bg">
                                    <div className="art_culture same">
                                        <h4 className="section_title">Art & Culture</h4>
                                        <p>FROM ALL OVER THE WORLD</p>

                                        <div className="row art_culture_list">
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="selected_bg">
                                    <div className="selected same">
                                        <h4 className="section_title">Selected</h4>
                                        <p>BEST FOR YOU</p>

                                        <div className="row selected_list">
                                            <div className="col-lg-9 col-12">
                                                <div className="left_child">
                                                    <div className="image">
                                                        {/* <img src="" alt=""/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/" className="tag">
                                                            <span className="dot"></span>
                                                            business
                                                        </a>
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                        <div className="info_other">
                                                            <span>By Ecobike</span>
                                                            <span className="dot"></span>
                                                            <span>November 21, 2019</span>
                                                            <span className="dot"></span>
                                                            <span>4 Mins read</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-12">
                                                <div className="right_child">
                                                    <div className="image">
                                                        {/* <img src="" alt=""/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="right_child">
                                                    <div className="image">
                                                        {/* <img src="" alt=""/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="right_child">
                                                    <div className="image">
                                                        {/* <img src="" alt=""/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="travel_bg">
                                    <div className="travel same">
                                        <h4 className="section_title">Travel</h4>
                                        <p>WHERE ARE WE GOING</p>

                                        <div className="row travel_list">
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="enough_talk_bg">
                                    <div className="enough_talk same">
                                        <h4 className="enough_title">Enough Talk, Let's Build Something Together</h4>
                                        <p>Sync designers, developers, managers, contractors, and stakeholders in one cloud-based tool.
                                        </p>
                                        <button>Boost my website</button>

                                        <div className="image">
                                            <div className="image_bg">
                                                <div className="text">
                                                    <h5>Power your team with InHype</h5>
                                                    <div className="email_input">
                                                        <input type="text" placeholder="Please enter your email" />
                                                        <button>Subscrice</button>
                                                    </div>
                                                    <p>Add some text to explain benefits of subscripton on your services.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="categories_bg">
                                    <div className="categories same">
                                        <h4 className="section_title">Categories</h4>
                                        <p>FEATURED POSTS</p>

                                        <div className="row categories_list">
                                            <div className="col-lg-3 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <p>5 posts</p>
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                        </div>
                                                        <a href="/" className="view-post">View posts</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <p>5 posts</p>
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                        </div>
                                                        <a href="/" className="view-post">View posts</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <p>5 posts</p>
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                        </div>
                                                        <a href="/" className="view-post">View posts</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-3 col-12">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <p>5 posts</p>
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                        </div>
                                                        <a href="/" className="view-post">View posts</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="more-from_bg">
                                    <div className="row more-from same">
                                        <Slider {...moreFrom}>
                                            <div className="col child">
                                                <div className="row">
                                                    <div className="col-lg-6 col-12">
                                                        <h4 className="section_title">More from InHype</h4>
                                                        <p>OUR BEST STUFF FOR PRODUCT DESIGNERS</p>

                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h3 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h3>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-12">
                                                        <div className="image">
                                                            <img src="https://wp.wp-preview.com/inhype/inhype-1/wp-content/uploads/2019/11/inhype1-photos-10-555x360.jpg"
                                                                alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col child">
                                                <div className="row">
                                                    <div className="col-lg-6 col-12">
                                                        <h4 className="section_title">More from InHype</h4>
                                                        <p>OUR BEST STUFF FOR PRODUCT DESIGNERS</p>

                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h3 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h3>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-12">
                                                        <div className="image">
                                                            <img src="https://wp.wp-preview.com/inhype/inhype-1/wp-content/uploads/2019/11/inhype1-photos-10-555x360.jpg"
                                                                alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col child">
                                                <div className="row">
                                                    <div className="col-lg-6 col-12">
                                                        <h4 className="section_title">More from InHype</h4>
                                                        <p>OUR BEST STUFF FOR PRODUCT DESIGNERS</p>

                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h3 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h3>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-12">
                                                        <div className="image">
                                                            <img src="https://wp.wp-preview.com/inhype/inhype-1/wp-content/uploads/2019/11/inhype1-photos-10-555x360.jpg"
                                                                alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                </div>
                                <div className="video_bg">
                                    <div className="video same">
                                        <h4 className="section_title">Video</h4>
                                        <p>SELECTED VIDEO POSTS</p>

                                        <div className="row video_list">
                                            <div className="col-lg-6 col-12 left_child">
                                                <div className="image">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-12 right_child">
                                                <div className="image one">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="image two">
                                                    <div className="image_bg">
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="selected_posts_bg">
                                    <div className="selected_posts same">
                                        <h4 className="section_title">Selected Posts</h4>
                                        <p>EDITOR'S PICKS</p>

                                        <div className="row selected_posts_list">
                                            <div className="col-lg-4 col-12">
                                                <div className="row1">
                                                    <div className="text">
                                                        <a href="/" className="tag">
                                                            <span className="dot"></span>
                                                            business
                                                        </a>
                                                        <a href="/">
                                                            <h4 className="child_title">A Design Lover’s Guide To Mexico City</h4>
                                                        </a>
                                                        <div className="info_other">
                                                            <span>By Ecobike</span>
                                                            <span className="dot"></span>
                                                            <span>November 21, 2019</span>
                                                            <span className="dot"></span>
                                                            <span>4 Mins read</span>
                                                        </div>
                                                        <p className="desc">Choosing an online appointment software that supports multiple
                                                            payment methods will make the whole process much easier and faster and your
                                                            customers…</p>
                                                    </div>
                                                </div>
                                                <div className="row row2">
                                                    <div className="col-lg-6 col-12">
                                                        <div className="child">
                                                            <div className="image">
                                                                <img src="" alt="" />
                                                            </div>
                                                            <div className="text">
                                                                <a href="/">
                                                                    <h4 className="child_title">Apple expands and updates its ‘Everyone Can
                                                                        Code’
                                                                        program</h4>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6 col-12">
                                                        <div className="child">
                                                            <div className="image">
                                                                <img src="" alt="" />
                                                            </div>
                                                            <div className="text">
                                                                <a href="/">
                                                                    <h4 className="child_title">Apple expands and updates its ‘Everyone Can
                                                                        Code’
                                                                        program</h4>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-12">
                                                <div className="child">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>

                                                    <a href="/">
                                                        <h5 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                            program
                                                        </h5>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By Ecobike</span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                                <div className="child">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>

                                                    <a href="/">
                                                        <h5 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                            program
                                                        </h5>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By Ecobike</span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                                <div className="child">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>

                                                    <a href="/">
                                                        <h5 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                            program
                                                        </h5>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By Ecobike</span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                                <div className="child">
                                                    <a href="/" className="tag">
                                                        <span className="dot"></span>
                                                        business
                                                    </a>

                                                    <a href="/">
                                                        <h5 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                            program
                                                        </h5>
                                                    </a>
                                                    <div className="info_other">
                                                        <span>By Ecobike</span>
                                                        <span className="dot"></span>
                                                        <span>November 21, 2019</span>
                                                        <span className="dot"></span>
                                                        <span>4 Mins read</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-12">
                                                <div className="row3">
                                                    <div className="image">
                                                        {/* <img src="" alt="abc"/> */}
                                                    </div>
                                                    <div className="text">
                                                        <a href="/" className="tag">
                                                            <span className="dot"></span>
                                                            business
                                                        </a>
                                                        <a href="/">
                                                            <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                program</h4>
                                                        </a>
                                                        <div className="info_other">
                                                            <span>By Ecobike</span>
                                                            <span className="dot"></span>
                                                            <span>November 21, 2019</span>
                                                            <span className="dot"></span>
                                                            <span>4 Mins read</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="what_trending_bg">
                                    <div className="what_trending same">
                                        <h4 className="section_title">What's trending today</h4>
                                        <p>PEOPLE LOVE IT</p>

                                        <div className="row what_trending_list">
                                            <Slider {...what_trending_list}>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col">
                                                    <div className="child">
                                                        <div className="image">
                                                            {/* <img src="" alt="abc"/> */}
                                                        </div>
                                                        <div className="text">
                                                            <a href="/" className="tag">
                                                                <span className="dot"></span>
                                                                business
                                                            </a>
                                                            <a href="/">
                                                                <h4 className="child_title">Apple expands and updates its ‘Everyone Can Code’
                                                                    program</h4>
                                                            </a>
                                                            <div className="info_other">
                                                                <span>By Ecobike</span>
                                                                <span className="dot"></span>
                                                                <span>November 21, 2019</span>
                                                                <span className="dot"></span>
                                                                <span>4 Mins read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="footer_news">
                            <div className="footer_news-bg">
                                <div className="footer_news">
                                    <div className="row footer_content">
                                        <div className="col-lg-3 col-md-6 col-12 about">
                                            <h4>About</h4>
                                            <p>InHype effective News and Wordpress Blog and Magazine Theme - bestseller theme is perfect
                                                for blogging and excellent for a news, newspaper, magazine, publishing or review site.
                                            </p>
                                            <button>About</button>
                                        </div>
                                        <div className="col-lg-3 col-6 howitwork">
                                            <h4>How it works</h4>
                                            <ul>
                                                <li>
                                                    <a href="/">
                                                        Home
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        Contact
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        About
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        Cookie Policy
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        Shortcodes
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3 col-6 navigation">
                                            <h4>Navigation</h4>
                                            <ul>
                                                <li>
                                                    <a href="/">
                                                        Travel
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        Business
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        Lifestyle
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        Video
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="/">
                                                        Markets
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-12 subscribe">
                                            <h4>Subscribe</h4>
                                            <div className="subscr-box">
                                                <p>Get a bi-weekly digest newsletter</p>
                                                <p><input type="text" placeholder="Please enter your email" /></p>
                                                <button>Subscribe</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row footer_copyright">
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <p className="copyright">Powered by <a href="/">InHype</a> - News and Magazine Wordpress Blog
                                                Theme</p>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-12">
                                            <div className="social_icon">
                                                <a href="/"><i className='bx bxl-facebook'></i></a>
                                                <a href="/"><i className='bx bxl-twitter'></i></a>
                                                <a href="/"><i className='bx bxl-instagram'></i></a>
                                                <a href="/"><i className='bx bxl-youtube'></i></a>
                                            </div>
                                        </div>
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

export default News