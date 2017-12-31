import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactModal from 'react-modal';
import DepartContainer from './DepartContainer.jsx';
import RequireEQ from './RequireEQ.jsx';
import EquipmentContainer from './EquipmentContainer.jsx';
import CategoryContainer from './CategoryContainer.jsx';
import { Units } from '../../../../imports/collections/units.js';
import { Characters } from '../../../../imports/collections/characters.js';
import { Stages } from '../../../../imports/collections/stages.js';


class ResourceContainer extends Component {
    constructor(props) {
        super(props);
        this.onDepartChange = this.onDepartChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onUnitAdj = this.onUnitAdj.bind(this);
        this.sendUnit = this.sendUnit.bind(this);
        this.onOk = this.onOk.bind(this);
        this.onCancle = this.onCancle.bind(this);
        this.showConfim = this.showConfim.bind(this);
        this.state = {
            selectDeparts: 0,
            category: '人員'
        }
    }

    onDepartChange(flag) {
        const { selectDeparts } = this.state;
        var next = 0;
        if ((selectDeparts + flag) < 0) {
            next = this.props.units.length - 1;
        } else if ((selectDeparts + flag) >= this.props.units.length) {
            next = 0;
        } else {
            next = selectDeparts + flag;
        }
        this.setState({
            selectDeparts: next
        });
    }

    onCategoryChange(category) {
        this.setState({ category });
    }

    onUnitAdj(resId, flag) {
        const { units } = this.props;
        const { selectDeparts } = this.state;
        const unitName = units[selectDeparts].name;
        Meteor.call('unit.update', { unitName, resId, flag }, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    onOk() {
        this.setState({
            isConfirm: !this.state.isConfirm
        });
        this.sendUnit();
    }

    onCancle() {
        this.setState({
            isConfirm: !this.state.isConfirm
        });
    }

    sendUnit() {
        const { units, stage, situation } = this.props;
        const sendToSituation = [];
        units.forEach(unit => {
            const { _id, resources } = unit;
            const tmp = {
                _id,
                res: {}
            };
            const usedResources = resources.filter(res => (res.used > 0));
            usedResources.forEach(res => {
                const { id, used } = res;
                tmp.res[id] = used;
            });
            if (Object.keys(tmp.res).length > 0) {
                sendToSituation.push(tmp);
            }
        });
        Meteor.call('situation.addSendUnits', sendToSituation, situation, stage, (err) => {
            if (err) {
                alert(err);
            }
        });
        this.props.sendUnits(sendToSituation);
    }

    showConfim() {
        this.setState({
            isConfirm: !this.state.isConfirm
        });
    }

    render() {
        const { category, selectDeparts, isConfirm } = this.state;
        const { units } = this.props;
        const unit = units[selectDeparts];
        let resources = unit ? unit.resources : [];
        const selectedRes = resources.filter(res => (res.type === category));
        return (
            <div className="resource" data-step="7" data-position="top" data-intro='選好單位分部後，裝備資源區即顯示該分部擁有的一切資源，選擇與點擊資源種類與數量並確定，擊可派出資源消滅災害'>
                <DepartContainer
                    depart={unit}
                    onDepartChange={this.onDepartChange}
                />
                <div className="resource_R">
                    <CategoryContainer
                        selected={category}
                        onChange={this.onCategoryChange}
                    />
                    <RequireEQ />
                    <div className="resource_items">
                        <EquipmentContainer
                            equipments={selectedRes}
                            onUnitAdj={this.onUnitAdj}
                        />
                        <div className="button_box">
                            <button className="btn btn_XL btn-black" onClick={this.showConfim}>確定</button>
                            <br />
                            <button className="btn btn_XL btn-black">取消</button>
                            <ReactModal
                                isOpen={isConfirm}
                                contentLabel="onRequestClose Example"
                                className="popup-modal-black"
                                overlayClassName="popup-overlay"
                            >
                                <h1 className="title">提醒</h1>
                                <div className="content" style={{ textAlign: 'center' }}>
                                    <h3>確定要送出資源嗎?</h3>
                                </div>
                                <div className="btns">
                                    <button className="confirmBtn" onClick={this.onOk}>確定</button>
                                    <button className="confirmBtn pull-right" onClick={this.onCancle}>取消</button>
                                </div>
                            </ReactModal>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const getAllParentUnit = function (parentName, parents) {
    var unit = Units.findOne({ name: parentName });
    if (unit) {
        parents.push(unit.name);
    }
    if (unit.parent) {
        return getAllParentUnit(unit.parent, parents)
    }
    return parents;
};

export default createContainer(() => {
    const units = Meteor.subscribe('units');
    const characters = Meteor.subscribe('characters');
    const stages = Meteor.subscribe('stages');
    if (units.ready() && characters.ready() && stages.ready()) {
        let character = Characters.findOne({ userId: Meteor.userId() });
        if (!character || character.act.length === 0) return { units: [] };
        const actIds = character.act;
        let userActUnits = Units.find({ _id: { $in: actIds } }).fetch();
        const userUnit = Units.findOne({ _id: Meteor.user().profile.position });
        userActUnits.forEach(unit => {
            unit.depart = userUnit.name;
            unit.crew = unit.name;
            if (unit.parent) {
                let parent = getAllParentUnit(unit.parent, []);
                parent.pop();
                if (parent.length === 2) {
                    unit.brigade = parent[1];
                    unit.group = parent[0];
                } else if (parent.length === 1) {
                    unit.brigade = parent[0];
                }
            }
        });

        // Get current situations.
        const unPassedStages = Stages.findOne({ 'situations.pass': false }, { sort: { index: 1, 'situations.index': 1 }, limit: 1 });
        let curSituation;
        if (unPassedStages) {
            const { situations } = unPassedStages;
            curSituation = situations.filter(obj => (obj.pass == false))[0];
        }

        const allStages = Stages.find({});
        userActUnits.forEach(unit => {
            const { _id } = unit;
            const allSendRes = {};

            // Render all stages.
            allStages.forEach(({ situations }) => {

                // Render all situations.
                situations.forEach(({ sended }) => {
                    if (sended) {
                        const allSend = sended.filter(send => (send._id === _id));

                        allSend.forEach(({ res }) => {
                            Object.keys(res).forEach(key => {
                                if (allSendRes[key]) {
                                    allSendRes[key] = allSendRes[key] + res[key];
                                } else {
                                    allSendRes[key] = res[key];
                                }
                            });
                        });
                    }
                })
            });

            // Update avaliable.
            Object.keys(allSendRes).forEach(key => {
                const found = unit.resources.find(({ id }) => {
                    return id === key;
                })
                found.avaliable = found.avaliable - allSendRes[key];
            });
        });

        return {
            units: userActUnits,
            stage: unPassedStages ? unPassedStages._id : undefined,
            situation: curSituation ? curSituation.index : undefined
        }
    }
    return {
        units: []
    }
}, ResourceContainer);