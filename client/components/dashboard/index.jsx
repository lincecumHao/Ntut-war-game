import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { createContainer } from 'meteor/react-meteor-data';
import Pie from './Pie';
import ReactDOM from 'react-dom';
import { Stages } from '../../../imports/collections/stages.js';
import { Units } from '../../../imports/collections/units.js';
import MessageContainer from '../home/chatroom/MessageContainer';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.dbMap = null;
        this.dissasterMarker = null;
        this.createMarker = this.createMarker.bind(this);
        this.getPieChartWidth = this.getPieChartWidth.bind(this);
        this.timer = null;
        this.state = {
            page: 1
        };
    }

    componentDidMount() {
        MarkerWithLabel = require('markerwithlabel')(google.maps);
        this.dbMap = new google.maps.Map(document.getElementById('dashboard-map'), {
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
        window.dbMap = this.dbMap;

        // Update pieChart every 3 second.
        this.timer = setInterval(() => {
            const maxPage = Math.ceil(Object.keys(this.props.allResourceUseage).length / 8);
            this.setState({
                page: this.state.page + 1 > maxPage ? 1 : this.state.page + 1
            });
        }, 5000)
    }

    componentWillReceiveProps(nextProps) {
        const { stage, situationIndex, geometry } = nextProps;
        if (stage !== this.props.stage && situationIndex !== this.props.situationIndex) {
            if (this.dissasterMarker) {
                this.dissasterMarker.setMap(null);
                this.dissasterMarker = null;
            }
            if (geometry) {
                const { geometry: { location } } = geometry;
                this.dissasterMarker = this.createMarker({
                    lat: location.lat,
                    lng: location.lng,
                    icon: 'images/earthquake_50_44.png',
                    labelAnchor: new google.maps.Point(40, 0)
                });
                this.dbMap.panTo(location);
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    createMarker({ lat, lng, icon, label, className, anchorX, anchorY, unitId, size, labelAnchor }) {
        let marker = new MarkerWithLabel({
            position: { lat, lng },
            draggable: false,
            map: this.dbMap
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

    getPieChartWidth() {
        const div = ReactDOM.findDOMNode(this.piechartContainer);
        return div ? div.offsetWidth / 4 - 30 : 100;
    }

    generatePieArray() {
        const retAry = {
            upper: [],
            lower: []
        };
        const { allResourceUseage } = this.props;
        const { page } = this.state;
        const width = this.getPieChartWidth();
        Object.keys(allResourceUseage).forEach((key, index) => {
            const useage = allResourceUseage[key];
            if (index >= 8 * page - 8 && index < 8 * page) {
                const pie = (
                    <Col key={key} lg={3} md={3} xs={3} style={{ textAlign: 'center', height: '80%' }}>
                        <Pie
                            width={width}
                            avaliable={useage.avaliable}
                            used={useage.used}
                        />
                        {useage.name}
                    </Col>
                );
                if (index >= (8 * page - 8) && index < 8 * page - 4) {
                    retAry.upper.push(pie);
                } else if (index >= (8 * page - 4) && index < 8 * page) {
                    retAry.lower.push(pie);
                }
            }
        });
        return retAry;
    }

    render() {
        const { time } = this.props;
        const pieAry = this.generatePieArray();
        let dateStr = '';
        if (time) {
            dateStr = `民國${time.getFullYear() - 1911}年${time.getMonth() + 1}月${time.getDate()}日 ${time.getHours()}時${time.getMinutes()}分`
        }
        return (
            <Grid className="dashborad">
                <Row className="height-30">
                    <Col className="height-100p" lg={7} md={7} xs={7}>
                        <Row className="padding-bottom height-30p">
                            <Row className="infobox">
                                <Col lg={2} md={2} xs={2} className="green text-center">
                                    演練階段
                                </Col>
                                <Col lg={10} md={10} xs={10} className="text-center">
                                    第{this.props.stage + 1}階段(災害發生初期階段)
                                </Col>
                            </Row>
                        </Row>
                        <Row className="padding-bottom height-30p">
                            <Row className="infobox">
                                <Col lg={2} md={2} xs={2} className="green text-center">
                                    災害位置
                                </Col>
                                <Col lg={10} md={10} xs={10} className="text-center">
                                    {this.props.placemark}
                                </Col>
                            </Row>
                        </Row>
                        <Row className="height-30p">
                            <Row className="infobox no-margin">
                                <Col lg={2} md={2} xs={2} className="green text-center">
                                    災害時間
                                </Col>
                                <Col lg={10} md={10} xs={10} className="text-center">
                                    {dateStr}
                                </Col>
                            </Row>
                        </Row>
                    </Col>
                    <Col lg={5} md={5} xs={5} className="map no-padding-right">
                        <div className="infobox map" id="dashboard-map">
                            MAP
                        </div>
                    </Col>
                </Row>
                <Row className="height-15 infobox">
                    <Col lg={1} md={1} xs={1} className="green text-center">
                        <span>災害狀況</span>
                    </Col>
                    <Col lg={11} md={11} xs={11} className="text-center">
                        <span>{this.props.situation}</span>
                    </Col>
                </Row>
                <Row className="height-55">
                    <Col className="no-padding-left height-100p" lg={4} md={4} xs={4}>
                        <div className="infobox height-100p chatroom">
                            <Row className="title">聊天紀錄</Row>
                            <MessageContainer />

                        </div>
                    </Col>
                    <Col lg={8} md={8} xs={8} className="infobox chartable">
                        <Row className="title">單位資源裝備 消耗數量 / 剩餘數量</Row>
                        <Row className="height-100p" ref={input => { this.piechartContainer = input }}>
                            <Row style={{ height: '50%', margin: '0' }}>
                                {pieAry.upper}
                            </Row>
                            <Row style={{ height: '50%', margin: '0' }}>
                                {pieAry.lower}
                            </Row>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default createContainer(() => {
    let stages = Meteor.subscribe('stages');
    let units = Meteor.subscribe('units');
    if (stages.ready() && units.ready()) {
        // Get all unit resources count.
        const allResourceUseage = {};
        const allUnits = Units.find({}).fetch();
        allUnits.forEach(unit => {
            if (unit.resources) {
                unit.resources.forEach(res => {
                    if (allResourceUseage[res.id]) {
                        allResourceUseage[res.id].avaliable = res.avaliable + allResourceUseage[res.id].avaliable;
                    } else {
                        allResourceUseage[res.id] = {};
                        allResourceUseage[res.id].name = res.name;
                        allResourceUseage[res.id].avaliable = res.avaliable;
                        allResourceUseage[res.id].used = 0;
                    }
                });
            }
        });

        const allStages = Stages.find({}).fetch();
        allStages.forEach(stage => {
            if (stage.situations) {
                stage.situations.forEach(situation => {
                    if (situation.sended) {
                        situation.sended.forEach(({ res }) => {
                            Object.keys(res).forEach(resId => {
                                if (allResourceUseage[resId]) {
                                    if (allResourceUseage[resId].used) {
                                        allResourceUseage[resId].used += res[resId];
                                    } else {
                                        allResourceUseage[resId].used = res[resId];
                                    }
                                }
                            })
                        })
                    }
                });
            }
        });

        const unPassedStages = Stages.findOne({ 'situations.pass': false }, { sort: { index: 1, 'situations.index': 1 }, limit: 1 });
        if (unPassedStages) {
            const { index, situations } = unPassedStages;
            const curSituation = situations.filter(obj => (obj.pass == false))[0];
            return {
                allResourceUseage,
                stage: index,
                situationIndex: curSituation.index,
                situation: curSituation.common,
                placemark: curSituation.placemark ? curSituation.placemark.name : '',
                geometry: curSituation.placemark,
                time: curSituation.time
            }
        }

        return { allResourceUseage };
    }
    return { allResourceUseage: {} };
}, Dashboard);
