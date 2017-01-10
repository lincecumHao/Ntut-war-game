import React, { Component } from 'react';
import UserContainer from './UserContainer.jsx';
import MessageContainer from './MessageContainer.jsx';
import SendMsg from './SendMsg.jsx';

class Chatroom extends Component {
    render() {
        return (
            <div>
                <UserContainer />
                <div className="chatroom">
                    <h3>聊天室</h3>
                    <MessageContainer />
                    <SendMsg />
                </div>
            </div>
        );
    }
}

export default Chatroom;