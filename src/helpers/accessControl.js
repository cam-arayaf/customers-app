import React, { Component } from 'react';
import { connect } from 'react-redux';

export const accessControl = permissionsRequired => WrappedComponent => {
    const SecuredControl = class extends Component {
        render() {
            const { permissions } = this.props.user;
            const isAllow = permissionsRequired.every(p => permissions.indexOf(p) >= 0);
            return isAllow ? (<WrappedComponent {...this.props}  />)
                : (<div><p>You don't have access to this section</p></div>);
        }
    }
    return connect(state => ({ user: state.user }))(SecuredControl);
}