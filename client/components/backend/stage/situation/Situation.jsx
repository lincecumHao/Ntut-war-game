import React, { Component } from 'react';

class Situation extends Component {
    render() {
        return (
            <div className="situation-list">
                <button><span className="glyphicon glyphicon-minus"></span></button>
                <ul>

                    <li className="active"><a href="">狀況一</a></li>
                    <li><a href="">狀況二</a></li>
                    <li><a href="">狀況三</a></li>

                </ul>
                <button><span className="glyphicon glyphicon-plus"></span></button>
            </div>
        );
    }
}

export default Situation;