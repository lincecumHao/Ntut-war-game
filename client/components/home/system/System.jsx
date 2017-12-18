import React, { Component } from 'react';
import PropTypes from 'prop-types';
import About from './About.jsx';
import ProfileEditor from './ProfileEditor.jsx';
import { withRouter } from 'react-router';
// import ReactMod from 'react-modal';

class System extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.about = this.about.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.switchState = this.switchState.bind(this);
        this.playIntro = this.playIntro.bind(this);
        this.state = {
            showAbout: false,
            showEditProfile: false
        }
    }

    logout(e) {
        e.preventDefault();
        this.props.router.push('/auth/login');
        Meteor.logout();
    }

    about(e) {
        e.preventDefault();
        this.props.displaySystem();
        this.switchState('showAbout');
    }

    playIntro(e) {
        e.preventDefault();
        introJs().start();
    }

    editProfile(e) {
        e.preventDefault();
        this.props.displaySystem();
        this.switchState('showEditProfile');
    }

    switchState(key) {
        let obj = {};
        obj[key] = !this.state[key];
        this.setState(obj);
    }

    render() {
        return (
            <div style={{ 'display': this.props.display ? '' : 'none' }} className="user-bubblebox">
                <div className="user-bubble">
                    <div className="user-bubble-arrow-border"></div>
                    <div className="user-bubble-arrow"></div>
                    <ul>
                        <li><a href="" onClick={this.editProfile}>個人資料設定</a></li>
                        <li><a onClick={this.playIntro}>使用說明</a></li>
                        <li><a href="" onClick={this.about}>關於</a></li>
                        <li><a href="" onClick={this.logout}>登出</a></li>
                    </ul>
                </div>
                <About
                    showAbout={this.state.showAbout}
                    closeAbout={() => { this.setState({ showAbout: false }) }}
                />
                <ProfileEditor
                    showEditProfile={this.state.showEditProfile}
                    callback={() => { this.setState({ showEditProfile: false }) }}
                />
            </div>
        );
    }
}


System.propTypes = {
    display: PropTypes.bool.isRequired
};

export default withRouter(System);