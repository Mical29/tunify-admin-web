import React, { lazy,useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getPendingTracks } from 'src/actions/AdminActions';
import { approveTrack,deleteTrack } from 'src/actions/AdminActions';

import {
    CCardHeader,
    CProgress,
    CDataTable,
    CBadge,
    CButton,
    CCollapse,
    CCardBody,
  
  } from '@coreui/react'

const PendingTrack = () => {

    const pendingTracks = useSelector((state) => state.PendingTracks.pendingTracks);
    const dispatch = useDispatch()

    

    const [musicName,setMusicName]=useState('');
    const [musicID,setMusicID] = useState('');
    const [albumID,setAlbumID] = useState('');
    const [artistID,setArtistID] = useState('');

    const setRemoveMusic = (music_name,music_id,album_id,artist_name) => {
        setMusicName(music_name)
        setMusicID(music_id)
        setAlbumID(album_id)
        setArtistID(artist_name)
      }
    
      const removeMusic =(music_id,album_id,artist_name,e) => {
        
        const data={"track_id":music_id,"artist_name": album_id,"album_id":artist_name}
         dispatch(deleteTrack(data))
         dispatch(getPendingTracks())
      }

      const acceptMusic =(music_id,album_id,artist_name,e) => {
        
        const data={"track_id":music_id,"artist_name": album_id,"album_id":artist_name}
        dispatch(approveTrack(data))
        dispatch(getPendingTracks())
      }
  
    const [details, setDetails] = useState([])
    const [items, setItems] = useState(pendingTracks)
  
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
      { key: 'track_name', _style: { width: '20%'} },
      { key: 'create_at', _style: { width: '10%'} ,},
    
      { key: 'album_name', _style: { width: '15%'}},
      { key: 'artist_name', _style: { width: '10%'}},
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
        dispatch(getPendingTracks())
    },[])
    return (
        
            <CDataTable
              items={pendingTracks}
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
                  'track_name':
                  (item)=>(
                    <td>
                      <div>{item.music_name}</div>
                      <div className="small text-muted">
                        <span>Album Name - {item.album_id.album_name}</span> | Uploded On: {item.album_id.create_at}
                      </div>
                    </td>
                    
                  ),
                'artist_name':
                  (item)=>(
                    <td className="text-center">
                      <div>{item.artist_name.username}</div>
                    </td>
                    
                  ),
        
                'album_name':
                  (item)=>(
                    <td className="text-center">
                      <div>{item.album_id.album_name}</div>
                    </td>
                    
                  ),
                  'action':(item)=>(
                    <td className="text-center">
                        <button onClick={()=>setRemoveMusic(item.music_name,item.id,item.album_id.id,item.artist_name.id)} type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                        Approve
                        </button>
                      <button onClick={()=>setRemoveMusic(item.music_name,item.id,item.album_id.id,item.artist_name.id)} type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Remove
                      </button>
        
        
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
                              Are you sure do you want to Accept {musicName} ? 
                              This will notify to Related Artist that this music has bee approved by Tunify!
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              <button type="button" class="btn btn-primary" onClick={e=>acceptMusic(musicID,artistID,albumID,e)}>Yes! I am Sure!</button>
                            </div>
                          </div>
                        </div>
                      </div>
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
                        <audio controls>
                            
                            <source src={'http://127.0.0.1:8000'+item.music_file} type="audio/mp3"/>
                          Your browser does not support the audio element.
                          </audio> 
                          <p className="text-muted">User since: {item.album_id.album_name}</p>
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

export default PendingTrack