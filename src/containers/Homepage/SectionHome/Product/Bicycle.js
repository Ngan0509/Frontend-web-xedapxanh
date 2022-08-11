import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from '../../ArrowButtons/ArrowButtons'

import Header from "../../HeaderHome/Header"
import Footer from "../../FooterHome/Footer"
import Knowledge from "../Knowledge"

import '../../Homepage.scss'
import './Bicycle.scss'
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";

import React, { useEffect, useState, useMemo } from 'react';
import PaginatedItems from './ProductList/Pagination';
function Bicycle() {
    const lang = useSelector(selectors.selectorLanguages)
    const allBicycleData = useSelector(selectors.selectorAllBicycleData)
    const allFilterData = useSelector(selectors.selectorAllFilterData)
    const allCodeData = useSelector(selectors.selectorAllcodeData)
    const categoryData = useSelector(selectors.selectorCategoryData)


    const dispatch = useDispatch()
    let history = useHistory();
    let { id } = useParams();

    const [category, setCategory] = useState('')

    useEffect(() => {
        dispatch(actions.fetchCategoryStart('BICYCLE'))
    }, [dispatch])

    useEffect(() => {
        categoryData.forEach(item => {
            let cate = ''
            if (String(item.id) === id) {
                cate = lang === LANGUAGES.VI ? item.nameVi : item.nameEn
                setCategory(cate)
            }
        })
    }, [category, categoryData, lang])

    useEffect(() => {
        dispatch(actions.fetchAllcodeStart())
        dispatch(actions.fetchAllBicycleStart(id))
        dispatch(actions.fetchAllFilterStart(id))
    }, [id, dispatch])

    const [listAllBicycle, setListAllBicycle] = useState([]);
    const [listAllFilter, setListAllFilter] = useState([]);

    const refs = useMemo(() => allFilterData.map(() => React.createRef()), [allFilterData]);
    // console.log("listAllBicycle", listAllBicycle)
    // console.log("listAllFilter", listAllFilter)

    // get AllBicycle
    useEffect(() => {
        setListAllBicycle(allBicycleData)
    }, [allBicycleData])

    // get AllFilter
    useEffect(() => {
        let result = allFilterData.map((item) => {
            let arrayType = []
            if (item.type === 'PRICESPACE') {
                arrayType = allCodeData.listPriceSpace
            } else if (item.type === 'BRAND') {
                arrayType = allCodeData.listBrand
            } else if (item.type === 'USETARGET') {
                arrayType = allCodeData.listUseTarget
            } else if (item.type === 'WEELSIZE') {
                arrayType = allCodeData.listWeelSize
            } else if (item.type === 'FRAMEMATERIAL') {
                arrayType = allCodeData.listFrameMaterial
            } else if (item.type === 'RIDERHEIGHT') {
                arrayType = allCodeData.listRiderHeight
            } else if (item.type === 'BRAKE') {
                arrayType = allCodeData.listBrake
            } else if (item.type === 'DISKNUMBER') {
                arrayType = allCodeData.listDiskNumber
            } else if (item.type === 'UTILITIES') {
                arrayType = allCodeData.listUtilities
            }
            return {
                ...item,
                arrayType
            }
        })
        setListAllFilter(result)
    }, [allFilterData, allCodeData])

    // Click show filter-box
    const handleClickShowFilterBox = (e) => {
        e.stopPropagation()
        refs.forEach((item) => {
            if (item.current !== e.currentTarget) {
                if (item.current.classList.contains('active')) {
                    item.current.classList.remove('active')
                }
            }
        })
        if (!e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.add('active')
        } else {
            e.currentTarget.classList.remove('active')
        }
    }

    const handleHideFilterBox = () => {
        refs.forEach((item) => {
            if (item.current.classList.contains('active')) {
                item.current.classList.remove('active')
            }
        })
    }

    let result = []
    let listResult = []
    let listResultEnd = []
    const handleFilterByKeyMap = (itemFilter, e) => {
        // console.log(itemFilter)
        if (!e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.add('active')
            result.push(itemFilter)
            result.forEach(itemFilter => {
                let arr = [...listAllBicycle]
                if (itemFilter.type === 'BRAND') {
                    arr = arr.filter((item) => item.brand_id === itemFilter.keyMap)
                }
                if (itemFilter.type === 'PRICESPACE') {
                    arr = arr.filter((item) => item.price_space_id === itemFilter.keyMap)
                }
                listResult.push(...arr)
            })


        } else {
            e.currentTarget.classList.remove('active')
            result = result.filter(item => item !== itemFilter.keyMap)
        }

        const menuItems = [...new Set(listResult.map((item) => item))];
        console.log("menuItems", menuItems)
        // console.log("result", result)
        // console.log("listResult", listResult)

    }

    const handleClickLogoHome = () => {
        history.push("/home");
    }

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
            <div className="bicycle_bg">
                <div className="bicycle">
                    <div className='link'>
                        <span
                            onClick={() => handleClickLogoHome()}
                            className='home-link'>Home</span>/
                        <span className='bicycle-link'>{category}</span>
                    </div>
                    <div className="bicycle_filter">
                        {
                            listAllFilter && listAllFilter.length > 0 &&
                            listAllFilter.map((item, i) => (
                                <div
                                    key={item.id}
                                    className="item">
                                    <span
                                        ref={refs[i]}
                                        onClick={(e) => handleClickShowFilterBox(e)}
                                        className="filter_label">
                                        {
                                            lang === LANGUAGES.VI ? item.nameVi : item.nameEn
                                        }
                                        <span className='icon-arrow'>
                                            <i className='bx bxs-down-arrow'></i>
                                        </span>
                                    </span>

                                    <div className={`${i > 4 && i < 8 ? 'filter_box right' : 'filter_box left'}`}>
                                        <div className='filter_box-wrap'>
                                            {
                                                item.arrayType && item.arrayType.length > 0 &&
                                                item.arrayType.map((itemChild) => (
                                                    <span
                                                        onClick={(e) => handleFilterByKeyMap(itemChild, e)}
                                                        key={itemChild.id} className="filter_label-child">
                                                        {
                                                            lang === LANGUAGES.VI ? itemChild.valueVi : itemChild.valueEn
                                                        }
                                                    </span>
                                                ))
                                            }
                                            <span
                                                onClick={() => handleHideFilterBox()}
                                                className='icon-close'>
                                                <i className='bx bx-x-circle'></i>
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    <div className="bicycle_filter-more">
                        <div className="bicycle_amount">
                            <span>403</span>
                            Xe đạp
                        </div>
                        <div className="bicycle_discout">
                            <input type='checkbox' id='discout' value='discout' />
                            <label htmlFor="discout"><FormattedMessage id="bicycle-manage.discout" /></label>
                        </div>
                    </div>

                    <PaginatedItems itemsPerPage={8} items={listAllBicycle} />
                </div>
            </div>
            <Knowledge settings={settings} />
            <Footer />
        </div>
    )
}

export default Bicycle