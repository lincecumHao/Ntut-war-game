import React, { Component } from 'react';
import MessageContainer from './MessageContainer.jsx';

class Chatroom extends Component {

    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            console.log('enter press here! ')
        }
    }

    render() {
        return (
            <div className="chatroom">
                <h3>聊天室</h3>
                <MessageContainer />
                <input name="" type="text" placeholder="Type a message" onKeyDown={this.handleKeyPress} />
            </div>
        );
    }
}

export default Chatroom;