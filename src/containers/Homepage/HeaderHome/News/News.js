import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import htmlContent from './news.html'
import InnerHTML from 'dangerously-set-html-content'
import './news.scss'

function News() {
    const lang = useSelector(selectors.selectorLanguages)

    const dispatch = useDispatch()
    let history = useHistory();

    return (
        <div id="News">
            <div className="news_bg">
                <div className="news">
                    <InnerHTML html={htmlContent} />
                </div>
            </div>
        </div>
    )
}

export default News