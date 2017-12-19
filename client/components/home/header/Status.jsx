import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Stages } from '../../../../imports/collections/stages.js';

class Status extends Component {
    render() {
        return (
            <div className="status" data-step="5" data-position="bottom" data-intro='顯示災害演練階段，與災害狀況描述'>
                <p>演練階段:第{this.props.stage + 1}階段</p>
                <p>狀況發生: {this.props.situation}</p>
            </div>
        );
    }
}

export default createContainer(() => {
    let stages = Meteor.subscribe('stages');
    if (stages.ready()) {
        const unPassedStages = Stages.findOne({ 'situations.pass': false }, {sort: { index: 1, 'situations.index': 1 }, limit: 1});
        if(unPassedStages){
            const {index, situations} = unPassedStages;
            const curSituation = situations.filter(obj => (obj.pass == false))[0];
            return {
                stage: index,
                situation: curSituation.common
            }
        }
        return {}
    }
    return {}
}, Status);