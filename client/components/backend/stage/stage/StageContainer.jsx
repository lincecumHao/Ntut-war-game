import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Stages } from '../../../../../imports/collections/stages.js';
import Stage from './Stage.jsx';

class StageContainer extends Component {
    constructor(props) {
        super(props);
        this.addStage = this.addStage.bind(this);
        this.rmLastStage = this.rmLastStage.bind(this);
    }

    addStage() {
        Meteor.call('stage.create', {}, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    rmLastStage() {
        Meteor.call('stage.delete', {}, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    render() {
        let { stageList } = this.props;
        return (
            <div className="stage-list">
                <ul className="charact_tab">
                    <button className="pull-left" onClick={this.rmLastStage}><span className="glyphicon glyphicon-minus"></span></button>
                    {
                        stageList.map(stage => {
                            return (
                                <Stage
                                    key={stage._id}
                                    index={stage.index + 1}
                                />
                            )
                        })
                    }
                    <button onClick={this.addStage}><span className="glyphicon glyphicon-plus"></span></button>
                </ul>
            </div>
        );
    }
}

export default createContainer(() => {
    const stages = Meteor.subscribe('stages');
    const loadingStages = !stages.ready();
    let stageList = [];
    if (!loadingStages) {
        stageList = Stages.find({}, { sort: { index: 1 } }).fetch();
    }
    return {
        loadingStages, stageList
    }
}, StageContainer);