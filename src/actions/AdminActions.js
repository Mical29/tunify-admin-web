import tunifyAPI from '../apis/tunifyAPI'
import {ActionTypes} from './types';

export const deleteTrack =(data) => async (dispatch) =>{
    const response = await tunifyAPI.post("/customadmin/api/removetrack/",data).then(res =>{
        dispatch({type: ActionTypes.DELETE_TRACK,
          payload : res.data})
      })
      .catch(err =>{
      //   dispatch(returnErrors(err.response,err.response.status));
    
      })
}

export const approveTrack =(data) => async (dispatch) =>{
    const response = await tunifyAPI.patch("/customadmin/api/pendingmusics/",data).then(res =>{
        dispatch({type: ActionTypes.APPROVE_TRACK,
          payload : res.data})
      })
      .catch(err =>{
      //   dispatch(returnErrors(err.response,err.response.status));
    
      })
}

export const getPendingTracks = () => async (dispatch) => {
    const response = await tunifyAPI.get("/customadmin/api/pendingmusics/").then(res=>{
        dispatch(
            {
                type: ActionTypes.GET_PENDING_TRACKS,
                payload : res.data
            }
        )
    }).catch(err => {
        console.log(err)
    })
}

export const getStaffs = () => async (dispatch) => {
    const response = await tunifyAPI.get("/customadmin/api/staffs/").then(res=>{
        dispatch(
            {
                type: ActionTypes.GET_STAFFS,
                payload : res.data
            }
        )
    }).catch(err => {
        console.log(err)
    })
}

export const getGroups = () => async (dispatch) => {
    const response = await tunifyAPI.get("/customadmin/api/groups/").then(res=>{
        dispatch(
            {
                type: ActionTypes.GET_GROUPS,
                payload : res.data
            }
        )
    }).catch(err => {
        console.log(err)
    })
}

export const createGroup = (data) => async (dispatch) => {
    const response = await tunifyAPI.post("/customadmin/api/create_group/",data).then(res=>{
        dispatch(
            {
                type: ActionTypes.CREATE_GROUP,
                payload : res.data
            }
        )
    }).catch(err => {
        console.log(err)
    })
}

export const assignPermissionToGroup = (data) => async (dispatch) => {
    const response = await tunifyAPI.post("/customadmin/api/assign_group_permissions/",data).then(res=>{
        dispatch(
            {
                type: ActionTypes.ASSIGN_PERMISSION_TO_GROUP,
                payload : res.data
            }
        )
    }).catch(err => {
        console.log(err)
    })
}

export const deleteGroup = (data) => async (dispatch) => {
    const response = await tunifyAPI.post("/customadmin/api/remove_group/",data).then(res=>{
        dispatch(
            {
                type: ActionTypes.DELETE_GROUP,
                payload : res.data
            }
        )
    }).catch(err => {
        console.log(err)
    })
}

export const getPermissiosns = () => async (dispatch) => {
    const response = await tunifyAPI.get("/customadmin/api/permissions/").then(res=>{
        dispatch(
            {
                type: ActionTypes.GET_PERMISSIONS,
                payload : res.data
            }
        )
    }).catch(err => {
        console.log(err)
    })
}