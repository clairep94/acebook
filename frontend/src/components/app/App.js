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
import AuthenticatedRoutes from './AuthenticatedRoutes';


const App = () => {
  const navigate = useNavigate();

    return (
        <Routes>

          {/* ====== AUTHENTICATION ONLY - Search, Messages, Friends, Notifications : ======== */}
          <Route path='/'  element={ isLoggedIn() ?         
            <AuthenticatedRoutes navigate={navigate}/> : <Navigate to='/welcome'/>}/>

          {/* ====== NO AUTHENTICATION - Sign Up or Login: ======== */}
          <Route path='/welcome' element={ !isLoggedIn() ?
            <LandingPage navigate={navigate}/> : <Navigate to='/'/>}/>

        </Routes>
    );
}

export default App;
