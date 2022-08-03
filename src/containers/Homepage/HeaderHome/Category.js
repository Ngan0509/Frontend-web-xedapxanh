// import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
// import * as selectors from "../../../store/selectors"
// import * as actions from "../../../store/actions";
// import { LANGUAGES } from '../../../utils/constant'
import "./Category.scss"

function Category() {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()

    return (
        <div id="Category">
            <div className="category_bg">
                <div className="category">
                    <ul className="category_list">
                        <div className="row">
                            <div className="col-4">
                                <li>
                                    Xe đạp địa hình
                                </li>

                            </div>
                            <div className="col-4">
                                <li>
                                    Xe đạp đua
                                </li>

                            </div>
                            <div className="col-4">
                                <li>
                                    Xe đạp đường phố
                                </li>

                            </div>
                            <div className="col-4">
                                <li>
                                    Phụ tùng
                                </li>

                            </div>
                            <div className="col-4">
                                <li>
                                    Phụ kiện xe đạp
                                </li>

                            </div>
                            <div className="col-4">
                                <li>
                                    Phụ kiện người lái
                                </li>

                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Category