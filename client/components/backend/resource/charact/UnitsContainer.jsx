import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Units } from '../../../../../imports/collections/units.js';
import { Characters } from '../../../../../imports/collections/characters.js';
import { createContainer } from 'meteor/react-meteor-data';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class UnitsContainer extends Component {

    constructor(props) {
        super(props);
        this.onSelectUnit = this.onSelectUnit.bind(this);
    }

    onSelectUnit(value) {
        let act = [];
        value.forEach(unit => {
            act.push(unit.value);
        });
        let { userId } = this.props;
        Meteor.call('characters.update', { userId, act }, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    render() {
        return (
            <Select
                name="form-field-name"
                multi={true}
                options={this.props.totalUnits}
                onChange={this.onSelectUnit}
                value={this.props.selectOpts}
            />
        );
    }
}

UnitsContainer.PropTypes = {
    unitId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
}

const formatSelectedUnit = function (units) {
    units.forEach((unit, index, units) => {
        units[index] = {
            value: unit.value,
            label: unit.label.replace('-', '')
        };
    });
    return units;
}

let totalUnits = [];
const loadUnits = function (parentId, index) {
    let units = Units.find({ parent: parentId }).fetch();
    let prefix = '';
    for (let i = 0; i < index; i++) {
        prefix += '-';
    }
    units.map(unit => {
        totalUnits.push({
            value: unit._id,
            label: prefix + unit.name
        });
        loadUnits(unit._id, index + 1);
    });
}

const loadUserCharacter = function (actIds, totalUnits) {
    let selectedOpt = totalUnits.filter(option => {
        let index = actIds.indexOf(option.value);
        return (index !== -1 ? true : false);
    });
    return formatSelectedUnit(selectedOpt);
}

export default createContainer((props) => {
    let { unitId, userId } = props;
    const units = Meteor.subscribe('units', unitId);
    const characters = Meteor.subscribe('characters');
    const loadingUnit = !units.ready();
    const loadingCharacters = !characters.ready();
    totalUnits = [];
    let selectOpts = [], actIds = [];
    if (!loadingUnit && !loadingCharacters) {
        let character = Characters.findOne({ userId: userId });
        actIds = (character ? character.act : []);
        loadUnits(unitId, 0);
        selectOpts = loadUserCharacter(actIds, totalUnits)
    }

    return {
        loadingUnit, loadingCharacters, units: Units,
        character: Characters.findOne({ userId: props.userId }),
        totalUnits,
        selectOpts
    }
}, UnitsContainer);