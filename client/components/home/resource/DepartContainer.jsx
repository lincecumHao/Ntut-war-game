import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Units } from '../../../../imports/collections/units.js';
import { Characters } from '../../../../imports/collections/characters.js';
import Depart from './Depart';

class DepartContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
        this.nextUnit = this.nextUnit.bind(this);
        this.state = {
            index: 0
        }
    }

    nextUnit(flag) {
        const { index } = this.state;
        if ((index + flag) < 0) {
            this.setState({
                index: this.props.units.length
            });
        } else if ((index + flag) >= this.props.units.length) {
            this.setState({
                index: 0
            });
        } else {
            this.setState({
                index: index + flag
            });
        }
    }

    goPrev() {
        this.nextUnit(-1);
    }

    goNext() {
        this.nextUnit(1);
    }

    render() {
        const unit = this.props.units[this.state.index];
        if (unit) {
            return (
                <Depart
                    depart={unit.depart}
                    brigade={unit.brigade}
                    group={unit.group}
                    crew={unit.crew}
                    goNext={this.goNext}
                    goPrev={this.goPrev}
                />
            );
        } else {
            return <div className="resource_L">請先至後台設定該人物腳色</div>;
        }

    }
}

DepartContainer.propTypes = {
    units: PropTypes.array.isRequired
};

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
        const actIds = (character ? character.act : []);
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
}, DepartContainer);