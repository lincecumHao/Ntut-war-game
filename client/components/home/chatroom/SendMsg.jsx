import React, { Component } from 'react';

class SendMsg extends Component {
    constructor(props) {
        super(props);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.onMsgChage = this.onMsgChage.bind(this);
        this.state = {
            msg: ''
        }
    }

    onMsgChage(e) {
        this.setState({
            msg: e.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key == 'Enter') {
            Meteor.call('messages.insert', {
                msg: this.state.msg,
                to: this.props.to
            }, (err) => {
                if (err) {
                    alert(err);
                } else {
                    this.setState({
                        msg: ''
                    });
                }
            });
        }
    }

    render() {
        return (
            <input value={this.state.msg} onChange={this.onMsgChage} onKeyDown={this.handleKeyPress} type="text" placeholder="Type a message" />
        );
    }
}

export default SendMsg;