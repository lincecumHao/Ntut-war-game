import React, { Component } from 'react';

class EagleMap extends Component {
    constructor(props) {
        super(props);
        this.eagleMap = null;    
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
        window.eagleMap = this.eagleMap;
    }
    
    render() {
        return (
            <div className="eagle_map" id="eagle_map">
                鷹眼圖
            </div>
        );
    }
}

export default EagleMap;