import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Units } from '../../../../imports/collections/units.js';

const Message = ({ from, to, msg }) => (
    <p>
        <label>{from}{(to ? '對' + to : '')}說:</label>{msg}
    </p>
);

const formatUser = (user) => {
    let units = Units.find({_id: user.profile.position}).fetch();
    let unit = user.profile.position;
    if(units.length){
        unit = units[0].name;
    }
    return unit + '[' + user.profile.name + ']';
}

export default createContainer((props) => {
    Meteor.subscribe('units', null);
    Meteor.subscribe('users', [props.from, props.to]);
    let users = Meteor.users.find({ _id: { $in: [props.from, props.to] } }).fetch();
    let from = formatUser(users.filter(user => {
        return user._id === props.from
    })[0]);
    let to = '';
    if (props.to) {
        to = formatUser(users.filter(user => {
            return user._id === props.to
        })[0]);
    }
    return {
        from,
        to
    }
}, Message);