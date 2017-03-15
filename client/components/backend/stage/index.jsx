import React, { Component } from 'react';
import StageContainer from './stage/StageContainer.jsx';
import SituationContainer from './situation/SituationContainer.jsx';
import Disaster from './disaster/Disaster.jsx';
import Resource from './resource/Resource.jsx';

class Stage extends Component {
    constructor(props) {
        super(props);
        this.onStageSelect = this.onStageSelect.bind(this);
        this.state = {
            selectedStage: ''
        }
    }

    onStageSelect(stageId) {
        this.setState({
            selectedStage: stageId
        });
    }
    
    render() {
        return (
            <div className="backend_2_content">
                <StageContainer
                    onStageSelect={this.onStageSelect}
                    selectStage={this.state.selectedStage}
                />
                <SituationContainer
                    selectStage={this.state.selectedStage}
                />
                <div className="deliver-container">
                    <Disaster />
                    <Resource />
                </div>
            </div>
        );
    }
}

export default Stage;