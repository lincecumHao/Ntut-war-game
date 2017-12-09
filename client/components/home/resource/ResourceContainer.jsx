import React, { Component } from 'react';
import DepartContainer from './DepartContainer.jsx';
import RequireEQ from './RequireEQ.jsx';
import Equipment from './Equipment.jsx';
import CategoryContainer from './CategoryContainer.jsx';
import update from 'react-addons-update';

class ResourceContainer extends Component {
    constructor(props) {
        super(props);
        this.updateCurrent = this.updateCurrent.bind(this);
        this.onDepartChange = this.onDepartChange.bind(this);
        this.onCategoryChange = this.onCategoryChange.bind(this);
        this.showArrow = this.showArrow.bind(this);
        this.onShowRangChange = this.onShowRangChange.bind(this);
        this.getLeftW = this.getLeftW.bind(this);
        this.state = {
            depart: { resources: [] },
            category: '人員'
        }
    }

    updateCurrent(id, value) {
        let updatedEqs = this.state.eqs.map(eq => {
            if (eq.id === id) {
                return update(eq, { current: { $set: eq.current + value } });
            } else {
                return eq
            }
        });
        this.setState({
            eqs: updatedEqs
        });
    }

    onDepartChange(depart) {
        this.setState({ depart, showArrow: this.showArrow(depart.resources, this.state.category), showRange: 0 });
    }

    onCategoryChange(category) {
        this.setState({ category, showArrow: this.showArrow(this.state.depart.resources, category), showRange: 0 });
    }

    onShowRangChange(index) {
        const { showRange } = this.state;
        if (index + showRange < 0) index = 0;
        this.setState({ showRange: showRange + index });
    }

    showArrow(res, cat) {
        const arrowW = 15;
        const eachResourceW = 105;
        const leftW = this.getLeftW();
        const match = res.filter(res => (res.type === cat));
        return leftW - (eachResourceW * match.length) < (arrowW * 2 + 5);
    }

    getLeftW() {
        const btnBoxW = 74;
        const arrowW = 15;
        return this.myInput.offsetWidth - btnBoxW - (arrowW * 2);
    }

    render() {
        const { depart, category, showArrow, showRange } = this.state;
        let resources = [];
        if (depart) resources = depart.resources;
        const selectedRes = resources.filter(res => (res.type === category));
        let cursorStyle = { cursor: 'pointer' };
        let maxShowItemCount = 0;
        let maxIndex = 0;
        let minIndex = 0;
        if (showArrow) {
            maxShowItemCount = Math.floor(this.getLeftW() / 105);
            maxIndex = maxShowItemCount + showRange;
            minIndex = showRange;
            if((maxIndex - 1) > selectedRes.length) maxIndex = selectedRes.length;
            if(minIndex > (selectedRes.length - 2)) minIndex = selectedRes.length - 2;
        }
        return (
            <div className="resource">
                <DepartContainer onDepartChange={this.onDepartChange} />
                <div className="resource_R">
                    <CategoryContainer
                        selected={category}
                        onChange={this.onCategoryChange}
                    />
                    <RequireEQ />
                    <div className="resource_items" ref={input => { this.myInput = input }}>
                        {showArrow ? <div className="arrow-left" style={cursorStyle} onClick={() => { this.onShowRangChange(-1) }}></div> : ''}
                        <div style={{ height: '125px', display: 'inline-flex', width: 'calc(100% - 110px)' }}>
                            {
                                selectedRes.map((res, index) => {
                                    if (showArrow && (index < minIndex || index >= maxIndex)) return;
                                    return (
                                        <Equipment
                                            key={res.id}
                                            id={res.id}
                                            name={res.name}
                                            count={res.avaliable}
                                            current={res.avaliable}
                                            updateCurrent={() => { }}
                                        />
                                    )
                                })
                            }
                        </div>
                        {showArrow ? <div className="arrow-right" style={cursorStyle} onClick={() => { this.onShowRangChange(1) }}></div> : ''}
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