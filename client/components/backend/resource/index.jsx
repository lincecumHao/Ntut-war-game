import React, { Component } from 'react';
import CharactContainer from './charact/CharactContainer.jsx';
import ManPowerContainer from './manpower/ManPowerContainer.jsx';

class Resource extends Component {

    constructor(props) {
        super(props);
        this.changeActiveUnit = this.changeActiveUnit.bind(this);
        this.state = {
            activeId: ''
        }
    }

    changeActiveUnit(unitId) {
        this.setState({
            activeId: unitId
        });
    }
    
    render() {
        return (
            <div className="res-container">
                <ManPowerContainer
                    activeId={this.state.activeId}
                    changeActiveUnit={this.changeActiveUnit}
                />
                <CharactContainer
                    activeId={this.state.activeId}
                />
            </div>
        );
    }
}

export default Resource;