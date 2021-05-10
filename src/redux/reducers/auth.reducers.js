import { authConstants } from "../actions/constants";

const initialState = {
   token: null,
   user: {
       firstName: '',
       lastName: '',
       email: '',
       picture: ''
   },
   authenticate: false,
   authenticating: false,
   loading: false,
   error: null,
   message: '',
   loginModal: false
};

export default (state = initialState, action) => {

    console.log(action);
    
    switch(action.type){
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                error: null
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticate: true,
                authenticating: false,
                error: null
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                authenticating: false,
                error: action.payload?.error,
            }
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initialState
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case authConstants.IS_LOGGED:
            state = {
                ...state,
                loginModal: action.payload
            }
            break;
    }

    return state;
}