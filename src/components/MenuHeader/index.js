import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { getAllCategory } from '../../redux/actions';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const MenuHeader = (props) => {

    const [toggleHover, setToggleHover] = useState(false);
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const renderCategories = (categories) => {

        let _categories = [];
        for(let category of categories){
            _categories.push(
                <li key={category.name}>
                    {
                        category.parentId ? <a 
                            href={`/${category.slug}?cid=${category._id}&type=${category.type}`}>
                            {category.name}
                        </a> : 
                        <span 
                            onMouseEnter={() => setToggleHover(category.name)} 
                            onMouseLeave={() => setToggleHover('')}
                            style={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}
                        >
                            {category.name}
                            {
                                toggleHover === category.name ? <IoIosArrowUp/> : <IoIosArrowDown/>
                            }
                        </span>
                    }
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );
        }

        return _categories;
    }

    return (
        <div className="menuHeader">
            <ul style={{ justifyContent: 'space-evenly' }}>
                { category.categories.length > 0 ? renderCategories(category.categories) : null }
            </ul>
        </div>
    )
}

export default MenuHeader
