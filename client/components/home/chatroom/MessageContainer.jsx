import React, { Component } from 'react';
import Message from './Message.jsx';

class MessageContainer extends Component {
    render() {
        return (
            <div className="message">
                <Message />
            </div>
        );
    }
}

export default MessageContainer;