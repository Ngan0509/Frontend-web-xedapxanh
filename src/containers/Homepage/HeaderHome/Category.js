import { useDispatch, useSelector } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import * as selectors from "../../../store/selectors"
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant'
import "./Category.scss"
import { useEffect, useState } from 'react';

function Category() {
    const lang = useSelector(selectors.selectorLanguages)
    const categoryData = useSelector(selectors.selectorCategoryData)

    const dispatch = useDispatch()


    const [listCategory, setListCategory] = useState([]);

    useEffect(() => {
        dispatch(actions.fetchCategoryStart())
    }, [dispatch])

    useEffect(() => {
        setListCategory(categoryData)
    }, [categoryData])

    return (
        <div id="Category">
            <div className="category_bg">
                <div className="category">
                    <ul className="category_list">
                        <div className="row">
                            {
                                listCategory && listCategory.length > 0 &&
                                listCategory.map((item) => (
                                    <div key={item.id} className="col-4">
                                        <li>
                                            {
                                                lang === LANGUAGES.VI ? item.nameVi : item.nameEn
                                            }
                                        </li>

                                    </div>
                                ))
                            }
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Category