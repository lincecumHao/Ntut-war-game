import React, { PropTypes } from 'react';

const Depart = ({ img, depart, brigade, group, crew}) => (
    <div className="resource_L">
        <img src={img} width="80" height="71" />
        <p className="department">{depart}</p>
        <p className="unit">{brigade}</p>
        <p className="unit">{group}</p>
        <span className="badge Detachments_badge">{crew}</span>
    </div>
);

Depart.propTypes = {
    img: PropTypes.string,
    depart: PropTypes.string,
    brigade: PropTypes.string,
    group: PropTypes.string,
    crew: PropTypes.string
};

Depart.defaultProps = {
    img: './images/119 icon.png',
    depart: '消防局',
    brigade: '第三救災救護大隊',
    group: '信義中隊',
    crew: '信義分隊'
};

export default Depart;