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
            <div
                className="eagle_map"
                id="eagle_map"
                data-step="4"
                data-position="bottom"
                data-intro='顯示台北市災害位置，有災害同步事件時可於小地圖上快速找到位置，並隨著中央地圖畫面來縮放比例'>
                鷹眼圖
            </div>
        );
    }
}

export default EagleMap;