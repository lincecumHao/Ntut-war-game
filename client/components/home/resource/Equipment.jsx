import React from 'react';
import PropTypes from 'prop-types';

const Equipment = ({ id, img, used, avaliable, leftRes, onUnitAdj, name }) => (
    <div className="resource_item">
        <img title={name} src={`images/icon/${id} ${name}.jpg`} alt={name} />
        <p>x {used}</p>
        <div>
            <button disabled={(leftRes == avaliable)} onClick={() => { onUnitAdj(id, (used - 1 < 0 ? 0 : used - 1)) }}><span className="glyphicon glyphicon-chevron-left"></span></button>
            <input type="text" value={avaliable - used} readOnly />
            <button disabled={(leftRes == 0)} onClick={() => { onUnitAdj(id, (used + 1 < avaliable ? used + 1 : avaliable)) }}><span className="glyphicon glyphicon-chevron-right"></span></button>
        </div>
    </div>
);

Equipment.propTypes = {
    id: PropTypes.string.isRequired,
    onUnitAdj: PropTypes.func.isRequired,
    name: PropTypes.string,
    img: PropTypes.string,
    used: PropTypes.number,
    avaliable: PropTypes.number,
    leftRes: PropTypes.number
};

Equipment.defaultProps = {
    name: 'test',
    img: './images/car_icon01.png',
    used: 0,
    avaliable: 0,
    leftRes: 0
};

export default Equipment;