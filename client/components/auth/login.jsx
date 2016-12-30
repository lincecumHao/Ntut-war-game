import React, { Component } from 'react';

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <div className="login-padding">
                    <p className="title">Sign In</p>
                    <input placeholder="&#xf003;  Email" />
                    <input placeholder="&#xf084;  Password" />
                    <a><p className="default-font s14pt clickable">Forgot Password</p></a>
                    <div className="login-footer">
                        <input className="ckbx" type="checkbox" id="rember-me-ckbx" />
                        <label htmlFor="rember-me-ckbx"><p className="default-font">Remember Me</p></label>
                        <button className="default-font login-btn">Login</button>
                    </div>
                </div>
                <div className="login-padding">
                    <div className="align-left">
                        <p className="default-font s21pt">Login with</p>
                        <button className="auth-login-btn facebook clickable"></button>
                        <button className="auth-login-btn google clickable"></button>
                    </div>
                    <div className="login-footer">
                        <p className="default-font s21pt">Don't registered?</p>&#160;<p className="default-font s21pt clickable">Register now!</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;