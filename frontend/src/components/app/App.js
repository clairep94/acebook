import './App.css';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../user/SignUpForm'
import React, { useState } from 'react';
import Feed from '../feed/Feed'
import {
  useNavigate,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import isLoggedIn from '../../utilities/LoggedInCheck';

const App = () => {
  const navigate = useNavigate();

    return (
        <Routes>

          {/* ====== NO AUTHENTICATION: ======== */}
          <Route path='/login'  element={ !isLoggedIn() ?         
            <LoginForm navigate={navigate}/> : <Navigate to='/posts'/>}/>
          <Route path='/signup' element={ !isLoggedIn() ? 
            <SignUpForm navigate={navigate}/> : <Navigate to='/posts'/>}/>

          {/* ====== AUTHENTICATION ONLY: ======== */}
          <Route path='/posts'  element={ isLoggedIn() ? 
              <Feed navigate={ navigate }/> : <Navigate to="/login"/>}/>
          
        </Routes>
    );
}

export default App;
