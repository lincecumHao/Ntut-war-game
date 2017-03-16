import React, { Component } from 'react';
import StageContainer from './stage/StageContainer.jsx';
import SituationContainer from './situation/SituationContainer.jsx';
import Disaster from './disaster/Disaster.jsx';
import ResourceContainer from './resource/ResourceContainer.jsx';

class Stage extends Component {
    constructor(props) {
        super(props);
        this.onStageSelect = this.onStageSelect.bind(this);
        this.onSituationSelect = this.onSituationSelect.bind(this);
        this.state = {
            selectedStage: '',
            selectedSituation: ''
        }
    }

    onStageSelect(selectedStage) {
        this.setState({
            selectedStage,
            selectedSituation: ''
        });
    }

    onSituationSelect(selectedSituation) {
        this.setState({
            selectedSituation
        });
    }

    render() {
        let disaster, resource;
        let { selectedStage, selectedSituation } = this.state;
        if (this.state.selectedSituation !== '') {
            disaster = <Disaster />;
            resource = <ResourceContainer />;
        }
        return (
            <div className="backend_2_content">
                <StageContainer
                    onStageSelect={this.onStageSelect}
                    selectStage={selectedStage}
                />
                <SituationContainer
                    onSituationSelect={this.onSituationSelect}
                    selectStage={selectedStage}
                    selectedSituation={selectedSituation}
                />
                <div className="deliver-container">
                    {disaster}
                    {resource}
                </div>
            </div>
        );
    }
}

export default Stage;