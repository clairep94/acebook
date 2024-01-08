import React, {useEffect, useState, useRef} from 'react'
import ChatSearchBar from './chat_searchbar/ChatSearchBar';
import { createChat } from "../../api_calls/chatsAPI";


export default function ChatMenu({ sessionUserID, chats, setChats, currentChat, setCurrentChat, 
  socket, onlineUsers, receivedMessage, sendMessage, setSendNewConversation }) {

  // ============ CHATSEARCH BAR ==========================
  const [chatSearchResults, setChatSearchResults] = useState([]);


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
            <div id={index} onClick={() => {setCurrentChat(chat)}}
            className='h-[6rem] w-full rounded-lg bg-blue-50 p-3
            flex flex-row items-center'>
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
