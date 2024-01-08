import React, {useEffect, useState, useRef} from 'react'
import {io} from 'socket.io-client';
import { fetchChats } from "../api_calls/chatsAPI";
import ChatSearchBar from '../components/messaging/chat_searchbar/ChatSearchBar';
import ChatsMenu from '../components/messaging/ChatsMenu';


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
    {currentChat ? (<>
      {/* ============ CHAT SELECTED ======================= */}
      <div className='w-full flex flex-col bg-green-50'>
        {/* HEADER */}
        <div className='bg-white h-[6rem] p-4 pl-5 shadow-[0px_0px_7px_0px_#d9deed]
        flex flex-row items-center'>
          <div className='w-[4rem] h-[4rem] bg-zinc-300 rounded-full mr-3'>
                dot if online
          </div>
          <div aria-label='partner and online status' className='translate-y-1'>
            <h4 className='font-semibold text-[1.2rem] '>
              {currentChat.members[1].firstName} {currentChat.members[1].lastName}
            </h4>
            <p className='text-[#8a8a8a] text-sm -translate-y-1'>
              Active Now
            </p>
          </div>
        </div>

        {/* MESSAGES */}
        <div className='flex flex-grow flex-col bg-red-50 w-full overflow-scroll px-5'>
          HOW DO I DO THIS PART
          <div className='h-[2rem]'>Message 1</div>
          <div className='h-[2rem]'>Message 1</div>
          <div className='h-[2rem]'>Message 1</div>
                  <div className='h-[2rem]'>Message 1</div>
          <div className='h-[2rem]'>Message 1</div>
          <div className='h-[2rem]'>Message 1</div>
          <div className='h-[2rem]'>Message 1</div>

        </div>

        {/* INPUT FIELD */}
        <div className='flex flex-row bg-green-200 h-[5rem] min-h-[5rem] items-center px-4'>
          INPUT
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
