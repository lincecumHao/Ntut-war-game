import React from 'react';

const Category = ({ name, onClick, isActive }) => (
    <li className={isActive ? 'active' : ''} onClick={() => { onClick(name) }}>
        <a href="#">{name}</a>
    </li>
);

export default Category;