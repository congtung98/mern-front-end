import React, { useState } from 'react';
import './style.css';

const FilterItem = (props) => {
    const { name, uniqueProps, handleFilter } = props;
    const [checked, setChecked] = useState([]);

    const onFilter = (value) => {

        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if(currentIndex === -1){
            newChecked.push(value);
        }else{
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        handleFilter(newChecked);
    }

    return (
        <div className="filterContent">
        {name}
        {
            uniqueProps.map((prop, index) => {
                return (
                    <div className="filterItem" key={index}>
                        <input type="checkbox" value={prop} checked={checked.indexOf(prop) === -1 ? false : true} onChange={() => onFilter(prop)} />
                        <span style={{ paddingLeft: 11 }}>{prop}</span>
                    </div>
                )
            })
        }
    </div>
    )
}

export default FilterItem
