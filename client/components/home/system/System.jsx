import React, { Component, PropTypes } from 'react';

class System extends Component {
    render() {
        return (
            <div style={{'display': this.props.display ? '' : 'none'}} className="user-bubblebox">
                <div className="user-bubble">
                    <div className="user-bubble-arrow-border"></div>
                    <div className="user-bubble-arrow"></div>
                    <ul>
                        <li><a href="#">個人資料設定</a></li>
                        <li><a href="#">使用說明</a></li>
                        <li><a href="#">關於</a></li>
                        <li><a href="#">登出</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}


System.propTypes = {
    display: PropTypes.bool.isRequired
};

export default System;