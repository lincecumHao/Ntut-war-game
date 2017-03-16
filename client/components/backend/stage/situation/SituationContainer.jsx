import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Stages } from '../../../../../imports/collections/stages.js';
import SimpleLi from '../common/SimpleLi.jsx';

class SituationContainer extends Component {

    constructor(props) {
        super(props);
        this.addSituation = this.addSituation.bind(this);
        this.delSituation = this.delSituation.bind(this);
    }

    addSituation() {
        Meteor.call('situation.create', this.props.selectStage, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    delSituation() {
        Meteor.call('situation.delete', this.props.selectStage, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    render() {
        let { situationList, selectStage, onSituationSelect, selectedSituation } = this.props;
        let addBtn, delBtn;
        if (selectStage !== '') {
            delBtn = <button onClick={this.delSituation}><span className="glyphicon glyphicon-minus"></span></button>;
            addBtn = <button onClick={this.addSituation}><span className="glyphicon glyphicon-plus"></span></button>;
        }
        return (
            <div className="situation-list">
                {delBtn}
                <ul>
                    {
                        situationList.map((situation) => {
                            return (
                                <SimpleLi
                                    key={situation.index}
                                    id={'' + situation.index}
                                    text={'狀況' + (situation.index + 1)}
                                    onSelect={onSituationSelect}
                                    selectId={selectedSituation}
                                />
                            )
                        })
                    }
                </ul>
                {addBtn}
            </div>
        );
    }
}

SituationContainer.propTypes = {
    selectStage: PropTypes.string.isRequired,
    onSituationSelect: PropTypes.func.isRequired,
    selectedSituation: PropTypes.string.isRequired
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
                if (a.index < b.index) return -1;
                if (a.index > b.index) return 1;
                return 0;
            });
        }
    }
    return {
        loadingStages, situationList
    }
}, SituationContainer);