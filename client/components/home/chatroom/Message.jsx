import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';

const Message = ({ from, to, msg }) => (
    <p>
        <label>{from}{(to ? '對' + to : '')}說:</label>{msg}
    </p>
);

const formatUser = (user) => {
    return user.profile.position + '[' + user.profile.name + ']';
}

export default createContainer((props) => {
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