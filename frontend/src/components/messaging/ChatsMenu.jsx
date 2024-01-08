import React, {useEffect, useState, useRef} from 'react'
import ProfilePicture from '../user/ProfilePicture';
import ChatSearchBar from './chat_searchbar/ChatSearchBar';
import { createChat } from "../../api_calls/chatsAPI";
import ChatCard from './ChatCard';


export default function ChatsMenu({ sessionUserID, chats, setChats, currentChat, setCurrentChat, 
  socket, checkOnlineStatus, receivedMessage, sendMessage, setSendNewConversation }) {

  // ============ CHATSEARCH BAR ==========================
  const [chatSearchResults, setChatSearchResults] = useState([]);

  const isCurrentChat = (chat) => currentChat && chat._id === currentChat._id;


  // ======================== JSX FOR COMPONENT =============================================

  return (
    <>
      <h1 className='text-[2rem] font-bold pb-4'>
        Chats
      </h1>

      {/* CHAT SEARCHBAR */}
      <div className='flex flex-row h-[2.8rem]'>
        {/* <ChatSearchBar 
          token={token}
          setToken={setToken}
          sessionUserID={sessionUserID}
          setChats={setChats}
          chats={chats}
          setCurrentChat={setCurrentChat}
          setSendNewConversation={setSendNewConversation}
          results={chatSearchResults}
        /> */}
      </div>

      {/* CHAT CARDS */}
      <div className='space-y-1 overflow-auto'>
        {chats.map((chat, index) => (
          <ChatCard chat={chat} sessionUserID={sessionUserID} online={checkOnlineStatus(chat)}
          isCurrentChat={isCurrentChat(chat)} setCurrentChat={setCurrentChat} index={index}
          />
        ))}
      </div>

      
    </>

)


}
