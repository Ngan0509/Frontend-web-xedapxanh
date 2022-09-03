import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../Header';
import '../../Homepage.scss'
import './Author.scss'
import Select from 'react-select';
import * as userService from "../../../../services/userService"


function Signup() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCodeUserData = useSelector(selectors.selectorAllcodeUserData)

    const dispatch = useDispatch()
    let history = useHistory();

    useEffect(() => {
        return () => {
            setForm({
                fullname: '',
                email: '',
                password: '',
                password2: '',
                phoneNumber: '',
            })
            setIsShowPass(false)
            setErrorMessage('')
            setBlurId('')
            setListGender([])
            setSelects({ gender: '' })
        };
    }, []);

    // input onChange
    const [form, setForm] = useState({
        fullname: '',
        email: '',
        password: '',
        password2: '',
        phoneNumber: '',
    })

    const [isShowPass, setIsShowPass] = useState(false)

    const { fullname, email, password, password2, phoneNumber } = form

    const handleOnChange = (e, id) => {
        let copyForm = { ...form }
        copyForm[id] !== '' && setErrorMessage('')
        copyForm[id] !== '' && setBlurId('')
        copyForm[id] = e.target.value
        setForm({ ...copyForm })

    }

    const [listGender, setListGender] = useState([]);

    // dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllcodeUserStart())
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
        setListGender(buildInputData(allCodeUserData.listGender))

    }, [allCodeUserData, lang])

    // select onChange
    const [selects, setSelects] = useState({
        gender: ''
    })

    const { gender } = selects
    const handleChangeSelect = (selectedOption, name) => {
        setBlurId('')
        setErrorMessage('')
        let stateName = name.name;
        let copySelects = { ...selects }
        copySelects[stateName] = selectedOption

        setSelects({ ...copySelects })
    }

    const [errMessage, setErrorMessage] = useState('')
    const [blurId, setBlurId] = useState('')
    const handleOnBlur = (id) => {
        validator(id)
    }

    const validator = (id) => {
        let isValid = false
        let copyForm = { ...form, gender }

        if (copyForm[id] === '') {
            isValid = true
            setBlurId(id)
            setErrorMessage('Trường này không được để trống')
        } else {
            if (id === 'email') {
                const regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
                if (regex.test(copyForm[id])) {
                    isValid = false
                    setBlurId('')
                    setErrorMessage('')
                } else {
                    isValid = true
                    setBlurId(id)
                    setErrorMessage('Trường này phải là email')
                }
            } else if (id === 'password') {
                const min = 6
                if (copyForm[id].length >= min) {
                    isValid = false
                    setBlurId('')
                    setErrorMessage('')
                } else {
                    isValid = true
                    setBlurId(id)
                    setErrorMessage(`Vui lòng nhập tối thiểu ${min} ký tự`)
                }
            } else if (id === 'password2') {
                if (copyForm[id] === password) {
                    isValid = false
                    setBlurId('')
                    setErrorMessage('')
                } else {
                    isValid = true
                    setBlurId(id)
                    setErrorMessage('Giá trị nhập vào không chính xác')
                }
            } else {
                isValid = false
                setBlurId('')
                setErrorMessage('')
            }
        }

        return isValid

    }

    // submit (create user)
    const handleOnSubmit = async () => {

        let data = {
            ...form,
            gender: gender.value
        }

        let keys = Object.keys(data)

        let result = keys.every(key => validator(key) === false)

        if (!result) return

        const resp = await userService.handleSignUpClient(data)
        if (resp && resp.errCode === 0) {
            alert(resp.errMessage)
            history.push("/home/login")
        } else {
            alert(resp.errMessage)
        }

        setForm({
            fullname: '',
            email: '',
            password: '',
            password2: '',
            phoneNumber: '',
        })
        setSelects({
            gender: ''
        })
    }

    const handleShowPassword = () => {
        setIsShowPass(state => !state)
    }
    // const handleClickPushPage = (item) => {

    // }
    return (
        <div id="Signup">
            <Header />
            <div className="signup_bg">
                <div className="signup">
                    <div className='signup_content'>
                        <h3 className="heading">Thành viên đăng ký</h3>

                        <div className="spacer"></div>

                        <div className={`${blurId === 'fullname' ? 'form-group invalid' : 'form-group'}`}>
                            <label className="form-label">Tên đầy đủ</label>
                            <input
                                onBlur={() => handleOnBlur('fullname')}
                                value={fullname}
                                type='text'
                                onChange={(e) => handleOnChange(e, 'fullname')}
                                className='form-control'
                            />
                            <span className="form-message">
                                {blurId === 'fullname' && errMessage}
                            </span>
                        </div>

                        <div className={`${blurId === 'email' ? 'form-group invalid' : 'form-group'}`}>
                            <label className="form-label">Email</label>
                            <input
                                onBlur={() => handleOnBlur('email')}
                                value={email}
                                type='email'
                                onChange={(e) => handleOnChange(e, 'email')}
                                className='form-control'
                            />
                            <span className="form-message">
                                {blurId === 'email' && errMessage}
                            </span>
                        </div>

                        <div className={`${blurId === 'phoneNumber' ? 'form-group invalid' : 'form-group'}`}>
                            <label className="form-label">Số điện thoại</label>
                            <input
                                onBlur={() => handleOnBlur('phoneNumber')}
                                value={phoneNumber}
                                type='text'
                                onChange={(e) => handleOnChange(e, 'phoneNumber')}
                                className='form-control'
                            />
                            <span className="form-message">
                                {blurId === 'phoneNumber' && errMessage}
                            </span>
                        </div>

                        <div className={`${blurId === 'gender' ? 'form-group invalid' : 'form-group'}`}>
                            <label className="form-label">Giới tính</label>
                            <Select
                                value={gender}
                                name="gender"
                                onChange={handleChangeSelect}
                                options={listGender}
                                classNamePrefix="select-control"
                            />

                            <span className="form-message">
                                {blurId === 'gender' && errMessage}
                            </span>
                        </div>

                        <div className={`${blurId === 'password' ? 'form-group invalid' : 'form-group'}`}>
                            <label className="form-label">Mật khẩu</label>
                            <div className='form-wrap'>
                                <input
                                    onBlur={() => handleOnBlur('password')}
                                    value={password}
                                    type={isShowPass ? 'text' : 'password'}
                                    onChange={(e) => handleOnChange(e, 'password')}
                                    className='form-control'
                                />
                                <span
                                    onClick={handleShowPassword}
                                    className='icon-show'>
                                    {
                                        isShowPass ? <i className='bx bx-leaf'></i> : <i className='bx bxs-leaf'></i>
                                    }

                                </span>
                            </div>
                            <span className="form-message">
                                {blurId === 'password' && errMessage}
                            </span>
                        </div>

                        <div className={`${blurId === 'password2' ? 'form-group invalid' : 'form-group'}`}>
                            <label className="form-label">Nhập lại mật khẩu</label>
                            <div className='form-wrap'>
                                <input
                                    onBlur={() => handleOnBlur('password2')}
                                    value={password2}
                                    type={isShowPass ? 'text' : 'password'}
                                    onChange={(e) => handleOnChange(e, 'password2')}
                                    className='form-control'
                                />
                                <span
                                    onClick={handleShowPassword}
                                    className='icon-show'>
                                    {
                                        isShowPass ? <i className='bx bx-leaf'></i> : <i className='bx bxs-leaf'></i>
                                    }

                                </span>
                            </div>
                            <span className="form-message">
                                {blurId === 'password2' && errMessage}
                            </span>
                        </div>

                        <button
                            onClick={() => handleOnSubmit()}
                            className="form-submit">Đăng ký</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup