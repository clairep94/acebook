import React, {useEffect, useState, useRef} from 'react'
import ProfilePicture from '../user/ProfilePicture';
import ChatSearchBar from './chat_searchbar/ChatSearchBar';
import { createChat } from "../../api_calls/chatsAPI";
import ChatCard from './ChatCard';


export default function ChatsMenu({ sessionUserID, chats, setChats, currentChat, setCurrentChat, 
  socket, checkOnlineStatus, receivedMessage, sendMessage, setSendNewConversation }) {

  // ============ CHATSEARCH BAR ==========================
  const [chatSearchResults, setChatSearchResults] = useState([]);

  const isCurrentChat = (chat) => {
    if (currentChat) {
      return chat._id === currentChat._id
    } else {
      return false
    }
  }

  const conversationPartner = (chat) => (chat.members.find((user) => user._id !== sessionUserID))
  const allCards = `
    h-[5rem] w-full rounded-lg p-3 flex flex-row items-center
    `
  const currentChatCols = `
    bg-blue-50`

  const notCurrentChatCols = `
    hover:bg-gray-100`

  const profilePicture = `w-[4rem] h-[4rem] bg-zinc-300 rounded-full mr-3 
  border border-white border-[0.2rem] shadow-md `

  const notificationDot = `
    absolute bottom-0 right-3 w-[1.2rem] h-[1.2rem] bg-lime-500 rounded-full border-white border-[0.2rem]
  `;

  const unreadMessageDot =`w-[0.8rem] h-[0.8rem] bg-blue-500 rounded-full translate-x-2`

  

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
          <>
            {/* MAIN CONTAINER */}
            <div id={index} onClick={() => {setCurrentChat(chat)}}
            className={allCards + (isCurrentChat(chat) ? currentChatCols : notCurrentChatCols)}>
              
              <div className='relative'>
                {/* ONLINE DOT */}
                {checkOnlineStatus(chat) &&
                <div className={notificationDot}/>
                }
                {/* PROFILE PICTURE */}
                <img aria-label='profile picture' alt='profile'
                src={`https://picsum.photos/seed/${conversationPartner(chat)._id}/300`}
                className={profilePicture}>
                </img>
              </div>
              
              {/* CONVERSATION PARTNER & LAST MESSAGE */}
              <div aria-label='partner and last message'>
                <h4 className='font-semibold text-lg'>
                  {conversationPartner(chat).firstName} {conversationPartner(chat).lastName}
                </h4>
                <p className='text-[#8a8a8a] text-sm'>
                  Placeholder: Last message shorten... · 1d
                </p>
              </div>
              <div className={unreadMessageDot}></div>
            </div>
          </>


        ))}

      
      </div>

      
    </>


// {/* <div className='flex flex-col'>
//       <h3 className='text-[1.2rem] font-semibold translate-x-2'>
//         Contacts
//       </h3>
//       <div className='flex flex-col overflow-auto'>
//         {chatsList.map((chat) => (
//           <div key={chat._id}>
//               <ChatCard chatData={chat} sessionUserID={sessionUserID} online={checkOnlineStatus} setCurrentChat={setCurrentChat}/>
//           </div>
//         ))}
//       </div>
//     </div> */}
)


}
