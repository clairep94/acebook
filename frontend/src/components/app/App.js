import './App.css';
import React, { useState } from 'react';
import Feed from '../feed/Feed';
import HomePage from '../../pages/HomePage';
import {
  useNavigate,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { isLoggedIn } from '../../utilities/LoggedInCheck';
import LandingPage from '../../pages/LandingPage';
import ProfilePage from '../../pages/ProfilePage';
import OwnProfilePage from '../../pages/OwnProfilePage';


const App = () => {
  const navigate = useNavigate();

    return (
        <Routes>

          {/* ====== NO AUTHENTICATION - Sign Up or Login: ======== */}
          <Route path='/welcome'  element={ !isLoggedIn() ?         
            <LandingPage navigate={navigate}/> : <Navigate to='/'/>}/>


          {/* ====== AUTHENTICATION ONLY - Search, Messages, Friends, Notifications : ======== */}
          {/* ------ FEED ------  */}
          <Route path='/'  element={ isLoggedIn() ? 
              <HomePage navigate={ navigate }/> : <Navigate to="/welcome"/>}/>
          
          {/* ------  PROFILE PAGE ------  */}
          <Route path='/users/:userID'  element={ isLoggedIn() ? 
              <ProfilePage navigate={ navigate }/> : <Navigate to="/welcome"/>}/>
          {/* ------  SESSION USER'S PROFILE PAGE ------  */}
          <Route path='/profile'  element={ isLoggedIn() ? 
              <OwnProfilePage navigate={ navigate }/> : <Navigate to="/welcome"/>}/>


        </Routes>
    );
}

export default App;
