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

export const getActiveTracks = () => async (dispatch) =>{
  const responst = await tunifyAPI.get("/accounts/api/artist_and_tracks/").then(res=>{
    dispatch({type:ActionTypes.GET_TRACKS,
    payload: res.data})
  }).catch(err =>{
    console.log(err)
  })
}


export const getAlbums = (aid) => async (dispatch) =>{
  const response = await tunifyAPI.get("/tunify/api/get_aritst_album/"+aid).then(res =>{
    dispatch({type: ActionTypes.GET_ALBUMS,
      payload : res.data})
  })
  .catch(err =>{
  //   dispatch(returnErrors(err.response,err.response.status));

  })
}


// export const UploadAlbum = (data) => async (dispatch) =>{
//   const response = await tunifyAPI.post("/tunify/api/upload_music/",data,{
    
//     onUploadProgress:data =>{

//     }
//   }
//   ).then(res =>{
//     dispatch({type: ActionTypes.SET_UPLOAD_ALBUM,
//       payload : res.data})
//   })
//   .catch(err =>{
//   //   dispatch(returnErrors(err.response,err.response.status));

//   })
// }