import React, { Component } from 'react';

class Charact extends Component {
    render() {
        return (
            <div className="charact_set">
                <h3>台北市政府消防局</h3>
                <ul className="charact_tab">
                    <li className="active"><a href="">玩家 A</a></li>
                    <li><a href="#">玩家 B</a></li>
                    <li><a href="#">玩家 C</a></li>
                    <li><a href="#">玩家 D</a></li>
                    <li><a href="#">玩家 E</a></li>
                </ul>
                <div className="res-dashboard">
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h3><input type="radio" value="" />第一救災救護大隊</h3>
                                    <ul className="brigade">
                                        <li>
                                            <input type="radio" value="" />大安中隊
                                        <ul>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="brigade">
                                        <li>
                                            <input type="radio" value="" />大安中隊
                                        <ul>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <ul className="brigade">
                                        <li>
                                            <input type="radio" value="" />大安中隊
                                        <ul>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <h3><input type="radio" value="" />第二救災救護大隊</h3>
                                    <ul className="brigade">
                                        <li>
                                            <input type="radio" value="" />大安中隊
                                        <ul>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <h3><input type="radio" value="" />第三救災救護大隊</h3>
                                    <ul className="brigade">
                                        <li>
                                            <input type="radio" value="" />大安中隊
                                        <ul>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <h3><input type="radio" value="" />第四救災救護大隊</h3>
                                    <ul className="brigade">
                                        <li>
                                            <input type="radio" value="" />大安中隊
                                        <ul>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                                <li>
                                                    <input type="radio" value="" />大安分隊</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ 'width': '300px', 'margin': '0 auto' }}>
                    <button className="btn btn-sm btn-black pull-left "><span className="glyphicon glyphicon-ok"></span>&nbsp;確定</button>
                    <button className="btn btn-sm btn-black pull-right "><span className="glyphicon glyphicon-refresh"></span>&nbsp;重設</button>
                </div>
            </div>
        );
    }
}

export default Charact;