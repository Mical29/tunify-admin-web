import {ActionTypes} from '../actions/types';
import { setUserCookie, getUserCookie } from '../cookies/cookie';

const initialState = {
    token: getUserCookie("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    
}

const activeusersState={
    activeUsers : []
}
export const activeUserReducer = (state = activeusersState,{type,payload}) => {
    switch (type){
        case ActionTypes.GET_ACTIVE_USERS:
            return{
                ...state,
                activeUsers : payload
            }
        default:
            return state;
    }
}

export const userReducer = (state = initialState, {type, payload}) => {
    
    switch (type){
        case ActionTypes.USER_LOADING:
            return{
                ...state,
                isLoading: true,
            }
        case ActionTypes.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: payload,
            }
        case ActionTypes.LOGIN_SUCCESS:
        case ActionTypes.ADD_USER:
            // document.cookie = `token = ${payload.token}; expires=Thu, 09 Jul 2021 12:00:00 UTC`;
            // localStorage.setItem('token',JSON.stringify(payload.token))
            var d = new Date();
            var n = d.getDay()
            setUserCookie("token",JSON.stringify(payload.token),1)
            // console.log('added user payload : ')
            // console.log(payload)
            // console.log("added user token : " + payload.token)
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user : payload
            }
        default:
            return state;
    }
};