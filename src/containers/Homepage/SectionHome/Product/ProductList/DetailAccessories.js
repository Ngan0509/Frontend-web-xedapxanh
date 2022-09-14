import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
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
import xedap from '../../../../../assets/images/RINCON-2-2022-grey-fix.jpg'
import './DetailBicycle.scss'
import NumberFormat from 'react-number-format';
import { useEffect, useState } from 'react';
import avatar from '../../../../../assets/images/avatar.webp'

import LoadingOverlay from 'react-loading-overlay';
LoadingOverlay.propTypes = undefined

function DetailAccessories() {
    const lang = useSelector(selectors.selectorLanguages)
    const categoryData = useSelector(selectors.selectorCategoryData)
    const clientInfoSelect = useSelector(selectors.selectorClientInfo)
    const isLoggedInClient = useSelector(selectors.selectorIsLoggedInClient)
    const allCommentData = useSelector(selectors.selectorAllCommentData)

    const dispatch = useDispatch()
    let history = useHistory();

    useEffect(() => {
        return () => {
            setCategory('')
            setDetailAccessories({})
            setSo_luong(1)
            setNav1()
            setNav2()
        };
    }, []);

    let { id } = useParams()

    const [category, setCategory] = useState('')
    const [detailAccessories, setDetailAccessories] = useState({})

    useEffect(() => {
        dispatch(actions.fetchCategoryStart('ACCESSORIES'))
        dispatch(actions.fetchAllCartStart('All'))
    }, [dispatch])

    useEffect(() => {
        categoryData.forEach(item => {
            let cate = ''
            if (!_.isEmpty(detailAccessories)) {
                if (item.id === detailAccessories.category_id) {
                    cate = lang === LANGUAGES.VI ? item.nameVi : item.nameEn
                    setCategory(cate)
                }
            }
        })
    }, [category, categoryData, lang, detailAccessories])

    useEffect(() => {
        async function fetchData() {
            // You can await here
            let resp = await userService.handleGetDetailAccessory(id)
            if (resp && resp.errCode === 0 && resp.data) {
                setDetailAccessories(resp.data)
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
        const sum_price = detailAccessories.price_new * so_luong
        const data = {
            product_id: id,
            type: 'ACCESSORIES',
            so_luong,
            price: detailAccessories.price_new,
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
            const sum_price = detailAccessories.price_new * so_luong
            const data = {
                product_id: id,
                type: 'ACCESSORIES',
                so_luong,
                price: detailAccessories.price_new,
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

    const [contentComment, setContentComment] = useState('')

    const handleClickComment = async () => {
        if (isLoggedInClient) {
            let fullname = !_.isEmpty(clientInfoSelect) && clientInfoSelect.fullname
            let phoneNumber = !_.isEmpty(clientInfoSelect) && clientInfoSelect.phoneNumber
            let client_id = !_.isEmpty(clientInfoSelect) && clientInfoSelect.id
            let date = new Date().getTime().toString()
            const data = {
                product_id: id,
                client_id,
                type: 'ACCESSORIES',
                fullname,
                date,
                content: contentComment,
                phoneNumber
            }

            const dataEdit = {
                ...data,
                id: commentId
            }

            let resp;
            if (isEdit) {
                resp = await userService.handleUpdateNewComment(dataEdit)
            } else {
                resp = await userService.handleCreateNewComment(data)
            }
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllCommentStart(id, 'ACCESSORIES'))
            } else {
                alert(resp.errMessage)
            }

            setIsEdit(false)
            setCommentId(null)
            setContentComment('')
        } else {
            alert("Bạn cần phải đăng nhập mới bình luận được")
            history.push("/home/login");
        }
    }

    useEffect(() => {
        dispatch(actions.fetchAllCommentStart(id, 'ACCESSORIES'))
    }, [dispatch, id])

    const [listAllComment, setListAllComment] = useState([]);
    console.log("listAllComment", listAllComment)

    // get AllComment
    useEffect(() => {
        setListAllComment(allCommentData.reverse().slice(0, 3))
    }, [allCommentData])

    const [isEdit, setIsEdit] = useState(false)
    const [commentId, setCommentId] = useState(null)

    const handleEditComment = (item) => {
        setIsEdit(true)
        setCommentId(item.id)
        setContentComment(item.content)
    }

    const handleDeleteComment = async (comment_id) => {
        const resp = await userService.handleDeleteNewComment(comment_id)
        if (resp && resp.errCode === 0) {
            alert(resp.errMessage)
        } else {
            alert(resp.errMessage)
        }
    }

    const [isShowLoading, setIsShowLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            setIsShowLoading(false)
        }
        // fetchData()
        const myTimeOut = setTimeout(fetchData, 1500)
        return () => {
            clearTimeout(myTimeOut)
        }
    }, [])

    return (
        <div id="DetailAccessories">
            <Header />
            <LoadingOverlay
                active={isShowLoading}
                spinner
                text='Loading...'
            >
                <div className='detailAccessories_bg'>
                    <div className='detailAccessories'>
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
                                                    <img src={xedap} alt='slider-main' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-main'>
                                                    <img src={xedap} alt='slider-main' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-main'>
                                                    <img src={xedap} alt='slider-main' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-main'>
                                                    <img src={xedap} alt='slider-main' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-main'>
                                                    <img src={xedap} alt='slider-main' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-main'>
                                                    <img src={xedap} alt='slider-main' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-main'>
                                                    <img src={xedap} alt='slider-main' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-main'>
                                                    <img src={xedap} alt='slider-main' />
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
                                                    <img src={xedap} alt='slider-child' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-child'>
                                                    <img src={xedap} alt='slider-child' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-child'>
                                                    <img src={xedap} alt='slider-child' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-child'>
                                                    <img src={xedap} alt='slider-child' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-child'>
                                                    <img src={xedap} alt='slider-child' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-child'>
                                                    <img src={xedap} alt='slider-child' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-child'>
                                                    <img src={xedap} alt='slider-child' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-child'>
                                                    <img src={xedap} alt='slider-child' />
                                                </div>
                                            </div>
                                            <div className='col'>
                                                <div className='image_slider-child'>
                                                    <img src={xedap} alt='slider-child' />
                                                </div>
                                            </div>

                                        </Slider>
                                    </div>
                                </div>
                                <div className='col-7 infor_buy-product'>
                                    <div className='title_product'>
                                        <span>{category} {detailAccessories.name}</span>
                                    </div>
                                    <div className='price_product'>

                                        <div className="priceNew">
                                            <span className="price">
                                                <NumberFormat
                                                    value={detailAccessories.price_new}
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
                                <div className='col-7'>
                                    <div className='comment'>
                                        <h5>
                                            Đánh giá sản phẩm
                                        </h5>
                                        <div className='comment_input'>
                                            <div className='textarea'>
                                                <textarea
                                                    onChange={(e) => setContentComment(e.target.value)}
                                                    value={contentComment} autoFocus className='form-control' />
                                            </div>
                                            <button
                                                onClick={() => handleClickComment()}
                                                className='comment-btn'>{isEdit ? 'Sửa bình luận' : 'Bình luận'}</button>
                                        </div>

                                        <ul className='list-comment'>
                                            {
                                                listAllComment && listAllComment.length > 0 &&
                                                listAllComment.map(item => (
                                                    <li key={item.id}>
                                                        <div className='info'>
                                                            <div className='image-name'>
                                                                <div className='image'>
                                                                    <img src={avatar} alt='avatar' />
                                                                </div>
                                                                <div className='name'>
                                                                    {item.fullname}
                                                                </div>
                                                            </div>
                                                            <div className='date-icon'>
                                                                <div className='date'>{item.date}</div>
                                                                <div className='icon-wrap'>
                                                                    {
                                                                        isLoggedInClient &&
                                                                        <span className='icon'>
                                                                            <i className='bx bx-dots-vertical-rounded'></i>
                                                                        </span>
                                                                    }
                                                                    <div className='box'>
                                                                        <span
                                                                            onClick={() => handleEditComment(item)}
                                                                        >Sửa</span>
                                                                        <span
                                                                            onClick={() => handleDeleteComment(item.id)}
                                                                        >Xóa</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='comment-client'>
                                                            <p className='text'>{item.content}</p>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-5'>
                                    Tin tức
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </LoadingOverlay>
            <Footer />
        </div>
    )
}

export default DetailAccessories