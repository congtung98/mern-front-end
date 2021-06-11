import { cartConstants } from './constants';
import store from '../store';
import axios from '../../helpers/axios';

const getCartItems = () => {
    return async dispatch => {
        try{
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            const res = await axios.post(`/user/getCartItems`);
            if(res.status === 200){
                const { cartItems } = res.data;
                if(cartItems){
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems }
                    });
                }
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const addToCart = (product, newQty) => {
    const { variantId, type } = product;
    return async dispatch => {
        const { 
            cart: {
                cartItems
            },
            auth } = store.getState();

            console.log(cartItems[variantId], cartItems[product._id], 'va k');
            let qty;
            if(cartItems[variantId]){
                qty = parseInt(cartItems[variantId].qty) + newQty;
            }else if(cartItems[product._id]){
                qty = parseInt(cartItems[product._id].qty + newQty);
            }else{
                qty = 1;
            }
        // const qty = cartItems[variantId] ? parseInt(cartItems[variantId].qty) + newQty : cartItems[product._id] ?  parseInt(cartItems[product._id].qty + newQty) : 1;
        if(variantId){
            cartItems[variantId] = {
                ...product,
                qty
            }
        }else{
            cartItems[product._id] = {
                ...product,
                qty
            };
        }

        if(auth.authenticate){
            dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
            let payload = {};
            if(variantId){
                switch(type){
                    case 'smartPhone':
                        console.log('va k', qty, newQty);
                        payload = {
                            cartItems: [{
                                product: product._id,
                                quantity: qty,
                                variantProduct: variantId,
                                smartphone: variantId
                            }]
                        };
                        break;
                    case 'clothing':
                        payload = {
                            cartItems: [{
                                product: product._id,
                                quantity: qty,
                                variantProduct: variantId,
                                clothing: variantId
                            }]
                        };
                        break;
                    case 'laptop':
                        payload = {
                            cartItems: [{
                                product: product._id,
                                quantity: qty,
                                variantProduct: variantId,
                                laptop: variantId
                            }]
                        };
                        break;
                    case 'television':
                        payload = {
                            cartItems: [{
                                product: product._id,
                                quantity: qty,
                                variantProduct: variantId,
                                television: variantId
                            }]
                        };
                        break;
                    case 'furniture':
                        payload = {
                            cartItems: [{
                                product: product._id,
                                quantity: qty,
                                variantProduct: variantId,
                                furniture: variantId
                            }]
                        };
                        break;
                    case 'book':
                        payload = {
                            cartItems: [{
                                product: product._id,
                                quantity: qty,
                                variantProduct: variantId,
                                book: variantId
                            }]
                        };
                        break;
                    default:
                        payload = {
                            cartItems: [{
                                product: product._id,
                                quantity: qty
                            }]
                        };
                }
            }else{
                payload = {
                    cartItems: [{
                        product: product._id,
                        quantity: qty
                    }]
                };
            }
            const res = await axios.post(`/user/cart/addtocart`, payload);
            if(res.status === 201){
                dispatch(getCartItems());
            }
        }else {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        }


        dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems }
        });
    }
}

export const removeCartItem = (payload) => {
    return async (dispatch) => {
        try {
            dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });
            const res = await axios.post(`/user/cart/removeItem`, { payload });
            if(res.status === 202){
                dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
                dispatch(getCartItems());
            }else{
                const { error } = res.data;
                dispatch({
                    type: cartConstants.REMOVE_CART_ITEM_FAILURE,
                    payload: { error },
                });
            }
        }catch(error){
            console.log(error);
        }
    };
};

export const updateCart = () => {
    return async dispatch => {
        const { auth } = store.getState();
        let cartItems = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : null;

            if(auth.authenticate){
                localStorage.removeItem('cart');
                if(cartItems){
                    const payload = {
                        cartItems: Object.keys(cartItems).map((key, index) => {
                            return {
                                quantity: cartItems[key].qty,
                                product: cartItems[key]._id
                            }
                        })
                    };
                    if(Object.keys(cartItems).length > 0){
                        const res = await axios.post(`/user/cart/addtocart`, payload);
                        if(res.status === 201){
                            dispatch(getCartItems());
                        }
                    }
                }
            }else{
                if(cartItems){
                    dispatch({
                        type: cartConstants.ADD_TO_CART_SUCCESS,
                        payload: { cartItems }
                    });
                }
            }
    }
}

export {
    getCartItems
}