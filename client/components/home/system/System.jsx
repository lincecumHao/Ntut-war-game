import React, { Component, PropTypes } from 'react';
import About from './About.jsx';
import ReactModal from 'react-modal';

class System extends Component {
    
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.about = this.about.bind(this);
        this.state = {
            showAbout: false
        }
    }

    logout() {
        this.props.router.push('/auth/login');
        Meteor.logout();
    }

    about(e) {
        e.preventDefault();
        this.props.displaySystem();
        this.setState({
            showAbout: !this.state.showAbout
        });
    }

    userManual() {

    }

    editProfile() {

    }
    
    render() {
        return (
            <div style={{'display': this.props.display ? '' : 'none'}} className="user-bubblebox">
                <div className="user-bubble">
                    <div className="user-bubble-arrow-border"></div>
                    <div className="user-bubble-arrow"></div>
                    <ul>
                        <li><a href="">個人資料設定</a></li>
                        <li><a href="">使用說明</a></li>
                        <li><a href="" onClick={this.about}>關於</a></li>
                        <li><a href="" onClick={this.logout}>登出</a></li>
                    </ul>
                </div>
                <About
                    showAbout={this.state.showAbout}
                    closeAbout={() => {this.setState({showAbout: false})}}
                />
            </div>
        );
    }
}


System.propTypes = {
    display: PropTypes.bool.isRequired
};

export default System;