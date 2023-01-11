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
    const allFilterData = useSelector(selectors.selectorAllFilterData)

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            setForm({
                nameEn: '',
                nameVi: ''
            })
            setSelects({
                type: '',
                category: ''
            })

            setIsEdit(false)
            setId('')
            setListType([])
            setListCategory([])
            setListAllFilter([])
        }
    }, [])

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
    const [listAllFilter, setListAllFilter] = useState([]);

    // dispatch actions
    useEffect(() => {
        dispatch(actions.fetchCategoryStart())
        dispatch(actions.fetchAllFilterStart('All'))
    }, [dispatch])

    // get type
    useEffect(() => {
        async function fetchData() {
            // You can await here
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
            } else {
                alert(resp.errMessage)
            }
            // ...
        }
        fetchData();
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

    // get AllFilter
    useEffect(() => {
        setListAllFilter(allFilterData)
    }, [allFilterData])

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

        setIsEdit(false)
        setId('')

        if (isEdit) {
            let dataEdit = {
                id,
                ...form,
                type: type.value,
                category: category.value
            }
            const resp = await userService.handleUpdateNewFilter(dataEdit)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllFilterStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        } else {
            let data = {
                ...form,
                type: type.value,
                category: category.value
            }
            const resp = await userService.handleCreateNewFilter(data)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllFilterStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        }

    }

    // delete filter
    const handleDeleteNewFilter = async (userId) => {
        const resp = await userService.handleDeleteNewFilter(userId)
        if (resp && resp.errCode === 0) {
            dispatch(actions.fetchAllFilterStart('All'))
            alert(resp.errMessage)
        } else {
            alert(resp.errMessage)
        }
    }

    // edit filter
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState('')

    const handleEditNewFilter = (filterData) => {
        setIsEdit(true)
        setId(filterData.id)
        setForm({
            nameEn: filterData.nameEn,
            nameVi: filterData.nameVi
        })
        let category = listCategory.find(item => item.value === filterData.category_id)
        let type = listType.find(item => item.value === filterData.type)

        setSelects({
            category,
            type
        })
    }

    const producJSX = (item) => (
        <tr key={item.id}>
            <td>{item.category_id}</td>
            <td>{item.nameEn}</td>
            <td>{item.nameVi}</td>
            <td>{item.type}</td>
            <td>
                <span
                    onClick={() => handleEditNewFilter(item)}
                    className='icon-edit'>
                    <i className='bx bxs-pencil'></i>
                </span>
                <span
                    onClick={() => handleDeleteNewFilter(item.id)}
                    className='icon-delete'>
                    <i className='bx bxs-trash' ></i>
                </span>
            </td>
        </tr>

    )

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
                        <label><FormattedMessage id="bicycle-manage.labelEn" /></label>
                        <input
                            value={nameEn}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'nameEn')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="bicycle-manage.labelVi" /></label>
                        <input
                            value={nameVi}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'nameVi')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="bicycle-manage.type" />
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
                            className={`btn ${isEdit ? 'btn-warning' : 'btn-primary'} btn-create`}
                            onClick={() => handleOnSubmit()}
                        >
                            {
                                isEdit ?
                                    <FormattedMessage id="bicycle-manage.update-filter" /> :
                                    <FormattedMessage id="bicycle-manage.create-filter" />
                            }
                        </button>
                    </div>
                </div>

                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>ID <FormattedMessage id="bicycle-manage.category" /></th>
                                <th><FormattedMessage id="bicycle-manage.labelEn" /></th>
                                <th><FormattedMessage id="bicycle-manage.labelVi" /></th>
                                <th><FormattedMessage id="bicycle-manage.type" /></th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listAllFilter && listAllFilter.length > 0 &&
                                    category ?
                                    listAllFilter
                                        .filter((item) => item.category_id === category.value)
                                        .map((item) => producJSX(item))
                                    :
                                    listAllFilter
                                        .map((item) => producJSX(item))

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default FilterManage