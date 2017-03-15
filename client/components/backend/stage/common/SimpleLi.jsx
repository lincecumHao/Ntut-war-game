import React, { PropTypes } from 'react';

const SimpleLi = ({ id, text, onSelect, selectId }) => (
    <li onClick={() => { onSelect(id) }} className={(selectId == id ? 'active' : '')}><a>{text}</a></li>
);

SimpleLi.propTypes = {
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onSelect: PropTypes.func,
    selectId: PropTypes.string
};

export default SimpleLi;