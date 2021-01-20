import { productConstants } from "../actions/constants"

const initialState = {
    products: [],
    productsByPrice: {
        under5mil: [],
        under10mil: [],
        under15mil: [],
        under20mil: [],
        under30mil: []
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;
    }
    return state;
}