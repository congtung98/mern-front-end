import { cartConstants } from '../actions/constants';

const initialState = {
    cartItems: {}
};

export default (state = initialState, action) => {
    switch(action.type){
        case cartConstants.ADD_TO_CART:
            state = {
                ...state,
                cartItems: action.payload.cartItems
            }
            break;
    }
    return state;
}