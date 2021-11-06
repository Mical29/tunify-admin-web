import { combineReducers } from "redux";
import { userReducer } from "./UserReducers";
import { artistDetailReducer } from "./ArtistReducer";

const reducers = combineReducers({
    Users : userReducer,
    ArtistDetail : artistDetailReducer
});

export default reducers;