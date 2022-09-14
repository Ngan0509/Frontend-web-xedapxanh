import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
// import { LANGUAGES } from '../../../utils/constant'
import * as userService from '../../../services/userService'
import CommonUtils from '../../../utils/CommonUtils';


// import Slider from "react-slick";
import './Manage.scss'
function StoreManage() {
    // const lang = useSelector(selectors.selectorLanguages)
    const allStoreData = useSelector(selectors.selectorAllStoreData)

    const dispatch = useDispatch()

    // input onChange
    const [form, setForm] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        previewImg: ''
    })

    const { name, address, phoneNumber, previewImg } = form

    const handleOnChange = (e, id) => {
        let copyForm = { ...form }
        copyForm[id] = e.target.value
        setForm({ ...copyForm })
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
    const [listAllStore, setListAllStore] = useState([]);

    // dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllStoreStart('All'))
    }, [dispatch])

    // get AllStore
    useEffect(() => {
        setListAllStore(allStoreData)
    }, [allStoreData])

    // submit
    const handleOnSubmit = async () => {
        setForm({
            name: '',
            address: '',
            phoneNumber: '',
            previewImg: ''
        })

        setIsEdit(false)
        setId('')

        if (isEdit) {
            let dataEdit = {
                id,
                ...form,
                image: previewImg

            }
            console.log("dataEdit", dataEdit)
            const resp = await userService.handleUpdateNewStore(dataEdit)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllStoreStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        } else {
            let data = {
                ...form,
                image: previewImg
            }
            console.log("data", data)
            const resp = await userService.handleCreateNewStore(data)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllStoreStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        }

    }

    // delete store
    const handleDeleteNewStore = async (userId) => {
        const resp = await userService.handleDeleteNewStore(userId)
        if (resp && resp.errCode === 0) {
            dispatch(actions.fetchAllStoreStart('All'))
            alert(resp.errMessage)
        } else {
            alert(resp.errMessage)
        }
    }

    // edit Store
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState('')

    const handleEditNewStore = (storeData) => {
        setIsEdit(true)
        setId(storeData.id)
        setForm({
            name: storeData.name,
            address: storeData.address,
            phoneNumber: storeData.phoneNumber,
            previewImg: storeData.image
        })

    }

    const producJSX = (item) => (
        <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.phoneNumber}</td>
            <td>
                <span
                    onClick={() => handleEditNewStore(item)}
                    className='icon-edit'>
                    <i className='bx bxs-pencil'></i>
                </span>
                <span
                    onClick={() => handleDeleteNewStore(item.id)}
                    className='icon-delete'>
                    <i className='bx bxs-trash' ></i>
                </span>
            </td>
        </tr>

    )

    return (
        <div id="StoreManage">
            <div className='storeManage'>
                <h3 className='title text-center'><FormattedMessage id="menu.admin.store-manage" /></h3>

                <div className='row form'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="store-manage.name" /></label>
                        <input
                            value={name}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'name')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-6 form-group'>
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

                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="store-manage.address" /></label>
                        <input
                            value={address}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'address')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label><FormattedMessage id="store-manage.phoneNumber" /></label>
                        <input
                            value={phoneNumber}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'phoneNumber')}
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
                                    <FormattedMessage id="user-manage.update-store" /> :
                                    <FormattedMessage id="user-manage.create-store" />
                            }
                        </button>
                    </div>
                </div>

                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th><FormattedMessage id="store-manage.name" /></th>
                                <th><FormattedMessage id="store-manage.address" /></th>
                                <th><FormattedMessage id="store-manage.phoneNumber" /></th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listAllStore && listAllStore.length > 0 &&
                                listAllStore
                                    .map((item) => producJSX(item))

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default StoreManage