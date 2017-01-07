import React, { Component } from 'react';
import OAuthBtn from './OAuthBtn.jsx';
import { Link, browserHistory } from 'react-router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pwd: ''
        }
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPwdChange = this.onPwdChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    onEmailChange(e) {
        this.setState({
            email: e.target.value
        });
    }

    onPwdChange(e) {
        this.setState({
            pwd: e.target.value
        });
    }

    onLogin() {
        let {email, pwd} = this.state;
        Meteor.loginWithPassword(email, pwd, function (error) {
            if (error) {
                this.setState({
                    error: error.reason.replace('User', 'eMail')
                });
            } else {

                // Navigating to home page.
                browserHistory.push('/');
            }
        }.bind(this));
    }

    render() {
        return (
            <div className="login-container">
                <div className="login-padding">
                    <p className="title">Sign In</p>
                    <input type="text" placeholder="&#xf003;  Email" value={this.state.email} onChange={this.onEmailChange} />
                    <input type="password" placeholder="&#xf084;  Password" value={this.state.pwd} onChange={this.onPwdChange} />
                    <a><p className="default-font s14pt clickable">Forgot Password</p></a>
                    <div className="login-footer">
                        <input className="ckbx" type="checkbox" id="rember-me-ckbx" />
                        <label htmlFor="rember-me-ckbx"><p className="default-font">Remember Me</p></label>
                        <button className="default-font login-btn" onClick={this.onLogin}>Login</button>
                    </div>
                    <p className="default-font s14pt err">{this.state.error}</p>
                </div>
                <div className="login-padding">
                    <div className="align-left">
                        <p className="default-font s21pt">Login with</p>
                        <OAuthBtn company="facebook" />
                        <OAuthBtn company="google" />
                    </div>
                    <div className="login-footer">
                        <p className="default-font s21pt">Don't registered?</p>&#160;<Link to="/auth/singup"><p className="default-font s21pt clickable">Register now!</p></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;