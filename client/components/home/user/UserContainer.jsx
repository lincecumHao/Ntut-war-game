import React, { Component } from 'react';
import User from './User.jsx';
import { createContainer } from 'meteor/react-meteor-data';

class UserContainer extends Component {

    constructor(props) {
        super(props);
        this.renderUser = this.renderUser.bind(this);
    }

    renderUser() {
        let {name, avatar, position} = Meteor.user().profile;
        if(!avatar || avatar.length == 0) avatar = './images/user_img.png';
        return (
            <User
                username={name}
                avatar={avatar}
                position={position}
                onClick={this.props.onClick}
                />
        )
    }

    render() {
        return this.props.loading ? <User /> : this.renderUser();
    }
}

export default createContainer(() => {
    const user = Meteor.subscribe('userData');
    const loading = !user.ready();
    return {
        user, loading
    }
}, UserContainer);