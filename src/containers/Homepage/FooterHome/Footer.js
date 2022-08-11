// import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import * as selectors from "../../../store/selectors"
// import * as actions from "../../../store/actions";
// import { LANGUAGES } from '../../../utils/constant'
import './Footer.scss'

function Footer() {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()

    return (
        <div id="Footer">
            <div className="footer_bg">
                <div className="footer">
                    <div className='copyright'>
                        <span>copyright 2022@ ecobike.com</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer