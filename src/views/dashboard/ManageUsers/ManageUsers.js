import React, { lazy,useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { activeUsers } from 'src/actions/UserActions'

import {
    CDataTable,
    CBadge,
    CButton,
    CCollapse,
    CCardBody,
  
  } from '@coreui/react'


const ManageUsers =() =>{
    const getActiveUsers = useSelector((state) => state.ActiveUsers.activeUsers);
    const dispatch = useDispatch();

    const [details, setDetails] = useState([])
    const [items, setItems] = useState(activeUsers)
  
    const toggleDetails = (index) => {
      const position = details.indexOf(index)
      let newDetails = details.slice()
      if (position !== -1) {
        newDetails.splice(position, 1)
      } else {
        newDetails = [...details, index]
      }
      setDetails(newDetails)
    }
  
    const fields = [
      { key: 'index', _style: { width: '5%'} },
      { key: 'username', _style: { width: '10%'} },
      { key: 'email', _style: { width: '10%'} ,},
      { key: 'user_id', _style: { width: '10%'} ,},
    
    //   { key: '', _style: { width: '15%'}},
    //   { key: 'artist_name', _style: { width: '10%'}},
      { key: 'action', _style: { width: '12%'} },
  
      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        sorter: false,
        filter: false
      }
    ];

    useEffect(()=>{
        dispatch(activeUsers())
    },[])
    return(
        <CDataTable
              items={getActiveUsers }
              fields={fields}
              
              tableFilter
              footer
              itemsPerPageSelect
              itemsPerPage={5}
              hover
              sorter
              pagination
              scopedSlots = {{
        
                'index':
                  (item,index)=>(
                    <td>
                      <CBadge >
                        {index+1}
                      </CBadge>
                    </td>
                    
                  ),
                  'username':
                  (item)=>(
                    <td>
                      <div>{item.username}</div>
                      <div className="small text-muted">
                        {/* <span>Album Name - {item.username}</span> | Uploded On:  */}
                      </div>
                    </td>
                    
                  ),
                'email':
                  (item)=>(
                    <td className="text-center">
                      <div>{item.email}</div>
                    </td>
                    
                  ),
        
                'user_id':
                  (item)=>(
                    <td className="text-center">
                      <div>{item.user_id}</div>
                    </td>
                    
                  ),
                  'action':(item)=>(
                    <td className="text-center">
                     <button  type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                        Remove
                        </button>
                      <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Ban
                      </button>
        
                    {/*
                      <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Are You Sure {musicName} want to removed?</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              Are you sure do you want to remove {musicName} ? 
                              All of this streaming count will also be removed? And it Cannot Be Recovered
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" onClick={e=>removeMusic(musicID,artistID,albumID,e)}>Yes! I am Sure!</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5 class="modal-title" id="exampleModalLabel">Are You Sure {musicName} want to Accept?</h5>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                              Are you sure do you want to Accept {musicName,musicID,artistID,albumID} ? 
                              This will notify to Related Artist that this music has bee approved by Tunify!
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" onClick={e=>acceptMusic(musicID,artistID,albumID,e)}>Yes! I am Sure!</button>
                            </div>
                          </div>
                        </div>
                      </div> */}
                      </td>
                  ),
                'show_details':
                  (item, index)=>{
                    return (
                      <td className="py-2">
                        <CButton
                          color="primary"
                          variant="outline"
                          shape="square"
                          size="sm"
                          onClick={()=>{toggleDetails(index)}}
                        >
                          {details.includes(index) ? 'Hide' : 'Show'}
                          
                        </CButton>
                      </td>
                      )
                  },
                'details':
                    (item, index)=>{
                      return (
                      <CCollapse show={details.includes(index)}>
                        <CCardBody>
                        
                          <p className="text-muted">User since: </p>
                          <CButton size="sm" color="info">
                            User Settings
                          </CButton>
                          <CButton size="sm" color="danger" className="ml-1">
                            Delete
                          </CButton>
                        </CCardBody>
                      </CCollapse>
                    )
                  }
              }}
            />
    )
}

export default ManageUsers;