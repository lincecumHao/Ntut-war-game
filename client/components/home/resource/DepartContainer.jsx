import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Depart from './Depart';

class DepartContainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.goNext = this.goNext.bind(this);
        this.goPrev = this.goPrev.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.depart._id !== this.props.depart._id
    }
    
    goPrev() {
        this.props.onDepartChange(-1);
    }

    goNext() {
        this.props.onDepartChange(1);
    }

    render() {
        const { depart } = this.props;
        if (depart._id) {
            return (
                <Depart
                    depart={depart.depart}
                    brigade={depart.brigade}
                    group={depart.group}
                    crew={depart.crew}
                    goNext={(this.goNext)}
                    goPrev={this.goPrev}
                />
            );
        } else {
            return <div className="resource_L">請先至後台設定該人物腳色</div>;
        }

    }
}

DepartContainer.propTypes = {
    depart: PropTypes.object,
    onDepartChange: PropTypes.func.isRequired
};

DepartContainer.defaultProps = {
    depart: {}
}

export default DepartContainer;
