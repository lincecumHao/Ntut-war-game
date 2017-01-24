import React, { Component } from 'react';
import UserContainer from './user/UserContainer.jsx';
import Chatroom from './chatroom/Chatroom.jsx';
import EagleMap from './map/EagleMap.jsx';
import Status from './header/Status.jsx';
import Resources from './resource/Resources.jsx';

class Home extends Component {

    constructor(props) {
        super(props);
        this.map = null;
    }
    

    componentDidMount() {
        this.map = new google.maps.Map(document.getElementById('eagle_map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
        });
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
                    <div className="footer">
                        <Resources />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;