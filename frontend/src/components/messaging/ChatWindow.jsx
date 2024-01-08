import React, { useEffect, useState, useRef } from 'react'
import InputEmoji from 'react-input-emoji';
import { fetchMessages, sendMessage } from '../../api_calls/messagesAPI';
import { BsPersonCircle } from "react-icons/bs";

import ProfilePicture from '../user/ProfilePicture';
import MessageCard from './MessageCard';


export default function ChatWindow({ token, setToken, sessionUserID, 
  checkOnlineStatus, currentChat, setSendMessage, receivedMessage, navigate }) {


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


  // =================== RECIEVING A MESSAGE =================================
  // This component is fed receivedMessage from the parent Chat.jsx.
  // The useEffect hook will listen for changes to receivedMessage and add it to the messages array for re-rendering.
  useEffect(() => {
      if(receivedMessage){ // should add && receivedMessage._id === currentChat._id
          console.log("Message Arrived: ", receivedMessage);

          const newMessage = { // needed to create new object in order to push successfully to messages.
              _id: receivedMessage._id,
              chat_id: receivedMessage.chat_id,
              author: receivedMessage.author,
              body: receivedMessage.body,
              createdAt: receivedMessage.createdAt,
              updatedAt: receivedMessage.updatedAt,
          }
          setMessages([...messages, newMessage]);
      }
  }, [receivedMessage])



    // ----------- SCROLL TO THE LAST MESSAGE --------------
    const div = useRef(null)
    useEffect(()=> {
        div.current?.scrollIntoView({ behavior: "smooth", block:"end" });
    },[messages, receivedMessage])


  // ======================== JSX FOR COMPONENT =============================================
  return (
    <> {/* Container is styled outside of this component && This renders only when a chat is selected */}

      {/* CONTAINER CONTENT */}
      <div className='w-full flex flex-col bg-white'>

        {/* ============ HEADER ======================== */}
        <div className='bg-white h-[6rem] p-4 pl-5 pr-5 shadow-[0px_0px_7px_0px_#d9deed] flex flex-row items-center justify-between'>

          {/* LEFT SIDE CONTAINER */}
          <div className='flex flex-row items-center'>
            {/* PROFILE PICTURE */}
            <div className='w-[4rem] h-[4rem] mr-3 relative'>
              {/* ONLINE DOT */}
              {checkOnlineStatus(currentChat) && <div className='bg-lime-400 w-5 h-5 rounded-full absolute left-12 bottom-0 border-white border-solid border-[0.2rem]'/>}
              {/* PROFILE PICTURE */}
              <ProfilePicture id={conversationPartner._id} name={conversationPartner.firstName + ` ` + conversationPartner.lastName}/>
            </div>

            {/* NAME & ONLINE STATUS */}
            <div aria-label='partner and online status' className='translate-y-1'>
              <h4 className='font-semibold text-[1.2rem] '>
                {conversationPartner.firstName} {conversationPartner.lastName}
              </h4>
              <p className='text-[#8a8a8a] text-sm -translate-y-1'>
                Active Now
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: GO TO PROFILE ICON */}
          <div className='group relative hidden sm:block'>
            <div className='rounded-full text-[2.5rem] text-[#5acad2] hover:bg-slate-100 h-[3.5rem] w-[3.5rem] text-center p-[0.5rem] mr-4'
              onClick={() => {navigate(`/users/${conversationPartner._id}`)}}>
              <BsPersonCircle />
            </div>
            <div className='hidden group-hover:block absolute w-[6rem] text-sm font-light bg-black/60 text-white p-2 rounded-md 
            translate-y-1 -translate-x-5 z-50'>
              Go to profile
            </div>
          </div>

        </div>

        {/* =================== MESSAGES SECTION ======================== */}
        <div className='flex flex-grow flex-col w-full overflow-scroll px-5 mt-5' ref={div}>
          {messages.map((message, index) => (
            <MessageCard message={message} sessionUserID={sessionUserID} index={index}/>
          ))}
        </div>


        {/* =================== WRITE A MESSAGE SECTION ======================== */}
        <div className='flex flex-row h-[6rem] min-h-[6rem] items-center px-4'>
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
    </>
)

}
