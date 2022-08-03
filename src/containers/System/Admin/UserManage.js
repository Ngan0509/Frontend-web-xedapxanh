import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import Select from 'react-select';


// import Slider from "react-slick";
import './Manage.scss'
function UserManage() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCodeUserData = useSelector(selectors.selectorAllcodeUserData)

    const dispatch = useDispatch()

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

    const [listRole, setListRole] = useState([]);
    const [listGender, setListGender] = useState([]);

    useEffect(() => {
        dispatch(actions.fetchAllcodeUserStart())
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
        setListRole(buildInputData(allCodeUserData.listRole))
        setListGender(buildInputData(allCodeUserData.listGender))

    }, [allCodeUserData, lang])

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

    const handleOnSubmit = () => {
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
        console.log("data", { ...form, ...selects })
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
                            value={email}
                            type='email'
                            onChange={(e) => handleOnChange(e, 'email')}
                            className='form-control'
                        />
                    </div>

                    <div className='col-4 form-group'>
                        <label><FormattedMessage id="user-manage.password" /></label>
                        <input
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
                            className='btn btn-primary btn-create'
                            onClick={() => handleOnSubmit()}
                        >
                            <FormattedMessage id="user-manage.create-user" />
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Peter</td>
                                <td>Griffin</td>
                                <td>123</td>
                                <td>
                                    <span className='icon-edit'>
                                        <i class='bx bxs-pencil'></i>
                                    </span>
                                    <span className='icon-delete'>
                                        <i class='bx bxs-trash' ></i>
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

export default UserManage