import React, { PropTypes } from 'react';

const Resource = ({ name, avaliable, use, onAdd, onMinus }) => (
    <tr>
        <td>{name}</td>
        <td><input type="text" maxLength="3" readOnly value={avaliable} /></td>
        <td>
            <button onClick={onMinus}><span className="glyphicon glyphicon-chevron-left"></span></button>
            <input type="text" value={use} />
            <button onClick={onAdd}><span className="glyphicon glyphicon-chevron-right"></span></button>
        </td>
    </tr>
);

Resource.propTypes = {
    name: PropTypes.string.isRequired,
    avaliable: PropTypes.number.isRequired,
    use: PropTypes.number,
    onAdd: PropTypes.func,
    onMinus: PropTypes.func
};

Resource.defaultProps = {
    use: 0
};

export default Resource;