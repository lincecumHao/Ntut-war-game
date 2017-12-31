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
        this.MarkerWithLabel;
        this.markers = [];
        this.timeMarker = [];
        this.dissasterLocation = null;
        this.directionsDisplays = [];
        this.createMarker = this.createMarker.bind(this);
        this.calTime = this.calTime.bind(this);
        this.generateProgressHtml = this.generateProgressHtml.bind(this);
        this.state = {
            send: {}
        }
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

        // show unit on map.
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
                    className: 'badge Detachments_badge',
                    unitId: marker._id
                }));
            });
        }

        // Show disaster on map.
        const { stage, situation } = nextProps;
        if (this.props.stage.index !== stage.index || this.props.situation.index !== situation.index) {
            // Different stage or different situation.

            // Clean current dissaster location if any.
            if (this.dissasterLocation) {
                this.dissasterLocation.setMap(null);

                // If dissaster location exist, should have direction also, clear too.
                this.directionsDisplays.forEach(display => {
                    display.setMap(null);
                })
            }

            // Create dissaster marker.
            const { placemark: { geometry: { location } }, resources } = situation;
            this.dissasterLocation = this.createMarker({
                lat: location.lat,
                lng: location.lng,
                icon: 'images/earthquake_50_44.png',
                className: '',
                label: this.generateProgressHtml(0),
                labelAnchor: new google.maps.Point(40, 0)
            });

            // Calculate how long will it take to the dissaster location in every unit.
            this.calTime();
        }

        if (nextProps.sendingIds.length > 0) {
            nextProps.sendingIds.forEach((sending) => {
                const { _id, res } = sending;
                const unit = this.props.units.filter(unit => (unit._id === _id))[0];
                const d = new Date().getTime().toString();
                this[_id + d] = {
                    marker: this.createMarker({
                        lat: unit.location[1],
                        lng: unit.location[0],
                        icon: 'images/car_small_nobg.png',
                        size: new google.maps.Size(73, 47)
                    }),
                    index: 1,
                    interval: setInterval(() => {
                        const movingObj = this[_id + d];
                        const route = this.state[_id];
                        let { marker, index } = movingObj;
                        if (index >= route.length) {

                            clearInterval(movingObj.interval);
                            marker.setMap(null);
                            const situationIndex = situation.index;
                            const stageId = stage._id;
                            Meteor.call('situation.addSendUnits', [sending], situationIndex, stageId, (err) => {
                                if (err) {
                                    alert(err);
                                }
                            });
                        } else {
                            const location = route[index];
                            marker.setPosition(location)
                        }
                        movingObj.index = movingObj.index + 1;
                    }, 100)
                }
            });
            this.props.sended();
        }

        if(nextProps.progress !== this.props.progress){
            this.dissasterLocation.set('labelContent', this.generateProgressHtml(nextProps.progress));
        }
    }

    generateProgressHtml(currentProgress) {
        return `<div class="progress">
                    <div class="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: ${100 - currentProgress}%;">
                        <span style="visibility: hidden;">60% Complete</span>
                    </div>
                </div>`;
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
                lng: marker.getPosition().lng(),
                unitId: marker.get('unitId')
            });
        });
        const that = this;
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
                        const unitId = origin.unitId;
                        this.timeMarker.push(this.createMarker({
                            lat: origin.lat,
                            lng: origin.lng,
                            icon: '',
                            label: duration,
                            className: 'badge Bit_badge',
                            anchorY: 44 + 16 + 4 + 2,
                            anchorX: (((duration.length - 1) * 16) / 2 + 12)
                        }));

                        let directionsDisplay = new google.maps.DirectionsRenderer({
                            suppressMarkers: true
                        });
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
                                that.directionsDisplays.push(directionsDisplay);
                                const obj = {};
                                obj[unitId] = result.routes[0].overview_path;
                                that.setState(obj);
                            }
                        });
                    });
                } else {
                    throw new DOMException(status);
                }
            }
        );
    }

    createMarker({ lat, lng, icon, label, className, anchorX, anchorY, unitId, size, labelAnchor }) {
        let marker = new MarkerWithLabel({
            position: { lat, lng },
            draggable: false,
            map: this.mainMap
        });

        if (icon !== undefined) {
            let img = {
                url: icon,
                // This marker is 50 pixels wide by 44 pixels high.
                size: size ? size : new google.maps.Size(50, 44),
                // The origin for this image is (0, 0).
                origin: new google.maps.Point(0, 0)
                // The anchor for this image is the base of the flagpole at (0, 32).
                // anchor: new google.maps.Point(0, 32)
            };
            marker.setIcon(img);
        }
        if (label) {
            marker.set('labelContent', label);
            marker.set('labelAnchor', labelAnchor ? labelAnchor : new google.maps.Point((anchorX ? anchorX : (label.length * 16) / 2 + 12), (anchorY ? anchorY : 0)));
            marker.set('labelClass', className);
        }
        marker.set('unitId', unitId);
        return marker;
    }

    render() {
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

/**
 * Calcuate how many required resource had been sended
 */
const calcuateProgress = function (resources, sended) {
    // If any of resources or sended not assign, show zero.
    if (!resources || !sended) return 0;

    const requireRes = {};
    // Make required resources become global variable.
    Object.keys(resources).forEach(key => {
        requireRes[key] = {};
        requireRes[key].need = resources[key];
        requireRes[key].send = 0;
    });

    // Render all sended resources, if any of them shows in required resource, sum.
    sended.forEach(({ res }) => {
        Object.keys(res).forEach(key => {
            if (!requireRes[key]) return;
            const { send } = requireRes[key];
            requireRes[key].send = send + res[key];
        });
    })

    const resKeys = Object.keys(requireRes);
    const eachTypeMax = Math.round(100 / resKeys.length);
    let totalScoure = 0;
    resKeys.forEach(key => {
        const { need, send } = requireRes[key];
        const score = Math.round((send * eachTypeMax) / need);
        totalScoure += (score > eachTypeMax ? eachTypeMax : score);
    });

    return totalScoure;
}

export default createContainer(() => {
    const units = Meteor.subscribe('units');
    const characters = Meteor.subscribe('characters');
    const stages = Meteor.subscribe('stages');
    if (units.ready() && characters.ready() && stages.ready()) {
        let character = Characters.findOne({ userId: Meteor.userId() });
        if (character && character.act.length !== 0) {
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
            let curSituation = {};
            let progress = 0;
            if (unPassedStages) {
                const { situations } = unPassedStages;
                curSituation = situations.filter(obj => (obj.pass == false))[0];

                progress = calcuateProgress(curSituation.resources, curSituation.sended);
            }
            return {
                stage: unPassedStages,
                situation: curSituation,
                units: userActUnits,
                progress
            }
        }
    }
    return {
        stage: {},
        situation: {},
        units: [],
        progress: 0
    }
}, MainMap);
