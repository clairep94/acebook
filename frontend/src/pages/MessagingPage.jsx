import React, {useEffect, useState, useRef} from 'react'
import {io} from 'socket.io-client';
import { fetchChats } from "../api_calls/chatsAPI";


export default function MessagingPage({ navigate, token, setToken, sessionUserID, sessionUser, setSessionUser }) {

  // ============= SESSION USER & TOKEN ====================



  // ============= CHATS & CURRENT CHAT ==========================
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


  // ============ CHATSEARCH BAR ==========================
  const [chatSearchResults, setChatSearchResults] = useState([]);



  // ============ SOCKET ===========================
  // Socket setup:
  const socket = useRef()
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [sendNewConversation, setSendNewConversation] = useState(null);


  // TODO: After formatting messages non-realtime + checkonlineStatus




  // ======================== JSX FOR COMPONENT =============================================

  return (
    <div className='w-full flex mb-2 '>
      {/* MENU - no overflow? */}
      <div className='min-w-[26rem] max-w-[26rem] shadow-xl border-r-gray-900 flex flex-col z-10 bg-white py-4 px-4 space-y-2'>
        <h1 className='text-[2rem] font-bold pb-4'>
          Chats
        </h1>
        {/* CHAT SEARCHBAR */}
        <div>
          Chat search bar & search results
        </div>

        {/* CHAT CARDS */}
        <div className='space-y-1 overflow-auto'>
          {chats.map((chat, index) => (
            <div id={index} onClick={() => {setCurrentChat(chat)}}
            className='h-[6rem] w-full rounded-lg bg-blue-50 p-3
            flex flex-row items-center
            '
            >
              <div className='w-[4.5rem] h-[4.5rem] bg-zinc-300 rounded-full mr-3'>
                dot if online
              </div>
              <div aria-label='partner and last message'>
                <h4 className='font-semibold text-lg'>
                  {chat.members[1].firstName} {chat.members[1].lastName}
                </h4>
                <p className='text-[#8a8a8a] text-sm'
                >
                  Last message shorten a number of ... · 1d
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    {/* MAIN - NO CHAT SELECTED */}
    {/* <div className='w-full items-center justify-center flex flex-col'>
      <img src='/images/pickChat.png'
        alt='pick a chat'>
      </img>
      <h3 className='font-bold text-[1.5rem] mt-9 text-slate-600'>
        Pick a chat!
      </h3>
    </div> */}

    {/* MAIN - CHAT SELECTED */}
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

  

      {/* <div className='overflow-scroll w-full px-10 pt-10 bg-red-200'> */}
        {/* LENGTH TESTER */}
        {/* <div className='w-[50px] h-[100rem] bg-green-100'></div>
        <div className='w-[60px] h-5 bg-purple-200'></div>
      </div> */}

      
    </div>
  )
  

}
