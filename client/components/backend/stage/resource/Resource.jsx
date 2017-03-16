import React, { Component, PropTypes } from 'react';

class Resource extends Component {

    constructor(props) {
        super(props);
        this.onAdd = this.onAdd.bind(this);
        this.onMinus = this.onMinus.bind(this);
    }

    onAdd() {

    }

    onMinus() {
        
    }
    
    render() {
        let { name, avaliable, used, use, onAdd, onMinus } = this.props;
        return (
            <tr>
                <td>{name}</td>
                <td><input type="text" maxLength="3" readOnly value={avaliable - used} /></td>
                <td>
                    <button disabled={(used <= 0)} onClick={onMinus}><span className="glyphicon glyphicon-chevron-left"></span></button>
                    <input type="text" value={use} readOnly />
                    <button disabled={(avaliable <= 0)} onClick={onAdd}><span className="glyphicon glyphicon-chevron-right"></span></button>
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
    use: PropTypes.number,
    onAdd: PropTypes.func,
    onMinus: PropTypes.func
};

Resource.defaultProps = {
    used: 0,
    use: 0
};

export default Resource;