import React, { Component, PropTypes } from 'react';
import Charact from './Charact.jsx';
import { getUnitName } from '../../../../../imports/collections/units.js';

class CharactContainer extends Component {

    constructor(props) {
        super(props);
        this.getAllEmployee = this.getAllEmployee.bind(this);
        this.resetCharacter = this.resetCharacter.bind(this);
    }

    resetCharacter() {
        let delIds = [];
        this.getAllEmployee(this.props.activeId).map(user => {
            delIds.push(user._id);
        });
        Meteor.call('characters.delete', delIds, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    getAllEmployee(unitId) {
        return Meteor.users.find({ 'profile.position': unitId }).fetch();
    }

    render() {
        let { activeId } = this.props;
        let unitName = getUnitName(activeId);
        let unitEmployees = this.getAllEmployee(activeId);
        let submit = null, reset = null;
        if (unitName.length !== 0) {
            submit = <button className="btn btn-sm btn-black pull-left" onClick={this.submitCharacter}><span className="glyphicon glyphicon-ok"></span>&nbsp;確定</button>
            reset = <button className="btn btn-sm btn-black pull-right" onClick={this.resetCharacter}><span className="glyphicon glyphicon-refresh"></span>&nbsp;重設</button>
        }
        return (
            <div className="charact_set">
                <h3>台北市政府{unitName}</h3>
                <div className="res-dashboard">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th className="col-md-3">
                                    人員
                                </th>
                                <th className="col-md-7">
                                    腳色
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                unitEmployees.map(user => {
                                    let { profile } = user;
                                    return (
                                        <Charact
                                            key={user._id}
                                            userId={user._id}
                                            name={profile.name}
                                            unit={activeId}
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div style={{ 'width': '300px', 'margin': '0 auto' }}>
                    {reset}
                </div>
            </div>
        );
    }
}

CharactContainer.PropTypes = {
    activeId: PropTypes.string.isRequired
}

export default CharactContainer;