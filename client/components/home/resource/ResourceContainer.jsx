import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import DepartContainer from './DepartContainer.jsx';
import RequireEQ from './RequireEQ.jsx';
import EquipmentContainer from './EquipmentContainer.jsx';
import CategoryContainer from './CategoryContainer.jsx';
import { Units } from '../../../../imports/collections/units.js';
import { Characters } from '../../../../imports/collections/characters.js';

class ResourceContainer extends Component {
    constructor(props) {
        super(props);
        this.onDepartChange = this.onDepartChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.onUnitAdj = this.onUnitAdj.bind(this);
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

    render() {
        const { category, selectDeparts } = this.state;
        const { units } = this.props;
        const unit = units[selectDeparts];
        let resources = unit ? unit.resources : [];
        const selectedRes = resources.filter(res => (res.type === category));
        return (
            <div className="resource"  data-step="7" data-position="top" data-intro='選好單位分部後，裝備資源區即顯示該分部擁有的一切資源，選擇與點擊資源種類與數量並確定，擊可派出資源消滅災害'>
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
                    <EquipmentContainer
                        equipments={selectedRes}
                        onUnitAdj={this.onUnitAdj}
                    />
                    <div className="button_box ">
                        <button className="btn btn_XL btn-black ">確定</button>
                        <br />
                        <button className="btn btn_XL btn-black">取消</button>
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
    if (units.ready() && characters.ready()) {
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
        return {
            units: userActUnits
        }
    }
    return {
        units: []
    }
}, ResourceContainer);