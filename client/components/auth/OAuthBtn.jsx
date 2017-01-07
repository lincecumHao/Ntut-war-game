import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import Alert from 'react-s-alert';

class OAuthBtn extends Component {

    constructor(props) {
        super(props);
        this.checkOAuthProfile = this.checkOAuthProfile.bind(this);
        this.oAuthCallback = this.oAuthCallback.bind(this);
        this.onOAuthLogin = this.onOAuthLogin.bind(this);
        Meteor.subscribe('userData');
    }

    onOAuthLogin() {
        let {company} = this.props;
        if (company === 'facebook') {
            Meteor.loginWithFacebook({
                requestPermissions: ['public_profile', 'email']
            }, this.oAuthCallback);
        } else if (company === 'google') {
            Meteor.loginWithGoogle({
                requestPermissions: ['profile', 'email']
            }, this.oAuthCallback);
        }
    }

    checkOAuthProfile() {
        if (Meteor.user() && Meteor.userId()) {
            let user = Meteor.user();
            if(user.profile.position){
                this.props.router.push('/');
            }else{
                this.props.router.push('/auth/singup');
            }
        }
    }

    oAuthCallback(err) {
        if (err) {
            Alert.error(err, {
                position: 'bottom',
                effect: 'scale',
                beep: false,
                offset: 100
            });
        }
        this.checkOAuthProfile();
    }

    render() {
        let {company} = this.props;
        return (
            <button className={'auth-login-btn clickable ' + company} onClick={this.onOAuthLogin}></button>
        );
    }
}

OAuthBtn.propTypes = {
    company: PropTypes.string.isRequired
};

export default withRouter(OAuthBtn);