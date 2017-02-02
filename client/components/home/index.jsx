import React, { Component } from 'react';
import UserContainer from './user/UserContainer.jsx';
import Chatroom from './chatroom/Chatroom.jsx';
import EagleMap from './map/EagleMap.jsx';
import Status from './header/Status.jsx';
import ResourceContainer from './resource/ResourceContainer.jsx';
import MainMap from './map/MainMap.jsx';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="left">
                    <div className="header">
                        <UserContainer />
                    </div>
                    <Chatroom />
                </div>
                <div className="right">
                    <div className="top">
                        <EagleMap />
                        <Status />
                    </div>
                    <MainMap />
                    <div className="footer">
                        <ResourceContainer />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;