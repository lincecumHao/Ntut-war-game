import React, { Component } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.switchNav = this.switchNav.bind(this);
        this.state = {
            resource: true
        }
    }

    switchNav() {
        this.setState({
            resource: !this.state.resource
        });
    }

    render() {
        return (
            <ul className="backend_nav">
                <li className={classNames({ active: this.state.resource })}>
                    <Link to="/backend/resource" onClick={this.switchNav}>單位資源分配設定</Link>
                </li>
                <li className={classNames({ active: !this.state.resource })}>
                    <Link to="/backend/stage" onClick={this.switchNav}>演練設定</Link>
                </li>
            </ul>
        );
    }
}

export default Nav;