import React, { Component } from 'react';

class Status extends Component {
    render() {
        return (
            <div className="status" data-step="5" data-position="bottom" data-intro='顯示災害演練階段，與災害狀況描述'>
                <p>演練階段:(災害發生初期階段)</p>
                <p>狀況發生:目前有地震發生，請依指示進行處理。</p>
            </div>
        );
    }
}

export default Status;