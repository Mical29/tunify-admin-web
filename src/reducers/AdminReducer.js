import {ActionTypes} from '../actions/types';

const pendingTracks ={
    pendingTracks :[]
}

const staffState = {
    staffs : []
}

const groupState = {
    groups : []
}

const permissionState = {
    permissions : []
}

export const staffReducer = (state = staffState,{type,payload}) =>{
    switch (type) {
        case ActionTypes.GET_STAFFS:
            return {
                ...state,
                staffs : payload
            }
        default:
            return state;
    }
}

export const groupReducer = (state = groupState,{type,payload}) =>{
    switch (type) {
        case ActionTypes.GET_GROUPS:
            return {
                ...state,
                groups : payload
            }
        default:
            return state;
    }
}

export const permissionReducer = (state = permissionState,{type,payload}) =>{
    switch (type) {
        case ActionTypes.GET_PERMISSIONS:
            return {
                ...state,
                permissions : payload
            }
        default:
            return state;
    }
}

export const pendingTrackReducer = (state = pendingTracks,{type,payload}) =>{
    switch (type) {
        case ActionTypes.GET_PENDING_TRACKS:
            return {
                ...state,
                pendingTracks : payload
            }
        default:
            return state;
    }
}