import tunifyAPI from '../apis/tunifyAPI'
// import {returnErrors} from './messageActions'
import {ActionTypes} from './types';
import { getUserCookie } from '../cookies/cookie';

export const login = (data) => async (dispatch) => {
    const response = await tunifyAPI.post("/accounts/api/auth/login",data).then(
      res => {
        dispatch({type:ActionTypes.LOGIN_SUCCESS,
          payload : res.data})
      }
    ).catch(err => {
      console.log("Error")
      console.log(err)
    //   dispatch(returnErrors(err.response.data,err.response.status));
    })
  }
  
  export const loadUser = () => async (dispatch)=>{
    
    dispatch({type:ActionTypes.USER_LOADING})  
    const response = tunifyAPI.get('/accounts/api/auth/user',tokenConfig(getUserCookie("token"))).then(res => {
      dispatch({
        type: ActionTypes.USER_LOADED,
        payload: res.data
      })
    }).catch(err =>{
      console.log("User Loaded Error");
      
    })
  }
  
  
  
  export const tokenConfig =(token) =>{
   
      const userToken = JSON.parse(token)
      const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
      if(userToken) {
          config.headers['Authorization'] = `Token ${userToken}`;
      }
  
      return config;
  }