import { cartConstants, userConstants } from "./constants";
import axios from "../../helpers/axios";

export const getAddress = () => {
    return async dispatch => {
        try{
            const res = await axios.post(`/user/getaddress`);
            dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST });
            if(res.status === 200){
                const {
                    userAddress: {
                        address
                    }
                } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_SUCCESS,
                    payload: { address }
                });
            }else{
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const addAddress = (payload) => {
    return async dispatch => {
        try{
            const res = await axios.post(`/user/address/create`, { payload });
            dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST });
            console.log(res.data);
            if(res.status === 201){
                const {
                    address: {
                        address
                    }
                } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                    payload: { address }
                });
            }else{
                const { error } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const deleteAddress = (payload) => {
    return async dispatch => {
        try{
            const res = await axios.post(`/user/deleteaddress`, { payload: payload });
            dispatch({ type: userConstants.DELETE_USER_ADDRESS_REQUEST });
            if(res.status === 202){
                dispatch({ type: userConstants.DELETE_USER_ADDRESS_SUCCESS });
                dispatch(getAddress());
            }else{
                const { error } = res.data;
                dispatch({
                    type: userConstants.DELETE_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const addOrder = (payload) => {
    return async dispatch => {
        try{
            const res = await axios.post(`/addOrder`, payload );
            dispatch({ type: userConstants.ADD_USER_ORDER_REQUEST });
            console.log(res.data);
            if(res.status === 201){
                dispatch({
                    type: cartConstants.RESET_CART
                });
                // const {
                //     address: {
                //         address
                //     }
                // } = res.data;
                // dispatch({
                //     type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                //     payload: { address }
                // });
            }else{
                const { error } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ORDER_FAILURE,
                    payload: { error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const getOrders = (payload) => {
    return async dispatch => {
        try{
            const res = await axios.get(`/getOrders`, payload );
            dispatch({ type: userConstants.GET_USER_ORDER_REQUEST });
            if(res.status === 200){
                console.log(res);
                const { orders } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_SUCCESS,
                    payload: { orders }
                })
            }else{
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_FAILURE,
                    payload: { error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const getOrder = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/getOrder`, payload);
            dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
            if(res.status === 200){
                const { order } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
                    payload: { order }
                });
            }else{
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
                    payload: { error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}