import React, { Component } from 'react';
import UserContainer from './UserContainer.jsx';
import MessageContainer from './MessageContainer.jsx';
import SendMsg from './SendMsg.jsx';

class Chatroom extends Component {
    constructor(props) {
        super(props);
        this.onClickUser = this.onClickUser.bind(this);
        this.state = {
            sendTo: ''
        };
    }

    onClickUser(userId) {
        // If click sendTo again, remove active.
        if(this.state.sendTo === userId){
            userId = '';
        }
        this.setState({
            sendTo: userId
        });
    }

    render() {
        return (
            <div>
                <UserContainer
                    onClickUser={this.onClickUser}
                    sendTo={this.state.sendTo}
                    />
                <div className="chatroom">
                    <h3>聊天室</h3>
                    <MessageContainer />
                    <SendMsg
                        to={this.state.sendTo}
                        />
                </div>
            </div>
        );
    }
}

export default Chatroom;