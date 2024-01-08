import React, {useEffect, useState, useRef} from 'react'
import {io} from 'socket.io-client';
import { fetchChats } from "../api_calls/chatsAPI";
import ChatSearchBar from '../components/messaging/chat_searchbar/ChatSearchBar';
import ChatsMenu from '../components/messaging/ChatsMenu';


import ChatCard from '../components/messaging/ChatCard';
import InputEmoji from 'react-input-emoji';
import ProfilePicture from '../components/user/ProfilePicture';
import { BsPersonCircle } from "react-icons/bs";
import { fetchMessages, sendMessage } from '../api_calls/messagesAPI';
import MessageCard from '../components/messaging/MessageCard';

export default function MessagingPage({ navigate, token, setToken, sessionUserID, sessionUser, setSessionUser }) {

  // ============================= SESSION USER & TOKEN =========================================
  // see props

  // ============================== CHATS & CURRENT CHAT =============================================
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);


  // ---------- COMPONENT MOUNT: Get SessionUser's chats ------------
  useEffect(() => {
    if (token) {
      fetchChats(token, sessionUserID)
      .then(chatsData => {
        window.localStorage.setItem("token", chatsData.token)
        setToken(window.localStorage.getItem("token"))

        setChats(chatsData.chats);
        console.log(chatsData.chats);
      })
    }
  },[])


  // ====================== SOCKET: Realtime messages, conversations, online users ===============================

  // ------------ Socket setup: -------------------------------
  const socket = useRef() //menu, chatwindow
  const [onlineUsers, setOnlineUsers] = useState([]); //menu
  const [sendMessage, setSendMessage] = useState(null); //chatwindow
  const [receivedMessage, setReceivedMessage] = useState(null); //chatwindow, menu
  const [sendNewConversation, setSendNewConversation] = useState(null); //menu

  // Connect to socket.io when users visit the messages page //TODO lift this to app after login?
  useEffect(()=> {
      socket.current = io('http://localhost:8800'); // this is the socket port
      socket.current.emit("new-user-add", sessionUserID); // send the sessionUserID to the socket server
      socket.current.on('get-users', (users)=>{
          setOnlineUsers(users)}) // get the onlineUsers, which should now include the sessionUserID
  }, [sessionUserID])

  // Checks if a certain user in a chat is online (connected to socket.io)
  // const checkOnlineStatus = (chat) => {
  //   if (chat) {
  //     const chatMember = chat.members.find((member) => member._id !== sessionUserID); // find the chatMember
  //     const online = onlineUsers.find((user) => user.userID === chatMember._id); // check if the chatMember is in the onlineUsers array
  //     return online ? true : false;
  //   }
  // };
  const checkOnlineStatus = (chat) => {return true}



  // ========= COMPONENT MOUNT: Set Current Chat's messages ===============
  useEffect(() => {
    if (token && currentChat) {
      fetchMessages(token, currentChat)
      .then(messagesData => {
        window.localStorage.setItem("token", messagesData.token)
        setToken(window.localStorage.getItem("token"))

        setMessages(messagesData.allMessages);
      })
    }
  }, [currentChat]);

  
  // MOVE TO CHAT WINDOW:
  // Loading messages, sending messages, receiving messages:
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");




  // =============================== JSX FOR COMPONENT ===============================================================

  return (
    <div className='w-full flex mb-2 '>

      {/* ================ LEFT SIDE CHATS MENU ============================== */}
      <div aria-label='chats menu container' id='chats-menu-container'
      className='min-w-[26rem] max-w-[26rem] shadow-xl border-r-gray-900 flex flex-col z-10 bg-white py-4 px-4 space-y-2'>
        <ChatsMenu sessionUserID={sessionUserID} chats={chats} setChats={setChats} currentChat={currentChat} setCurrentChat={setCurrentChat}
        socket={socket} checkOnlineStatus={checkOnlineStatus} receivedMessage={receivedMessage} 
        sendMessage={sendMessage} setSendNewConversation={setSendNewConversation}
        />
      </div>
    
    {/* ===================== RIGHT CHAT WINDOW ============================== */}
    {currentChat ? (
    <>
      {/* ============ CHAT SELECTED ======================= */}
      <div className='w-full flex flex-col bg-white'>
        {/*  --------- HEADER ---------------- */}
        <div className='bg-white h-[6rem] p-4 pl-5 pr-5 shadow-[0px_0px_7px_0px_#d9deed] flex flex-row items-center justify-between'>

          {/* LEFT SIDE CONTAINER */}
          <div className='flex flex-row items-center'>
            {/* PROFILE PICTURE */}
            <div className='w-[4rem] h-[4rem] mr-3 relative'>
              {/* ONLINE DOT */}
              {checkOnlineStatus(currentChat) && <div className='bg-lime-400 w-5 h-5 rounded-full absolute left-12 bottom-0 border-white border-solid border-[0.2rem]'/>}
              {/* PROFILE PICTURE */}
              <ProfilePicture id={currentChat.members[1]._id} name={currentChat.members[1].firstName + ` ` + currentChat.members[1].lastName}/>
            </div>

            {/* NAME & ONLINE STATUS */}
            <div aria-label='partner and online status' className='translate-y-1'>
              <h4 className='font-semibold text-[1.2rem] '>
                {currentChat.members[1].firstName} {currentChat.members[1].lastName}
              </h4>
              <p className='text-[#8a8a8a] text-sm -translate-y-1'>
                Active Now
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: GO TO PROFILE ICON */}
          <div className='group relative hidden sm:block'>
            <div className='rounded-full text-[2.5rem] text-[#5acad2] hover:bg-slate-100 h-[3.5rem] w-[3.5rem] text-center p-[0.5rem] mr-4'
              onClick={() => {navigate(`/users/${currentChat.members[1]._id}`)}}>
              <BsPersonCircle />
            </div>
            <div className='hidden group-hover:block absolute w-[6rem] text-sm font-light bg-black/60 text-white p-2 rounded-md 
            translate-y-1 -translate-x-5 z-50'>
              Go to profile
            </div>
          </div>

        </div>

        {/* ----------------- MESSAGES ----------------------- */}
        <div className='flex flex-grow flex-col w-full overflow-scroll px-5 mt-5'>
          {currentChat && messages && (
            messages.map((message) => (
                <MessageCard key={message._id} message={message} sessionUserID={sessionUserID} />
              ))
          )}
        </div>

        {/* INPUT FIELD */}
        <div className='flex flex-row h-[6rem] min-h-[6rem] items-center px-4'>
          <InputEmoji placeholder='Aa'/>
        </div>
      </div>

    </>
    ):(
      <>
        {/* =============== NO CHAT SELECTED =================== */}
        <div aria-label='no chat selected' id='no-chat-window'
        className='w-full items-center justify-center flex flex-col'>
          <img src='/images/pickChat.png'
            alt='pick a chat'>
          </img>
          <h3 className='font-bold text-[1.5rem] mt-9 text-slate-600'>
            Pick a chat!
          </h3>
        </div>
      </>
      )
    }


  

      {/* <div className='overflow-scroll w-full px-10 pt-10 bg-red-200'> */}
        {/* LENGTH TESTER */}
        {/* <div className='w-[50px] h-[100rem] bg-green-100'></div>
        <div className='w-[60px] h-5 bg-purple-200'></div>
      </div> */}

      
    </div>
  )
  

}
