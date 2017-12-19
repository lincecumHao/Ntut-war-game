import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Stages } from '../../../../imports/collections/stages.js';
import { Units } from '../../../../imports/collections/units.js';

class RequireEQ extends Component {
    constructor(props) {
        super(props);
        this.switchOpenEq = this.switchOpenEq.bind(this);
        this.state = {
            isOpen: false
        }
    }

    switchOpenEq() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        let eqBoxStyle = {
            visibility: (this.state.isOpen ? 'visible' : 'hidden')
        }
        let { reqRes } = this.props;
        reqRes = (reqRes ? reqRes : []);
        return (
            <div className="Requiredbox pull-right">
                <div className="Required" style={eqBoxStyle}>
                    <h3>所需裝備支援為:</h3>
                    <ul>
                        {
                            reqRes.map(resName => {
                                return (<li key={resName}>{resName}</li>);
                            })
                        }
                    </ul>
                </div>
                <span className="triangle_icon" style={eqBoxStyle}></span>
                <span onClick={this.switchOpenEq} className="glyphicon glyphicon-exclamation-sign" data-step="6" data-position="top" data-intro='提醒使用者每項災害需要裝備資源的種類，點一下提醒即跳出'></span>
            </div>
        );
    }
}

export default createContainer(() => {
    let stages = Meteor.subscribe('stages');
    let units = Meteor.subscribe('units');
    if (stages.ready() && units.ready()) {
        const unPassedStages = Stages.findOne({ 'situations.pass': false }, { sort: { index: 1, 'situations.index': 1 }, limit: 1 });
        if (unPassedStages) {
            const { situations } = unPassedStages;
            const curSituation = situations.filter(obj => (obj.pass == false))[0];
            if (curSituation.resources) {
                let resName = [];
                Object.keys(curSituation.resources).forEach(resId => {
                    const u = Units.findOne({ 'resources.id': resId }, { limit: 1, fields: { 'resources': 1 } });
                    u.resources.some(r => {
                        if (r.id == resId) {
                            resName.push(r.name);
                            return true;
                        }
                        return false;
                    });

                });
                return {
                    reqRes: resName
                }
            }
            return {}
        }
        return {}
    }
    return {}
}, RequireEQ);