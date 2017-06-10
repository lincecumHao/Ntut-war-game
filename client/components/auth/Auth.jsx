import React from 'react';
import PropTypes from 'prop-types';

const Auth = ({ children }) => (
    <div>
        <div className="frame">
            <img src="https://dummyimage.com/108/000/fff" width="108px" height="108px" />
        </div>
        <div>
            {children}
        </div>
    </div>
);

Auth.propTypes = {
    children: PropTypes.node
};

export default Auth;