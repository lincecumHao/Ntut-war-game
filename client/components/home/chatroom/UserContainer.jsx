import React, { Component } from 'react';
import User from './User.jsx';
import { createContainer } from 'meteor/react-meteor-data';

class UserContainer extends Component {

    constructor(props) {
        super(props);
        this.renderUsers = this.renderUsers.bind(this);
    }

    renderUsers() {
        return this.props.onlineUsers.map(user => {
            let active = (user._id === this.props.sendTo ? true : false)
            return (
                <User
                    key={user._id}
                    userId={user._id}
                    position={user.profile.position}
                    name={user.profile.name}
                    onClickUser={this.props.onClickUser}
                    active={active}
                    />
            );
        });
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
        onlineUsers: Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch(),
        loading
    }
}, UserContainer);