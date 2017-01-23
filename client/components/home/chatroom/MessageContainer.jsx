import React, { Component } from 'react';
import Message from './Message.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Messages } from '../../../../imports/collections/messages.js';

class MessageContainer extends Component {

    constructor(props) {
        super(props);
        this.renderMsg = this.renderMsg.bind(this);
    }

    componentDidUpdate() {
        var node = this.refs['msg-container'];
        node.scrollTop = node.scrollHeight;
    }

    renderMsg() {
        return this.props.messages.map(msg => {
            return (
                <Message
                    key={msg._id}
                    from={msg.ownerId}
                    to={msg.to}
                    msg={msg.msg}
                    />
            );
        })
    }

    render() {
        return (
            <div className="message" ref="msg-container" >
                {this.renderMsg()}
            </div>
        );
    }
}

export default createContainer(() => {
    let messages = Meteor.subscribe('messages', 50);
    const loading = !messages.ready();
    return {
        messages: Messages.find({}).fetch(),
        loading
    }
}, MessageContainer);