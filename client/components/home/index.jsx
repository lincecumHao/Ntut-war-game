import React, { Component } from 'react';
import UserContainer from './user/UserContainer.jsx';
import Chatroom from './chatroom/Chatroom.jsx';
import EagleMap from './map/EagleMap.jsx';
import Status from './header/Status.jsx';
import ResourceContainer from './resource/ResourceContainer.jsx';
import MainMap from './map/MainMap.jsx';
import System from './system/System.jsx';
import IntroModel from './IntroModel.jsx';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            systemDisplay: false,
            isIntroAsk: false,
            playIntro: false,
            sendingIds: []
        }
        this.displaySystem = this.displaySystem.bind(this);
        this.goIntro = this.goIntro.bind(this);
        this.closeIntro = this.closeIntro.bind(this);
        this.sendUnits = this.sendUnits.bind(this);
        this.sended = this.sended.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.playIntro == false && this.state.playIntro){
            introJs().start();
        }
    }
    
    goIntro() {
        this.setState({
            isIntroAsk: false,
            playIntro: true
        });
    }

    closeIntro() {
        this.setState({
            isIntroAsk: false
        });
    }

    displaySystem() {
        this.setState({
            systemDisplay: !this.state.systemDisplay
        });
    }

    sendUnits(sendingIds) {
        this.setState({
            sendingIds
        });
    }

    sended() {
        this.setState({
            sendingIds: []
        });
    }

    render() {
        const { isIntroAsk } = this.state;
        return (
            <div className="wrapper">
                <IntroModel isOpen={isIntroAsk} onNo={this.closeIntro} onOk={this.goIntro} />
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
                    <MainMap
                        sendingIds={this.state.sendingIds}
                        sended={this.sended}
                    />
                    <div className="footer">
                        <ResourceContainer sendUnits={this.sendUnits}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;