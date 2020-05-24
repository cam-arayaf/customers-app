import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import AppFrame from '../components/AppFrame';
import { getCustomerByDni } from '../selectors/Customers';
import CustomerEdit from '../components/CustomerEdit';
import CustomerData from '../components/CustomerData';
import { fetchCustomers } from '../actions/fetchCustomers';
import { updateCustomer } from '../actions/updateCustomer';
import { deleteCustomer } from '../actions/deleteCustomer';

class CustomerContainer extends Component {
    componentDidMount() {
        !this.props.customer && this.props.fetchCustomers();
    }

    handleSubmit = values => {
        const { id } = values;
        return this.props.updateCustomer(id, values)
            .catch(error => {
                throw new SubmissionError(error);
            });
    }

    handleOnBack = () => {
        this.props.history.goBack();
    }

    handleOnSubmitSuccess = () => {
        this.props.history.goBack();
    }

    handleOnDelete = id => {
        this.props.deleteCustomer(id).then(() => this.props.history.goBack());
    }

    renderCustomerControl = (isEdit, isDelete) => {
        if (!this.props.customer) return null;
        const CustomerControl = isEdit ? CustomerEdit : CustomerData;
        return (
            <CustomerControl
                { ...this.props.customer }
                onSubmit={ this.handleSubmit }
                onSubmitSuccess={ this.handleOnSubmitSuccess }
                onBack={ this.handleOnBack }
                isDeleteAllow={ !!isDelete }
                onDelete={ this.handleOnDelete }
            />
        );
    }

    renderBody = () => (
        <Route path="/customers/:dni/edit" children={
            ({ match: isEdit }) => (
                <Route path="/customers/:dni/delete" children={
                    ({ match: isDelete }) => this.renderCustomerControl(isEdit, isDelete)
                } />
            )
        } />
    );

    render() {
        const { dni } = this.props;
        return (
            <div>
                <AppFrame header={ `Client: ${ dni }` } body={ this.renderBody() } />
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    customer: getCustomerByDni(state, props)
});

const mapDispatchToProps = { fetchCustomers, updateCustomer, deleteCustomer };

CustomerContainer.propTypes = {
    dni: PropTypes.string.isRequired,
    customer: PropTypes.object,
    fetchCustomers: PropTypes.func.isRequired,
    updateCustomer: PropTypes.func.isRequired,
    deleteCustomer: PropTypes.func.isRequired
};

CustomerContainer.displayName = 'CustomerContainer';

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomerContainer));