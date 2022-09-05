import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import OrderManageShipper from '../containers/System/Shipper/OrderManageShipper';
import { pathSystem } from '../utils'

class Shipper extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path={pathSystem.ORDERS3} component={OrderManageShipper} />
                            <Route path={pathSystem.ORDERS4} component={OrderManageShipper} />
                            <Route path={pathSystem.ORDERS5} component={OrderManageShipper} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shipper);
