import React, { useState, useEffect, useRef } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useSessionTimeOutCheck } from '../../utilities/LoggedInCheck';
import { isLoggedIn } from '../../utilities/LoggedInCheck';
import LoginPopup from '../auth/LoginPopup';
import { findUserFullProfile } from '../../api_calls/usersAPI';
import {io} from 'socket.io-client';

// import { fetchChats } from "../../api_calls/chatsAPI";

import Navbar from '../navbar/Navbar';
import getSessionUserID from '../../utilities/GetSessionUserID';

import ProfilePage from '../../pages/ProfilePage'
import FriendsPage from '../../pages/FriendsPage';




const ProtectedRoutes = ({navigate}) => {


  // =========== TOKEN & SESSION USER DATA =======================
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const sessionUserID = getSessionUserID(token);
  const [sessionUser, setSessionUser] = useState(null);

  // On component mount, get sessionUser Data
  useEffect(() => {
    if (token && sessionUserID) {
      findUserFullProfile(token, sessionUserID)
      .then(userData => {
        window.localStorage.setItem("token", userData.token)
        setToken(window.localStorage.getItem("token"))
        setSessionUser(userData.user);
        console.log(userData.user);
        console.log(sessionUserID)
          })
        }
    },[])
  




  // ============= LOGIN POPUP & TIMEOUT CHECKER ===================   
  const showLoginPopup = !useSessionTimeOutCheck(); // checks every 5 seconds if token is valid and changes true/false

  
  // =================== JSX FOR COMPONENT =================================== 
  return (
  <div className='h-screen w-screen bg-slate-100 dark:bg-gray-900 flex flex-col'> 
  {/* FULL PAGE */}

    {/* LOGGED OUT POPUP */}
    {showLoginPopup && 
      <div className='z-40 absolute h-full w-full'>
        <LoginPopup navigate={navigate} />
      </div>
      }

    {/* NAV BAR */}
    <div className='z-30'>
      <Navbar navigate={navigate} token={token} setToken={setToken} 
        sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={setSessionUser}/>
    </div>

    {/* =============== MAIN PAGE ============================= */}
    <div className='h-full w-full flex flex-row overflow-auto'>
      <Routes>
        {/* ------ FEED ------  */}
        {/* <Route path='/'  element={
          <Feed navigate={navigate} token={token} setToken={setToken} 
        sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={setSessionUser}/>} /> */}
        
        {/* ------  PROFILE PAGE ------  */}
        <Route path="/users/:userID"  element={ 
            <ProfilePage navigate={navigate} token={token} setToken={setToken} 
          sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={setSessionUser}/>}/>

        {/* ------  FRIENDS PAGE ------  */}
        <Route path="/friends"  element={ 
            <FriendsPage />}/>



      </Routes>

    </div>
  </div>

  );
}

export default ProtectedRoutes;
