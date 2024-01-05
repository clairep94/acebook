import React, { useEffect, useState, useRef } from 'react'
import InputEmoji from 'react-input-emoji';


export default function ChatWindow({ 
  navigate, token, setToken, sessionUserID, sessionUser, setSessionUser, 
  selectedConvo, setSendMessage, receivedMessage}) {

  // =========== STATE VARIABLES ==========================
  const conversationPartner = selectedConvo?.members?.find((user) => user._id !== sessionUserID) // Conversation model uses .populate

  // Loading messages, sending messages, receiving messages:
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");


  // ========= COMPONENT MOUNT: Set Profile Owner Data & Session User Data ===============

  // ======================== JSX FOR COMPONENT =============================================
  return (
  <>CHAT WINDOW</>
)

}
