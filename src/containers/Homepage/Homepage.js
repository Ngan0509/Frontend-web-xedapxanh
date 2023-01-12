// import { useDispatch, useSelector } from 'react-redux';
// import * as selectors from "../../store/selectors"
// import { FormattedMessage } from 'react-intl';
// import * as actions from "../../store/actions";
// import { LANGUAGES } from '../../utils/constant'
// import { useEffect, useState } from 'react'

import Header from './HeaderHome/Header'
import Sliders from './HeaderHome/Sliders'
import Category from './HeaderHome/Category'
import AllBicycle from './SectionHome/AllBicycle'
import Knowledge from './SectionHome/Knowledge'
import ShopSystem from './SectionHome/ShopSystem'
import Footer from './FooterHome/Footer'
import './Homepage.scss'
import { useEffect, useRef, useState } from 'react'

import LoadingOverlay from 'react-loading-overlay';
LoadingOverlay.propTypes = undefined


function Homepage() {
    // const lang = useSelector(selectors.selectorLanguages)

    // const dispatch = useDispatch()
    const [isShowLoading, setIsShowLoading] = useState(true)
    const timer = useRef()
    useEffect(() => {
        timer.current = setTimeout(() => {
            setIsShowLoading(false)
        }, 1000)

        return () => {
            clearTimeout(timer.current)
        }
    }, [])

    return (
        <LoadingOverlay
            active={isShowLoading}
            spinner
            text='Loading...'
        >
            <div id="Homepage">
                <Header />
                <Sliders />
                <Category />
                <AllBicycle />
                <Knowledge />
                <ShopSystem />
                <Footer />
            </div>
        </LoadingOverlay>

    )
}

export default Homepage