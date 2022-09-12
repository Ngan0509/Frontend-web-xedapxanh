import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import Select from 'react-select';

import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import * as userService from '../../../services/userService'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// import Slider from "react-slick";
import './Manage.scss'
import _ from 'lodash';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

function MarkdownManage() {
    const lang = useSelector(selectors.selectorLanguages)
    const allBicycleData = useSelector(selectors.selectorAllBicycleData)


    const dispatch = useDispatch()

    const [form, setForm] = useState({
        contentHTML: '',
        contentMarkdown: ''
    })

    const { contentHTML, contentMarkdown } = form

    const [hasOldData, setHasOldData] = useState(false)

    const handleEditorChange = ({ html, text }) => {
        setForm({
            contentHTML: html,
            contentMarkdown: text
        })
        console.log('handleEditorChange', html, text);
    }

    const [listAllBicycle, setListAllBicycle] = useState([]);

    //dispatch actions
    useEffect(() => {
        dispatch(actions.fetchAllBicycleStart('All'))
    }, [dispatch])

    // get allCode cho bicycle
    useEffect(() => {
        const buildInputData = (inputData) => {
            if (inputData && inputData.length > 0) {
                let result = inputData.map((item) => {
                    let value, label

                    label = lang === LANGUAGES.VI ? item.name : item.name
                    value = item.id

                    return {
                        label: label,
                        value: value
                    }
                })
                console.log('result', result)
                return result
            }
        }
        setListAllBicycle(buildInputData(allBicycleData))
    }, [allBicycleData, lang])

    // select onChange
    const [selects, setSelects] = useState({
        selectedBicycle: ''
    })

    const { selectedBicycle } = selects


    const handleChangeSelect = async (selectedBicycle) => {
        let resp = await userService.handleGetDetailBicycle(selectedBicycle.value)
        console.log("handleGetDetailBicycle", resp)
        if (resp && resp.errCode === 0 && resp.data && !_.isEmpty(resp.data.markdownData)) {
            let markdown = resp.data.markdownData

            setForm({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown
            })
            setHasOldData(true)

        } else {
            setForm({
                contentHTML: '',
                contentMarkdown: ''
            })
            setHasOldData(false)
            console.log("abc")
        }
        setSelects({
            selectedBicycle
        })
    }


    const handleSubmit = async () => {

        let resp = await userService.handleCreateMarkDownBicycle({
            bicycleId: selectedBicycle.value,
            contentHTML,
            contentMarkdown,
            hasOldData
        })

        if (resp && resp.errCode === 0) {
            alert(resp.errMessage)
        } else {
            alert(resp.errMessage)
        }

        setForm({
            contentHTML: '',
            contentMarkdown: ''
        })
        setSelects({
            selectedBicycle: ''
        })
        setHasOldData(false)
    }

    return (
        <div id="MarkdownManage">
            <div className='markdownManage'>
                <h3 className='title text-center'>
                    <FormattedMessage id="menu.admin.bicycle-markdown" />
                </h3>
                <div className='row'>
                    <div className='col-6 form-group'>
                        <label>Danh sách sản phẩm</label>
                        <Select
                            value={selectedBicycle}
                            name="selectedBicycle"
                            onChange={handleChangeSelect}
                            options={listAllBicycle}
                        />
                    </div>
                </div>
                <div className="markdown">
                    <MdEditor
                        value={contentMarkdown}
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={handleEditorChange}
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    className={`btn ${hasOldData ? 'btn-warning' : 'btn-primary'}`}>
                    {

                        hasOldData ?
                            <FormattedMessage id="bicycle-manage.update-product" /> :
                            <FormattedMessage id="bicycle-manage.create-product" />
                    }
                </button>
            </div>
        </div>
    )
}

export default MarkdownManage