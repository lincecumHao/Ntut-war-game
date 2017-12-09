import React from 'react';
import Category from './Category.jsx';

const categorys = ['人員', '物資', '裝備機具', '車輛'];

const CategoryContainer = ({ selected, onChange }) => {
    return (
        <ul className="resource_category">
            {
                categorys.map((category) => {
                    return (<Category
                        name={category}
                        onClick={onChange}
                        key={category}
                        isActive={category === selected}
                    />);
                })
            }
        </ul>
    );
};

export default CategoryContainer;