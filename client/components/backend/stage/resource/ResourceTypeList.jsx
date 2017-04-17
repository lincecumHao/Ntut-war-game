import React, { PropTypes } from 'react';
import SimpleLi from '../common/SimpleLi.jsx';

const ResourceTypeList = ({ resTypes, selectRes, onResSelected }) => (
    <ul>
        {
            resTypes.map((type, index) => {
                return (
                    <SimpleLi
                        key={index}
                        id={type}
                        text={type}
                        onSelect={onResSelected}
                        selectId={selectRes}
                    />
                )
            })
        }
    </ul>
);

ResourceTypeList.propTypes = {
    resTypes: PropTypes.array.isRequired,
    selectRes: PropTypes.string,
    onResSelected: PropTypes.func
};

ResourceTypeList.defaultProps = {
    onResSelected: () => { },
    selectRes: ''
};

export default ResourceTypeList;