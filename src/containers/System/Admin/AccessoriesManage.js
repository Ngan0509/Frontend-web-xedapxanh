import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react'
import Select from 'react-select';
import CommonUtils from '../../../utils/CommonUtils';

import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import * as userService from '../../../services/userService'
// import Slider from "react-slick";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './Manage.scss'
const MAX_COUNT = 8;

function AccessoriesManage() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCodeData = useSelector(selectors.selectorAllcodeAccessoryData)
    const categoryData = useSelector(selectors.selectorCategoryData)
    const allAccessoriesData = useSelector(selectors.selectorAllAccessoriesData)
    const dispatch = useDispatch()

    const buildInputData = useCallback((inputData, type) => {
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
    }, [lang])

    useEffect(() => {
        return () => {
            setForm({
                productName: '',
                priceNew: '',
                previewImg: ''
            })
            setSelects({
                category: '',
                accessories_id: ''
            })
            setIsEdit(false)
            setId('')
            setListCategory([])
            setListAllAccessories([])
            setListAccessories([])
            setAccessories('')
        }
    }, [])

    // input onChange
    const [form, setForm] = useState({
        productName: '',
        priceNew: '',
        previewImg: ''
    })

    const { productName, priceNew, previewImg } = form

    const handleOnChange = (e, id) => {
        let copyForm = { ...form }
        copyForm[id] = e.target.value
        setForm({ ...copyForm })

    }

    // select onChange
    const [selects, setSelects] = useState({
        category: '',
        accessories_id: ''
    })

    const { category, accessories_id } = selects
    const handleChangeSelect = (selectedOption, name) => {
        let stateName = name.name;
        let copySelects = { ...selects }
        copySelects[stateName] = selectedOption

        setSelects({ ...copySelects })
    }

    useEffect(() => {
        if (category.value === 4) {
            setListAccessories(buildInputData(allCodeData.listBicycleAs))
        } else if (category.value === 5) {
            setListAccessories(buildInputData(allCodeData.listRiderAs))
        } else if (category.value === 6) {
            setListAccessories(buildInputData(allCodeData.listAccessary))
        }
    }, [category, buildInputData, allCodeData])

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

    //check input
    const checkUserInput = () => {
        let isValid = true
        let arrInputs = ["productName", "priceNew", "category", "accessories_id"]
        let data = { ...form, ...selects }
        for (let i = 0; i < arrInputs.length; i++) {
            if (!data[arrInputs[i]] && data[arrInputs[i]] !== 0) {
                isValid = false
                alert(`Missing required parameter: ${arrInputs[i]}`)
                break
            }
        }
        return isValid
    }

    // array
    const [listCategory, setListCategory] = useState([]);
    const [listAllAccessories, setListAllAccessories] = useState([]);
    const [listAccessories, setListAccessories] = useState([]);

    //dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllcodeAccessoryStart())
        dispatch(actions.fetchCategoryStart('ACCESSORIES'))
        dispatch(actions.fetchAllAccessoriesStart('All'))
    }, [dispatch])

    // get allCode cho bicycle
    useEffect(() => {
        setListCategory(buildInputData(categoryData, 'CATEGORY'))
    }, [categoryData, buildInputData])

    // get AllBicycle
    useEffect(() => {
        setListAllAccessories(allAccessoriesData)
    }, [allAccessoriesData])


    // search bicycle onChange

    const [accessories, setAccessories] = useState('')
    const handleOnChangeSearch = (e) => {
        setAccessories(e.target.value)
    }

    // create product
    const handleOnSubmit = async () => {
        let isValid = checkUserInput()
        if (!isValid) return

        if (isEdit) {
            let dataEdit = {
                id,
                ...form,
                category: category.value,
                accessories_id: accessories_id.value
            }
            const resp = await userService.handleUpdateNewAccessory(dataEdit)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllAccessoriesStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        } else {
            let data = {
                ...form,
                category: category.value,
                accessories_id: accessories_id.value
            }
            const resp = await userService.handleCreateNewAccessory(data)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllAccessoriesStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        }

        setForm({
            productName: '',
            priceNew: '',
            previewImg: ''
        })
        setSelects({
            category: '',
            accessories_id: ''
        })
        setIsEdit(false)
        setId('')
    }

    // delete bicycle
    const handleDeleteNewAccessory = async (userId) => {
        const resp = await userService.handleDeleteNewAccessory(userId)
        if (resp && resp.errCode === 0) {
            dispatch(actions.fetchAllAccessoriesStart('All'))
            alert(resp.errMessage)
            setForm({
                productName: '',
                priceNew: '',
                previewImg: ''
            })
            setSelects({
                category: '',
                accessories_id: ''
            })
            setIsEdit(false)
            setId('')
        } else {
            alert(resp.errMessage)
        }
    }

    // edit bicycle
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState('')

    const handleEditNewAccesssory = (accessoriesData) => {
        setIsEdit(true)
        setId(accessoriesData.id)
        setForm({
            productName: accessoriesData.name,
            priceNew: accessoriesData.price_new,
            previewImg: accessoriesData.image
        })
        let category = listCategory.find(item => item.value === accessoriesData.category_id)
        let accessories_id = listAccessories.find(item => item.value === accessoriesData.accessories_id)

        setSelects({
            category,
            accessories_id
        })
    }

    // multi images----------------------------------------------------------
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [isLimitFiles, setIsLimitFiles] = useState(false)
    const handleUploadFiles = (files) => {
        const uploadeds = [...uploadedFiles]
        let limitExceeded = false
        let count = 0
        files.some((file) => {
            if (uploadeds.findIndex((f) => f.name === file.name) === -1) {
                uploadeds.push(file)
                count++;
                if (uploadeds.length === MAX_COUNT) setIsLimitFiles(true)
                if (uploadeds.length > MAX_COUNT) {
                    alert(`Bạn chỉ được thêm ${MAX_COUNT} file ảnh`)
                    setIsLimitFiles(false)
                    limitExceeded = true
                }
            }
            return limitExceeded
        })
        if (!limitExceeded) {
            alert(`Tải ${count} ảnh thành công`)

            setUploadedFiles(uploadeds)
        }
    }


    const handleChangeMultiImage = async (e) => {
        let chosenFiles = Array.prototype.slice.call(e.target.files)
        chosenFiles = await Promise.all(
            chosenFiles.map(async (file) => {
                let base64 = await CommonUtils.getBase64(file)
                return {
                    isGetFromData: false,
                    name: file.name,
                    base64
                }
            })
        )
        handleUploadFiles(chosenFiles)
    }


    const [isShow, setIsShow] = useState(false)
    const toggle = () => {
        setIsShow(state => !state)
        setIsLimitFiles(false)
    }

    const [idImage, setIdImage] = useState(null)

    const handleGetMultiImage = async (id) => {
        const resp = await userService.handleGetMultiImage(id, 'ACCESSORIES')
        if (resp && resp.errCode === 0) {
            if (resp.data && resp.data.length > 0) {
                let result = resp.data.map((item) => ({
                    isGetFromData: true,
                    name: item.name,
                    base64: item.image
                }))
                return result
            }
        } else {
            alert(resp.errMessage)
        }
        return []
    }

    const handleShowModal = async (id) => {
        toggle()
        setIdImage(id)
        let result = await handleGetMultiImage(id)
        setUploadedFiles(result)
    }

    const handleSaveMultiImage = async () => {
        let arrImage = uploadedFiles.filter(item => !item.isGetFromData)
        // let array2 = await handleGetMultiImage(idImage)

        // var unique = [];
        // for (let i = 0; i < array1.length; i++) {
        //     let found = false;

        //     if (array2.length > 0) {
        //         for (let j = 0; j < array2.length; j++) { // j < is missed;
        //             if (array1[i].name === array2[j].name) {
        //                 found = true;
        //                 break;
        //             }
        //         }
        //     }
        //     if (found === false) {
        //         unique.push(array1[i]);
        //     }
        // }

        const data = {
            type: 'ACCESSORIES',
            productId: idImage,
            arrImage
        }
        const resp = await userService.handleCreateMultiImage(data)
        if (resp && resp.errCode === 0) {
            alert(resp.errMessage)
        } else {
            alert(resp.errMessage)
        }

        setUploadedFiles([])
        setIdImage(null)
        setIsLimitFiles(false)
        setIsShow(false)
    }

    const handleDeleteMultiImage = async (file) => {
        if (file.isGetFromData) {
            const resp = await userService.handleDeleteMultiImage(file.name)
            if (resp && resp.errCode === 0) {
                let result = await handleGetMultiImage(idImage)
                let result2 = uploadedFiles.filter(item => !item.isGetFromData)
                let result3 = [...result, ...result2];
                setUploadedFiles(result3)
            } else {
                alert(resp.errMessage)
            }
        } else {
            let result = uploadedFiles.filter(item => item.name !== file.name)
            setUploadedFiles(result)
        }
        setIsLimitFiles(false)
    }

    //-------------------------------------------------------------------------------


    const producJSX = (item) => (
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.price_new}</td>
            <td>
                <button
                    onClick={() => handleShowModal(item.id)}
                    className='btn more-image'>Thêm ảnh</button>
                <span
                    onClick={() => handleEditNewAccesssory(item)}
                    className='icon-edit'>
                    <i className='bx bxs-pencil'></i>
                </span>
                <span
                    onClick={() => handleDeleteNewAccessory(item.id)}
                    className='icon-delete'>
                    <i className='bx bxs-trash' ></i>
                </span>
            </td>
        </tr>

    )

    return (
        <div id="AccessoriesManage">
            <Modal
                isOpen={isShow}
                toggle={toggle}
                size="lg"
                className='modal_user-container'
            >
                <ModalHeader>
                    Thêm ảnh cho sản phẩm
                </ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="container-row">
                            <div className='multi_img'>
                                <label htmlFor='image'>
                                    Tải nhiều ảnh cho sản phẩm ở đây
                                </label>
                                <div className='previewImg_wrap'>
                                    <input
                                        disabled={isLimitFiles}
                                        onChange={(e) => handleChangeMultiImage(e)}
                                        type="file" id="multiImg" hidden name="image" multiple
                                        accept='image/png, image/gif, image/jpeg' />
                                    <label className={`labelImage btn ${!isLimitFiles ? '' : 'disable'}`} htmlFor='multiImg'>
                                        <FormattedMessage id="bicycle-manage.downImage" />
                                        <i className='bx bxs-download'></i>
                                    </label>
                                    <span>{`(chỉ được tải ${MAX_COUNT} ảnh)`}</span>
                                </div>
                                <div className='uploadedImg_list'>
                                    {
                                        uploadedFiles && uploadedFiles.length > 0 &&
                                        uploadedFiles.map((file, i) => (
                                            <div className='wrap' key={i}>
                                                <span
                                                    onClick={() => handleDeleteMultiImage(file)}
                                                    className='icon_close'>
                                                    <i className='bx bxs-x-circle'></i>
                                                </span>
                                                <span
                                                    className='image_uploaded'
                                                >
                                                    <img src={file.base64} alt="preview" />
                                                </span>
                                            </div>
                                        ))
                                    }
                                </div>
                                {/* <button 
                                    onClick={() => handleDeleteMultiImage()}
                                    className='btn delete_btn'>
                                    Xóa ảnh
                                </button> */}
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => handleSaveMultiImage()}
                        className='btn-user'
                        color="primary"
                    >
                        Save
                    </Button>
                    <Button
                        onClick={toggle}
                        className='btn-user'
                    >
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
            <div className='accessoriesManage'>
                <h3 className='title text-center'>
                    <FormattedMessage id="menu.admin.accessories-manage" />
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
                        <label><FormattedMessage id="bicycle-manage.accessories" /></label>
                        <Select
                            value={accessories_id}
                            name="accessories_id"
                            onChange={handleChangeSelect}
                            options={listAccessories}
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
                            <label><FormattedMessage id="bicycle-manage.search" /></label>
                            <input
                                value={accessories}
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
                                <th><FormattedMessage id="bicycle-manage.productName" /></th>
                                <th><FormattedMessage id="bicycle-manage.priceNew" /></th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listAllAccessories && listAllAccessories.length > 0 &&
                                listAllAccessories
                                    .filter((item) => item.name.match(new RegExp(accessories, "i")))
                                    .map((item) => producJSX(item))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AccessoriesManage