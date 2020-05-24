import React from 'react';
import PropTypes from 'prop-types';
import CustomerListItem from './CustomerListItem';
import { accessControl } from '../helpers/accessControl';
import { CUSTOMER_LIST } from '../constants/permissions';

const CustomersList = ({ customers, urlPath }) => (
    <div className="customers-list">
        {
            customers.map(c => {
                const { dni, name } = c;
                return (
                    <CustomerListItem
                        key={ dni }
                        dni={ dni }
                        name={ name }
                        editAction="Edit"
                        deleteAction="Delete"
                        urlPath={ urlPath }
                    />
                );
            })
        }
    </div>
);

CustomersList.propTypes = {
    customers: PropTypes.array.isRequired,
    urlPath: PropTypes.string.isRequired
};

CustomersList.displayName = 'CustomersList';

export default accessControl([CUSTOMER_LIST])(CustomersList);