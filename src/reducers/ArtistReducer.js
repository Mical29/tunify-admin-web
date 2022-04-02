import {ActionTypes} from '../actions/types';

const artistDetailState = {
    artistDetailState : []
}

const tracksState = {
    tracks :[]
}

const uploadFile ={
    fileProgress:{}
}

const getAlbums ={
    albums:[]
}

export const artistDetailReducer = (state = artistDetailState, {type, payload}) => {
    
    switch (type){
         
        
        case ActionTypes.GET_ARTIST_DETAIL:            
            return {
                ...state,
                artistDetailState : payload
            }  
        case ActionTypes.REMOVED_SET_ARTIST_DETAIL:
            return{
                state
            }

        default:
            return state;
    }
};

export const getAllActiveTracks = (state = tracksState,{type,payload}) => {
    switch(type){
        case ActionTypes.GET_TRACKS:
            return {
                ...state,
                tracks : payload
            }
        default:
            return state
    }
}

export const getAlbumsReducer = (state = getAlbums,{type,payload}) =>{
    switch(type){
        case ActionTypes.GET_ALBUMS:
            return{
                ...state,
                albums : payload
            }
        default:
            return state
    }
}

// export const fileProgressReducer =(state = uploadFile,{type,payload}) =>{
//     switch(type){
//         case ActionTypes.SET_UPLOAD_ALBUM:
//             return {
//                 ...state,
//                 fileProgress:{
//                     fileProgress,
//                     ...modifyFiles(fileProgress, payload),

//                 }
//             }
//         default:
//             return state
//     }
// }