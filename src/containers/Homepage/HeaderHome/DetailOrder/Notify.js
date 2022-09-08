import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../../store/selectors"
import * as actions from "../../../../store/actions";
import { LANGUAGES } from '../../../../utils/constant'
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import _ from 'lodash';

function Notify() {
    const lang = useSelector(selectors.selectorLanguages)

    const dispatch = useDispatch()
    let history = useHistory();

    // const handleClickPushPage = (item) => {

    // }

    return (
        <div id="Notify">
            <div className="notify_bg">
                <div className="notify">
                    Hello this is notify
                </div>
            </div>
        </div>
    )
}

export default Notify