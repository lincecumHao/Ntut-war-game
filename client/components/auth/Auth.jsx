import React from 'react';

const Login = ({ children }) => (
    <div>
        <div className="frame">
            <img src="https://dummyimage.com/108/000/fff" width="108px" height="108px" />
        </div>
        <div>
            {children}
        </div>
    </div>
);

Login.propTypes = {
    children: React.PropTypes.node
};

export default Login;