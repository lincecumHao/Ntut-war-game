import React, { Component } from 'react';

class Disaster extends Component {
    render() {
        return (
            <div className="disaster-info">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>災害時間</td>
                            <td>
                                <label>
                                    <select name="select" id="select">
                                        <option>1234564684789489</option>
                                    </select>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>災害類型</td>
                            <td>
                                <label>
                                    <select name="select" id="select">
                                        <option>1234564684789489</option>
                                    </select>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>災害位置</td>
                            <td>
                                <label>
                                    <input type="text" name="" id="" placeholder="搜尋位置" />
                                    <div style={{ 'width': '350px', 'height': '250px', 'border': '1px solid red' }}>這邊放地圖</div>
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>災害狀況
                                <br />發生敘述</td>
                            <td>
                                <textarea name="" cols="" rows=""></textarea>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="3" style={{ 'paddingRight': '25px' }}>
                                <button className="btn btn-sm btn-black">演練開始&nbsp;<span className="glyphicon glyphicon-share-alt"></span></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Disaster;