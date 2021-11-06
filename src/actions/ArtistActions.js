import tunifyAPI from '../apis/tunifyAPI'
import {ActionTypes} from './types';


export const getArtistDetail = (uid) => async (dispatch) =>{
    const response = await tunifyAPI.get("/accounts/api/verified_artists/"+uid+"/").then(res =>{
      dispatch({type: ActionTypes.GET_ARTIST_DETAIL,
        payload : res.data})
    })
    .catch(err =>{
    //   dispatch(returnErrors(err.response,err.response.status));
  
    })
  }