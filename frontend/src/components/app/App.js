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
import Navbar from '../navbar/Navbar';

const App = () => {
  const navigate = useNavigate();

    return (
        <Routes>

          {/* ====== NO AUTHENTICATION - Sign Up or Login: ======== */}
          <Route path='/'  element={ !isLoggedIn() ?         
            <LandingPage navigate={navigate}/> : <Navigate to='/home'/>}/>


          {/* ====== AUTHENTICATION ONLY - Search, Messages, Friends, Notifications : ======== */}
          {/* ------ FEED ------  */}
          <Route path='/home'  element={ isLoggedIn() ? 
              <HomePage navigate={ navigate }/> : <Navigate to="/"/>}/>
          
          {/* ------  PROFILE PAGE ------  */}
          <Route path='/users/:userID'  element={ isLoggedIn() ? 
              <ProfilePage navigate={ navigate }/> : <Navigate to="/"/>}/>
          {/* ------  SESSION USER'S PROFILE PAGE ------  */}
          <Route path='/profile'  element={ isLoggedIn() ? 
              <ProfilePage navigate={ navigate }/> : <Navigate to="/"/>}/>


        </Routes>
    );
}

export default App;
