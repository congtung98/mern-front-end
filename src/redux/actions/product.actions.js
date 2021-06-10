import axios from "../../helpers/axios"
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
    return async dispatch => {
        const res = await axios.get(`/products/${slug}`);
        if(res.status === 200){
            dispatch({
                type: productConstants.GET_PRODUCTS_BY_SLUG,
                payload: res.data
            });
        }else{
            // dispatch({
            //     type:
            // })
        }
    }
}

export const getProductPage = (payload) => {
    return async dispatch => {
        try{
            const { cid, type } = payload.params;
            const res = await axios.get(`/page/${cid}/${type}`);
            dispatch({ type: productConstants.GET_PRODUCT_PAGE_REQUEST });
            if(res.status === 200){
                const { page } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_SUCCESS,
                    payload: { page }
                });
            }else{
                const { error } = res.data;
                dispatch({
                    type: productConstants.GET_PRODUCT_PAGE_FAILURE,
                    payload: { error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const getProductDetailsById = (payload) => {
    return async dispatch => {
        let res;
        dispatch({ type: productConstants.GET_PRODUCT_DETAILS_BY_ID_REQUEST });
        try {
            const { productId, type } = payload.params;
            console.log(productId, type, 'TYPE');
            res = await axios.get(`/product/productDetails/${productId}/${type}`);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
                payload: { productDetails: res.data.product, productVariants: res.data.children }
            });
        }catch(error){
            console.log(error);
            dispatch({
                type: productConstants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error }
            })
        }
    }
}

export const ratingProduct = (payload) => {
    const _id = payload.get('_id');

    return async dispatch => {
        let res;
        dispatch({ type: productConstants.RATE_PRODUCT_DETAILS_BY_ID_REQUEST });
        try {
            res = await axios.post(`/product/rating`, payload);
            dispatch({
                type: productConstants.RATE_PRODUCT_DETAILS_BY_ID_SUCCESS
            });

            const prodId = {
                params: {
                  productId: _id
                }
              }
            dispatch(getProductDetailsById(prodId))
        }catch(error){
            console.log(error);
            dispatch({
                type: productConstants.RATE_PRODUCT_DETAILS_BY_ID_FAILURE,
                payload: { error: res.data.error || res.data.message }
            })
        }
    }
}

export const searchProduct = (payload) => {
    return async dispatch => {
        let res;
        dispatch({ type: productConstants.SEARCH_PRODUCTS_REQUEST});
        try {
            res = await axios.post(`/product/search`, payload);
            dispatch({
                type: productConstants.SEARCH_PRODUCTS_SUCCESS,
                payload: { products: res.data.response }
            });
        }catch(error){
            console.log(error);
            dispatch({
                type: productConstants.SEARCH_PRODUCTS_FAILURE,
                payload: { error: res.data.error || res.data.message }
            })
        }
    }
} 

export const getBestOfferProducts = () => {
    return async dispatch => {
        let res;
        dispatch({ type: productConstants.GET_BEST_OFFER_PRODUCTS_REQUEST});
        try {
            res = await axios.get(`/product/bestDeal`);
            dispatch({
                type: productConstants.GET_BEST_OFFER_PRODUCTS_SUCCESS,
                payload: { products: res.data.response }
            });
        }catch(error){
            console.log(error);
            dispatch({
                type: productConstants.GET_BEST_OFFER_PRODUCTS_FAILURE,
                payload: { error: res.data.error || res.data.message }
            })
        }
    }
}