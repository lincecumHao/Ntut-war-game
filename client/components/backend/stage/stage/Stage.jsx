import React from 'react';

const Stage = ({ index }) => (
    <li><a href="#">演練第{index}階段</a></li>
);

Stage.propTypes = {
    index: React.PropTypes.number.isRequired
};

export default Stage;