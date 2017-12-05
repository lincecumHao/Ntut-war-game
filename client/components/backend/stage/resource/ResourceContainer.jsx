import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Resource from './Resource.jsx';
import ResourceTypeList from './ResourceTypeList.jsx';

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
        let { resources, resTypes, usedCount, curRes, selectedSituation, selectStage } = this.props;
        let { selectRes } = this.state;
        let filteredRes = resources.filter(res => {
            return res.type === selectRes
        });

        // Set used value.
        filteredRes.map((res, index) => {
            if (usedCount[res.id]) {
                filteredRes[index].used = usedCount[res.id];
            }
        });
        return (
            <div className="resource-req">
                <div className="resource-req_top">資源設定</div>
                <div className="resource-req_main">
                    <div className="resource-req_left">
                        <ResourceTypeList
                            resTypes={resTypes}
                            selectRes={selectRes}
                            onResSelected={this.onResSelected}
                        />
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
                                                key={res.id}
                                                id={res.id}
                                                name={res.name}
                                                avaliable={res.avaliable}
                                                used={res.used}
                                                use={curRes[res.id]}
                                                selectStage={selectStage}
                                                selectedSituation={selectedSituation}
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

ResourceContainer.propTypes = {
    selectStage: PropTypes.string.isRequired,
    selectedSituation: PropTypes.string.isRequired,
    resources: PropTypes.array,
    resTypes: PropTypes.array,
    usedCount: PropTypes.object,
    curRes: PropTypes.object
};

ResourceContainer.defaultProps = {
    resources: [],
    resTypes: [],
    usedCount: {},
    curRes: {}
}

export default ResourceContainer;