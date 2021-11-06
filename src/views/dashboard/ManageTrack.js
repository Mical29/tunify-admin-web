import React, { lazy,useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getArtistDetail } from 'src/actions/ArtistActions.js'
import {
  CCardHeader,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const PendingDashboard = () => {


  const dispatch = useDispatch()

  const [musicName,setMusicName]=useState('');
  const [musicID,setMusicID] = useState('');

  const artistDetail = useSelector((state) => state.ArtistDetail.artistDetailState);
  console.log("Artist Detail")
  console.log(artistDetail)

  const setRemoveMusic = (music_name,music_id) => {
    setMusicName(music_name)
    setMusicID(music_id)
  }

  const removeMusic =(music_id,e) => {
    e.preventDefault()
    console.log('Dispatch to '+music_id)
  }

  const trackListDetail =
      artistDetail.map((tracks)=>{
        
        return(
          
          <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>Track Name</th>
                    <th className="text-center">Album Name</th>
                    <th>Streaming Count</th>
                    <th className="text-center">Upload Date</th>
                    <th className="text-center">Action</th>

                    
                  </tr>
                </thead>
                <tbody>
            {
              tracks.artist_name.map((track,index)=>{
                
                return(          
                  <tr key={index}>
                          <td className="text-center">
                            <div className="cil-sort-numeric-down">
                              {/* <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                              <span className="c-avatar-status bg-success"></span> */}
                              <p>{index+1}</p>
                            </div>
                          </td>
                          <td>
                            <div>{track.music_name}</div>
                            <div className="small text-muted">
                              {

                                tracks.artist_album_name.map(album=>{
                                  
                                  return(
                                    <span>{track.album_id === album.id ? album.album_name : ""}</span> 
                                  )
                                })
                              }
                              
                            </div>
                          </td>
                          <td className="text-center">
                          {
                                tracks.artist_album_name.map(album=>{
                                  
                                  return(
                                    <div>{track.album_id === album.id ? album.album_name : ""}</div>                                  
                                  )
                                })
                              }
                              </td>
                          
                          
                            
                            {
                              track.track_count_id === null  ? 
                              
                              <td>
                              <div className="clearfix">
                                <div className="float-left">
                                  <strong>Nil</strong>
                                </div>
                                
                              </div>                             
                                <div>
                                <CProgress className="progress-xs" color="warning" value="100" />
                                </div>
                              </td>
                              
                              :   
                              <td>
                              <div className="clearfix">
                                <div className="float-left">
                                  <strong>{track.track_count_id.count}</strong>
                                </div>
                                
                              </div>                             
                                <div>
                                <CProgress className="progress-xs" color="success" value={track.track_count_id.count} />
                                </div>
                              </td>
                            }
                          
                          <td className="text-center">
                            Jan 1, 2015
                          </td>
                          <td className="text-center">
                          <button onClick={()=>setRemoveMusic(track.music_name,track.id)} type="button" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                                  <button type="button" class="btn btn-primary" onClick={e=>removeMusic(musicID,e)}>Yes! I am Sure!</button>
                                </div>
                              </div>
                            </div>
                          </div>


                          </td>
                        
                  </tr>
                );
              })
            }
          </tbody>
              </table>
        );
        
        
        
      })


  useEffect(()=>{
    dispatch(getArtistDetail(68))
  },[])


  return (
    <>
      <CCardHeader>
        My Track Lists
      </CCardHeader>
      {trackListDetail}
      {/* <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>Track Name</th>
                    <th className="text-center">Album Name</th>
                    <th>Streaming Count</th>
                    <th className="text-center">Upload Date</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={'avatars/1.jpg'} className="c-avatar-img" alt="admin@bootstrapmaster.com" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Why Not Me</div>
                      <div className="small text-muted">
                        <span>Album Name</span> | Uploded On: Jan 1, 2015
                      </div>
                    </td>
                    <td className="text-center">
                      <div>English</div>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        
                      </div>
                      <CProgress className="progress-xs" color="success" value="50" />
                    </td>
                    <td className="text-center">
                      Jan 1, 2015
                    </td>
                  
                  </tr>
                </tbody>
              </table> */}
              <br />
    </>
  )
}

export default PendingDashboard
