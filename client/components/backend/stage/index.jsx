import React, { Component } from 'react';
import Nav from './nav/Nav.jsx';
import Situation from './situation/Situation.jsx';
import Disaster from './disaster/Disaster.jsx';
import Resource from './resource/Resource.jsx';

class Stage extends Component {
    render() {
        return (
            <div className="backend_2_content">
                <Nav />
                <Situation />
                <div className="deliver-container">
                    <Disaster />
                    <Resource />
                </div>
            </div>
        );
    }
}

export default Stage;