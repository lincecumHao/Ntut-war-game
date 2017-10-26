import React from 'react';
import PropTypes from 'prop-types';

const Depart = ({ img, depart, brigade, group, crew, goPrev, goNext}) => (
    <div className="resource_L">
        <div>
            <div className="arrow-left" style={{cursor: 'pointer'}} onClick={goPrev}></div>
            <img src={img} width="80" height="71" />
            <div className="arrow-right" style={{cursor: 'pointer'}} onClick={goNext}></div>
        </div>
        <p className="department">{depart}</p>
        <p className="unit">{brigade}</p>
        <p className="unit">{group}</p>
        <span className="badge Detachments_badge">{crew}</span>
    </div>
);

Depart.propTypes = {
    img: PropTypes.string,
    depart: PropTypes.string.isRequired,
    brigade: PropTypes.string,
    group: PropTypes.string,
    crew: PropTypes.string.isRequired,
    goPrev: PropTypes.func.isRequired,
    goNext: PropTypes.func.isRequired
};

Depart.defaultProps = {
    img: './images/119 icon.png',
    brigade: '',
    group: ''
};

export default Depart;