import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Datetime from 'react-datetime';

// 地標搜尋半徑(m)
const SEARCH_RADIUS = '500';

const propTypes = {
    selectStage: PropTypes.string.isRequired,
    selectedSituation: PropTypes.string.isRequired,
    disasters: PropTypes.array,
    situation: PropTypes.object
};

class DisasterContainer extends Component {
    constructor(props) {
        super(props);
        this.disasterMap = null;
        this.poiMarker = null;
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onTxtChange = this.onTxtChange.bind(this);
        this.onDatetimeChange = this.onDatetimeChange.bind(this);
        this.onTxtEnter = this.onTxtEnter.bind(this);
        this.onCommonChange = this.onCommonChange.bind(this);
        this.onSelectPoi = this.onSelectPoi.bind(this);
        this.searchPlacemark = this.searchPlacemark.bind(this);
        this.displayPoi = this.displayPoi.bind(this);
        this.createPoiMarker = this.createPoiMarker.bind(this);
        this.updSituation = this.updSituation.bind(this);
        
        this.state = {
            searchTxt: '',
            placemarks: [],
            selectPoi: '',
            common: ''
        }
    }

    componentDidMount() {
        this.disasterMap = new google.maps.Map(document.getElementById('disasterMap'), {
            center: { lat: 25.045552, lng: 121.531083 },
            zoom: 13,
            maxZoom: 18,
            minZoom: 12
        });
        window.disasterMap = this.disasterMap;
        
        if (this.props.situation.placemark) {
            this.createPoiMarker(this.props.situation.placemark);
        }

        if (this.props.situation.common) {
            this.setState({
                common: this.props.situation.common
            });
        }
    }

    searchPlacemark() {
        if (!this.state.searchTxt.length) return;
        let center = this.disasterMap.getCenter();
        let service = new google.maps.places.PlacesService(this.disasterMap);
        let req = {
            location: center,
            radius: SEARCH_RADIUS,
            query: this.state.searchTxt
        };
        service.textSearch(req, (results, status) => {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                this.setState({
                    placemarks: results
                });
            }
        });
    }

    onTxtChange(e) {
        this.setState({
            searchTxt: e.target.value
        });
    }

    onCommonChange(e) {
        this.setState({
            common: e.target.value
        });
        this.updSituation({
            common: e.target.value
        });
    }

    onTypeChange(e) {
        let { selectStage, selectedSituation } = this.props;
        Meteor.call('situation.changeType', selectStage, selectedSituation, e.target.value);
    }

    onTxtEnter(e) {
        if (e.key === 'Enter') {
            this.searchPlacemark();
        }
    }

    onSelectPoi(e) {
        this.setState({
            selectPoi: e.target.getAttribute('data'),
            placemarks: []
        });
        this.displayPoi(e.target.getAttribute('data'));
    }

    onDatetimeChange(momentObj){
        console.log(momentObj);
    }

    createPoiMarker(poi) {
        this.poiMarker = new google.maps.Marker({
            position: poi.geometry.location,
            map: this.disasterMap,
            title: poi.name
        });
        this.disasterMap.panTo(this.poiMarker.getPosition());

        // Set input as select name.
        this.setState({
            searchTxt: poi.name
        });
    }

    displayPoi(poiId) {
        let poi = this.state.placemarks.filter(poi => {
            return poiId === poi.id
        });
        if (poi) {
            poi = poi[0];
            if (this.poiMarker) {
                // If marker exist, remove it.
                this.poiMarker.setMap(null);
            }
            this.createPoiMarker(poi);

            // Save changes to db.
            this.updSituation({
                placemark: {
                    'geometry': { location: poi.geometry.location.toJSON() },
                    'name': poi.name
                }
            });
        }
    }

    updSituation(updProps) {
        let { selectStage, selectedSituation, situation } = this.props
        Meteor.call('situation.update', selectStage, selectedSituation, Object.assign({}, situation, updProps));
    }

    render() {
        let { disasters, situation } = this.props;
        let { placemarks, common } = this.state;
        return (
            <div className="disaster-info">
                <table>
                    <tbody>
                        <tr>
                            <td>災害時間</td>
                            <td>
                                <Datetime onChange={this.onDatetimeChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>災害類型</td>
                            <td>
                                <label>
                                    <select value={situation.type} onChange={this.onTypeChange}>
                                        <option disabled hidden>請選擇災害類型</option>
                                        {
                                            disasters.map(disaster => {
                                                return (
                                                    <option key={disaster._id} value={disaster._id}>{disaster.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>災害位置</td>
                            <td>
                                <div className="input-group" style={{zIndex: 0}}>
                                    <input type="text" className="form-control" placeholder="搜尋位置" value={this.state.searchTxt} onChange={this.onTxtChange} onKeyPress={this.onTxtEnter} />
                                    <span className="input-group-btn">
                                        <button className="btn btn-secondary" type="button" onClick={this.searchPlacemark}>查詢</button>
                                    </span>
                                </div>
                                <div className="suggest-poi">
                                    <ul className="list-group">
                                        {
                                            placemarks.map(poi => {
                                                let cls = classNames({
                                                    'list-group-item': true,
                                                    'active': (this.state.selectPoi === poi.id)
                                                })
                                                return (
                                                    <li
                                                        className={cls}
                                                        key={poi.id}
                                                        data={poi.id}
                                                        onClick={this.onSelectPoi}>
                                                        {poi.name}
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div id="disasterMap" style={{ 'width': '350px', 'height': '250px', 'border': '1px solid red' }}></div>
                            </td>
                        </tr>
                        <tr>
                            <td>災害狀況
                                <br />發生敘述</td>
                            <td>
                                <textarea value={common} onChange={this.onCommonChange}></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

DisasterContainer.propTypes = propTypes;

export default DisasterContainer;