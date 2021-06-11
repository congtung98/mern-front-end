import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import CartItem from './CartItem';
import { addToCart, checkLoginModal, getCartItems, removeCartItem } from '../../redux/actions';

import './style.css';
import { MaterialButton } from '../../components/MaterialUI';
import PriceDetails from '../../components/PriceDetails';
import CartImage from '../../images/cart-items.png';

const CartPage = (props) => {

    const cart = useSelector(state => state.cart);
    const auth = useSelector(state => state.auth);
    // const cartItems = cart.cartItems;
    const [cartItems, setCartItems] = useState(cart.cartItems);
    const dispatch = useDispatch();

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if(auth.authenticate){
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);

    const onQuantityIncrement = (id, qty) => {
        // console.log(_id, qty);
        const { _id, name, price, img, type, variantId } = cartItems[id]
        if(variantId){
            console.log(variantId, _id, 'okokok');
            dispatch(addToCart({ _id, name, price, img, type, variantId }, 1));
        }else{
            dispatch(addToCart({ _id, name, price, img }, 1));
        }
    }

    const onQuantityDecrement = (id, qty) => {
        const { _id, name, price, img, type, variantId } = cartItems[id]
        if(variantId){
            dispatch(addToCart({ _id, name, price, img, type, variantId }, -1));
        }else{
            dispatch(addToCart({ _id, name, price, img }, -1));
        }
    }

    const onRemoveCartItem = (_id, variantId) => {
        if(variantId){
            dispatch(removeCartItem({ productId: _id, variantId: variantId }));
        }else{
            dispatch(removeCartItem({ productId: _id }));
        }
    };
    
    if(props.onlyCartItems){
        return (
            <>
            {
                Object.keys(cartItems).map((key, index) => 
                    <CartItem 
                        key={index}
                        cartItem={cartItems[key]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                    />
                )
            }
            </>
        )
    }
    if(!auth.authenticate){
        return (
            <Layout>
                <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
                        <Card
                            headerLeft={`My Cart`}
                        >
                            <div className="cartNotLogin">
                                <img style={{ height: 162 }} src={CartImage} alt="" />
                                <div style={{ fontSize: 18, marginTop: 24 }}>Missing Cart items?</div>
                                <div style={{ fontSize: 12, marginTop: 10 }}>Login to see the items you added previously</div>
                                <button className="cartLogin" onClick={() => dispatch(checkLoginModal(true))}>Login</button>
                            </div>
                        </Card>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
                {
                    Object.keys(cartItems).length > 0 ?
                    <div className="cartContainer" style={{ alignItems: 'flex-start' }}>
                        <Card
                            headerLeft={`My Cart`}
                            headerRight={<div>Deliver to</div>}
                            style={{ width: 'calc(100% - 400px', overflow: 'hidden'}}
                        >
                            {
                                Object.keys(cartItems).map((key, index) => 
                                    <CartItem 
                                        key={index}
                                        cartItem={cartItems[key]}
                                        onQuantityInc={onQuantityIncrement}
                                        onQuantityDec={onQuantityDecrement}
                                        onRemoveCartItem={onRemoveCartItem}
                                    />
                                )
                            }
        
                            <div style={{
                                width: '100%',
                                display: 'flex',
                                background: '#fff',
                                justifyContent: 'flex-end',
                                boxShadow: '0 0 10px 10px #eee',
                                boxSizing: 'border-box'
                            }}>
                                <div style={{ width: '250px' }}>
                                    <MaterialButton
                                        title="PLACE ORDER" 
                                        onClick={() => auth.authenticate ? props.history.push('/checkout') : dispatch(checkLoginModal(true))}
                                    />
                                </div>
                            </div>
                            
                        </Card>
                        <PriceDetails
                            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                                return qty + cart.cartItems[key].qty;
                            }, 0)}
                            totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                                const { price, qty } = cart.cartItems[key];
                                return totalPrice + price * qty;
                            }, 0)}
                        />
                    </div>:                    
                    <div className="container">
                        <h2>You don't have any items in your cart</h2>
                        <p>Please go back and continue shopping.</p>
                        <a href="/">Go back home</a>
                    </div>      
                }
        </Layout>
    )
}

export default CartPage
