import React, { Component } from 'react';

class Login extends Component {


    render() {
        return (
            <div>
                <div className="frame">
                    <img src="https://dummyimage.com/108/000/fff" width="108px" height="108px"/>
                </div>
                <div className="">
                    <div className="login-container">
                        <div className="login-padding">
                            <p className="title">Sign In</p>
                            <input placeholder="&#xf003;  Email" />
                            <input placeholder="&#xf084;  Password"/>
                            <a><p className="forgot-pwd">Forgot Password</p></a>
                            <div className="login-footer">
                                <p>Remember Me</p>
                                <button className="login-btn">Login</button>
                            </div>
                        </div>
                        <div className="login-padding">
                            3RD LOGIN
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;