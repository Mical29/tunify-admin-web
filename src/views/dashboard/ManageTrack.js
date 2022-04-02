import React, { lazy,useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getArtistDetail,getAlbums,getActiveTracks } from 'src/actions/ArtistActions.js'
import { deleteTrack } from 'src/actions/AdminActions'
import {
  CCardHeader,
  CProgress,
  CDataTable,
  CBadge,
  CButton,
  CCollapse,
  CCardBody,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const PendingDashboard = () => {


  const dispatch = useDispatch()

  const [musicName,setMusicName]=useState('');
  const [musicID,setMusicID] = useState('');
  const [albumID,setAlbumID] = useState('');
  const [artistID,setArtistID] = useState('');

  const artistDetail = useSelector((state) => state.ArtistDetail.artistDetailState);

  const tracks = useSelector((state) => state.Tracks.tracks);
  


  console.log("Artist Detail")
  console.log(artistDetail)

  const setRemoveMusic = (music_name,music_id,album_id,artist_name) => {
    setMusicName(music_name)
    setMusicID(music_id)
    setAlbumID(album_id)
    setArtistID(artist_name)
  }

  const removeMusic =(music_id,album_id,artist_name,e) => {
    
    const data={"track_id":music_id,"artist_name": album_id,"album_id":artist_name}
    dispatch(deleteTrack(data))
    dispatch(getActiveTracks())
  }

  useEffect(()=>{
    
    dispatch(getActiveTracks())
    
  },[])

  
  const [details, setDetails] = useState([])
  const [items, setItems] = useState(tracks)

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
    { key: 'streaming_count', _style: { width: '12%'} },
    { key: 'action', _style: { width: '12%'} },

    {
      key: 'show_details',
      label: '',
      _style: { width: '1%' },
      sorter: false,
      filter: false
    }
  ];



  return (
    <CDataTable
      items={tracks}
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
          'streaming_count':
          (item)=>(
            <td>
              <div className="clearfix">
                <div className="float-left">
                <strong>{item.track_count_id === null ? 0 : item.track_count_id.count }</strong>
              </div>
                  
              </div>
              <CProgress className="progress-xs" color="success" value={item.track_count_id === null ? 0 : item.track_count_id.count } />
            </td>
            
          ),
          'action':(item)=>(
            <td className="text-center">
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


 


  // return (
  //   <>
  //     <CCardHeader>
  //     Track Lists - {Object.keys(tracks).length}
  //     </CCardHeader>
  //     <table className=" table table-striped " id="example">
  //       <thead className="thead-light">
  //         <tr>
  //           <th className="text-center"><CIcon name="cil-people" /></th>
  //           <th>Track Name</th>
  //           <th className="text-center">Album Name</th>
  //           <th>Streaming Count</th>
  //           <th className="text-center">Upload Date</th>
  //           <th className="text-center">Action</th>

            
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {
  //       tracks.map((track,index)=>{
        
  //       return(
         
  //         <tr>
  //             <td className="text-center">
  //               <div className="c-avatar">
  //                 {index+1}
  //               </div>
  //             </td>
  //             <td>
  //               <div>{track.music_name}</div>
  //               <div className="small text-muted">
  //                 <span>Album Name - {track.album_id.album_name}</span> | Uploded On: {track.album_id.create_at}
  //               </div>
  //             </td>
  //             <td className="text-center">
  //               <div>{track.album_id.album_name}</div>
  //             </td>
  //             <td>
  //               <div className="clearfix">
  //                 <div className="float-left">
  //                   <strong>{track.track_count_id === null ? 0 : track.track_count_id.count }</strong>
  //                 </div>
                  
  //               </div>
  //               <CProgress className="progress-xs" color="success" value={track.track_count_id === null ? 0 : track.track_count_id.count } />
  //             </td>
  //             <td className="text-center">
  //               {track.create_at}
  //             </td>

  //             <td className="text-center">
  //                         <button onClick={()=>setRemoveMusic(track.music_name,track.id)} type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
  //                           Remove
  //                         </button>


  //                         <div class="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  //                           <div class="modal-dialog">
  //                             <div class="modal-content">
  //                               <div class="modal-header">
  //                                 <h5 class="modal-title" id="exampleModalLabel">Are You Sure {musicName} want to removed?</h5>
  //                                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  //                               </div>
  //                               <div class="modal-body">
  //                                 Are you sure do you want to remove {musicName} ? 
  //                                 All of this streaming count will also be removed? And it Cannot Be Recovered
  //                               </div>
  //                               <div class="modal-footer">
  //                                 <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
  //                                 <button type="button" class="btn btn-primary" onClick={e=>removeMusic(musicID,e)}>Yes! I am Sure!</button>
  //                               </div>
  //                             </div>
  //                           </div>
  //                         </div>


  //                         </td>
            
  //         </tr>
          
  //       );
        
        
        
  //     }) }
  //       </tbody>
  //     </table>
  //     {/* {trackListDetail} */}
  //     {/* <table className="table table-hover table-outline mb-0 d-none d-sm-table">
  //               <thead className="thead-light">
  //                 <tr>
  //                   <th className="text-center"><CIcon name="cil-people" /></th>
  //                   <th>Track Name</th>
  //                   <th className="text-center">Album Name</th>
  //                   <th>Streaming Count</th>
  //                   <th className="text-center">Upload Date</th>
                    
  //                 </tr>
  //               </thead>
  //               <tbody>
  //                 <tr>
  //                   <td className="text-center">
  //                     <div className="c-avatar">
  //                       <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
  //                       <span className="c-avatar-status bg-success"></span>
  //                     </div>
  //                   </td>
  //                   <td>
  //                     <div>Why Not Me</div>
  //                     <div className="small text-muted">
  //                       <span>Album Name</span> | Uploded On: Jan 1, 2015
  //                     </div>
  //                   </td>
  //                   <td className="text-center">
  //                     <div>English</div>
  //                   </td>
  //                   <td>
  //                     <div className="clearfix">
  //                       <div className="float-left">
  //                         <strong>50%</strong>
  //                       </div>
                        
  //                     </div>
  //                     <CProgress className="progress-xs" color="success" value="50" />
  //                   </td>
  //                   <td className="text-center">
  //                     Jan 1, 2015
  //                   </td>
                  
  //                 </tr>
  //               </tbody>
  //             </table> */}
  //             <br />
  //   </>
  // )
}

export default PendingDashboard
