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
function UserManage() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCodeUserData = useSelector(selectors.selectorAllcodeUserData)
    const allUserData = useSelector(selectors.selectorAllUserData)

    const dispatch = useDispatch()

    // input onChange
    const [form, setForm] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
    })

    const { fullname, email, password, phoneNumber } = form

    const handleOnChange = (e, id) => {
        let copyForm = { ...form }
        copyForm[id] = e.target.value
        setForm({ ...copyForm })

    }

    // array
    const [listRole, setListRole] = useState([]);
    const [listGender, setListGender] = useState([]);
    const [listAllUser, setListAllUser] = useState([]);

    // dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllcodeUserStart())
        dispatch(actions.fetchAllUserStart('All'))
    }, [dispatch])

    // Get Allcodeuser cho user
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
        setListRole(buildInputData(allCodeUserData.listRole))
        setListGender(buildInputData(allCodeUserData.listGender))

    }, [allCodeUserData, lang])

    // get AllUser
    useEffect(() => {
        setListAllUser(allUserData)
    }, [allUserData])

    // select onChange
    const [selects, setSelects] = useState({
        role: '',
        gender: ''
    })

    const { role, gender } = selects
    const handleChangeSelect = (selectedOption, name) => {
        let stateName = name.name;
        let copySelects = { ...selects }
        copySelects[stateName] = selectedOption

        setSelects({ ...copySelects })
    }

    // submit (create user)
    const handleOnSubmit = async () => {
        setForm({
            fullname: '',
            email: '',
            password: '',
            phoneNumber: '',
        })
        setSelects({
            role: '',
            gender: ''
        })
        setIsEdit(false)
        setId('')


        if (isEdit) {
            let dataEdit = {
                id,
                ...form,
                role: role.value,
                gender: gender.value
            }
            console.log("dataEdit", dataEdit)
            const resp = await userService.handleUpdateNewUser(dataEdit)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllUserStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        } else {
            let data = {
                ...form,
                role: role.value,
                gender: gender.value
            }
            console.log("data", data)
            const resp = await userService.handleCreateNewUser(data)
            if (resp && resp.errCode === 0) {
                dispatch(actions.fetchAllUserStart('All'))
                alert(resp.errMessage)
            } else {
                alert(resp.errMessage)
            }
        }
    }

    // delete user
    const handleDeleteNewUser = async (userId) => {
        const resp = await userService.handleDeleteNewUser(userId)
        if (resp && resp.errCode === 0) {
            dispatch(actions.fetchAllUserStart('All'))
            alert(resp.errMessage)
        } else {
            alert(resp.errMessage)
        }
    }

    // edit user
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState('')

    const handleEditNewUser = (adminData) => {
        setIsEdit(true)
        setId(adminData.id)
        setForm({
            fullname: adminData.name,
            email: adminData.email,
            password: 'password',
            phoneNumber: adminData.phoneNumber,
        })
        let role = listRole.find(item => item.value === adminData.roleId)
        let gender = listGender.find(item => item.value === adminData.genderId)

        setSelects({
            role,
            gender
        })
    }

    return (
        <div id="UserManage">
            <div className='userManage'>
                <h3 className='title text-center'><FormattedMessage id="menu.admin.user-manage" /></h3>

                <div className='row form'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="user-manage.fullname" /></label>
                        <input
                            value={fullname}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'fullname')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="user-manage.email" /></label>
                        <input
                            disabled={isEdit ? true : false}
                            value={email}
                            type='email'
                            onChange={(e) => handleOnChange(e, 'email')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="user-manage.password" /></label>
                        <input
                            disabled={isEdit ? true : false}
                            value={password}
                            type='password'
                            onChange={(e) => handleOnChange(e, 'password')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="user-manage.phoneNumber" /></label>
                        <input
                            value={phoneNumber}
                            type='text'
                            onChange={(e) => handleOnChange(e, 'phoneNumber')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="user-manage.role" />
                        </label>
                        <Select
                            value={role}
                            name="role"
                            onChange={handleChangeSelect}
                            options={listRole}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label>
                            <FormattedMessage id="user-manage.sex" />
                        </label>
                        <Select
                            value={gender}
                            name="gender"
                            onChange={handleChangeSelect}
                            options={listGender}
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <button
                            className={`btn ${isEdit ? 'btn-warning' : 'btn-primary'} btn-create`}
                            onClick={() => handleOnSubmit()}
                        >
                            {
                                isEdit ?
                                    <FormattedMessage id="user-manage.update-user" /> :
                                    <FormattedMessage id="user-manage.create-user" />
                            }
                        </button>
                    </div>
                </div>
                <div className='table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listAllUser && listAllUser.length > 0 &&
                                listAllUser.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.roleId}</td>
                                        <td>
                                            <span
                                                onClick={() => handleEditNewUser(item)}
                                                className='icon-edit'>
                                                <i className='bx bxs-pencil'></i>
                                            </span>
                                            <span
                                                onClick={() => handleDeleteNewUser(item.id)}
                                                className='icon-delete'>
                                                <i className='bx bxs-trash' ></i>
                                            </span>
                                        </td>
                                    </tr>

                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserManage