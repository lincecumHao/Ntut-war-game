import React, { Component } from 'react';
import User from './User.jsx';
import { Units } from '../../../../imports/collections/units.js';
import { createContainer } from 'meteor/react-meteor-data';

class UserContainer extends Component {

    constructor(props) {
        super(props);
        this.renderUser = this.renderUser.bind(this);
    }

    renderUser() {
        let {name, avatar, position} = Meteor.user().profile;
        let unit = this.props.units.find({_id: position}).fetch()[0].name;
        if(!avatar || avatar.length == 0) avatar = './images/user_img.png';
        return (
            <User
                username={name}
                avatar={avatar}
                position={unit}
                onClick={this.props.onClick}
                />
        )
    }

    render() {
        return this.props.loadingUser && this.props.loadingUnit ? <User /> : this.renderUser();
    }
}

export default createContainer(() => {
    const user = Meteor.subscribe('userData');
    const units = Meteor.subscribe('units', null);
    const loadingUser = !user.ready();
    const loadingUnit = !units.ready();
    return {
        loadingUser, loadingUnit, user, units: Units
    }
}, UserContainer);