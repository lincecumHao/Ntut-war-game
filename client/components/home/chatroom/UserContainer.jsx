import React, { Component } from 'react';
import User from './User.jsx';
import { Units, getUnitName } from '../../../../imports/collections/units.js';
import { createContainer } from 'meteor/react-meteor-data';

class UserContainer extends Component {

    constructor(props) {
        super(props);
        this.renderUsers = this.renderUsers.bind(this);
    }

    renderUsers() {
        return this.props.onlineUsers.map(user => {
            let active = (user._id === this.props.sendTo ? true : false);
            let unit = getUnitName(user.profile.position);
            return (
                <User
                    key={user._id}
                    userId={user._id}
                    position={unit}
                    name={user.profile.name}
                    onClickUser={this.props.onClickUser}
                    active={active}
                />
            );
        });
    }

    render() {
        return (
            <div className="chatroom_user"  data-step="2" data-position="right" data-intro='點擊想要傳達訊息的單位，送出訊息時各單位即可知道此訊息對象是誰'>
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
    const units = Meteor.subscribe('units', null);
    const loading = !users.ready();
    return {
        onlineUsers: Meteor.users.find({ _id: { $ne: Meteor.userId() }, 'status.online': true }).fetch(),
        loading, units: Units
    }
}, UserContainer);