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
import Accessories from './Homepage/SectionHome/Product/Accessories';

import CustomScrollbars from '../components/CustomScrollbars';
// import ConfirmModal from '../components/ConfirmModal';
import Login from "./Auth/Login"

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
                                    <Route path={path.BICYCLE} component={(Bicycle)} />
                                    <Route path={path.ACCESSORIES} component={(Accessories)} />
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