import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/Admin/UserManage';
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
