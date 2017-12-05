import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Resources } from '../../../../../imports/collections/resources';
import { Units } from '../../../../../imports/collections/units';
import { Stages } from '../../../../../imports/collections/stages.js';
import { Disasters } from '../../../../../imports/collections/disasters.js';
import DisasterContainer from '../disaster/DisasterContainer.jsx';
import ResourceContainer from '../resource/ResourceContainer.jsx';
import Transition from 'react-transition-group/Transition';
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

class SituationContainer extends Component {
    render() {
        let { resources, resTypes, usedCount, curRes, disasters, situation, selectedSituation, selectStage } = this.props;
        let disaster, resource;
        let key = selectedSituation + '=' + selectStage;
        if (selectStage && selectedSituation) {
            disaster =
                <DisasterContainer
                    key={key + 'dis'}
                    disasters={disasters}
                    situation={situation}
                    selectStage={selectStage}
                    selectedSituation={selectedSituation}
                />;
            resource =
                <ResourceContainer
                    key={key + 'res'}
                    resources={resources}
                    resTypes={resTypes}
                    usedCount={usedCount}
                    curRes={curRes}
                    selectStage={selectStage}
                    selectedSituation={selectedSituation}
                />
        }
        return (
            <div className="deliver-container">
                {disaster}
                {resource}
            </div>
        );
    }
}

ResourceContainer.propTypes = {
    selectStage: PropTypes.string.isRequired,
    selectedSituation: PropTypes.string.isRequired
};

export default createContainer((props) => {
    const resource = Meteor.subscribe('resources');
    const stage = Meteor.subscribe('stages');
    const disaster = Meteor.subscribe('disasters');
    const unit = Meteor.subscribe('units');
    const isResReady = resource.ready();
    const isStageReady = stage.ready();
    const isDisasterReady = disaster.ready();

    let resources = [], resTypes = [], disasters = [];
    let usedCount = {}, curRes = {}, situation = {};

    if (isResReady && isStageReady && isDisasterReady && unit.ready()) {
        // When all subscribe is ready.


        // Get all Unis
        let units = Units.find({ 'resources.1': { $exists: true } }).fetch();
        units.forEach(unit => {
            unit.resources.forEach(res => {
                if (resTypes.indexOf(res.type) == -1) {
                    resTypes.push(res.type);
                }
                // append all resources.
                var elm = resources.find(val => {
                    if (val.id === res.id) {
                        return true
                    }
                    return false
                });

                if (elm) {
                    elm.avaliable = res.avaliable + elm.avaliable;
                } else {
                    resources.push(res);
                }
                
            });
        });
        
        // Count all res used count.
        let stages = Stages.find({}).fetch();
        // Get all used count.
        stages.map(stage => {
            if (stage.situations) {
                stage.situations.map(situation => {
                    if (situation.resources) {
                        Object.keys(situation.resources).map(res_id => {
                            if (!usedCount[res_id]) {
                                usedCount[res_id] = situation.resources[res_id];
                            } else {
                                usedCount[res_id] = usedCount[res_id] + situation.resources[res_id];
                            }
                        });
                    }
                });
            }
        });

        // Get all disasters.
        disasters = Disasters.find({}).fetch();

        let selectStage = Stages.findOne({ _id: props.selectStage });
        let filteredSituation;
        if (selectStage) {
            // Get current situation.
            filteredSituation = selectStage.situations.filter(situation => {
                return situation.index == props.selectedSituation
            });
            // Get resources.
            if (filteredSituation.length) {
                // Current situation.
                situation = (filteredSituation[0] || {});

                // Current situation resource
                curRes = (situation.resources || {});
            }
        }
    }
    return {
        resources, resTypes, usedCount, curRes, disasters, situation
    }
}, SituationContainer);