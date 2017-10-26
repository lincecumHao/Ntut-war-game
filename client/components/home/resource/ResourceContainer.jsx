import React, { Component } from 'react';
import DepartContainer from './DepartContainer.jsx';
import RequireEQ from './RequireEQ.jsx';
import Equipment from './Equipment.jsx';
import update from 'react-addons-update';

class ResourceContainer extends Component {
    constructor(props) {
        super(props);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.state = {
            eqs: [{
                id: '1',
                count: 5,
                current: 0
            }, {
                id: '2',
                count: 6,
                current: 0
            }, {
                id: '3',
                count: 7,
                current: 0
            }, {
                id: '4',
                count: 8,
                current: 0
            }, {
                id: '5',
                count: 9,
                current: 0
            }]
        }
    }

    updateCurrent(id, value) {
        let updatedEqs = this.state.eqs.map(eq => {
            if(eq.id === id){
                return update(eq, {current: {$set: eq.current + value}});
            }else{
                return eq
            }
        });
        this.setState({
            eqs: updatedEqs
        });
    }

    render() {
        return (
            <div className="resource">
                <DepartContainer />
                <div className="resource_R">
                    <ul className="resource_category">
                        <li><a href="active">車種 01</a></li>
                        <li><a href="#">車種 02</a></li>
                        <li><a href="#">機具 01</a></li>
                        <li><a href="#">機具 02</a></li>
                        <li><a href="#">人力資源</a></li>
                    </ul>
                    <RequireEQ />
                    <div className="resource_items">
                        {
                            this.state.eqs.map(eq => {
                                return (
                                    <Equipment
                                        key={eq.id}
                                        id={eq.id}
                                        count={eq.count}
                                        current={eq.current}
                                        updateCurrent={this.updateCurrent}
                                    />
                                )
                            })
                        }
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

export default ResourceContainer;