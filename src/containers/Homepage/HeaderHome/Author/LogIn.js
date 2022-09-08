import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Header from '../Header';
import '../../Homepage.scss'
import './Author.scss'
import _ from 'lodash';

import * as userService from "../../../../services/userService"

function Login() {
    const lang = useSelector(selectors.selectorLanguages)

    const dispatch = useDispatch()
    let history = useHistory();

    useEffect(() => {
        return () => {
            setForm({
                email: '',
                password: '',
            })
            setIsShowPass(false)
            setErrorMessage('')
            setBlurId('')
            setErrorMessageLogin('')
        };
    }, []);

    // input onChange
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const [isShowPass, setIsShowPass] = useState(false)

    const { email, password } = form

    const handleOnChange = (e, id) => {
        let copyForm = { ...form }
        copyForm[id] !== '' && setErrorMessage('')
        copyForm[id] !== '' && setBlurId('')
        copyForm[id] = e.target.value
        setForm({ ...copyForm })

    }

    const [errMessage, setErrorMessage] = useState('')
    const [blurId, setBlurId] = useState('')
    const handleOnBlur = (id) => {
        validator(id)
    }

    const validator = (id) => {
        let isValid = false
        let copyForm = { ...form }

        if (copyForm[id] === '') {
            isValid = true
            setBlurId(id)
            setErrorMessage('Trường này không được để trống')
        } else {
            if (id === 'email') {
                const regex = /^[a-z][a-z0-9]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
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
            } else {
                isValid = false
                setBlurId('')
                setErrorMessage('')
            }
        }

        return isValid

    }

    const [errMessageLogin, setErrorMessageLogin] = useState('')

    // submit
    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setErrorMessageLogin('')
        let keys = Object.keys(form)

        let result = keys.every(key => validator(key) === false)

        if (!result) return

        try {
            let data = await userService.handleLogInClient(email, password)
            console.log('data', data)
            if (data && data.errCode !== 0) {
                setErrorMessageLogin(data.errMessage)
            }
            if (data && data.errCode === 0 && !_.isEmpty(data.user)) {
                dispatch(actions.clientLoginSuccess(data.user))
                history.push("/home/cart/checkoutdetails")
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    setErrorMessageLogin(error.response.data.errMessage)
                }
            }
            console.log("error ", error.response)
        }
        setForm({
            email: '',
            password: ''
        })
    }

    const handleOnkeyDownLogin = (e) => {
        if (e.keyCode === 13) {
            handleOnSubmit()
        }
    }

    const handleShowPassword = () => {
        setIsShowPass(state => !state)
    }

    const handlePushPageSignUp = () => {
        history.push("/home/signup")
    }
    return (
        <div id="Login">
            <Header />
            <div className="login_bg">
                <div className="login">
                    <form className='login_content'>
                        <h3 className="login-heading">Đăng Nhập</h3>

                        <div className="not-account">
                            Bạn chưa có tài khoản?
                            <span
                                onClick={handlePushPageSignUp}
                            >Đăng ký ở đây</span>
                        </div>

                        <div className={`${blurId === 'email' ? 'form-group invalid' : 'form-group'}`}>
                            <label className="form-label">Email</label>
                            <input
                                onBlur={() => handleOnBlur('email')}
                                value={email}
                                type='email'
                                onKeyDown={handleOnkeyDownLogin}
                                onChange={(e) => handleOnChange(e, 'email')}
                                className='form-control'
                            />
                            <span className="form-message">
                                {blurId === 'email' && errMessage}
                            </span>
                        </div>

                        <div className={`${blurId === 'password' ? 'form-group invalid' : 'form-group'}`}>
                            <label className="form-label">Mật khẩu</label>
                            <div className='form-wrap'>
                                <input
                                    onBlur={() => handleOnBlur('password')}
                                    value={password}
                                    type={isShowPass ? 'text' : 'password'}
                                    onKeyDown={handleOnkeyDownLogin}
                                    onChange={(e) => handleOnChange(e, 'password')}
                                    className='form-control'
                                    autoComplete="on"
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

                        <div className='err-message'>
                            {errMessageLogin}
                        </div>

                        <button
                            onClick={(e) => handleOnSubmit(e)}
                            className="form-submit">Đăng nhập</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login