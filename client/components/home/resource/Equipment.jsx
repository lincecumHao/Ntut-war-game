import React from 'react';
import PropTypes from 'prop-types';

const Equipment = ({id, img, current, count, updateCurrent, name}) => (
    <div className="resource_item">
        <img src={img+'.png'} width="90px" height="70px" alt={name} />
        <p>x {count - current}</p>
        <div>
            <button disabled={(current - 1 < 0 ? true : false)} onClick={() => { updateCurrent(id, -1) } }><span className="glyphicon glyphicon-chevron-left"></span></button>
            <input type="text" value={current} readOnly />
            <button disabled={(current + 1 > count ? true : false)} onClick={() => { updateCurrent(id, 1) } }><span className="glyphicon glyphicon-chevron-right"></span></button>
        </div>
    </div>
);

Equipment.propTypes = {
    id: PropTypes.string.isRequired,
    updateCurrent: PropTypes.func.isRequired,
    name: PropTypes.string, 
    img: PropTypes.string,
    count: PropTypes.number,
    current: PropTypes.number
};

Equipment.defaultProps = {
    name: 'test',
    img: './images/car_icon01.png',
    count: 211
};

export default Equipment;