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
  const [receivedMessage, setReceivedMessage] = useState(null);
  // const [receivedChat, setReceivedChat] = useState(null);

  // // ----------- SOCKET ---------------------------------
  // // Connect to socket.io when users visit the messages page //TODO lift this to app after login?
  // useEffect(()=> {
  //     socket.current = io('http://localhost:8800'); // this is the socket port
  //     socket.current.emit("new-user-add", sessionUserID); // send the sessionUserID to the socket server
  //     socket.current.on('get-users', (users)=>{
  //         setOnlineUsers(users)}) // get the onlineUsers, which should now include the sessionUserID
  // }, [sessionUserID])


    //   // Send messages to the socket server;
    // // Listens to ChatBox to see if it setSendMessage something new
    // useEffect(() => {
    //     if(sendMessage!==null){
    //         socket.current.emit("send-message", sendMessage);
    //     }
    // },[sendMessage])
    // useEffect(() => { //TODO UNTESTED
    //     if(sendNewConversation !== null) {
    //         console.log("newConversationSet")
    //         socket.current.emit("send-new-conversation", sendNewConversation);
    //     }
    // },[sendNewConversation])

    // // Get new messages & conversations from the socket server;
    // // Listens to the socket server to see if there are "receive-message" or "recieve-new-conversation" signals
    // useEffect(() => {
    //     socket.current.on("receive-message", (data) => {
    //         console.log("recieved data in chats.jsx:", data);
            
    //         setReceivedMessage(data);
    //         console.log("current received message: ", receivedMessage);
    //     })
    // }, [])

    // useEffect(() => {
    //     socket.current.on("receive-new-conversation", (data) => {
    //         console.log("received new conversation in chats.jsx", data);

    //         const newConvo = {
    //             _id: data._id,
    //             members: data.members,
    //             createdAt: data.createdAt,
    //             updatedAt: data.updatedAt
    //         }
    //         setChats([...chats, newConvo]);
    //     })
    // })


    // // Checks if a certain user in a chat is online (connected to socket.io)
    // const checkOnlineStatus = (chat) => {
    //     if (chat) {
    //         const chatMember = chat.members.find((member) => member._id !== sessionUserID); // find the chatMember
    //         const online = onlineUsers.find((user) => user.userID === chatMember._id); // check if the chatMember is in the onlineUsers array
    //         return online ? true : false;
    //     }
    // };



  // ============= LOGIN POPUP & TIMEOUT CHECKER ===================   
  const showLoginPopup = !useSessionTimeOutCheck(); // checks every 5 seconds if token is valid and changes true/false

  
  // =================== JSX FOR COMPONENT =================================== 
  return (
  <div className='h-screen w-screen bg-slate-100 dark:bg-gray-900 flex flex-col'>

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
    <div className='w-screen h-screen flex flex-row'>
    
      {/* MAIN DIV */}
      <div className='w-full h-full '>
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
            sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={sessionUser}
            currentChat={currentChat}
            />}/>
        </Routes>
      </div>

      {/* CHATSLIST DIV - Search Friends and See list of chats, see which friends are online */}
      <div className='flex flex-col h-11/12 w-[25rem] m-4 px-8 bg-white pt-10 rounded-2xl shadow-md'>
        <ChatsList sessionUserID={sessionUserID} checkOnlineStatus={checkOnlineStatus} chatsList={chatsList} setCurrentChat={setCurrentChat} />
      </div>

    </div>
  </div>

  );
}

export default ProtectedRoutes;
