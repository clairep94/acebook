import React, { useEffect, useState, useRef } from 'react'
import InputEmoji from 'react-input-emoji';
import { fetchMessages, sendMessage } from '../../api_calls/messagesAPI';
import { BsPersonCircle } from "react-icons/bs";

import ProfilePicture from '../user/ProfilePicture';
import MessageCard from './MessageCard';


export default function ChatWindow({ token, setToken, sessionUserID,  
  currentChat, setSendMessage, receivedMessage, navigate }) {

  //TODO 
  const online = true;

  // =========== STATE VARIABLES ==========================
  const conversationPartner = currentChat?.members?.find((user) => user._id !== sessionUserID) // Conversation model uses .populate

  // Loading messages, sending messages, receiving messages:
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  // ========= COMPONENT MOUNT: Set Current Chat's messages ===============
  useEffect(() => {
    if (token && conversationPartner && currentChat) {
      fetchMessages(token, currentChat)
      .then(messagesData => {
        window.localStorage.setItem("token", messagesData.token)
        setToken(window.localStorage.getItem("token"))

        setMessages(messagesData.allMessages);
      })
    }
  }, [currentChat]);


  // ================== SENDING A MESSAGE ===============================

  // Change newMessage when something is written to InputEmoji 
  const handleChange=(newMessage)=>{
    setNewMessage(newMessage); // --> Don't need to use event.target because it is not a 'form'
  }

  // Sending a message to both the Backend API and socket.io 
  const handleSend = async (event) => {

    // event.preventDefault(); // --> This is not needed for InputEmoji, as it is not a 'form'
    const receiver = currentChat.members.find((member) => member._id !== sessionUserID);
    const receiverID = receiver._id

    const messageToSend = {
      chatID: currentChat._id,
      authorID: sessionUserID,
      body: newMessage
    }

    // Send the message to the database:
    if (token && conversationPartner && newMessage.trim()) { // check that there is a conversationPartner and that newMessage is not all whitespaces
      sendMessage(token, messageToSend)
      .then(sentMessageData => {
          window.localStorage.setItem("token", sentMessageData.token)
          setToken(window.localStorage.getItem("token"))

          // add newMessage to the messages array:
          setMessages([...messages, sentMessageData.newMessage]);

          // send message to the socket server: -- check if this needs to be separate
          setSendMessage({...sentMessageData.newMessage, receiverID}); // this adds receiverID: receiverID to messageToSend

          // clear newMessage: -- check if this needs to be after
          setNewMessage("");
      })
    }
  }




  // ======================== JSX FOR COMPONENT =============================================
  return (
  <div className='flex flex-col h-full ml-4 mr-1'>

    {/* CONTAINER */}
    <div className='bg-white h-full my-4 rounded-2xl shadow-xl p-10 px-3 pt-6 pb-5'>

      {!currentChat ? (<>
      {/* ============ START A CHAT MESSAGE ======================== */}
        <h3 aria-label='no current chat selected'
          className='text-center text-gray-400 text-[1.5rem] font-light
          translate-y-10
          '>
          Tap on a chat to start a conversation...
        </h3>
      </>) : (<>
        
        {/* CONTAINER CONTENT */}
        <div className='w-full h-full  flex flex-col'>
          {/* ============ HEADER ======================== */}
          <div className='h-21 w-full flex flex-col items-center px-6'>
              <div className='h-20 w-full flex flex-row justify-between items-center'>
                <div className='flex flex-row'>
                  {/* PROFILE PICTURE */}
                  <div className='w-[4rem] h-[4rem] mr-3 relative'>
                    {online && 
                    <div className='bg-lime-400 w-5 h-5 rounded-full absolute left-12 bottom-0 border-white border-solid border-[0.18rem]'
                    />}
                      <ProfilePicture id={conversationPartner._id} name={conversationPartner.firstName + ` ` + conversationPartner.lastName}/>
                  </div>
                  {/* NAME & ACTIVITY STATUS */}
                  <div className='flex flex-col justify-center'>
                    <span className='text-xl font-bold translate-y-[0.15rem] text-black'>
                      {`${conversationPartner.firstName} ${conversationPartner.lastName}`}
                    </span>
                    <span className='text-[15px]'
                      style={{color: "grey"}}>
                      {online? "Active Now" : "Offline"}
                    </span>
                  </div>
                </div>
                {/* GO TO PROFILE ICON */}
                <div className='group relative hidden sm:block'>
                  <div className='rounded-full text-[2.2rem] text-[#5acad2] hover:bg-slate-100 h-[3rem] w-[3rem] text-center p-[0.4rem] mr-4'
                    onClick={() => {navigate(`/users/${conversationPartner._id}`)}}>
                    <BsPersonCircle />
                  </div>
                  <div className='hidden group-hover:block absolute w-[6rem] text-sm font-light bg-black/60 text-white p-2 rounded-md 
                  translate-y-1 -translate-x-5 z-50'>
                    Go to profile
                  </div>
                </div>
            </div>
              {/* HORIZONTAL BREAK LINE */}
              <hr style={{width: '93%', border: '0.1px solid #ececec'}}/>
          </div>

          {/* =================== MESSAGES SECTION ======================== */}
          <div className='flex flex-col pt-5 px-3 overflow-auto' style={{ height: '100%' }}>
          {messages.map((message) => (
            <MessageCard message={message} sessionUserID={sessionUserID}/>
          ))}
        </div>


          {/* =================== WRITE A MESSAGE SECTION ======================== */}
          <div className='w-full flex flex-row pt-4' style={{ marginTop: 'auto' }}>
            {/* Input Field from React Lib for writing a new message, can add emojis */}
              <InputEmoji 
                  value={newMessage? newMessage : ""}
                  cleanOnEnter
                  onChange={handleChange}
                  onEnter={handleSend}
                  placeholder='Type a message...'
              />
          </div>

        </div>
        
        </>)}




    </div>
  </div>
)

}
