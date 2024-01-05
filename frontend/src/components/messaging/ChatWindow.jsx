import React, { useEffect, useState, useRef } from 'react'
import InputEmoji from 'react-input-emoji';


export default function ChatWindow({ token, setToken, sessionUserID,  
  currentChat, setSendMessage, receivedMessage}) {

  // =========== STATE VARIABLES ==========================
  const conversationPartner = currentChat?.members?.find((user) => user._id !== sessionUserID) // Conversation model uses .populate

  // Loading messages, sending messages, receiving messages:
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  // ========= COMPONENT MOUNT: Set Profile Owner Data & Session User Data ===============

  // ======================== JSX FOR COMPONENT =============================================
  return (
  <div className='flex flex-col h-full ml-4 mr-1'>
    <div className='bg-white h-full my-4 rounded-2xl shadow-xl'>
      {currentChat?._id}
    </div>
  </div>
)

}
