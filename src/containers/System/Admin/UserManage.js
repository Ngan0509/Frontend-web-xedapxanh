import React, { Component } from 'react';
import { connect } from 'react-redux';

// import { FormattedMessage } from 'react-intl';

class UserManage extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='user-container'>
                <div className='title text-center'>
                    Hello Admin !!! Manage users with Lê Ngân
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
