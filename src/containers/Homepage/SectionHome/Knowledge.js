// import { useDispatch, useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// import * as selectors from "../../../store/selectors"
// import * as actions from "../../../store/actions";
// import { LANGUAGES } from '../../../utils/constant'

import Slider from "react-slick";
import "./Knowledge.scss"
import know from "../../../assets/images/NVL-ĐN.jpg"

function Knowledge({ settings }) {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()

    return (
        <div id="Knowledge">
            <div className="knowledge_bg">
                <div className="knowledge">
                    <h3><FormattedMessage id="headerHome.news" /></h3>
                    <div className="row">
                        <Slider {...settings}>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="knowledge_item">
                                    <div className="knowledge_image">
                                        <img src={know} alt="knowledge" />
                                    </div>
                                    <div className="knowledge_title">
                                        Mẫu xe đạp được nhiều cua-rơ yêu thích nhất
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Knowledge