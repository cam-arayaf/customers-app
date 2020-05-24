import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppFrame from '../components/AppFrame';
import CustomersList from '../components/CustomersList';
import CustomersActions from '../components/CustomersActions';
import { fetchCustomers } from '../actions/fetchCustomers';
import { getCustomers } from '../selectors/Customers';

class CustomersContainer extends Component {
    componentDidMount() {
        !this.props.customers.length && this.props.fetchCustomers();
    }

    handleAddNew = () => {
        this.props.history.push('/customers/new');
    }

    renderBody = customers => (
        <div>
            <CustomersList customers={ customers } urlPath="customers/" />
            <CustomersActions>
                <button onClick={ this.handleAddNew }>New Client</button>
            </CustomersActions>
        </div>
    );

	render() {
		return (
            <div>
                <AppFrame header="Client List" body={ this.renderBody(this.props.customers) } />
            </div>
		);
	}
}

const mapDispatchToProps = { fetchCustomers };

const mapStateToProps = state => ({ customers: getCustomers(state) });

CustomersContainer.propTypes = {
    fetchCustomers: PropTypes.func.isRequired,
    customers: PropTypes.array.isRequired
};

CustomersContainer.defaultProps = {
    customers: []
};

CustomersContainer.displayName = 'CustomersContainer';

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomersContainer));