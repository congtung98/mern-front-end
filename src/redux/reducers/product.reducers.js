import { productConstants } from "../actions/constants"

const initialState = {
    products: [],
    priceRange: {},
    productsByPrice: {},
    productsVariants: [],
    pageRequest: false,
    page: {},
    error: null,
    productDetails: {},
    productVariants: [],
    productsSearch: [],
    loading: false
}

export default (state = initialState, action) => {
    switch(action.type){
        case productConstants.GET_PRODUCTS_BY_SLUG:
            state = {
                ...state,
                products: action.payload.products,
                productsVariants: action.payload.variants,
                priceRange: action.payload.priceRange,
                productsByPrice: {
                    ...action.payload.productsByPrice
                }
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_REQUEST:
            state = {
                ...state,
                pageRequest: true
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_SUCCESS:
            state = {
                ...state,
                page: action.payload.page,
                pageRequest: false
            }
            break;
        case productConstants.GET_PRODUCT_PAGE_FAILURE:
            state = {
                ...state,
                pageRequest: false,
                error: action.payload.error
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false,
                productDetails: action.payload.productDetails,
                productVariants: action.payload.productVariants
            }
            break;
        case productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case productConstants.RATE_PRODUCT_DETAILS_BY_ID_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.RATE_PRODUCT_DETAILS_BY_ID_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.RATE_PRODUCT_DETAILS_BY_ID_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case productConstants.SEARCH_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.SEARCH_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                productsSearch: action.payload.products
            }
            break;
        case productConstants.SEARCH_PRODUCTS_FAILURE:
             state = {
                 ...state,
                 loading: false,
                 error: action.payload.error
             }
             break;
        case productConstants.GET_BEST_OFFER_PRODUCTS_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_BEST_OFFER_PRODUCTS_SUCCESS:
            state = {
                ...state,
                loading: false,
                products: action.payload.products
            }
            break;
        case productConstants.GET_BEST_OFFER_PRODUCTS_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
    }
    return state;
}