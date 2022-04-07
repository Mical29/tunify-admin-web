import React, { useEffect,} from 'react';
// import { HashRouter} from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './scss/style.scss';
import {useSelector, useDispatch} from 'react-redux';
import { loadUser, } from './actions/UserActions';
import { getArtistDetail } from './actions/ArtistActions';
import { getUserCookie } from './cookies/cookie';
import { TheLayout } from './containers';
import UploadTrack from './views/dashboard/UploadTrack'

import Login from './views/pages/login/Login';

const loading = (
  <div className="pt-3 text-center">
    <h1>Hello World</h1>
    <div className="sk-spinner sk-spinner-pulse">Loading</div>
  </div>
)

// Containers
// const TheLayout = React.lazy(import('./containers/TheLayout'));

// Pages
// const Login =import('./views/pages/login/Login');
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App()  {

     const dispatch = useDispatch();
     const userDetail = useSelector((state) => state.Users);
     const artistDetail = useSelector((state) => state.ArtistDetail.artistDetailState);
     console.log("User Detail")
     console.log(userDetail)

    useEffect(() => {
      
        dispatch(loadUser())
      
      if(userDetail.isAuthenticated === true){
        dispatch(getArtistDetail(68))
      }
      
      
    }, [])

    if(getUserCookie("token")===null){
      return(
      <Router>
    
        <Switch>

          {/* Need to add page for / route */}
          
          <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
          
        </Switch>
      
  </Router>
      );

    }
    else{
      return (
       
        <Router>
          
            <Switch>
              
              {/* <Route  path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route  path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
              <Route  exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route  exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout data={artistDetail}/>} />
            </Switch>
         
      </Router>
      );
    }
    
  
}

export default App;
