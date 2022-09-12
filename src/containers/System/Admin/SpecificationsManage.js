import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import Select from 'react-select';

import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import * as userService from '../../../services/userService'
// import Slider from "react-slick";
import './Manage.scss'
import _ from 'lodash';
function SpecificationsManage() {
    const lang = useSelector(selectors.selectorLanguages)
    const allBicycleData = useSelector(selectors.selectorAllBicycleData)


    const dispatch = useDispatch()

    const [utilities, setUtilities] = useState([])
    console.log("utilities", utilities)

    useEffect(() => {
        async function fetchData() {
            // You can await here
            let resp = await userService.getAllCodeService('UTILITIES')
            if (resp && resp.errCode === 0) {
                let data = resp.data.map(item => ({
                    ...item,
                    isSelected: false
                }))

                setUtilities(data)
            } else {
                alert(resp.errMessage)
            }
            // ...
        }
        fetchData();
    }, [])

    // input onChange
    const [form, setForm] = useState({
        chat_lieu_son: '', do_tuoi: '', chieu_cao: '', kich_thuoc_trong_luong: '',
        tai_trong: '', tai_trong_yen_phu: '', thuong_hieu: '', noi_san_xuat: '', suon_xe: '', phuoc: '', kich_co_banh_xe: '',
        vanh: '', lop_xe: '', loai_van_bom: '', bo_dia: '', bo_thang: '', tay_thang: '', loai_phanh_thang: '', bo_lip: '',
        ghi_dong: '', chat_lieu_yen: '', chat_lieu_cot: '', hang: ''
    })

    const { chat_lieu_son, do_tuoi, chieu_cao, kich_thuoc_trong_luong,
        tai_trong, tai_trong_yen_phu, thuong_hieu, noi_san_xuat, suon_xe, phuoc, kich_co_banh_xe,
        vanh, lop_xe, loai_van_bom, bo_dia, bo_thang, tay_thang, loai_phanh_thang, bo_lip,
        ghi_dong, chat_lieu_yen, chat_lieu_cot, hang } = form

    const handleOnChange = (e, id) => {
        let copyForm = { ...form }
        copyForm[id] = e.target.value
        setForm({ ...copyForm })

    }

    const [listAllBicycle, setListAllBicycle] = useState([]);

    //dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllBicycleStart('All'))
    }, [dispatch])

    // get allCode cho bicycle
    useEffect(() => {
        const buildInputData = (inputData) => {
            if (inputData && inputData.length > 0) {
                let result = inputData.map((item) => {
                    let value, label

                    label = lang === LANGUAGES.VI ? item.name : item.name
                    value = item.id

                    return {
                        label: label,
                        value: value
                    }
                })
                console.log('result', result)
                return result
            }
        }
        setListAllBicycle(buildInputData(allBicycleData))
    }, [allBicycleData, lang])

    // select onChange
    const [selects, setSelects] = useState({
        selectedBicycle: ''
    })

    const { selectedBicycle } = selects


    const handleChangeSelect = async (selectedBicycle) => {
        let resp = await userService.handleGetDetailBicycle(selectedBicycle.value)
        console.log("handleGetDetailBicycle", resp)
        if (resp && resp.errCode === 0 && resp.data && !_.isEmpty(resp.data.specificationsData)) {
            let specifications = resp.data.specificationsData

            setForm({
                chat_lieu_son: specifications.chat_lieu_son, do_tuoi: specifications.do_tuoi, chieu_cao: specifications.chieu_cao, kich_thuoc_trong_luong: specifications.kich_thuoc_trong_luong,
                tai_trong: specifications.tai_trong, tai_trong_yen_phu: specifications.tai_trong_yen_phu, thuong_hieu: specifications.thuong_hieu, noi_san_xuat: specifications.noi_san_xuat, suon_xe: specifications.suon_xe, phuoc: specifications.phuoc, kich_co_banh_xe: specifications.kich_co_banh_xe,
                vanh: specifications.vanh, lop_xe: specifications.lop_xe, loai_van_bom: specifications.loai_van_bom, bo_dia: specifications.bo_dia, bo_thang: specifications.bo_thang, tay_thang: specifications.tay_thang, loai_phanh_thang: specifications.loai_phanh_thang, bo_lip: specifications.bo_lip,
                ghi_dong: specifications.ghi_dong, chat_lieu_yen: specifications.chat_lieu_yen, chat_lieu_cot: specifications.chat_lieu_cot, hang: specifications.hang
            })

            if (utilities && utilities.length > 0) {
                let result = utilities.map(itemUti => {
                    specifications.tien_ich.forEach(item => {
                        if (item === itemUti.valueVi) {
                            itemUti.isSelected = true
                        }
                    })
                    return itemUti
                })
                setUtilities(result)

            }

        } else {
            setForm({
                chat_lieu_son: '', do_tuoi: '', chieu_cao: '', kich_thuoc_trong_luong: '',
                tai_trong: '', tai_trong_yen_phu: '', thuong_hieu: '', noi_san_xuat: '', suon_xe: '', phuoc: '', kich_co_banh_xe: '',
                vanh: '', lop_xe: '', loai_van_bom: '', bo_dia: '', bo_thang: '', tay_thang: '', loai_phanh_thang: '', bo_lip: '',
                ghi_dong: '', chat_lieu_yen: '', chat_lieu_cot: '', hang: ''
            })

            if (utilities && utilities.length > 0) {
                let result = utilities.map(item => ({
                    ...item,
                    isSelected: false
                }))
                setUtilities(result)
            }
        }
        setSelects({
            selectedBicycle
        })
    }

    const handleSubmit = async () => {
        const tien_ich = handleUtilitiesforTienich(utilities)
        let resp = await userService.handleCreateSpecificationsBicycle({
            bicycleId: selectedBicycle.value,
            chat_lieu_son, tien_ich, do_tuoi, chieu_cao, kich_thuoc_trong_luong,
            tai_trong, tai_trong_yen_phu, thuong_hieu, noi_san_xuat, suon_xe, phuoc, kich_co_banh_xe,
            vanh, lop_xe, loai_van_bom, bo_dia, bo_thang, tay_thang, loai_phanh_thang, bo_lip,
            ghi_dong, chat_lieu_yen, chat_lieu_cot, hang
        })

        if (resp && resp.errCode === 0) {
            alert(resp.errMessage)
        } else {
            alert(resp.errMessage)
        }

        setForm({
            chat_lieu_son: '', do_tuoi: '', chieu_cao: '', kich_thuoc_trong_luong: '',
            tai_trong: '', tai_trong_yen_phu: '', thuong_hieu: '', noi_san_xuat: '', suon_xe: '', phuoc: '', kich_co_banh_xe: '',
            vanh: '', lop_xe: '', loai_van_bom: '', bo_dia: '', bo_thang: '', tay_thang: '', loai_phanh_thang: '', bo_lip: '',
            ghi_dong: '', chat_lieu_yen: '', chat_lieu_cot: '', hang: ''
        })
        setSelects({
            selectedBicycle: ''
        })

        if (utilities && utilities.length > 0) {
            let result = utilities.map(item => ({
                ...item,
                isSelected: false
            }))
            setUtilities(result)
        }

    }

    const handleClickUtilities = (itemUti, e) => {
        let result = []
        if (utilities && utilities.length > 0) {
            result = utilities.map(item => {
                if (item.id === itemUti.id) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            setUtilities(result)
        }

    }

    const handleUtilitiesforTienich = (utilitiesArr) => {
        let result = []
        if (utilitiesArr && utilitiesArr.length > 0) {
            let arr = utilitiesArr.filter(item => item.isSelected === true)
            if (arr && arr.length > 0) {
                result = arr.map(item => item.valueVi)
            } else {
                alert("Invalid select utilities")
                return
            }
        }
        return result
    }

    return (
        <div id="SpecificationsManage">
            <div className='specificationsManage'>
                <h3 className='title text-center'>
                    <FormattedMessage id="menu.admin.bicycle-specifications" />
                </h3>
                <div className='row'>
                    <div className='col-6 form-group'>
                        <label>Danh sách sản phẩm</label>
                        <Select
                            value={selectedBicycle}
                            name="selectedBicycle"
                            onChange={handleChangeSelect}
                            options={listAllBicycle}
                        />
                    </div>
                </div>
                <div className='row form'>
                    <div className='col-12 form-group utilities'>
                        <label>Tiện ích</label>
                        {
                            utilities && utilities.length > 0 &&
                            utilities.map(item => {
                                return (
                                    <button
                                        onClick={(e) => handleClickUtilities(item, e)}
                                        key={item.keyMap}
                                        className={`${item.isSelected ? 'utilities_btn active' : 'utilities_btn'}`}>
                                        {
                                            lang === LANGUAGES.VI ? item.valueVi : item.valueEn
                                        }
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chất liệu sơn</label>
                        <input
                            value={chat_lieu_son}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'chat_lieu_son')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Độ tuổi</label>
                        <input
                            value={do_tuoi}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'do_tuoi')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chiều cao</label>
                        <input
                            value={chieu_cao}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'chieu_cao')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Kích thước Trọng lượng</label>
                        <input
                            value={kich_thuoc_trong_luong}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'kich_thuoc_trong_luong')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tải trọng</label>
                        <input
                            value={tai_trong}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'tai_trong')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tải trọng yên phụ</label>
                        <input
                            value={tai_trong_yen_phu}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'tai_trong_yen_phu')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Thương hiệu</label>
                        <input
                            value={thuong_hieu}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'thuong_hieu')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Nơi sản xuất</label>
                        <input
                            value={noi_san_xuat}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'noi_san_xuat')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Sườn xe</label>
                        <input
                            value={suon_xe}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'suon_xe')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Phuộc</label>
                        <input
                            value={phuoc}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'phuoc')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Kích cỡ bánh xe</label>
                        <input
                            value={kich_co_banh_xe}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'kich_co_banh_xe')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Vành</label>
                        <input
                            value={vanh}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'vanh')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Lốp xe</label>
                        <input
                            value={lop_xe}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'lop_xe')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Loại van bơm</label>
                        <input
                            value={loai_van_bom}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'loai_van_bom')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Bộ đĩa</label>
                        <input
                            value={bo_dia}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'bo_dia')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Bộ thắng</label>
                        <input
                            value={bo_thang}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'bo_thang')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Tay thắng</label>
                        <input
                            value={tay_thang}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'tay_thang')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Loại phanh thắng</label>
                        <input
                            value={loai_phanh_thang}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'loai_phanh_thang')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Bộ líp</label>
                        <input
                            value={bo_lip}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'bo_lip')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Ghi đông</label>
                        <input
                            value={ghi_dong}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'ghi_dong')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chất liệu yên</label>
                        <input
                            value={chat_lieu_yen}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'chat_lieu_yen')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chất liệu cốt</label>
                        <input
                            value={chat_lieu_cot}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'chat_lieu_cot')}
                            className='form-control'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Hãng</label>
                        <input
                            value={hang}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'hang')}
                            className='form-control'
                        />
                    </div>

                </div>
                <button
                    onClick={handleSubmit}
                    className='btn btn-primary'>
                    Tạo
                </button>
            </div>
        </div>
    )
}

export default SpecificationsManage