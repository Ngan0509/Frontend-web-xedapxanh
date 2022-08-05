import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/Admin/UserManage';
import BicycleManage from '../containers/System/Admin/BicycleManage';
import AccessoriesManage from '../containers/System/Admin/AccessoriesManage';
import FilterManage from '../containers/System/Admin/FilterManage';
import Header from '../containers/Header/Header';

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
                            <Route path="/system/admin/accessories-manage" component={AccessoriesManage} />
                            <Route path="/system/admin/filter-manage" component={FilterManage} />
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
