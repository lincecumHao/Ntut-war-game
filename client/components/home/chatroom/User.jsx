import React, { Component, PropTypes } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        this.onClickUser = this.onClickUser.bind(this);
    }

    onClickUser(){
        console.log('awef');
    }
    
    render() {
        return (
            <span className="label label-white" onClick={this.onClickUser}>
                {this.props.position}[{this.props.name}]
            </span>
        );
    }
}

User.propTypes = {
    position: PropTypes.string,
    name: PropTypes.string
};

User.defaultProps = {
    position: '',
    name: 'Test'
};

export default User;