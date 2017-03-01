import React, { Component } from 'react';

class ManPower extends Component {
    render() {
        return (
            <div className="manpower_req">
                <div className="Cur-users">登入總人數<span className="badge">530</span>人 &nbsp;
                    <button className="btn btn-sm btn-black"><span className="glyphicon glyphicon-refresh"></span></button>
                </div>
                <table className="Manpower-list">
                    <tbody>
                        <tr>
                            <th colSpan="2">單位</th>
                            <th colSpan="2">登入人數</th>
                            <th>已設定人數</th>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>秘書處</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>北水處</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>衛生局</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>環保局</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>翡管局</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>消防局</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>交通局</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>都發局</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>研考會</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                        <tr>
                            <td>
                                <input name="" type="radio" value="" />
                            </td>
                            <td>中華電信
                            <br />北區分公司</td>
                            <td>
                                <input name="" type="checkbox" value="" />
                            </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人
                        </td>
                            <td>
                                <input type="text" id="" maxLength="3" />人</td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-sm btn-black pull-right "><span className="glyphicon glyphicon-ok"></span>&nbsp;完成設定</button>
            </div>
        );
    }
}

export default ManPower;