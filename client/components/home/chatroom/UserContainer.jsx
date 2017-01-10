import React, { Component } from 'react';
import User from './User.jsx';
import { createContainer } from 'meteor/react-meteor-data';

class UserContainer extends Component {

    constructor(props) {
        super(props);
        this.renderUsers = this.renderUsers.bind(this);
    }

    renderUsers() {
        let users = [];
        this.props.onlineUsers.forEach(user => {
            users.push(
                <User
                    key={user._id}
                    position={user.profile.position}
                    name={user.profile.name}
                    />
            );
        });
        return users;
    }

    render() {
        return (
            <div className="chatroom_user">
                <h3>使用者</h3>
                <div>
                    {this.props.loading ? '' : this.renderUsers()}
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    const users = Meteor.subscribe('userStatus');
    const loading = !users.ready();
    return {
        onlineUsers: Meteor.users.find().fetch(),
        loading
    }
}, UserContainer);