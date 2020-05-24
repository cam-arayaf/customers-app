import React from 'react';
import PropTypes from 'prop-types';

const CustomersActions = ({ children }) => (
    <div>
        <div className="customers-actions">
            <div>{ children }</div>
        </div>
    </div>
);

CustomersActions.propTypes = {
    children: PropTypes.node.isRequired
};

CustomersActions.displayName = 'CustomersActions';

export default CustomersActions;