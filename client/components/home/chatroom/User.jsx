import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class User extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let clsName = classnames({
            'label' : 1,
            'label-white': 1,
            active: this.props.active
        });
        return (
            <span className={clsName} onClick={() => {
                this.props.onClickUser(this.props.userId)
            } }>
                {this.props.position}[{this.props.name}]
            </span>
        );
    }
}

User.propTypes = {
    userId: PropTypes.string.isRequired,
    position: PropTypes.string,
    name: PropTypes.string,
    active: PropTypes.bool
};

User.defaultProps = {
    position: '',
    name: 'Test',
    active: false
};

export default User;