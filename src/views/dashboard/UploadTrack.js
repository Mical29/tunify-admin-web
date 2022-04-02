import React, { lazy,useEffect,useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getArtistDetail,getAlbums } from 'src/actions/ArtistActions.js'
import {  
  CButton,  
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CProgressBar,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CValidFeedback,
  CInvalidFeedback,
  CSelect,
  CInputFile
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import tunifyAPI from 'src/apis/tunifyAPI'


const UploadTrack = () => {

  const [album_thumbnail, setSelectedFile] = useState();

  const [music_name,setMusicName] = useState()
  const [track_thumbnail, setTrackThumbnail] = useState();
  const [track_file,setTrackFile] = useState();
  const [album_id,setAlbumID] = useState();
  const [trackProgress,setTrackProgress] = useState();
  const [isComplete,setIsComplete] = useState(false);
  
  console.log("Album ID")
  console.log(album_id);

  const [progress,setProgress] = useState()
  const [album_name,setAlbumName] = useState()
  const artist_name = 68
  const dispatch = useDispatch()

  const artistDetail = useSelector((state) => state.ArtistDetail.artistDetailState);
  const albums = useSelector((state) => state.Albums.albums);

  const albumList = albums && albums.map(album =>{
    return(
      
      <option value={album.id}>{album.album_name}</option>
            
         
    )
  })
  
  console.log("Artist Detail");
  console.log(artistDetail);


  useEffect(()=>{
    dispatch(getAlbums(68))
    dispatch(getArtistDetail(68))
  },[])

    const uploadAlbumSubmit = (e) => {
      e.preventDefault();
      
      let data = new FormData()
      console.log("Hi Fomr")
      console.log(album_thumbnail)

      data.append("album_thumbnail", album_thumbnail[0])
      data.append("album_name",album_name)
      data.append("artist_name",artist_name)

      tunifyAPI.post("/tunify/api/create_album/", data, {

        headers: {    
          "Content-Type": "multipart/form-data",    
        },
    
        onUploadProgress: data => {    
          //Set the progress value to show the progress bar    
          setProgress(Math.round((100 * data.loaded) / data.total))    
        },
    
      })
    }

    const uploadTrackForm = (e) =>{
      e.preventDefault();
      
      let data = new FormData()
      

      data.append("music_name", music_name)
      data.append("music_thumbnail",track_thumbnail[0])
      data.append("music_file",track_file[0])
      data.append("album_id",album_id)
      data.append("artist_name",artist_name)

      tunifyAPI.post("/tunify/api/upload_music/", data, {

        headers: {    
          "Content-Type": "multipart/form-data",    
        },
    
        onUploadProgress: data => {    
          //Set the progress value to show the progress bar    
          setTrackProgress(Math.round((100 * data.loaded) / data.total))  
          setIsComplete(true)
        },
    
      })
    }
 

    const trackListDetail =
      artistDetail.map(tracks=>{
        return(
          <table className="table table-hover table-outline mb-0 d-none d-sm-table">
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
            {
              tracks.artist_name.map((track,index)=>{
                return(          
                  <tr>
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
                          
                          <td>
                            
                            {
                              track.track_count_id === null  ? 
                              
                              <td>
                              <div className="clearfix">
                                <div className="float-left">
                                  <strong>Nil</strong>
                                </div>
                                
                              </div>                             
                                <div>
                                <CProgress className="progress-xs" color="warning" value="0" />
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
                            {/* <CProgress className="progress-xs" color="success" value="50" /> */}
                          </td>
                          <td className="text-center">
                            {track.create_at}
                          </td>
                        
                  </tr>
                );
              })
            }
          </tbody>
              </table>
        );
        
        
        
      })
    

    const trackList = artistDetail && artistDetail.map(albums =>{    
      albums.artist_album_name.map(album=>{    
          
        
      })
    })
  

  return (
    <>
    
    <div className="row">
    <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              Add New Track
            </CCardHeader>
            <CCardBody>
              <CForm className="was-validated" onSubmit={uploadTrackForm} encType="multipart/form-data">
                
                <CFormGroup mul>
                  <CLabel htmlFor="inputWarning2i">Track Name</CLabel>
                  <CInput className="form-control-warning" id="inputWarning2i" name="music_name" required placeholder="Enter Track Name" onChange={(e)=>setMusicName(e.target.value)}/>
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                </CFormGroup>

                               
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">Choose Album</CLabel>
                  <CSelect custom name="album" id="album" value={album_id} onChange={(e)=>setAlbumID(e.target.value)}>
                    {/* <option value="">Album Name Here</option> */}
                    {albumList}
                    
                  </CSelect>
                </CFormGroup>
                

                <CFormGroup row>
                  <CLabel col md="5" htmlFor="file-input">Music Thumbnail</CLabel>
                  <CCol xs="12" md="7">
                    <CInputFile id="file-input" name="music_thumbnail" onChange={(e)=>setTrackThumbnail(e.target.files)} required/>
                  </CCol>
                </CFormGroup>
                <CInput className="form-control d-none" name="artist_name" value="68"/>        


                <CFormGroup row>
                  <CLabel col md="5" htmlFor="file-input">Music File</CLabel>
                  <CCol xs="12" md="7">
                    <CInputFile id="file-input" name="music_file" onChange={(e)=>setTrackFile(e.target.files)} required/>
                  </CCol>
                </CFormGroup>
                <CProgress className="progress-xs" color="success" value={trackProgress} />

                
                <CCardFooter>
                  <CButton className="float-right" type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              
                </CCardFooter>


              </CForm>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="6" sm="6">
          <CCard>
            <CCardHeader>
              Add New Album
            </CCardHeader>
            <CCardBody>
              <CForm className="was-validated" onSubmit={uploadAlbumSubmit} encType="multipart/form-data">
                
                <CFormGroup>
                  <CLabel htmlFor="inputWarning2i">Album Name</CLabel>
                  <CInput className="form-control-warning" id="inputWarning2i" required placeholder="Enter Album Name" name="album_name" onChange={e=>{setAlbumName(e.target.value)}}/>
                  
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                </CFormGroup>        

                <CInput className="form-control d-none" name="artist_name" value="68"/>        

                <CFormGroup row>
                  <CLabel col md="5" htmlFor="file-input">Album Thumbnail</CLabel>
                  <CCol xs="12" md="7">
                    <CInputFile id="file-input" name="album_thumbnail" required onChange={e => {setSelectedFile(e.target.files)}}/>
                  </CCol>
                </CFormGroup>
                

                <CProgress className="progress-xs" color="success" value={progress} />

                 

                               
                <CCardFooter>
                  <CButton className="float-right" type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
              
                </CCardFooter>


              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
    </div>
    

      

      <CCardHeader>
        My Current Track List
      </CCardHeader>
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
                <tbody> */}
                  
                {trackListDetail}
                  
                  {/* <tr>
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
                  
                  </tr> */}
                {/* </tbody>
              </table> */}
              <br />
      
    </>
  )
}

export default UploadTrack
