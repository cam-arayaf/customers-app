import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CustomerListItem = ({ name, editAction, deleteAction, urlPath, dni }) => (
    <div className="customers-list-item">
        <div className="field">
            <Link to={ `${ urlPath }${ dni }` }>{ name }</Link>
        </div>
        <div className="field">
            <Link to={ `${ urlPath }${ dni }/edit` }>{ editAction }</Link>
        </div>
        <div className="field">
            <Link to={ `${ urlPath }${ dni }/delete` }>{ deleteAction }</Link>
        </div>
    </div>
);

CustomerListItem.propTypes = {
    editAction: PropTypes.string.isRequired,
    deleteAction: PropTypes.string.isRequired,
    urlPath: PropTypes.string.isRequired,
    dni: PropTypes.string.isRequired
};

CustomerListItem.displayName = 'CustomerListItem';

export default CustomerListItem;