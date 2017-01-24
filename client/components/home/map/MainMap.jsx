import React, { Component } from 'react';

class MainMap extends Component {
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