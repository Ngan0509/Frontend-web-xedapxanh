import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'
import { useEffect, useState, useCallback } from 'react';
import { useHistory } from "react-router-dom";
import CommonUtils from '../../../../utils/CommonUtils';
import DatePicker from '../../../../components/Input/DatePicker';
import _ from 'lodash';
import * as userService from '../../../../services/userService'

function Account() {
    const lang = useSelector(selectors.selectorLanguages)
    const allCodeUserData = useSelector(selectors.selectorAllcodeUserData)
    const clientInfoSelect = useSelector(selectors.selectorClientInfo)

    const dispatch = useDispatch()
    let history = useHistory();

    const [clientInfo, setClientInfo] = useState({});
    // get clientInfo
    useEffect(() => {
        setClientInfo(clientInfoSelect)
    }, [clientInfoSelect])

    // input onChange
    const [form, setForm] = useState({
        fullname: '',
        birthday: ''
    })

    const [previewImg, setPreviewImg] = useState('')

    useEffect(() => {
        if (!_.isEmpty(clientInfo)) {
            let image = clientInfo.image
            setPreviewImg(image)
        }
    }, [clientInfo])

    const { fullname, birthday } = form

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
            setPreviewImg(base64)
        }
    }

    const buildInputData = useCallback((inputData, type) => {
        if (inputData && inputData.length > 0) {
            let result = inputData.map((item) => {
                let value, label

                label = lang === LANGUAGES.VI ? item.valueVi : item.valueEn
                value = item.keyMap

                return {
                    label: label,
                    value: value
                }
            })
            return result
        }
    }, [lang])

    const [listGender, setListGender] = useState([]);

    // dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllcodeUserStart())
    }, [dispatch])

    // Get Allcodeuser cho user
    useEffect(() => {
        setListGender(buildInputData(allCodeUserData.listGender))

    }, [allCodeUserData, buildInputData])

    const [genderId, setGenderId] = useState('')

    const handleChangeGender = (value) => {
        setGenderId(value)
    }

    const handleChangeDate = (date) => {
        setForm({ ...form, birthday: date[0] })
    }

    const handleSubmit = async () => {
        let birthdaye = new Date(birthday).getTime()

        const data = {
            id: clientInfo.id,
            fullname,
            image: previewImg,
            birthday: birthdaye,
            gender: genderId
        }

        const resp = await userService.handleUpdateNewClient(data)
        if (resp && resp.errCode === 0) {
            alert(resp.errMessage)
            dispatch(actions.clientLoginSuccess({ ...clientInfoSelect, fullname, image: previewImg }))
        } else {
            alert(resp.errMessage)
        }

        setForm({
            fullname: '',
            birthday: ''
        })

        setPreviewImg('')
        setGenderId('')
    }

    // const handleClickPushPage = (item) => {

    // }

    return (
        <div id="Account">
            <div className="account_bg">
                <div className="account">
                    <h5>Hồ sơ của tôi</h5>
                    <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>

                    <div className='row info'>
                        <div className='col-9 form'>
                            <div className='row'>
                                <div className='col-12 form-group'>
                                    <label>Họ tên</label>
                                    <input
                                        value={fullname}
                                        type='text'
                                        onChange={(e) => handleOnChange(e, 'fullname')}
                                        className='form-control'
                                    />
                                </div>

                                <div className='gender form-group'>
                                    <label>Giới tính: </label>

                                    {
                                        listGender && listGender.length > 0 &&
                                        listGender.map(item => (
                                            <div key={item.value} className='radio-wrap'>
                                                <input
                                                    checked={genderId === item.value}
                                                    id={item.value}
                                                    type='radio'
                                                    onChange={() => handleChangeGender(item.value)}
                                                />
                                                <label htmlFor={item.value}>{item.label}</label>
                                            </div>
                                        ))
                                    }
                                </div>

                                <div className='birthday form-group'>
                                    <label>
                                        Ngày sinh
                                    </label>
                                    <DatePicker
                                        onChange={handleChangeDate}
                                        className="form-control"
                                        value={birthday}
                                    />
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className='btn-save'>
                                    Lưu
                                </button>

                            </div>
                        </div>

                        <div className='col-3 image'>
                            <div className='previewImg_wrap'>
                                <div className='previewImg'>
                                    <img src={previewImg} alt='ảnh preview' />
                                </div>
                                <input
                                    onChange={(e) => handleChangeImage(e)}
                                    type="file" id="previewImg" hidden name="image" />
                                <label className='labelImage btn' htmlFor='previewImg'>
                                    <FormattedMessage id="bicycle-manage.downImage" />
                                    <i className='bx bxs-download'></i>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account