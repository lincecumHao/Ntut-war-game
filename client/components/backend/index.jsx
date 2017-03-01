import React from 'react';
import Nav from './nav/Nav.jsx';

const Backend = ({ children }) => (
    <div className="backend_wrapper">
        <Nav />
        {children}
    </div>
);

Backend.propTypes = {
    children: React.PropTypes.node
};

export default Backend;
