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

function DetailBicycle() {
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
            setDetailBicycle({})
            setUploadedFiles([])
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
    const [uploadedFiles, setUploadedFiles] = useState([])

    useEffect(() => {
        dispatch(actions.fetchCategoryStart('BICYCLE'))
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

    const [isShowLoading, setIsShowLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const resp = await userService.handleGetDetailBicycle(id)
            const resp2 = await userService.handleGetMultiImage(id, 'BICYCLE')
            if (resp2 && resp2.errCode === 0) {
                setUploadedFiles(resp2.data)
            } else {
                alert(resp2.errMessage)
            }
            if (resp && resp.errCode === 0 && resp.data) {
                setDetailBicycle(resp.data)
                setIsShowLoading(false)
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

    const [listAllCart, setListAllCart] = useState(() => {
        const allCartData = JSON.parse(localStorage.getItem("arrCart")) || [];
        return allCartData;
    });

    const handleAddCart = () => {
        const sum_price = detailBicycle.price_new * so_luong
        const data = {
            id: Math.floor(Math.random() * 100),
            product_id: id,
            type: 'BICYCLE',
            so_luong,
            price: detailBicycle.price_new,
            sum_price,
            productData: {
                name: detailBicycle.name,
                image: detailBicycle.image,
                price_new: detailBicycle.price_new,
                price_old: detailBicycle.price_old,
            }
        }

        const arrCart = [...listAllCart, data];

        localStorage.setItem("arrCart", JSON.stringify(arrCart));
        setListAllCart(JSON.parse(localStorage.getItem("arrCart")) || []);
        alert(`Đã thêm ${so_luong} vào giỏ hàng`)
    }

    const handleCreateCart = async () => {
        setIsClickAddCart(true)
        handleAddCart();
    }

    const handleClickCheckout = async () => {
        if (isClickAddCart) {
            history.push("/home/cart/shoppingcart")
        } else {
            handleAddCart();
            history.push("/home/cart/shoppingcart")
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
                type: 'BICYCLE',
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
                dispatch(actions.fetchAllCommentStart(id, 'BICYCLE'))
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
        dispatch(actions.fetchAllCommentStart(id, 'BICYCLE'))
    }, [dispatch, id])

    const [listAllComment, setListAllComment] = useState([]);

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

    // const [isShowLoading, setIsShowLoading] = useState(true)

    // useEffect(() => {
    //     async function fetchData() {
    //         setIsShowLoading(false)
    //     }
    //     // fetchData()
    //     const myTimeOut = setTimeout(fetchData, 1500)
    //     return () => {
    //         clearTimeout(myTimeOut)
    //     }
    // }, [])

    const arrStar = [{ num: 1, isYellow: false }, { num: 2, isYellow: false }, { num: 3, isYellow: false }, { num: 4, isYellow: false }, { num: 5, isYellow: false }]

    const [listStar, setListStar] = useState(arrStar)

    const handleMouseOverStar = (item) => {
        let result = listStar.map(star => {
            if (star.num <= item.num) {
                star.isYellow = true
            } else {
                star.isYellow = false
            }
            return star
        })
        setListStar(result)
    }

    const handleClickStar = async (item) => {
        if (isLoggedInClient) {
            let client_id = !_.isEmpty(clientInfoSelect) && clientInfoSelect.id
            const data = {
                product_id: id,
                client_id,
                num_star: item.num
            }
            const resp = await userService.handleCreateNewFavorite(data)
            if (resp && resp.errCode === 0) {
                alert("Đánh giá sản phẩm thành công")
            } else {
                alert(resp.errMessage)
            }

            let result = listStar.map(star => {
                if (star.num <= item.num) {
                    star.isYellow = true
                } else {
                    star.isYellow = false
                }
                return star
            })

            setListStar(result)
        } else {
            alert("Bạn cần phải đăng nhập mới đánh giá được")
            history.push("/home/login");
        }
    }

    return (
        <LoadingOverlay
            active={isShowLoading}
            spinner
            text='Loading...'
        >
            <div id="DetailBicycle">
                <Header allCartData={listAllCart} />
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
                                <div className='col-lg-5 col-md-5 col-sm-12 image_product'>
                                    <div className='row'>
                                        {
                                            uploadedFiles.length > 0 ?
                                                <Slider
                                                    asNavFor={nav2} ref={c => setNav1(c)}
                                                >
                                                    {
                                                        uploadedFiles && uploadedFiles.length > 0 &&
                                                        uploadedFiles.map(item => (
                                                            <div key={item.id} className='col'>
                                                                <div className='image_slider-main'>
                                                                    <img src={item.image ? item.image : xedap} alt='slider-main' />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </Slider>
                                                :
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
                                                </Slider>
                                        }
                                    </div>
                                    <div className='row'>
                                        {
                                            uploadedFiles.length > 0 ?
                                                <Slider
                                                    asNavFor={nav1}
                                                    ref={c => setNav2(c)}
                                                    slidesToShow={4}
                                                    swipeToSlide={true}
                                                    focusOnSelect={true}
                                                    arrows={false}
                                                >
                                                    {
                                                        uploadedFiles && uploadedFiles.length > 0 &&
                                                        uploadedFiles.map(item => (
                                                            <div key={item.id} className='col'>
                                                                <div className='image_slider-child'>
                                                                    <img src={item.image ? item.image : xedap} alt='slider-child' />
                                                                </div>
                                                            </div>
                                                        ))
                                                    }

                                                </Slider>
                                                :
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
                                                </Slider>
                                        }
                                    </div>
                                </div>
                                <div className='col-lg-7 col-md-7 col-sm-12 infor_buy-product'>
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
                                        <div className='wrap'>
                                            <button
                                                onClick={() => handleCreateCart()}
                                                className='add_to_cart'>Thêm vào giỏ</button>
                                        </div>
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
                            <div className='promotion_mobile'>
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
                            <div className='row product_infor_more'>
                                <div className='col-lg-7 col-md-7 col-sm-12'>
                                    <div className='markdown'>
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
                                </div>
                                <div className='col-lg-5 col-md-5 col-sm-12'>
                                    <div className='specification'>
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
                            <div className='row product_infor_more'>
                                <div className='col-lg-7 col-md-7 col-sm-12'>
                                    <div className='comment'>
                                        <h5>
                                            Đánh giá sản phẩm
                                            <div className='favorite'>
                                                {
                                                    listStar && listStar.length > 0 &&
                                                    listStar.map(item => (
                                                        <span
                                                            onMouseOver={() => handleMouseOverStar(item)}
                                                            onClick={() => handleClickStar(item)}
                                                            key={item.num} className={`${item.isYellow ? 'icon-star active' : 'icon-star'}`}>
                                                            <i className='bx bxs-leaf'></i>
                                                        </span>
                                                    ))
                                                }
                                            </div>
                                            <span>(Click vào để đánh giá !!!)</span>
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
                                                                <div className='favorite'>
                                                                    {
                                                                        arrStar && arrStar.length > 0 &&
                                                                        arrStar
                                                                            .map(star => {
                                                                                if (item.num_star > 0 && star.num <= item.num_star) {
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
                                                            </div>
                                                            <div className='date-icon'>
                                                                <div className='date'>{item.date}</div>
                                                                <div className='icon-wrap'>
                                                                    <span className='icon'>
                                                                        <i className='bx bx-dots-vertical-rounded'></i>
                                                                    </span>
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
                                <div className='col-lg-5 col-md-5 col-sm-12'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </LoadingOverlay>
    )
}

export default DetailBicycle