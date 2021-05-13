import React, { useState } from 'react';
import { generatePublicUrl } from '../../../urlConfig';
import './style.css';

const CartItem = (props) => {

    const [qty, setQty] = useState(props.cartItem.qty);

    const {
        _id,
        variantId, 
        name, 
        price, 
        img, 
        ram, 
        storage, 
        color, 
        size, 
        hardDiskCapacity, 
        primaryColor, 
        material, 
        author, 
        genre, 
        screenSize
    } = props.cartItem;

    const onQuantityIncrement = () => {
        setQty(qty + 1);
        if(variantId){
            props.onQuantityInc(variantId, qty + 1); 
        }else{
            props.onQuantityInc(_id, qty + 1);
        }
    }

    const onQuantityDecrement = () => {
        if(qty <= 1) return;
        setQty(qty - 1);
        if(variantId){
            props.onQuantityDec(variantId, qty - 1); 
        }else{
            props.onQuantityDec(_id, qty - 1); 
        }
    }

    const detailVariant = () => {
        if(color){
            if(storage){
                return ` (${color}, ${storage})`; 
            }else if(size){
                return ` (${color}, ${size})`;
            }
        }else if(primaryColor){
            return ` (${primaryColor})`
    }
    } 

    return (
        <div className="cartItemContainer">
            <div className="flexRow">
                <div className="cartProImgContainer">
                    <img src={generatePublicUrl(img)} alt={''}/>
                </div>
                <div className="cartItemDetails">
                    <div>
                        <p>
                            {name}
                            {detailVariant()}
                            {ram ? ` (${ram} RAM)` : null}
                            {screenSize ? ` (${screenSize} inch)` : null}
                        </p>
                        <p>Rs. {price}</p>
                    </div>
                    <div>Delivery in 3 - 5 days</div>
                </div>
            </div>

            <div style={{
                display: 'flex',
                margin: '5px 0'
            }}>
                {/* quantity control */}
                <div className="quantityControl">
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} readOnly />
                    <button onClick={onQuantityIncrement}>+</button>
                </div>
                <button className="cartActionBtn">save for later</button>
                <button 
                    className="cartActionBtn"
                    onClick={() => props.onRemoveCartItem(_id, variantId)}    
                >
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItem
