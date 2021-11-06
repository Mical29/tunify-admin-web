import {ActionTypes} from '../actions/types';

const artistDetailState = {
    artistDetailState : []
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