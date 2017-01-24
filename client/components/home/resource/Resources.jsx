import React, { Component } from 'react';

class Resources extends Component {
    render() {
        return (
            <div className="resource">
                <div className="resource_L">
                    <img src="./images/119 icon.png" width="80" height="71" />
                    <p className="department">消防局</p>
                    <p className="unit">第三救災救護大隊</p>
                    <p className="unit">信義中隊</p>
                    <span className="badge Detachments_badge">信義分隊</span>
                </div>
                <div className="resource_R">
                    <ul className="resource_category">
                        <li><a href="active">車種 01</a></li>
                        <li><a href="#">車種 02</a></li>
                        <li><a href="#">機具 01</a></li>
                        <li><a href="#">機具 02</a></li>
                        <li><a href="#">人力資源</a></li>
                    </ul>
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
                    <div className="resource_items">
                        <div className="resource_item">
                            <img src="images/car_icon01.png" width="90px" height="70px" />
                            <p>x 250</p>
                            <div>
                                <button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                <input type="text" name="" id="" />
                                <button><span className="glyphicon glyphicon-chevron-right"></span></button>
                            </div>
                        </div>
                        <div className="resource_item">
                            <img src="images/car_icon01.png" width="90px" height="70px" />
                            <p>x 250</p>
                            <div>
                                <button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                <input type="text" name="" id="" />
                                <button><span className="glyphicon glyphicon-chevron-right"></span></button>
                            </div>
                        </div>
                        <div className="resource_item">
                            <img src="images/car_icon01.png" width="90px" height="70px" />
                            <p>x 250</p>
                            <div>
                                <button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                <input type="text" name="" id="" />
                                <button><span className="glyphicon glyphicon-chevron-right"></span></button>
                            </div>
                        </div>
                        <div className="resource_item">
                            <img src="images/car_icon01.png" width="90px" height="70px" />
                            <p>x 250</p>
                            <div>
                                <button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                <input type="text" name="" id="" />
                                <button><span className="glyphicon glyphicon-chevron-right"></span></button>
                            </div>
                        </div>
                        <div className="resource_item">
                            <img src="images/car_icon01.png" width="90px" height="70px" />
                            <p>x 250</p>
                            <div>
                                <button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                <input type="text" name="" id="" />
                                <button><span className="glyphicon glyphicon-chevron-right"></span></button>
                            </div>
                        </div>
                        <div className="resource_item">
                            <img src="images/car_icon01.png" width="90px" height="70px" />
                            <p>x 250</p>
                            <div>
                                <button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                <input type="text" name="" id="" />
                                <button><span className="glyphicon glyphicon-chevron-right"></span></button>
                            </div>
                        </div>

                        <div className="resource_item">
                            <img src="images/car_icon01.png" width="90px" height="70px" />
                            <p>x 250</p>
                            <div>
                                <button><span className="glyphicon glyphicon-chevron-left"></span></button>
                                <input type="text" name="" id="" />
                                <button><span className="glyphicon glyphicon-chevron-right"></span></button>
                            </div>
                        </div>
                        <div className="button_box ">
                            <button className="btn btn_XL btn-black ">確定</button>
                            <br />
                            <button className="btn btn_XL btn-black">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Resources;