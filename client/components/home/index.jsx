import React from 'react';
import UserContainer from './user/UserContainer.jsx';
import Chatroom from './chatroom/Chatroom.jsx';
import OnlineUserContainer from './chatroom/OnlineUserContainer.jsx';
import EagleMap from './map/EagleMap.jsx';
import Status from './header/Status.jsx';
import Resources from './resource/Resources.jsx';

const Home = () => (
    <div className="wrapper">
        <div className="left">
            <div className="header">
                <UserContainer />
            </div>
            <OnlineUserContainer />
            <Chatroom />
        </div>
        <div className="right">
            <div className="top">
                <EagleMap />
                <Status />
            </div>
            <div className="footer">
                <Resources />
            </div>
        </div>
    </div>
);

export default Home;