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
import ChatWindow from '../components/messaging/ChatWindow';

export default function MessagingPage({ navigate, token, setToken, sessionUserID, sessionUser, setSessionUser }) {

  // ============================= SESSION USER & TOKEN =========================================
  // see props

  // ============================== CHATS & CURRENT CHAT =============================================
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  // ---------- COMPONENT MOUNT: Get SessionUser's chats from DB ------------
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

  // --------- CONNECTING TO SOCKET & ONLINE USERS -----------------
  // Connect to socket.io when users visit the messages page //TODO lift this to app after login?
  useEffect(()=> {
      socket.current = io('http://localhost:8800'); // this is the socket port
      socket.current.emit("new-user-add", sessionUserID); // send the sessionUserID to the socket server
      socket.current.on('get-users', (users)=>{
          setOnlineUsers(users)}) // get the onlineUsers, which should now include the sessionUserID
  }, [sessionUserID])

  // Checks if a certain user in a chat is online (connected to socket)
  const checkOnlineStatus = (chat) => {
    if (chat) {
      const chatMember = chat.members.find((member) => member._id !== sessionUserID); // find the chatMember
      const online = onlineUsers.find((user) => user.userID === chatMember._id); // check if the chatMember is in the onlineUsers array
      return online ? true : false;
    }
  };

  // ------------- MESSAGES ----------------------------
  // Send messages to the socket server;
  // Listens to ChatWindow to see if it setSendMessage something new
  useEffect(() => {
    if(sendMessage!==null){
      socket.current.emit("send-message", sendMessage);
    }
  },[sendMessage])

  // Get new messages & conversations from the socket server;
  // Listens to the socket server to see if there are "receive-message" or "recieve-new-conversation" signals
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("recieved data in chats.jsx:", data);
          
      setReceivedMessage(data);
      console.log("current received message: ", receivedMessage);
      })
  }, [])



  // ------------- CHATS ----------------------------
  // Sending a new chat to partner through socket
  useEffect(() => { //TODO UNTESTED
    if(sendNewConversation !== null) {
      console.log("newConversationSet")
      socket.current.emit("send-new-conversation", sendNewConversation);
    }
  },[sendNewConversation])

  // Receiving a new chat from socket
  useEffect(() => {
    socket.current.on("receive-new-conversation", (data) => {
    console.log("received new conversation in chats.jsx", data);

    const newConvo = {
        _id: data._id,
        members: data.members,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
    setChats([...chats, newConvo]);
    })
  })




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
      <ChatWindow token={token} setToken={setToken} sessionUserID={sessionUserID} checkOnlineStatus={checkOnlineStatus}
      currentChat={currentChat} setSendMessage={setSendMessage} receivedMessage={receivedMessage} navigate={navigate}
      />
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
