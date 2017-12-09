import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MessageContainer from '../home/chatroom/MessageContainer';

class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
    }

    render() {
        var border = {
            background: 'black'
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
                                    第一階段(災害發生初期階段)
                                </Col>
                            </Row>
                        </Row>
                        <Row className="padding-bottom height-30p">
                            <Row className="infobox">
                                <Col lg={2} md={2} xs={2} className="green text-center">
                                    災害位置
                                </Col>
                                <Col lg={10} md={10} xs={10} className="text-center">
                                    建安國小 台北市大安區基隆路四段43號
                                </Col>
                            </Row>
                        </Row>
                        <Row className="height-30p">
                            <Row className="infobox no-margin">
                                <Col lg={2} md={2} xs={2} className="green text-center">
                                    災害時間
                                </Col>
                                <Col lg={10} md={10} xs={10} className="text-center">
                                    89年8月30日 下午5時51分
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
                        <span>SOME DESELFJLEJLIELJFS</span>
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

                        <Row className="height-100p">TEST</Row>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default Dashboard;

// <Row className="height-100p msg-container">

// </Row>