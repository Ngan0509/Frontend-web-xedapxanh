import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticatedAdmin, userIsAuthenticatedShipper, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
import Admin from '../routes/Admin';
import Shipper from '../routes/Shipper';

import Homepage from './Homepage/Homepage';
import Bicycle from './Homepage/SectionHome/Product/Bicycle';
import DetailBicycle from './Homepage/SectionHome/Product/ProductList/DetailBicycle';
import DetailAccessories from './Homepage/SectionHome/Product/ProductList/DetailAccessories';
import Accessories from './Homepage/SectionHome/Product/Accessories';

import Cart from './Homepage/HeaderHome/Cart/Cart';
import CustomScrollbars from '../components/CustomScrollbars';
// import ConfirmModal from '../components/ConfirmModal';
import Login from "./Auth/Login"

import LogIn from "./Homepage/HeaderHome/Author/LogIn";
import SignUp from "./Homepage/HeaderHome/Author/SignUp";

import DetailOrder from './Homepage/HeaderHome/DetailOrder/DetailOrder';

class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        {/* <ConfirmModal /> */}

                        <div className="content-container">
                            <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                                <Switch>
                                    <Route path={path.HOME} exact component={(Home)} />
                                    <Route path={path.LOGINADMIN} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.ADMIN} component={userIsAuthenticatedAdmin(Admin)} />
                                    <Route path={path.LOGINSHIPPER} component={userIsNotAuthenticated(Login)} />
                                    <Route path={path.SHIPPER} component={userIsAuthenticatedShipper(Shipper)} />
                                    <Route path={path.HOMEPAGE} exact component={(Homepage)} />
                                    <Route path={path.BICYCLE} exact component={(Bicycle)} />
                                    <Route path={path.DETAILBICYCLE} component={(DetailBicycle)} />
                                    <Route path={path.DETAILACCESSORY} component={(DetailAccessories)} />
                                    <Route path={path.ACCESSORIES} component={(Accessories)} />
                                    <Route path={path.CART} component={(Cart)} />
                                    <Route path={path.DETAILORDER} component={(DetailOrder)} />
                                    <Route path={path.LOGINCLIENT} component={(LogIn)} />
                                    <Route path={path.SIGNUPCLIENT} component={(SignUp)} />
                                </Switch>

                            </CustomScrollbars>
                        </div>


                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);