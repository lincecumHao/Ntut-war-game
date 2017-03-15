import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Stages } from '../../../../../imports/collections/stages.js';
import SimpleLi from '../common/SimpleLi.jsx';

class SituationContainer extends Component {

    render() {
        let { situationList } = this.props;
        return (
            <div className="situation-list">
                <button><span className="glyphicon glyphicon-minus"></span></button>
                <ul>
                    {
                        situationList.map((situation) => {
                            return (
                                <SimpleLi
                                    key={situation.index}
                                    id={'' + situation.index}
                                    text={'狀況' + (situation.index + 1)}
                                />
                            )
                        })
                    }
                </ul>
                <button><span className="glyphicon glyphicon-plus"></span></button>
            </div>
        );
    }
}

SituationContainer.propTypes = {
    selectStage: PropTypes.string.isRequired
};

export default createContainer((props) => {
    const stages = Meteor.subscribe('stages');
    const loadingStages = !stages.ready();
    let situationList = [];
    if (!loadingStages) {
        let stage = Stages.findOne({ _id: props.selectStage });
        if (stage) {
            situationList = stage.situations;

            // Sort situation list, to make sure the seq is always in order.
            situationList.sort((a, b) => {
                if(a.index < b.index) return -1;
                if(a.index > b.index) return 1;
                return 0;
            });
        }
    }
    return {
        loadingStages, situationList
    }
}, SituationContainer);