import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Units } from '../../../../imports/collections/units.js';
import { Characters } from '../../../../imports/collections/characters.js';
import { Stages } from '../../../../imports/collections/stages.js';

class MainMap extends Component {

    constructor(props) {
        super(props);
        this.mainMap = null;
        this.eagleMap = null;
        this.createMarker = this.createMarker.bind(this);
        this.MarkerWithLabel;
        this.markers = [];
        this.timeMarker = [];
        this.dissasterLocation = null;
        this.calTime = this.calTime.bind(this);
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
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.units.length !== nextProps.units.length) {

            // Remove all marker
            this.markers.forEach(marker => {
                marker.setMap(null);
            });

            // Clean markers
            this.markers = [];

            // Create new departs
            nextProps.units.forEach(marker => {
                this.markers.push(this.createMarker({
                    lat: marker.location[1],
                    lng: marker.location[0],
                    icon: 'images/119_icon_50_44.png',
                    label: marker.name,
                    className: 'badge Detachments_badge'
                }));
            });
        }
        if (this.props.happenLocation && nextProps.happenLocation[1] !== this.props.happenLocation[1] && nextProps.happenLocation[0] !== this.props.happenLocation[0]) {
            this.dissasterLocation.setMap(null);
            // Create dissaster location.
            this.dissasterLocation = this.createMarker({
                lat: nextProps.happenLocation[1],
                lng: nextProps.happenLocation[0],
                icon: 'images/earthquake_50_44.png'
            });
            this.calTime();
        } else {
            // Create dissaster location.
            this.dissasterLocation = this.createMarker({
                lat: nextProps.happenLocation[1],
                lng: nextProps.happenLocation[0],
                icon: 'images/earthquake_50_44.png'
            });
            this.calTime();
        }
    }

    calTime() {
        // Remove all marker
        this.timeMarker.forEach(marker => {
            marker.setMap(null);
        });
        this.timeMarker = [];

        let service = new google.maps.DistanceMatrixService();
        const disP = this.dissasterLocation.getPosition();
        const destinations = [{ lat: disP.lat(), lng: disP.lng() }];
        const origins = [];
        this.markers.forEach(marker => {
            origins.push({
                lat: marker.getPosition().lat(),
                lng: marker.getPosition().lng()
            });
        });
        service.getDistanceMatrix(
            {
                origins: origins,
                destinations: destinations,
                travelMode: google.maps.TravelMode.DRIVING
            }, (response, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    response.rows.forEach((row, index) => {
                        const duration = row.elements[0].duration.text;
                        const origin = origins[index];
                        this.timeMarker.push(this.createMarker({
                            lat: origin.lat,
                            lng: origin.lng,
                            icon: '',
                            label: duration,
                            className: 'badge Bit_badge',
                            anchorY: 44 + 16 + 4 + 2,
                            anchorX: (((duration.length - 1) * 16) / 2 + 12)
                        }));

                        let directionsDisplay = new google.maps.DirectionsRenderer();
                        directionsDisplay.setMap(this.mainMap);
                        var request = {
                            origin: origin,
                            destination: destinations[0],
                            travelMode: google.maps.TravelMode.DRIVING
                        };
                        let directionsService = new google.maps.DirectionsService();
                        directionsService.route(request, function (result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(result);
                            }
                        });
                    });
                } else {
                    throw new DOMException(status);
                }
            });
    }

    createMarker({ lat, lng, icon, label, className, anchorX, anchorY }) {
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

const getAllParentUnit = function (parentName, parents) {
    var unit = Units.findOne({ name: parentName });
    if (unit) {
        parents.push(unit.name);
    }
    if (unit.parent) {
        return getAllParentUnit(unit.parent, parents)
    }
    return parents;
};

export default createContainer(() => {
    const units = Meteor.subscribe('units');
    const characters = Meteor.subscribe('characters');
    const stages = Meteor.subscribe('stages');
    if (units.ready() && characters.ready() && stages.ready()) {
        let character = Characters.findOne({ userId: Meteor.userId() });
        if (!character || character.act.length === 0) return { units: [] };
        const actIds = character.act;
        let userActUnits = Units.find({ _id: { $in: actIds } }).fetch();
        const userUnit = Units.findOne({ _id: Meteor.user().profile.position });
        userActUnits.forEach(unit => {
            unit.depart = userUnit.name;
            unit.crew = unit.name;
            if (unit.parent) {
                let parent = getAllParentUnit(unit.parent, []);
                parent.pop();
                if (parent.length === 2) {
                    unit.brigade = parent[1];
                    unit.group = parent[0];
                } else if (parent.length === 1) {
                    unit.brigade = parent[0];
                }
            }
        });

        // Get stage
        const unPassedStages = Stages.findOne({ 'situations.pass': false }, { sort: { index: 1, 'situations.index': 1 }, limit: 1 });
        var location = [];
        if (unPassedStages) {
            const { situations } = unPassedStages;
            const curSituation = situations.filter(obj => (obj.pass == false))[0];
            location = [curSituation.placemark.geometry.location.lng, curSituation.placemark.geometry.location.lat];
        }
        return {
            units: userActUnits,
            happenLocation: location
        }
    }
    return {
        units: []
    }
}, MainMap);
