import React, { Component, PropTypes } from 'react';
import { Resources } from '../../../../../imports/collections/resources';
import { Stages } from '../../../../../imports/collections/stages.js';
import { createContainer } from 'meteor/react-meteor-data';
import SimpleLi from '../common/SimpleLi.jsx';
import Resource from './Resource.jsx';

class ResourceContainer extends Component {
    constructor(props) {
        super(props);
        this.onResSelected = this.onResSelected.bind(this);
        this.state = {
            selectRes: ''
        }
    }

    onResSelected(selectRes) {
        this.setState({
            selectRes
        });
    }

    render() {
        let { resources, resTypes, usedCount, curRes } = this.props;
        console.log(curRes);
        let { selectRes } = this.state;
        let filteredRes = resources.filter(res => {
            return res.abbr === selectRes
        });

        // Set used value.
        filteredRes.map((res, index) => {
            if (usedCount[res._id]) {
                filteredRes[index].used = usedCount[res._id];
            }
        });
        return (
            <div className="resource-req">
                <div className="resource-req_top">資源設定</div>
                <div className="resource-req_main">
                    <div className="resource-req_left">
                        <ul>
                            {
                                resTypes.map((type, index) => {
                                    return (
                                        <SimpleLi
                                            key={index}
                                            id={type}
                                            text={type}
                                            onSelect={this.onResSelected}
                                            selectId={selectRes}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="resource-req_right">
                        <table>
                            <thead>
                                <tr>
                                    <th>資源種類</th>
                                    <th>資源總數量</th>
                                    <th>資源設定數量</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredRes.map(res => {
                                        return (
                                            <Resource
                                                key={res._id}
                                                id={res._id}
                                                name={res.name}
                                                avaliable={res.avaliable}
                                                used={res.used}
                                                use={curRes[res._id]}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style={{ 'width': '300px', 'margin': '10px' }}>
                        <button className="btn btn-sm btn-black pull-right "><span className="glyphicon glyphicon-refresh"></span>&nbsp;重設</button>
                    </div>
                </div>
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
    const loadingResources = !resource.ready();
    const loadingStages = !stage.ready();
    let resources = [];
    let resTypes = [];
    let usedCount = {};
    let curRes = {};
    if (!loadingResources && !loadingStages) {
        resources = Resources.find({}).fetch();
        let stages = Stages.find({}).fetch();
        resources.map(res => {
            // Find all resource type.
            if (resTypes.indexOf(res.abbr) == -1) {
                resTypes.push(res.abbr);
            }
        });

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
                        })
                    }
                });
            }
        });

        // let curSit = Stages.find({ _id: props.selectStage }, { fields: { situations: { $elemMatch: { 'index': 1 } } } }).fetch();
        let selectStage = Stages.findOne({ _id: props.selectStage });
        if (selectStage) {
            // Get current situation.
            let curSituation = selectStage.situations.filter(situation => {
                return situation.index == props.selectedSituation
            });
            // Get resources.
            if (curSituation.length > 0) {
                // 序列化資源
                curRes = curSituation[0].resources;
            }
        }
    }
    return {
        resources, resTypes, usedCount, curRes
    }
}, ResourceContainer);