import { Buffer } from 'buffer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import Select from 'react-select';
import CommonUtils from '../../../utils/CommonUtils';

import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import * as userService from '../../../services/userService'
// import Slider from "react-slick";
import './Manage.scss'
function BicycleManage() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCodeData = useSelector(selectors.selectorAllcodeData)
    const categoryData = useSelector(selectors.selectorCategoryData)
    const allBicycleData = useSelector(selectors.selectorAllBicycleData)

    const dispatch = useDispatch()

    // input onChange
    const [form, setForm] = useState({
        productName: '',
        priceNew: '',
        priceOld: '',
        discout: '',
        previewImg: ''
    })

    const { productName, priceNew, priceOld, discout, previewImg } = form

    const handleOnChange = (e, id) => {
        let copyForm = { ...form }
        copyForm[id] = e.target.value
        setForm({ ...copyForm })

    }

    // select onChange
    const [selects, setSelects] = useState({
        category: '',
        priceSpace: '',
        brand: '',
        useTarget: '',
        weelSize: '',
        frameMaterial: '',
        riderHeight: '',
        brake: ''
    })

    const { category, priceSpace, brand, useTarget, weelSize, frameMaterial, riderHeight, brake } = selects
    const handleChangeSelect = (selectedOption, name) => {
        let stateName = name.name;
        let copySelects = { ...selects }
        copySelects[stateName] = selectedOption

        setSelects({ ...copySelects })
    }

    // image onChange
    const handleChangeImage = async (e) => {
        let files = e.target.files;
        let file = files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            // let objectUrl = URL.createObjectURL(file)
            setForm({ ...form, previewImg: base64 })
        }
    }

    // array
    const [listCategory, setListCategory] = useState([]);
    const [listPriceSpace, setListPriceSpace] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listUseTarget, setListUseTarget] = useState([]);
    const [listWeelSize, setListWeelSize] = useState([]);
    const [listFrameMaterial, setListFrameMaterial] = useState([]);
    const [listRiderHeight, setListRiderHeight] = useState([]);
    const [listBrake, setListBrake] = useState([]);
    const [listAllBicycle, setListAllBicycle] = useState([]);
    //dispatch actions
    useEffect(() => {
        console.log("abcxyz")
        dispatch(actions.fetchAllcodeStart())
        dispatch(actions.fetchCategoryStart('BICYCLE'))
        dispatch(actions.fetchAllBicycleStart('All'))
    }, [dispatch])

    // get allCode cho bicycle
    useEffect(() => {
        const buildInputData = (inputData, type) => {
            if (inputData && inputData.length > 0) {
                let result = inputData.map((item) => {
                    let value, label
                    if (type === "CATEGORY") {
                        label = lang === LANGUAGES.VI ? item.nameVi : item.nameEn
                        value = item.id
                    } else {
                        label = lang === LANGUAGES.VI ? item.valueVi : item.valueEn
                        value = item.keyMap
                    }
                    return {
                        label: label,
                        value: value
                    }
                })
                return result
            }
        }
        setListCategory(buildInputData(categoryData, 'CATEGORY'))
        setListPriceSpace(buildInputData(allCodeData.listPriceSpace))
        setListBrand(buildInputData(allCodeData.listBrand))
        setListUseTarget(buildInputData(allCodeData.listUseTarget))
        setListWeelSize(buildInputData(allCodeData.listWeelSize))
        setListFrameMaterial(buildInputData(allCodeData.listFrameMaterial))
        setListRiderHeight(buildInputData(allCodeData.listRiderHeight))
        setListBrake(buildInputData(allCodeData.listBrake))
    }, [allCodeData, lang, categoryData])

    // get AllBicycle
    useEffect(() => {
        setListAllBicycle(allBicycleData)
    }, [allBicycleData])

    // search bicycle onChange

    const [bicycle, setBicycle] = useState('')
    const handleOnChangeSearch = (e) => {
        setBicycle(e.target.value)
    }

    // create product
    const handleOnSubmit = async () => {
        setForm({
            productName: '',
            priceNew: '',
            priceOld: '',
            discout: '',
            previewImg: ''
        })
        setSelects({
            category: '',
            priceSpace: '',
            brand: '',
            useTarget: '',
            weelSize: '',
            frameMaterial: '',
            riderHeight: '',
            brake: ''
        })
        setIsEdit(false)
        setId('')

        if (isEdit) {
            let dataEdit = {
                id,
                ...form,
                category: category.value,
                priceSpace: priceSpace.value,
                brand: brand.value,
                useTarget: useTarget.value,
                weelSize: weelSize.value,
                frameMaterial: frameMaterial.value,
                riderHeight: riderHeight.value,
                brake: brake.value
            }
            console.log("dataEdit", dataEdit)
            const resp = await userService.handleUpdateNewBicycle(dataEdit)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllBicycleStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        } else {
            let data = {
                ...form,
                category: category.value,
                priceSpace: priceSpace.value,
                brand: brand.value,
                useTarget: useTarget.value,
                weelSize: weelSize.value,
                frameMaterial: frameMaterial.value,
                riderHeight: riderHeight.value,
                brake: brake.value
            }
            console.log("data", data)
            const resp = await userService.handleCreateNewBicycle(data)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllBicycleStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        }
    }

    // delete bicycle
    const handleDeleteNewBicycle = async (userId) => {
        const resp = await userService.handleDeleteNewBicycle(userId)
        if (resp && resp.errCode === 0) {
            dispatch(actions.fetchAllBicycleStart('All'))
            alert(resp.errMessage)
        } else {
            alert(resp.errMessage)
        }
    }

    // edit bicycle
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState('')

    const handleEditNewBicycle = (bicycleData) => {
        let imageBase64 = ''
        if (bicycleData.image) {
            imageBase64 = new Buffer(bicycleData.image, 'base64').toString('binary')
        }
        setIsEdit(true)
        setId(bicycleData.id)
        setForm({
            productName: bicycleData.name,
            priceNew: bicycleData.price_new,
            priceOld: bicycleData.price_old,
            discout: bicycleData.discout,
            previewImg: imageBase64
        })
        let category = listCategory.find(item => item.value === bicycleData.category_id)
        let priceSpace = listPriceSpace.find(item => item.value === bicycleData.price_space_id)
        let brand = listBrand.find(item => item.value === bicycleData.brand_id)
        let useTarget = listUseTarget.find(item => item.value === bicycleData.use_target_id)
        let weelSize = listWeelSize.find(item => item.value === bicycleData.weel_size_id)
        let frameMaterial = listFrameMaterial.find(item => item.value === bicycleData.frame_material_id)
        let riderHeight = listRiderHeight.find(item => item.value === bicycleData.rider_height_id)
        let brake = listBrake.find(item => item.value === bicycleData.brake_id)


        setSelects({
            category,
            priceSpace,
            brand,
            useTarget,
            weelSize,
            frameMaterial,
            riderHeight,
            brake
        })
    }

    const producJSX = (item) => (
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price_old}</td>
            <td>{item.price_new}</td>
            <td>{item.discout}</td>
            <td>
                <span
                    onClick={() => handleEditNewBicycle(item)}
                    className='icon-edit'>
                    <i className='bx bxs-pencil'></i>
                </span>
                <span
                    onClick={() => handleDeleteNewBicycle(item.id)}
                    className='icon-delete'>
                    <i className='bx bxs-trash' ></i>
                </span>
            </td>
        </tr>

    )

    return (
        <div id="BicycleManage">
            <div className='bicycleManage'>
                <h3 className='title text-center'>
                    <FormattedMessage id="menu.admin.bicycle-manage" />
                </h3>

                <div className='row form'>
                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="bicycle-manage.category" />
                        </label>
                        <Select
                            value={category}
                            name="category"
                            onChange={handleChangeSelect}
                            options={listCategory}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.productName" /></label>
                        <input
                            value={productName}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'productName')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label htmlFor='image'>
                            <FormattedMessage id="bicycle-manage.image" />
                        </label>
                        <div className='previewImg_wrap'>
                            <input
                                onChange={(e) => handleChangeImage(e)}
                                type="file" id="previewImg" hidden name="image" />
                            <label className='labelImage btn' htmlFor='previewImg'>
                                <FormattedMessage id="bicycle-manage.downImage" />
                                <i className='bx bxs-download'></i>
                            </label>
                            <div className='previewImg'>
                                <img src={previewImg} alt='ảnh preview' />
                            </div>
                        </div>
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.priceSpace" /></label>
                        <Select
                            value={priceSpace}
                            name="priceSpace"
                            onChange={handleChangeSelect}
                            options={listPriceSpace}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.brand" /></label>
                        <Select
                            value={brand}
                            name="brand"
                            onChange={handleChangeSelect}
                            options={listBrand}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.useTarget" /></label>
                        <Select
                            value={useTarget}
                            name="useTarget"
                            onChange={handleChangeSelect}
                            options={listUseTarget}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.weelSize" /></label>
                        <Select
                            value={weelSize}
                            name="weelSize"
                            onChange={handleChangeSelect}
                            options={listWeelSize}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.frameMaterial" /></label>
                        <Select
                            value={frameMaterial}
                            name="frameMaterial"
                            onChange={handleChangeSelect}
                            options={listFrameMaterial}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.riderHeight" /></label>
                        <Select
                            value={riderHeight}
                            name="riderHeight"
                            onChange={handleChangeSelect}
                            options={listRiderHeight}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.brake" /></label>
                        <Select
                            value={brake}
                            name="brake"
                            onChange={handleChangeSelect}
                            options={listBrake}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.priceNew" /></label>
                        <input
                            value={priceNew}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'priceNew')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.priceOld" /></label>
                        <input
                            value={priceOld}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'priceOld')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.discout" /></label>
                        <input
                            value={discout}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'discout')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <button
                            className={`btn ${isEdit ? 'btn-warning' : 'btn-primary'} btn-create`}
                            onClick={() => handleOnSubmit()}
                        >
                            {
                                isEdit ?
                                    <FormattedMessage id="bicycle-manage.update-product" /> :
                                    <FormattedMessage id="bicycle-manage.create-product" />
                            }
                        </button>
                    </div>
                </div>

                <div className='search_product'>
                    <div className='row'>
                        <div className='col-8 form-group'>
                            <label>Tìm kiếm sản phẩm</label>
                            <input
                                value={bicycle}
                                onChange={(e) => handleOnChangeSearch(e)}
                                type='text'
                                className='form-control'
                            />
                        </div>
                    </div>
                </div>

                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Giá cũ</th>
                                <th>Giá mới</th>
                                <th>% giảm giá</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listAllBicycle && listAllBicycle.length > 0 &&
                                listAllBicycle
                                    .filter((item) => item.name.match(new RegExp(bicycle, "i")))
                                    .map((item) => producJSX(item))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BicycleManage