import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Nowuser from  './CurrentUsers.jsx';

class ManPower extends Component {
    render() {
        let {onlineUsers} = this.props;
        return (
            <div className="manpower_req">
                <Nowuser count={onlineUsers}/>
                
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

export default createContainer(() => {
    const users = Meteor.subscribe('userStatus');
    const loading = !users.ready();
    return {
        onlineUsers: Meteor.users.find({'status.online': true }).fetch().length,
        loading
    }
}, ManPower);