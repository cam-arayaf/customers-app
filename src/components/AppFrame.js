import React from 'react';
import PropTypes from 'prop-types';
import AppHeader from './AppHeader';

const AppFrame = ({ header, body }) => (
    <div>
        <div className="app-frame">
            <AppHeader title={ header } />
            <div>{ body }</div>
            <div><p>Simple Application: Example</p></div>
        </div>
    </div>
);

AppFrame.propTypes = {
    header: PropTypes.string.isRequired,
    body: PropTypes.element.isRequired
};

AppFrame.displayName = 'AppFrame';

export default AppFrame;