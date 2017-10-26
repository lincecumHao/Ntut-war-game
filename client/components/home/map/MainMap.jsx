import React, { Component } from 'react';

class MainMap extends Component {

    constructor(props) {
        super(props);
        this.mainMap = null;
        this.eagleMap = null;
        this.createMarker = this.createMarker.bind(this);
        this.MarkerWithLabel;
    }

    componentDidMount() {
        MarkerWithLabel = require('markerwithlabel')(google.maps);
        this.mainMap = new google.maps.Map(document.getElementById('mainMap'), {
            center: { lat: 25.045552, lng: 121.531083 },
            zoom: 13,
            maxZoom: 18,
            minZoom: 12
        });
        window.mainMap = this.mainMap;
        this.eagleMap = window.eagleMap;

        // Sync eagle map and main map center.
        this.mainMap.addListener('idle', () => {
            this.eagleMap.setCenter(this.mainMap.getCenter());
        });
        this.createMarker({
            lat: 25.04555,
            lng: 121.531083,
            icon: 'images/119_icon_50_44.png',
            label: '消防局',
            className: 'badge Detachments_badge'
        });
        this.createMarker({
            lat: 25.04555,
            lng: 121.534083,
            icon: 'images/earthquake_50_44.png'
        });

        let service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
            {
                origins: [{ lat: 25.04555, lng: 121.531083 }],
                destinations: [{ lat: 25.04855, lng: 121.534083 }],
                travelMode: google.maps.TravelMode.DRIVING
            }, (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    let duration = response.rows[0].elements[0].duration.text;
                    this.createMarker({
                        lat: 25.04555,
                        lng: 121.531083,
                        icon: '',
                        label: duration,
                        className: 'badge Bit_badge',
                        anchorY: 44 + 16 + 4 + 2,
                        anchorX: (((duration.length - 1) * 16) / 2 + 12)
                        
                    });


                    let directionsDisplay = new google.maps.DirectionsRenderer();
                    directionsDisplay.setMap(this.mainMap);
                    var request = {
                        origin: { lat: 25.04555, lng: 121.531083 },
                        destination: { lat: 25.04855, lng: 121.534083 },
                        travelMode: google.maps.TravelMode.DRIVING
                    };
                    let directionsService = new google.maps.DirectionsService();
                    directionsService.route(request, function (result, status) {
                        if (status == google.maps.DirectionsStatus.OK) {
                            // directionsDisplay.setDirections(result);
                        }
                    });
                } else {
                    throw new DOMException(status);
                }
            });
    }

    createMarker({lat, lng, icon, label, className, anchorX, anchorY}) {
        let img = {
            url: icon,
            // This marker is 50 pixels wide by 44 pixels high.
            size: new google.maps.Size(50, 44),
            // The origin for this image is (0, 0).
            origin: new google.maps.Point(0, 0)
            // The anchor for this image is the base of the flagpole at (0, 32).
            // anchor: new google.maps.Point(0, 32)
        };
        let marker = new MarkerWithLabel({
            position: { lat, lng },
            icon: img,
            draggable: false,
            map: this.mainMap
        });
        if (label) {
            marker.set('labelContent', label);
            marker.set('labelAnchor', new google.maps.Point((anchorX ? anchorX : (label.length * 16) / 2 + 12), (anchorY ? anchorY : 0)));
            marker.set('labelClass', className);
        }

        return marker;
    }


    render() {

        /* position: absolute; */
        /* top: 400px; */
        /* left: 500px; */
        /* width: 300px; */
        /* text-align: center; */
        let mapStyle = {
            marginLeft: '10px',
            marginTop: '10px',
            height: 'calc(100vh - 300px)'
        }
        return (
            <div style={mapStyle} id="mainMap">
                <span className="badge Bit_badge" >2分</span>
                <br />
                <img src="images/119 icon.png" width="80" height="71" />
                <br />
                <span className="badge Detachments_badge" >信義分隊</span>
            </div>
        );
    }
}

export default MainMap;