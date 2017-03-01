import React, { Component } from 'react';
import Charact from './charact/Charact.jsx';
import ManPower from './manpower/ManPower.jsx';

class Resource extends Component {
    render() {
        return (
            <div className="res-container">
                <ManPower />
                <Charact />
            </div>
        );
    }
}

export default Resource;