import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Equipment from './Equipment.jsx';

class EquipmentContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.isEqsOverContainer = this.isEqsOverContainer.bind(this);
        this.getContainerWidrh = this.getContainerWidrh.bind(this);
        this.onShowRangChange = this.onShowRangChange.bind(this);
        this.state = {
            showRange: 0
        }
    }
    
    componentWillReceiveProps() {
        this.setState({showRange: 0});
    }

    onShowRangChange(index) {
        const { showRange } = this.state;
        if (index + showRange < 0) index = 0;
        this.setState({ showRange: showRange + index });
    }

    isEqsOverContainer() {
        const arrwoWidth = 15;
        const eachResourceW = 105;
        const leftW = this.getContainerWidrh();
        const { equipments } = this.props;
        return leftW - (eachResourceW * equipments.length) < (arrwoWidth * 2 + 5);
    }

    getContainerWidrh() {
        return (this.itemContainer ? this.itemContainer.offsetWidth : 100);
    }

    render() {
        const { showRange } = this.state;
        const { equipments } = this.props;
        let maxShowItemCount = 0;
        let maxIndex = 0;
        let minIndex = 0;
        let cursorStyle = { cursor: 'pointer' };
        if (this.isEqsOverContainer()) {
            maxShowItemCount = Math.floor(this.getContainerWidrh() / 105);
            maxIndex = maxShowItemCount + showRange;
            minIndex = showRange;
            if ((maxIndex - 1) > equipments.length) maxIndex = equipments.length;
            if (minIndex > (equipments.length - 2)) minIndex = equipments.length - 2;
        }
        return (
            <div>
                {this.isEqsOverContainer() ? <div className="arrow_container" onClick={() => { this.onShowRangChange(-1) }}><div className="arrow-left" style={cursorStyle}></div></div> : ''}
                <div style={{ height: '125px', display: 'inline-flex', width: 'calc(100% - 15px)' }}  ref={input => { this.itemContainer = input }}>
                    {
                        equipments.map((res, index) => {
                            if (this.isEqsOverContainer() && (index < minIndex || index >= maxIndex)) return;
                            res.used = res.used ? res.used : 0;
                            return (
                                <Equipment
                                    key={res.id}
                                    id={res.id}
                                    name={res.name}
                                    used={res.used}
                                    avaliable={res.avaliable}
                                    leftRes={res.avaliable - res.used}
                                    onUnitAdj={this.props.onUnitAdj}
                                />
                            )
                        })
                    }
                </div>
                {this.isEqsOverContainer() ? <div className="arrow_container" onClick={() => { this.onShowRangChange(1) }}> <div className="arrow-right" style={cursorStyle}></div></div> : ''}

            </div>
        );
    }
}

EquipmentContainer.propTypes = {
    onUnitAdj: PropTypes.func.isRequired,
    equipments: PropTypes.array
};

EquipmentContainer.defaultProps = {
    equipments: []
};

export default EquipmentContainer;