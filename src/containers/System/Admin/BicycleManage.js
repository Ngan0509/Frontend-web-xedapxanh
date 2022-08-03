import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import Select from 'react-select';
import CommonUtils from '../../../utils/CommonUtils';

import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'

// import Slider from "react-slick";
import './Manage.scss'
function BicycleManage() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCodeData = useSelector(selectors.selectorAllcodeData)
    const categoryData = useSelector(selectors.selectorCategoryData)

    const dispatch = useDispatch()

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

    const handleChangeImage = async (e) => {
        let files = e.target.files;
        let file = files[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            // let objectUrl = URL.createObjectURL(file)
            setForm({ ...form, previewImg: base64 })
        }
    }

    const [listCategory, setListCategory] = useState([]);
    const [listPriceSpace, setListPriceSpace] = useState([]);
    const [listBrand, setListBrand] = useState([]);
    const [listUseTarget, setListUseTarget] = useState([]);
    const [listWeelSize, setListWeelSize] = useState([]);
    const [listFrameMaterial, setListFrameMaterial] = useState([]);
    const [listriderHeight, setListriderHeight] = useState([]);
    const [listBrake, setListBrake] = useState([]);

    useEffect(() => {
        console.log("abcxyz")
        dispatch(actions.fetchAllcodeStart())
        dispatch(actions.fetchCategoryStart())
    }, [dispatch])

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
        setListriderHeight(buildInputData(allCodeData.listriderHeight))
        setListBrake(buildInputData(allCodeData.listBrake))
    }, [allCodeData, lang, categoryData])

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

    const handleOnSubmit = () => {
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
        console.log("data", { ...form, ...selects })

    }

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
                            options={listriderHeight}
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
                            className='btn btn-primary btn-create'
                            onClick={() => handleOnSubmit()}
                        >
                            <FormattedMessage id="bicycle-manage.create-product" />
                        </button>
                    </div>
                </div>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Peter</td>
                                <td>Griffin</td>
                                <td>
                                    <span className='icon-edit'>
                                        <i className='bx bxs-pencil'></i>
                                    </span>
                                    <span className='icon-delete'>
                                        <i className='bx bxs-trash' ></i>
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BicycleManage