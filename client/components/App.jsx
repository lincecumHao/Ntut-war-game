import React from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';

const App = ({ children }) => (
    <div>
        {children}
        <Alert stack={{ limit: 3 }} timeout={3000} />
    </div>
);

App.propTypes = {
    children: React.PropTypes.node
};

export default App;