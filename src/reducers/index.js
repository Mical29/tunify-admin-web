import { combineReducers } from "redux";
import { userReducer,activeUserReducer } from "./UserReducers";
import { artistDetailReducer,getAlbumsReducer,getAllActiveTracks } from "./ArtistReducer";
import {pendingTrackReducer,staffReducer,groupReducer, permissionReducer} from "./AdminReducer"

const reducers = combineReducers({
    Users : userReducer,
    ArtistDetail : artistDetailReducer,
    Albums : getAlbumsReducer,
    Tracks : getAllActiveTracks,
    PendingTracks : pendingTrackReducer,
    ActiveUsers : activeUserReducer,
    Staffs: staffReducer,
    Groups : groupReducer,
    Permissions : permissionReducer
});

export default reducers;