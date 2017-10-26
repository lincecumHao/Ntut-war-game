import React, { Component } from 'react';
import StageContainer from './stage/StageContainer.jsx';
import SituationListContainer from './situation/SituationListContainer.jsx';
import SituationContainer from './situation/SituationContainer.jsx';

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
        let { selectedStage, selectedSituation } = this.state;
        return (
            <div className="backend_2_content">
                <StageContainer
                    onStageSelect={this.onStageSelect}
                    selectStage={selectedStage}
                />
                <SituationListContainer
                    onSituationSelect={this.onSituationSelect}
                    selectStage={selectedStage}
                    selectedSituation={selectedSituation}
                />
                <SituationContainer
                    selectStage={selectedStage}
                    selectedSituation={selectedSituation}
                />
            </div>
        );
    }
}

export default Stage;