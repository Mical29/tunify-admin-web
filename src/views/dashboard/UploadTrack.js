import React, { lazy,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { getArtistDetail } from 'src/actions/ArtistActions.js'
import {  
  CButton,  
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
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


const UploadTrack = () => {

  const dispatch = useDispatch()

  const artistDetail = useSelector((state) => state.ArtistDetail.artistDetailState);
  console.log("Artist Detail")
  console.log(artistDetail)


  useEffect(()=>{
    dispatch(getArtistDetail(68))
  },[])

 

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
              <CForm className="was-validated">
                
                <CFormGroup>
                  <CLabel htmlFor="inputWarning2i">Track Name</CLabel>
                  <CInput className="form-control-warning" id="inputWarning2i" required placeholder="Enter Track Name"/>
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                </CFormGroup>

                               
                <CFormGroup>
                  <CLabel htmlFor="ccmonth">Choose Album</CLabel>
                  <CSelect custom name="album" id="album">
                    <option value="">Album Name Here</option>
                    
                  </CSelect>
                </CFormGroup>

                <CFormGroup row>
                  <CLabel col md="5" htmlFor="file-input">Music Thumbnail</CLabel>
                  <CCol xs="12" md="7">
                    <CInputFile id="file-input" name="file-input" required/>
                  </CCol>
                </CFormGroup>

                <CFormGroup row>
                  <CLabel col md="5" htmlFor="file-input">Music File</CLabel>
                  <CCol xs="12" md="7">
                    <CInputFile id="file-input" name="file-input" required/>
                  </CCol>
                </CFormGroup>
                
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
              <CForm className="was-validated">
                
                <CFormGroup>
                  <CLabel htmlFor="inputWarning2i">Album Name</CLabel>
                  <CInput className="form-control-warning" id="inputWarning2i" required placeholder="Enter Album Name"/>
                  <CInvalidFeedback className="help-block">
                    Please provide a valid information
                  </CInvalidFeedback>
                  <CValidFeedback className="help-block">Input provided</CValidFeedback>
                </CFormGroup>                

                <CFormGroup row>
                  <CLabel col md="5" htmlFor="file-input">Album Thumbnail</CLabel>
                  <CCol xs="12" md="7">
                    <CInputFile id="file-input" name="file-input" required/>
                  </CCol>
                </CFormGroup>

                               
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
