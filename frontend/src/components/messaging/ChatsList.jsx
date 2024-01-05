import React from 'react'
import ChatCard from './ChatCard';


export default function ChatsList({ sessionUserID, checkOnlineStatus, chatsList, setCurrentChat }) {

  // ======================== JSX FOR COMPONENT =============================================

  return (
    <div className='flex flex-col'>
      {chatsList.map((chat) => (
        <div className='bg-red-100' key={chat._id}>
            <ChatCard chatData={chat} sessionUserID={sessionUserID} online={checkOnlineStatus}/>
        </div>
      ))}
    </div>
)
        // <div onClick={() => {
        //   setCurrentChat(chat);
        //   console.log(`Choosing chat: ${chat._id}`)
        // }}>
        //   <ChatCard chatData={chat} sessionUserID={sessionUserID} online={checkOnlineStatus(chat)}/>
        // </div>

}
