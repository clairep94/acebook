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
import isLoggedIn from '../../utilities/LoggedInCheck';
import LandingPage from '../../pages/LandingPage';

const App = () => {
  const navigate = useNavigate();

    return (
        <Routes>

          {/* ====== NO AUTHENTICATION: ======== */}
          <Route path='/'  element={ !isLoggedIn() ?         
            <LandingPage navigate={navigate}/> : <Navigate to='/home'/>}/>


          <Route path='/login'  element={ !isLoggedIn() ?         
            <LoginForm navigate={navigate}/> : <Navigate to='/home'/>}/>
          <Route path='/signup' element={ !isLoggedIn() ? 
            <SignUpForm navigate={navigate}/> : <Navigate to='/home'/>}/>

          {/* ====== AUTHENTICATION ONLY: ======== */}
          <Route path='/home'  element={ isLoggedIn() ? 
              <HomePage navigate={ navigate }/> : <Navigate to="/login"/>}/>
          
        </Routes>
    );
}

export default App;
