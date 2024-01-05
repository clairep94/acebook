import React, { useState, useEffect, useRef } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useSessionTimeOutCheck } from '../../utilities/LoggedInCheck';
import { isLoggedIn } from '../../utilities/LoggedInCheck';
import LoginPopup from '../auth/LoginPopup';
import { findUser } from '../../api_calls/usersAPI';
import {io} from 'socket.io-client';
import { fetchChats } from "../../api_calls/chatsAPI";
import ChatsList from '../messaging/ChatsList';

import Profile from '../profilepage/Profile';
import OwnProfile from '../profilepage/OwnProfile';
import Navbar from '../navbar/Navbar';
import getSessionUserID from '../../utilities/GetSessionUserID';
import Feed from '../feed/Feed';
import ChatWindow from '../messaging/ChatWindow';


const ProtectedRoutes = ({navigate}) => {

  // =========== TOKEN & SESSION USER DATA =======================
  const [token, setToken] = useState(window.localStorage.getItem('token'));
  const sessionUserID = getSessionUserID(token);
  const [sessionUser, setSessionUser] = useState(null);

  // On component mount, get sessionUser Data
  useEffect(() => {
    if (token && sessionUserID) {
      findUser(token, sessionUserID)
      .then(userData => {
        window.localStorage.setItem("token", userData.token)
        setToken(window.localStorage.getItem("token"))
        setSessionUser(userData.user);
        console.log(userData.user);
        console.log(sessionUserID)
          })
        }
    },[])
  
  // =========== CHATS LIST & MESSAGES =================
  const [chatsList, setChatsList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [chatSearchResult, setChatSearchResult] = useState(null);

  // On component mount, get sessionUser's chats list
  useEffect(() => {
    if (token) {
      fetchChats(token, sessionUserID)
      .then(chatsData => {
        window.localStorage.setItem("token", chatsData.token)
        setToken(window.localStorage.getItem("token"))

        setChatsList(chatsData.chats);
        console.log(chatsData.chats);
      })
    }
  },[])

  // Checks if a certain user in a chat is online (connected to socket.io)
  const checkOnlineStatus = (chat) => {
      if (chat) {
        const chatMember = chat.members.find((member) => member._id !== sessionUserID); // find the chatMember
        const online = onlineUsers.find((user) => user.userID === chatMember._id); // check if the chatMember is in the onlineUsers array
        return online ? true : false;
      }
    };


  // =========== SOCKET ====================
  const socket = useRef()
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [sendStartChat, setSendStartChat] = useState(null);
  // const [receivedMessage, setReceivedMessage] = useState(null);
  // const [receivedChat, setReceivedChat] = useState(null);

  // TODO socket stuff



  // ============= LOGIN POPUP & TIMEOUT CHECKER ===================   
  const showLoginPopup = !useSessionTimeOutCheck(); // checks every 5 seconds if token is valid and changes true/false

  
  // =================== JSX FOR COMPONENT =================================== 
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
          <Route path='/messages'  element={ 
            <ChatWindow navigate={navigate} token={token} setToken={setToken} 
            sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={sessionUser}/>}/>
        </Routes>
      </div>

      {/* CHATSLIST DIV - Search Friends and See list of chats, see which friends are online */}
      {/* <div className='flex flex-row h-full sm:w-[28rem]  md:w-[30.5rem] lg:w-[34.5rem] px-4
      border-l-2'> */}
      <div className='flex flex-col h-full bg-slate-300 w-[20rem]'>
      sessionUserID: {sessionUserID}
      {/* {chatsList.map((chat) => (
        <div className='bg-red-100' key={chat._id}>
          <div className='text-sm text-black'>
            {chat._id}
          </div>
        </div>
      ))} */}
  <ChatsList sessionUserID={sessionUserID} checkOnlineStatus={checkOnlineStatus} chatsList={chatsList} setCurrentChat={setCurrentChat} />
</div>


    </div>
  </div>

  );
}

export default ProtectedRoutes;
