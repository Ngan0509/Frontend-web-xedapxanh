import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import Select from 'react-select';
import * as userService from '../../../services/userService'

// import Slider from "react-slick";
import './Manage.scss'
function FilterManage() {
    const lang = useSelector(selectors.selectorLanguages)
    const categoryData = useSelector(selectors.selectorCategoryData)

    const dispatch = useDispatch()

    // input onChange
    const [form, setForm] = useState({
        nameEn: '',
        nameVi: ''
    })

    const { nameEn, nameVi } = form

    const handleOnChange = (e, id) => {
        let copyForm = { ...form }
        copyForm[id] = e.target.value
        setForm({ ...copyForm })

    }

    // select onChange
    const [selects, setSelects] = useState({
        type: '',
        category: ''
    })

    const { type, category } = selects
    const handleChangeSelect = (selectedOption, name) => {
        let stateName = name.name;
        let copySelects = { ...selects }
        copySelects[stateName] = selectedOption

        setSelects({ ...copySelects })
    }

    // array
    const [listType, setListType] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    console.log("listType", listType)
    // dispatch actions
    useEffect(() => {
        dispatch(actions.fetchCategoryStart())
    }, [dispatch])

    // get type
    useEffect(async () => {
        const buildInputData = (inputData) => {
            if (inputData && inputData.length > 0) {
                let result = inputData.map((item) => {
                    return {
                        label: item.type,
                        value: item.type
                    }
                })
                return result
            }
        }
        let resp = await userService.handleGetTypeAllCode()
        if (resp && resp.errCode === 0) {
            setListType(buildInputData(resp.data))
            alert(resp.errMessage)
        } else {
            alert(resp.errMessage)
        }
    }, [])
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

    }, [categoryData, lang])

    // submit
    const handleOnSubmit = async () => {
        setForm({
            nameEn: '',
            nameVi: ''
        })
        setSelects({
            type: '',
            category: ''
        })

        let data = {
            ...form,
            type: type.value,
            category: category.value
        }
        console.log("data", data)
        // const resp = await userService.handleCreateFilter(data)
        // if (resp && resp.errCode === 0) {
        //     alert(resp.errMessage)
        // } else {
        //     alert(resp.errMessage)
        // }

    }

    return (
        <div id="FilterManage">
            <div className='filterManage'>
                <h3 className='title text-center'><FormattedMessage id="menu.admin.filter-manage" /></h3>

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
                        <label>Nhãn tiếng Anh</label>
                        <input
                            value={nameEn}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'nameEn')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>Nhãn tiếng Việt</label>
                        <input
                            value={nameVi}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'nameVi')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>
                            Loại sản phẩm
                        </label>
                        <Select
                            value={type}
                            name="type"
                            onChange={handleChangeSelect}
                            options={listType}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <button
                            className='btn btn-primary btn-create'
                            onClick={() => handleOnSubmit()}
                        >
                            Tạo bộ lọc
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterManage