import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useSessionTimeOutCheck } from '../../utilities/LoggedInCheck';
import { isLoggedIn } from '../../utilities/LoggedInCheck';
import LoginPopup from '../auth/LoginPopup';
import { findUser } from '../../api_calls/usersAPI';
import HomePage from '../../pages/HomePage';
import ProfilePage from '../../pages/ProfilePage';
import OwnProfilePage from '../../pages/OwnProfilePage';
import MessengerPage from '../../pages/MessengerPage';

import Profile from '../profilepage/Profile';
import OwnProfile from '../profilepage/OwnProfile';
import Navbar from '../navbar/Navbar';
import getSessionUserID from '../../utilities/GetSessionUserID';
import Feed from '../feed/Feed';


const ProtectedRoutes = ({navigate}) => {
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const sessionUserID = getSessionUserID(token);
  const [sessionUser, setSessionUser] = useState(null);

  // ===== LOGIN POPUP & TIMEOUT CHECKER: COPY TO EVERY AUTHENTICATED PAGE: ==========   
  const showLoginPopup = !useSessionTimeOutCheck(); // checks every 5 seconds if token is valid and changes true/false

  // on component mount: get sessionUserInfo 
  // TODO test:copy to every page, so that it reloads on every new page visit?
  useEffect(() => {
    if (token && sessionUserID) {
      findUser(token, sessionUserID)
      .then(userData => {
        window.localStorage.setItem("token", userData.token)
        setToken(window.localStorage.getItem("token"))
        setSessionUser(userData.user);
        console.log(userData.user);
          })
        }
    },[])
  
  // =========== JSX FOR COMPONENT =================================== 
  return (
  <div className='h-screen w-screen bg-#bgGrey dark:bg-gray-900 flex flex-col'>

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

    {/* MAIN PAGE */}
    <div className='w-screen h-screen flex flex-row '>
    
      {/* MAIN DIV */}
      <div className='w-full h-full'>
        <Routes>
          {/* ------ FEED ------  */}
          <Route path='/'  element={
            <Feed navigate={navigate} token={token} setToken={setToken} 
          sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={setSessionUser}/>} />
          
          {/* ------  PROFILE PAGE ------  */}
          <Route path="/users/:userID"  element={ 
            <Profile navigate={navigate} token={token} setToken={setToken} 
          sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={setSessionUser}/>}/>
          {/* ------  SESSION USER'S PROFILE PAGE ------  */}
          <Route path='/profile'  element={ 
            <OwnProfile navigate={navigate} token={token} setToken={setToken} 
          sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={setSessionUser}/>}/>

          {/* ------  MESSAGES ------  */}
          {/* <Route path='/messages'  element={ 
            <MessengerPage navigate={navigate} token={token} setToken={setToken} 
            sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={sessionUser}/>}/> */}
        </Routes>
      </div>

      {/* MESSENGER DIV - Online friends */}
      <div className='flex flex-row items-center justify-between h-full sm:w-[28rem]  md:w-[30.5rem] lg:w-[34.5rem] px-4
      border-l-2'>
        MESSENGER
      </div>

    </div>
  </div>

  );
}

export default ProtectedRoutes;
