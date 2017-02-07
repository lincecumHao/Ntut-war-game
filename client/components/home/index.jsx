import React, { Component } from 'react';
import UserContainer from './user/UserContainer.jsx';
import Chatroom from './chatroom/Chatroom.jsx';
import EagleMap from './map/EagleMap.jsx';
import Status from './header/Status.jsx';
import ResourceContainer from './resource/ResourceContainer.jsx';
import MainMap from './map/MainMap.jsx';
import System from './system/System.jsx';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            systemDisplay: false
        }
        this.displaySystem = this.displaySystem.bind(this);
    }

    displaySystem() {
        this.setState({
            systemDisplay: !this.state.systemDisplay
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div className="left">
                    <div className="header">
                        <UserContainer
                            onClick={this.displaySystem}
                        />
                    </div>
                    <System
                        display={this.state.systemDisplay}
                        displaySystem={this.displaySystem}
                    />
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