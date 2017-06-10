import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Resource extends Component {

    constructor(props) {
        super(props);
        this.onAdd = this.onAdd.bind(this);
        this.onMinus = this.onMinus.bind(this);
    }

    onAdd() {
        let { selectStage, selectedSituation, id } = this.props;
        Meteor.call('situation.addResUse', selectStage, selectedSituation, id, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    onMinus() {
        let { selectStage, selectedSituation, id } = this.props;
        Meteor.call('situation.minusResUse', selectStage, selectedSituation, id, (err) => {
            if (err) {
                alert(err);
            }
        });
    }

    render() {
        let { name, avaliable, used, use } = this.props;
        return (
            <tr>
                <td>{name}</td>
                <td><input type="text" maxLength="3" readOnly value={avaliable - used} /></td>
                <td>
                    <button disabled={(used <= 0)} onClick={this.onMinus}><span className="glyphicon glyphicon-chevron-left"></span></button>
                    <input type="text" value={use} readOnly />
                    <button disabled={(avaliable <= 0)} onClick={this.onAdd}><span className="glyphicon glyphicon-chevron-right"></span></button>
                </td>
            </tr>
        );
    }
}

Resource.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avaliable: PropTypes.number.isRequired,
    used: PropTypes.number.isRequired,
    selectStage: PropTypes.string.isRequired,
    selectedSituation: PropTypes.string.isRequired,
    use: PropTypes.number,
    onAdd: PropTypes.func,
    onMinus: PropTypes.func
};

Resource.defaultProps = {
    used: 0,
    use: 0
};

export default Resource;