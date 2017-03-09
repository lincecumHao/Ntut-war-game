import React, { PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Characters } from '../../../../../imports/collections/characters.js';

const ManPower = ({ unitName, changeActiveUnit, unitId, status, alreadySetCharacter, loginUserCount }) => (
    <tr onClick={() => { changeActiveUnit(unitId); }} className={status}>
        <td>
        </td>
        <td>{unitName}</td>
        <td>
        </td>
        <td>
            <span className="label label-primary">{loginUserCount} 人</span>
        </td>
        <td>
            <span className="label label-info">{alreadySetCharacter} 人</span>
        </td>
    </tr>
);

ManPower.propTypes = {
    unitName: PropTypes.string.isRequired,
    unitId: PropTypes.string.isRequired,
    changeActiveUnit: PropTypes.func.isRequired,
    activeId: PropTypes.string
};

ManPower.defaultProps = {
    unitName: ''
};

/**
 * 找出已經/尚未設定過腳色的人數
 * @param {*單位ID} unitId 
 */
const updateUserCharacterCount = function (unitId) {
    let users = Meteor.users.find({ 'profile.position': unitId }).fetch();
    let userIds = [];
    users.forEach(user => {
        userIds.push(user._id)
    });
    let character = Characters.find({ userId: { $in: userIds }, act: { $ne: [] } }).fetch();
    return {
        loginUserCount: users.length,
        alreadySetCharacter: character.length
    }
}

export default createContainer((props) => {
    const userData = Meteor.subscribe('userData');
    const userStatus = Meteor.subscribe('userStatus');
    const characters = Meteor.subscribe('characters');
    const loading = !characters.ready();
    const userDataLoading = !userStatus.ready();
    const userStatusLoading = !userData.ready();
    let { unitId, activeId } = props;
    let loginUserCount = 0;
    let alreadySetCharacter = 0;
    if (!loading && !userDataLoading && !userStatusLoading) {
        let obj = updateUserCharacterCount(unitId);
        loginUserCount = obj.loginUserCount;
        alreadySetCharacter = obj.alreadySetCharacter;
    }
    let status = '';
    if (activeId === unitId) {
        status = 'active';
    } else if (alreadySetCharacter === loginUserCount) {
        status = 'finish';
    }
    return {
        loginUserCount,
        alreadySetCharacter,
        status
    }
}, ManPower);
