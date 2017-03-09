import React, { Component } from 'react';

class Resource extends Component {
    render() {
        return (
            <div className="resource-req">
                <div className="resource-req_top">資源設定</div>
                <div className="resource-req_main">
                    <div className="resource-req_left">
                        <ul>
                            <li className="active"><a href="">車種01</a></li>
                            <li><a href="">車種02</a></li>
                            <li><a href="">機具01</a></li>
                            <li><a href="">機具02</a></li>
                            <li><a href="">人力資源</a></li>
                        </ul>
                    </div>
                    <div className="resource-req_right">
                        <table>
                            <tbody>
                                <tr>
                                    <th>資源種類</th>
                                    <th>資源總數量</th>
                                    <th>資源設定數量</th>
                                </tr>
                                <tr>
                                    <td>消防車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>警備車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>救護車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>大型工程車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>小型工程車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>裝鏟車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>大型垃圾車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>小型垃圾車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>資源回收車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>吊車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                                <tr>
                                    <td>升空車</td>
                                    <td><input type="text" maxLength="3" /></td>
                                    <td><button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                        <input type="text" />
                                        <button><span className="glyphicon glyphicon-chevron-right"></span></button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ 'width': '300px', 'margin': '10px' }}>
                        <button className="btn btn-sm btn-black pull-left "><span className="glyphicon glyphicon-ok"></span>&nbsp;確定</button>
                        <button className="btn btn-sm btn-black pull-right "><span className="glyphicon glyphicon-refresh"></span>&nbsp;重設</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Resource;