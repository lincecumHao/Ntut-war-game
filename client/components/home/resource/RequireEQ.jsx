import React, { Component } from 'react';

class RequireEQ extends Component {
    constructor(props) {
        super(props);
        this.switchOpenEq = this.switchOpenEq.bind(this);
        this.state = {
            isOpen: false
        }
    }

    switchOpenEq() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    
    render() {
        let eqBoxStyle = {
            visibility: (this.state.isOpen ? 'visible' : 'hidden')
        }
        return (
            <div className="Requiredbox pull-right">
                <div className="Required" style={eqBoxStyle}>
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
                <span className="triangle_icon" style={eqBoxStyle}></span>
                <span onClick={this.switchOpenEq} className="glyphicon glyphicon-exclamation-sign" data-step="6" data-position="top" data-intro='提醒使用者每項災害需要裝備資源的種類，點一下提醒即跳出'></span>
            </div>
        );
    }
}

export default RequireEQ;