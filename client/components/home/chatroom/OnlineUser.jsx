import React, { Component, PropTypes } from 'react';

class OnlineUser extends Component {
    render() {
        return (
            <span className="label label-white">
                {this.props.position}
            </span>
        );
    }
}

OnlineUser.propTypes = {
    position: PropTypes.string
};

OnlineUser.defaultProps = {
  position: ''
};

export default OnlineUser;