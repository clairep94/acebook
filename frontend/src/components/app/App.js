import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
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
import Navbar from '../navbar/Navbar';

const App = () => {
  const navigate = useNavigate();

    return (
        <Routes>

          {/* ====== NO AUTHENTICATION - Sign Up or Login: ======== */}
          <Route path='/'  element={ !isLoggedIn() ?         
            <LandingPage navigate={navigate}/> : <Navigate to='/home'/>}/>

          {/* ====== AUTHENTICATION ONLY - Feed, Profile, Search, Messages, Friends, Notifications : ======== */}
          <Route path='/home'  element={ isLoggedIn() ? 
              <HomePage navigate={ navigate }/> : <Navigate to="/"/>}/>

        </Routes>
    );
}

export default App;
