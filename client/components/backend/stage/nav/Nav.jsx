import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return (
            <div className="stage-list">
                <ul className="charact_tab">
                    <button className="pull-left"><span className="glyphicon glyphicon-minus"></span></button>
                    <li className="active"><a href="">演練第一階段</a></li>
                    <li><a href="#">演練第二階段</a></li>
                    <li><a href="#">演練第三階段</a></li>
                    <li><a href="#">演練第四階段</a></li>
                    <li><a href="#">演練第五階段</a></li>
                    <button className=""><span className="glyphicon glyphicon-plus"></span></button>
                </ul>
            </div>
        );
    }
}

export default Nav;