import React, { Component } from 'react';

class RequireEQ extends Component {
    render() {
        return (
            <div className="Requiredbox pull-right">
                <div className="Required">
                    <h3>所需裝備支援為:</h3>
                    <ul>
                        <li>消防車</li>
                        <li>救護車</li>
                        <li>昇空車</li>
                        <li>無線對講機</li>
                        <li>電鑽</li>
                        <li>锯子</li>
                        <li>可動員人數</li>
                        <li>可動員人數</li>
                        <li>可動員人數</li>
                    </ul>
                </div>
                <span className="triangle_icon"></span>
                <span className="glyphicon glyphicon-exclamation-sign"></span>
            </div>
        );
    }
}

export default RequireEQ;