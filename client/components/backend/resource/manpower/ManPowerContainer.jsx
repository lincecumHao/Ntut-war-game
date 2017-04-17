import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Nowuser from './CurrentUsers.jsx';
import ManPower from './ManPower.jsx';
import { Units } from '../../../../../imports/collections/units.js';

class ManPowerContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { onlineUsers, units, changeActiveUnit, activeId } = this.props;
        let allUnits = units.find({ parent: null }).fetch();
        return (
            <div className="manpower_req">
                <Nowuser count={onlineUsers} />
                <table className="Manpower-list">
                    <thead>
                        <tr>
                            <th colSpan="2">單位</th>
                            <th colSpan="2">登入人數</th>
                            <th>已設定人數</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUnits.map(unit => {
                                return (
                                    <ManPower
                                        key={unit._id}
                                        unitId={unit._id}
                                        unitName={unit.name}
                                        activeId={activeId}
                                        changeActiveUnit={changeActiveUnit}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

ManPowerContainer.propTypes = {
    changeActiveUnit: PropTypes.func.isRequired,
    activeId: PropTypes.string.isRequired
};

export default createContainer(() => {
    Meteor.subscribe('userStatus');
    const user = Meteor.subscribe('userData');
    const units = Meteor.subscribe('units', null);
    const loadingUser = !user.ready();
    const loadingUnit = !units.ready();
    return {
        onlineUsers: Meteor.users.find({ 'status.online': true }).fetch().length,
        loadingUser, loadingUnit, user, units: Units
    }
}, ManPowerContainer);
// <button className="btn btn-sm btn-black pull-right "><span className="glyphicon glyphicon-ok"></span>&nbsp;完成設定</button>
