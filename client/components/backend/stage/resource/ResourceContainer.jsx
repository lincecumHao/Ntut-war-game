import React, { Component } from 'react';
import { Resources } from '../../../../../imports/collections/resources';
import { createContainer } from 'meteor/react-meteor-data';
import SimpleLi from '../common/SimpleLi.jsx';
import Resource from './Resource.jsx';

class ResourceContainer extends Component {
    constructor(props) {
        super(props);
        this.onResSelected = this.onResSelected.bind(this);
        this.state = {
            selectRes: ''
        }
    }

    onResSelected(selectRes) {
        this.setState({
            selectRes
        });
    }

    render() {
        let { resources, resTypes } = this.props;
        let { selectRes } = this.state;
        let filteredRes = resources.filter(res => {
            return res.abbr === selectRes
        });

        //TODO: keep working on resource list.
        return (
            <div className="resource-req">
                <div className="resource-req_top">資源設定</div>
                <div className="resource-req_main">
                    <div className="resource-req_left">
                        <ul>
                            {
                                resTypes.map((type, index) => {
                                    return (
                                        <SimpleLi
                                            key={index}
                                            id={type}
                                            text={type}
                                            onSelect={this.onResSelected}
                                            selectId={selectRes}
                                        />
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="resource-req_right">
                        <table>
                            <thead>
                                <tr>
                                    <th>資源種類</th>
                                    <th>資源總數量</th>
                                    <th>資源設定數量</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredRes.map(res => {
                                        return (
                                            <Resource
                                                key={res._id}
                                                name={res.name}
                                                avaliable={100}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div style={{ 'width': '300px', 'margin': '10px' }}>
                        <button className="btn btn-sm btn-black pull-right "><span className="glyphicon glyphicon-refresh"></span>&nbsp;重設</button>
                    </div>
                </div>
            </div>
        );
    }
}


export default createContainer((props) => {
    const resource = Meteor.subscribe('resources');
    const loadingResources = !resource.ready();
    let resources = [];
    let resTypes = [];
    if (!loadingResources) {
        resources = Resources.find({}).fetch();
        resources.map(res => {
            if (resTypes.indexOf(res.abbr) == -1) {
                resTypes.push(res.abbr);
            }
        })
    }
    return {
        loadingResources, resources, resTypes
    }
}, ResourceContainer);