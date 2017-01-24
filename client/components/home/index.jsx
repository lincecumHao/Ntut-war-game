import React, { Component } from 'react';
import UserContainer from './user/UserContainer.jsx';
import Chatroom from './chatroom/Chatroom.jsx';
import EagleMap from './map/EagleMap.jsx';
import Status from './header/Status.jsx';
import Resources from './resource/Resources.jsx';
import MainMap from './map/MainMap.jsx';

class Home extends Component {

    constructor(props) {
        super(props);
        this.eagleMap = null;
        this.mainMap = null;
    }
    

    componentDidMount() {
        this.eagleMap = new google.maps.Map(document.getElementById('eagle_map'), {
            center: { lat: 25.045552, lng: 121.531083 },
            zoom: 13,
            maxZoom: 16,
            minZoom: 12,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            panControl: false,
            disableDoubleClickZoom: true,
            clickToGo: false

        });
        this.mainMap = new google.maps.Map(document.getElementById('mainMap'), {
            center: { lat: 25.045552, lng: 121.531083 },
            zoom: 13
        });
        window.mainMap = this.mainMap;
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
                        <Resources />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;