import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import AppFrame from '../components/AppFrame';
import CustomerEdit from '../components/CustomerEdit';
import { insertCustomer } from '../actions/insertCustomer';

class NewCustomerContainer extends Component {
    handleSubmit = values => {
        return this.props.insertCustomer(values).catch(error => {
            throw new SubmissionError(error);
        });
    }

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    renderBody = () => {
        return (
            <CustomerEdit
                onSubmit={ this.handleSubmit }
                onSubmitSuccess={ this.handleOnSubmitSuccess }
                onBack={ this.handleOnBack }
            />
        );
    }

    render() {
        return (
            <div>
                <AppFrame header="New Client" body={ this.renderBody() }/>
            </div>
        );
    }
}

const mapDispatchToProps = {
    insertCustomer
};

NewCustomerContainer.propTypes = {
    insertCustomer: PropTypes.func.isRequired
};

NewCustomerContainer.displayName = 'NewCustomerContainer';

export default withRouter(connect(null, mapDispatchToProps)(NewCustomerContainer));