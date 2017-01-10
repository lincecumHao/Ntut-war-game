import React, { Component } from 'react';
import MessageContainer from './MessageContainer.jsx';

class Chatroom extends Component {

    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onMsgChage = this.onMsgChage.bind(this);
        this.state = {
            msg: '',
            to: ''
        }
    }

    onMsgChage(e){
        this.setState({
            msg: e.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            console.log(this.state);
            // Meteor.call('messages.insert', {
            //     todoId: '12345',
            //     newText: 'This is a todo item.'
            // }, (err, res) => {
            //     if (err) {
            //         alert(err);
            //     } else {
            //         // success!
            //     }
            // });
        }
    }

    render() {
        return (
            <div className="chatroom">
                <h3>聊天室</h3>
                <MessageContainer />
                <input value={this.state.msg} onChange={this.onMsgChage} onKeyDown={this.handleKeyPress} type="text" placeholder="Type a message"  />
            </div>
        );
    }
}

export default Chatroom;