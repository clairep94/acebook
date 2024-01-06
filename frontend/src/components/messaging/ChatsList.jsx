import React from 'react'
import ChatCard from './ChatCard';


export default function ChatsList({ sessionUserID, checkOnlineStatus, chatsList, setCurrentChat }) {

  // ======================== JSX FOR COMPONENT =============================================

  return (
    <div className='flex flex-col'>
      <h3 className='text-[1.2rem] font-semibold translate-x-2'>
        Contacts
      </h3>
      <div className='flex flex-col overflow-auto'>
        {chatsList.map((chat) => (
          <div key={chat._id}>
              <ChatCard chatData={chat} sessionUserID={sessionUserID} online={checkOnlineStatus} setCurrentChat={setCurrentChat}/>
          </div>
        ))}
      </div>
    </div>
)
        // <div onClick={() => {
        //   setCurrentChat(chat);
        //   console.log(`Choosing chat: ${chat._id}`)
        // }}>
        //   <ChatCard chatData={chat} sessionUserID={sessionUserID} online={checkOnlineStatus(chat)}/>
        // </div>

}
