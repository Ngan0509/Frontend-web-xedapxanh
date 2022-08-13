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

import React, { useEffect, useState, useMemo, useRef } from 'react';
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

    const [saveFilters, setSaveFilters] = useState({
        brand_id: [],
        price_space_id: [],
        use_target_id: [],
        weel_size_id: [],
        frame_material_id: [],
        rider_height_id: [],
        brake_id: [],
        disk_number_id: [],
        utilities_id: []
    })

    let filters = useRef()
    filters.current = {
        brand_id: saveFilters.brand_id,
        price_space_id: saveFilters.price_space_id,
        use_target_id: saveFilters.use_target_id,
        weel_size_id: saveFilters.weel_size_id,
        frame_material_id: saveFilters.frame_material_id,
        rider_height_id: saveFilters.rider_height_id,
        brake_id: saveFilters.brake_id,
        disk_number_id: saveFilters.disk_number_id,
        utilities_id: saveFilters.utilities_id,
    }

    const filterKeys = Object.keys(filters.current)
    // console.log("filterKeys", filterKeys)
    console.log("filtersOut", filters.current)
    const handleFilterByKeyMap = (itemFilter, e) => {
        // console.log(itemFilter)
        if (!e.currentTarget.classList.contains('active')) {
            e.currentTarget.classList.add('active')

            itemFilter.type === 'BRAND' && filters.current.brand_id.push(itemFilter.keyMap)
            itemFilter.type === 'PRICESPACE' && filters.current.price_space_id.push(itemFilter.keyMap)
            itemFilter.type === 'USETARGET' && filters.current.use_target_id.push(itemFilter.keyMap)
            itemFilter.type === 'WEELSIZE' && filters.current.weel_size_id.push(itemFilter.keyMap)
            itemFilter.type === 'FRAMEMATERIAL' && filters.current.frame_material_id.push(itemFilter.keyMap)
            itemFilter.type === 'RIDERHEIGHT' && filters.current.rider_height_id.push(itemFilter.keyMap)
            itemFilter.type === 'BRAKE' && filters.current.brake_id.push(itemFilter.keyMap)
            itemFilter.type === 'DISKNUMBER' && filters.current.disk_number_id.push(itemFilter.keyMap)
            itemFilter.type === 'UTILITIES' && filters.current.utilities_id.push(itemFilter.keyMap)

            setSaveFilters({
                brand_id: filters.current.brand_id,
                price_space_id: filters.current.price_space_id,
                use_target_id: filters.current.use_target_id,
                weel_size_id: filters.current.weel_size_id,
                frame_material_id: filters.current.frame_material_id,
                rider_height_id: filters.current.rider_height_id,
                brake_id: filters.current.brake_id,
                disk_number_id: filters.current.disk_number_id,
                utilities_id: filters.current.utilities_id
            })

            const listResult = allBicycleData.filter(item => {
                let result = filterKeys.every(key => {
                    if (!filters.current[key].length) return true;

                    return filters.current[key].includes(item[key]);
                })
                if (checkedBoxArr.includes('discout')) {
                    return result && item.discout > 5
                }
                return result
            })
            if (sortSelect.id === 'desc') {
                listResult.sort((a, b) => {
                    let numA = parseInt(a.price_new, 10);
                    let numB = parseInt(b.price_new, 10);
                    return numB - numA;
                })
            }
            if (sortSelect.id === 'asc') {
                listResult.sort((a, b) => {
                    let numA = parseInt(a.price_new, 10);
                    let numB = parseInt(b.price_new, 10);
                    return numA - numB;
                })
            }

            if (sortSelect.id === '%discout') {
                listResult.sort((a, b) => {
                    let numA = parseInt(a.discout, 10);
                    let numB = parseInt(b.discout, 10);
                    return numB - numA;
                })
            }
            setListAllBicycle(listResult)
            // console.log("listResult1", listResult)


        } else {
            e.currentTarget.classList.remove('active')

            if (itemFilter.type === "BRAND" && filters.current.brand_id.indexOf(itemFilter.keyMap) > -1) {
                filters.current.brand_id = filters.current.brand_id.filter(item => item !== itemFilter.keyMap)
            }
            if (itemFilter.type === "PRICESPACE" && filters.current.price_space_id.indexOf(itemFilter.keyMap) > -1) {
                filters.current.price_space_id = filters.current.price_space_id.filter(item => item !== itemFilter.keyMap)
            }
            if (itemFilter.type === "USETARGET" && filters.current.use_target_id.indexOf(itemFilter.keyMap) > -1) {
                filters.current.use_target_id = filters.current.use_target_id.filter(item => item !== itemFilter.keyMap)
            }
            if (itemFilter.type === "WEELSIZE" && filters.current.weel_size_id.indexOf(itemFilter.keyMap) > -1) {
                filters.current.weel_size_id = filters.current.weel_size_id.filter(item => item !== itemFilter.keyMap)
            }
            if (itemFilter.type === "FRAMEMATERIAL" && filters.current.frame_material_id.indexOf(itemFilter.keyMap) > -1) {
                filters.current.frame_material_id = filters.current.frame_material_id.filter(item => item !== itemFilter.keyMap)
            }
            if (itemFilter.type === "RIDERHEIGHT" && filters.current.rider_height_id.indexOf(itemFilter.keyMap) > -1) {
                filters.current.rider_height_id = filters.current.rider_height_id.filter(item => item !== itemFilter.keyMap)
            }
            if (itemFilter.type === "BRAKE" && filters.current.brake_id.indexOf(itemFilter.keyMap) > -1) {
                filters.current.brake_id = filters.current.brake_id.filter(item => item !== itemFilter.keyMap)
            }
            if (itemFilter.type === "DISKNUMBER" && filters.current.disk_number_id.indexOf(itemFilter.keyMap) > -1) {
                filters.current.disk_number_id = filters.current.disk_number_id.filter(item => item !== itemFilter.keyMap)
            }
            if (itemFilter.type === "UTILITIES" && filters.current.utilities_id.indexOf(itemFilter.keyMap) > -1) {
                filters.current.utilities_id = filters.current.utilities_id.filter(item => item !== itemFilter.keyMap)
            }

            setSaveFilters({
                brand_id: filters.current.brand_id,
                price_space_id: filters.current.price_space_id,
                use_target_id: filters.current.use_target_id,
                weel_size_id: filters.current.weel_size_id,
                frame_material_id: filters.current.frame_material_id,
                rider_height_id: filters.current.rider_height_id,
                brake_id: filters.current.brake_id,
                disk_number_id: filters.current.disk_number_id,
                utilities_id: filters.current.utilities_id
            })

            const listResult = allBicycleData.filter(item => {
                let result = filterKeys.every(key => {
                    if (!filters.current[key].length) return true;

                    return filters.current[key].includes(item[key]);
                })
                if (checkedBoxArr.includes('discout')) {
                    return result && item.discout > 5
                }
                return result
            })
            if (sortSelect.id === 'desc') {
                listResult.sort((a, b) => {
                    let numA = parseInt(a.price_new, 10);
                    let numB = parseInt(b.price_new, 10);
                    return numB - numA;
                })
            }
            if (sortSelect.id === 'asc') {
                listResult.sort((a, b) => {
                    let numA = parseInt(a.price_new, 10);
                    let numB = parseInt(b.price_new, 10);
                    return numA - numB;
                })
            }

            if (sortSelect.id === '%discout') {
                listResult.sort((a, b) => {
                    let numA = parseInt(a.discout, 10);
                    let numB = parseInt(b.discout, 10);
                    return numB - numA;
                })
            }
            setListAllBicycle(listResult)
            // console.log("listResult2", listResult)

        }
        // const menuItems = [...new Set(listResult.map((item) => item))];
        // console.log("menuItems", menuItems)

    }
    const [checkedBoxArr, setCheckedBoxArr] = useState([])

    const handleCheckBox = (id) => {
        const isChecked = checkedBoxArr.includes(id)
        setCheckedBoxArr(prev => {
            if (isChecked) {
                return prev.filter((item) => item !== id)
            } else {
                return [...prev, id]
            }
        })
        const listResult = allBicycleData.filter(item => {
            let result = filterKeys.every(key => {
                if (!filters.current[key].length) return true;

                return filters.current[key].includes(item[key]);
            })

            if (!isChecked && id === 'discout') {
                return result && item.discout > 5
            }
            return result
        })
        if (sortSelect.id === 'desc') {
            listResult.sort((a, b) => {
                let numA = parseInt(a.price_new, 10);
                let numB = parseInt(b.price_new, 10);
                return numB - numA;
            })
        }
        if (sortSelect.id === 'asc') {
            listResult.sort((a, b) => {
                let numA = parseInt(a.price_new, 10);
                let numB = parseInt(b.price_new, 10);
                return numA - numB;
            })
        }

        if (sortSelect.id === '%discout') {
            listResult.sort((a, b) => {
                let numA = parseInt(a.discout, 10);
                let numB = parseInt(b.discout, 10);
                return numB - numA;
            })
        }
        setListAllBicycle(listResult)

    }

    const [sortSelect, setSortSelect] = useState({
        id: '',
        name: 'Nổi bật'
    })

    const handleClickSortSelect = (itemSort) => {
        setSortSelect({
            id: itemSort.id,
            name: itemSort.name
        })
        console.log(itemSort)
        const listResult = allBicycleData.filter(item => {
            let result = filterKeys.every(key => {
                if (!filters.current[key].length) return true;

                return filters.current[key].includes(item[key]);
            })
            if (checkedBoxArr.includes('discout')) {
                return result && item.discout > 5
            }
            return result
        })
        if (itemSort.id === 'desc') {
            listResult.sort((a, b) => {
                let numA = parseInt(a.price_new, 10);
                let numB = parseInt(b.price_new, 10);
                return numB - numA;
            })
        }
        if (itemSort.id === 'asc') {
            listResult.sort((a, b) => {
                let numA = parseInt(a.price_new, 10);
                let numB = parseInt(b.price_new, 10);
                return numA - numB;
            })
        }

        if (itemSort.id === '%discout') {
            listResult.sort((a, b) => {
                let numA = parseInt(a.discout, 10);
                let numB = parseInt(b.discout, 10);
                return numB - numA;
            })
        }

        setListAllBicycle(listResult)
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

    const selectSorts = [
        {
            id: 'outstanding',
            name: 'Nổi bật'
        },
        {
            id: 'new products',
            name: 'Hàng mới về'
        },
        {
            id: 'selling',
            name: 'Bán chạy'
        },
        {
            id: '%discout',
            name: '%Giảm giá'
        },
        {
            id: 'desc',
            name: 'Cao đến thấp'
        },
        {
            id: 'asc',
            name: 'Thấp đến cao'
        }
    ]

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
                            <span>{listAllBicycle.length}</span>
                            Xe đạp
                        </div>
                        <div className="bicycle_discout">
                            <input
                                type='checkbox'
                                checked={checkedBoxArr.includes('discout')}
                                onChange={() => handleCheckBox('discout')}
                                id='discout' />
                            <label
                                htmlFor="discout"><FormattedMessage id="bicycle-manage.discout" /></label>
                        </div>

                        <div className="sort-select ">
                            <p
                                onClick={(e) => handleClickShowFilterBox(e)}
                                className="click-sort">Xếp theo:
                                <span className="sort-show">
                                    {sortSelect.name}
                                </span>
                            </p>
                            <div className="sort-select-main">
                                {
                                    selectSorts && selectSorts.length > 0 &&
                                    selectSorts.map(item => (
                                        <p
                                            className={`${sortSelect.id === item.id ? 'active' : ''}`}
                                            key={item.id}
                                            onClick={() => handleClickSortSelect(item)}
                                        >
                                            {item.name}
                                        </p>
                                    ))
                                }
                            </div>
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