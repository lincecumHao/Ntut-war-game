import React from 'react';
import PropTypes from 'prop-types';
import UnitsContainer from './UnitsContainer.jsx';


const Charact = ({ name, unit, userId }) => (
    <tr>
        <td>
            {name}
        </td>
        <td>
            <UnitsContainer
                unitId={unit}
                userId={userId}
            />
        </td>
    </tr>
);

Charact.PropTypes = {
    name: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
}

export default Charact;