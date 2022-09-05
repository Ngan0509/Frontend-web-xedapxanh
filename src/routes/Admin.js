import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/Admin/UserManage';
import BicycleManage from '../containers/System/Admin/BicycleManage';
import AccessoriesManage from '../containers/System/Admin/AccessoriesManage';
import FilterManage from '../containers/System/Admin/FilterManage';
import Header from '../containers/Header/Header';
import MarkdownManage from '../containers/System/Admin/MardownManage';
import SpecificationsManage from '../containers/System/Admin/SpecificationsManage';
import OrderManage from '../containers/System/Admin/OrderManage';

class Admin extends Component {
    render() {
        return (
            <>
                <Header />
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/admin/user-manage" component={UserManage} />
                            <Route path="/system/admin/bicycle-manage" component={BicycleManage} />
                            <Route path="/system/admin/bicycle-markdown" component={MarkdownManage} />
                            <Route path="/system/admin/bicycle-specifications" component={SpecificationsManage} />
                            <Route path="/system/admin/accessories-manage" component={AccessoriesManage} />
                            <Route path="/system/admin/filter-manage" component={FilterManage} />
                            <Route path="/system/admin/order-manage-s2" component={OrderManage} />
                            <Route path="/system/admin/order-manage" component={OrderManage} />
                            <Route path="/system/admin/order-manage-s6" component={OrderManage} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
