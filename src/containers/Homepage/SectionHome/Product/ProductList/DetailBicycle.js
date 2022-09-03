import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../../store/selectors"
import * as actions from "../../../../../store/actions";
import * as userService from '../../../../../services/userService'

import { LANGUAGES } from '../../../../../utils/constant'
import { useParams } from 'react-router';
import { useHistory } from "react-router-dom";


import Header from '../../../HeaderHome/Header'
import Footer from '../../../FooterHome/Footer'
import '../../../Homepage.scss'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { SampleNextArrow, SamplePrevArrow } from '../../../ArrowButtons/ArrowButtons'
import _ from 'lodash'
import logoTempest from '../../../../../assets/images/E6TkEIRUcAMnlfa.jpg'
import './DetailBicycle.scss'
import NumberFormat from 'react-number-format';
import { useEffect, useState } from 'react';

function DetailBicycle() {
    const lang = useSelector(selectors.selectorLanguages)
    const categoryData = useSelector(selectors.selectorCategoryData)

    const dispatch = useDispatch()
    let history = useHistory();

    useEffect(() => {
        return () => {
            setCategory('')
            setDetailBicycle({})
            setIsShowMarkDown(false)
            setIsShowSpecification(false)
            setSo_luong(1)
            setNav1()
            setNav2()
        };
    }, []);

    let { id } = useParams()

    const [category, setCategory] = useState('')
    const [detailBicycle, setDetailBicycle] = useState({})

    useEffect(() => {
        dispatch(actions.fetchCategoryStart('BICYCLE'))
        dispatch(actions.fetchAllCartStart('All'))
    }, [dispatch])

    useEffect(() => {
        categoryData.forEach(item => {
            let cate = ''
            if (!_.isEmpty(detailBicycle)) {
                if (item.id === detailBicycle.category_id) {
                    cate = lang === LANGUAGES.VI ? item.nameVi : item.nameEn
                    setCategory(cate)
                }
            }
        })
    }, [category, categoryData, lang, detailBicycle])

    useEffect(() => {
        async function fetchData() {
            // You can await here
            let resp = await userService.handleGetDetailBicycle(id)
            if (resp && resp.errCode === 0 && resp.data) {
                setDetailBicycle(resp.data)
            } else {
                alert(resp.errMessage)
            }
            // ...
        }
        fetchData();
    }, [id])

    const handleClickLogoHome = () => {
        history.push("/home");
    }

    const [isShowMarkDown, setIsShowMarkDown] = useState(false)
    const [isShowSpecification, setIsShowSpecification] = useState(false)

    const handleClickViewMore = (id) => {
        id === 'markdown' && setIsShowMarkDown(state => !state)
        id === 'specification' && setIsShowSpecification(state => !state)

    }

    const [so_luong, setSo_luong] = useState(1)

    const handleClickMinus = () => {
        setIsClickAddCart(false)
        if (so_luong > 1) {
            setSo_luong(state => state - 1)
        }
    }

    const handleClickPlus = () => {
        setIsClickAddCart(false)
        setSo_luong(state => state + 1)
    }

    const [isClickAddCart, setIsClickAddCart] = useState(false)

    const handleCreateCart = async () => {
        setIsClickAddCart(true)
        const sum_price = detailBicycle.price_new * so_luong
        const data = {
            product_id: id,
            type: 'BICYCLE',
            so_luong,
            price: detailBicycle.price_new,
            sum_price
        }

        const resp = await userService.handleCreateNewCart(data)
        if (resp && resp.errCode === 0) {
            alert(`Đã thêm ${so_luong} sản phẩm vào giỏ hàng`)
        }
        dispatch(actions.fetchAllCartStart('All'))

    }

    const handleClickCheckout = async () => {
        if (isClickAddCart) {
            history.push("/home/cart/shoppingcart")
        } else {
            const sum_price = detailBicycle.price_new * so_luong
            const data = {
                product_id: id,
                type: 'BICYCLE',
                so_luong,
                price: detailBicycle.price_new,
                sum_price
            }

            const resp = await userService.handleCreateNewCart(data)
            if (resp && resp.errCode === 0) {
                history.push("/home/cart/shoppingcart")
            }
            dispatch(actions.fetchAllCartStart('All'))
        }
    }

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();
    return (
        <div id="DetailBicycle">
            <Header />
            <div className='detailBicycle_bg'>
                <div className='detailBicycle'>
                    <div className='link'>
                        <span
                            onClick={() => handleClickLogoHome()}
                            className='home-link'>Home</span>/
                        <span className='bicycle-link'>{category}</span>
                    </div>

                    <div className='infor_buy'>
                        <div className='row product_infor'>
                            <div className='col-5 image_product'>
                                <div className='row'>
                                    <Slider
                                        asNavFor={nav2} ref={c => setNav1(c)}
                                    >
                                        <div className='col'>
                                            <div className='image_slider-main'>
                                                <img src={logoTempest} alt='slider-main' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-main'>
                                                <img src={logoTempest} alt='slider-main' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-main'>
                                                <img src={logoTempest} alt='slider-main' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-main'>
                                                <img src={logoTempest} alt='slider-main' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-main'>
                                                <img src={logoTempest} alt='slider-main' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-main'>
                                                <img src={logoTempest} alt='slider-main' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-main'>
                                                <img src={logoTempest} alt='slider-main' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-main'>
                                                <img src={logoTempest} alt='slider-main' />
                                            </div>
                                        </div>
                                    </Slider>
                                </div>
                                <div className='row'>
                                    <Slider
                                        asNavFor={nav1}
                                        ref={c => setNav2(c)}
                                        slidesToShow={4}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        arrows={false}
                                    >
                                        <div className='col'>
                                            <div className='image_slider-child'>
                                                <img src={logoTempest} alt='slider-child' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-child'>
                                                <img src={logoTempest} alt='slider-child' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-child'>
                                                <img src={logoTempest} alt='slider-child' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-child'>
                                                <img src={logoTempest} alt='slider-child' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-child'>
                                                <img src={logoTempest} alt='slider-child' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-child'>
                                                <img src={logoTempest} alt='slider-child' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-child'>
                                                <img src={logoTempest} alt='slider-child' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-child'>
                                                <img src={logoTempest} alt='slider-child' />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className='image_slider-child'>
                                                <img src={logoTempest} alt='slider-child' />
                                            </div>
                                        </div>

                                    </Slider>
                                </div>
                            </div>
                            <div className='col-7 infor_buy-product'>
                                <div className='title_product'>
                                    <span>{category} {detailBicycle.name}</span>
                                </div>
                                <div className='price_product'>
                                    <div className="priceOld">
                                        <span className="price">
                                            <NumberFormat
                                                value={detailBicycle.price_old}
                                                className="foo"
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        </span>
                                        <span className="discout">{detailBicycle.discout}%</span>
                                    </div>

                                    <div className="priceNew">
                                        <span className="price">
                                            <NumberFormat
                                                value={detailBicycle.price_new}
                                                className="foo"
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className='numProduct_add-to-cart'>
                                    <div className='number_product'>
                                        <button
                                            onClick={() => handleClickMinus()}
                                            className='minus'>-</button>
                                        <span>{so_luong}</span>
                                        <button
                                            onClick={() => handleClickPlus()}
                                            className='plus'>+</button>
                                    </div>
                                    <button
                                        onClick={() => handleCreateCart()}
                                        className='add_to_cart'>Thêm vào giỏ</button>
                                </div>
                                <div className='promotion'>
                                    <div className='label'>
                                        KHUYẾN MÃI KHI MUA XE ĐẠP ONLINE
                                    </div>
                                    <ul className='list'>
                                        <li>Miễn phí giao hàng khi mua xe đạp</li>
                                        <li>Giảm 10% giá bán lẻ khi mua 3 món phụ kiện trở lên</li>
                                        <li>Giảm 15% giá bán lẻ khi mua 5 món phụ kiện trở lên</li>
                                        <li>Giảm 17% giá bán lẻ khi mua 7 món phụ kiện trở lên</li>
                                    </ul>
                                </div>
                                <button
                                    onClick={handleClickCheckout}
                                    className='buy_btn'>Mua ngay</button>
                            </div>
                        </div>
                        <div className='row product_infor_more'>
                            <div className='col-7 markdown'>
                                <h4>Thông tin mô tả</h4>
                                {
                                    !_.isEmpty(detailBicycle) && detailBicycle.markdownData && !_.isEmpty(detailBicycle.markdownData) ?
                                        <>
                                            <div className={`${isShowMarkDown ? 'markdown_content active' : 'markdown_content'}`}>
                                                <div dangerouslySetInnerHTML={{ __html: detailBicycle.markdownData.contentHTML }} />
                                            </div>
                                            <div
                                                onClick={() => handleClickViewMore('markdown')}
                                                className='view-more'>
                                                {
                                                    isShowMarkDown ? 'Rút gọn' : 'Xem thêm'
                                                }

                                            </div>
                                        </>
                                        :
                                        <span>Không có thông tin mô tả</span>
                                }
                            </div>
                            <div className='col-5 specification'>
                                <h4>Thông số kỹ thuật xe đạp {detailBicycle.name}</h4>
                                {
                                    !_.isEmpty(detailBicycle) && detailBicycle.specificationsData && !_.isEmpty(detailBicycle.specificationsData) ?

                                        <>
                                            <div className={`${isShowSpecification ? 'table active' : 'table'}`}>
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Chất liệu sơn</td>
                                                            <td>{detailBicycle.specificationsData.chat_lieu_son}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Độ tuổi</td>
                                                            <td>{detailBicycle.specificationsData.do_tuoi}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Chiều cao</td>
                                                            <td>{detailBicycle.specificationsData.chieu_cao}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Kích thước Trọng lượng</td>
                                                            <td>{detailBicycle.specificationsData.kich_thuoc_trong_luong}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tải trọng</td>
                                                            <td>{detailBicycle.specificationsData.tai_trong}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tải trọng yên phụ</td>
                                                            <td>{detailBicycle.specificationsData.tai_trong_yen_phu}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Thương hiệu</td>
                                                            <td>{detailBicycle.specificationsData.thuong_hieu}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Nơi sản xuất</td>
                                                            <td>{detailBicycle.specificationsData.noi_san_xuat}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Sườn xe</td>
                                                            <td>{detailBicycle.specificationsData.suon_xe}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Phuộc</td>
                                                            <td>{detailBicycle.specificationsData.phuoc}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Kích cỡ bánh xe</td>
                                                            <td>{detailBicycle.specificationsData.kich_co_banh_xe}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Vành</td>
                                                            <td>{detailBicycle.specificationsData.vanh}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Lốp xe</td>
                                                            <td>{detailBicycle.specificationsData.lop_xe}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Loại van bơm</td>
                                                            <td>{detailBicycle.specificationsData.loai_van_bom}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bộ đĩa</td>
                                                            <td>{detailBicycle.specificationsData.bo_dia}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bộ thắng</td>
                                                            <td>{detailBicycle.specificationsData.bo_thang}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tay thắng</td>
                                                            <td>{detailBicycle.specificationsData.tay_thang}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Loại phanh thắng</td>
                                                            <td>{detailBicycle.specificationsData.loai_phanh_thang}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Bộ líp</td>
                                                            <td>{detailBicycle.specificationsData.bo_lip}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Ghi đông</td>
                                                            <td>{detailBicycle.specificationsData.ghi_dong}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Chất liệu yên</td>
                                                            <td>{detailBicycle.specificationsData.chat_lieu_yen}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Chất liệu cốt</td>
                                                            <td>{detailBicycle.specificationsData.chat_lieu_cot}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Hãng</td>
                                                            <td>{detailBicycle.specificationsData.hang}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                            <div
                                                onClick={() => handleClickViewMore('specification')}
                                                className='view-more'>
                                                {
                                                    isShowSpecification ? 'Ẩn chi tiết thông số' : 'Xem chi tiết thông số'
                                                }

                                            </div>
                                        </>
                                        :
                                        <span>Không có thông số kỹ thuật</span>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailBicycle