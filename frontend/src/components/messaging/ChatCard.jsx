import React, { useEffect, useState, useRef } from 'react'
import ProfilePicture from '../user/ProfilePicture';


export default function ChatCard({chat, sessionUserID, online, isCurrentChat, setCurrentChat, index}) {

  // This component shows the full name, profile picture, and whether the user is online
  // This component gets highlighted if it is the current chat
  
  const conversationPartner = chat.members.find((user) => user._id !== sessionUserID);
  
  // =========== FUNCTION TO SET CURRENT CHAT =================
  const handleClick = () => {
    console.log(chat._id)
    setCurrentChat(chat)
  }
  // TODO this component gets a blue mark and is bolded if there is an unread message
  // TODO show last message & time ago
  // function for determining relative time ago
  // function for determining if lastMessage is read -> blue dot & bold

  const lastMessage = chat.lastMessage
  
  // ============== TW Styling ====================================

  const allCards = `
    h-[5.5rem] w-full rounded-lg p-3 flex flex-row items-center
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

  const unreadMessageDot =`w-[0.8rem] h-[0.8rem] bg-blue-500 rounded-full translate-x-[21.8rem] absolute `
  const lastMessageStyle = `text-[#8a8a8a]`
  const unreadLastMessageStyle = `font-bold text-black`
  const relDate = `text-[#8a8a8a]`
  

  // ======================== JSX FOR COMPONENT =============================================
  return (
    <>
      {/* MAIN CONTAINER */}
      <div id={index} onClick={() => {setCurrentChat(chat)}}
      className={allCards + (isCurrentChat ? currentChatCols : notCurrentChatCols)}>
        
        <div className='relative'>
          {/* ONLINE DOT */}
          {online &&
          <div className={notificationDot}/>
          }
          {/* PROFILE PICTURE */}
          <img aria-label='profile picture' alt='profile'
          src={`https://picsum.photos/seed/${conversationPartner._id}/300`}
          className={profilePicture}>
          </img>
        </div>
        
        {/* CONVERSATION PARTNER & LAST MESSAGE */}
        <div aria-label='partner and last message'>
          <h4 className='font-semibold text-lg'>
            {conversationPartner.firstName} {conversationPartner.lastName}
          </h4>
          <p className='text-sm'>
            <span className={(lastMessage && (lastMessage.read === false)) ? unreadLastMessageStyle : lastMessageStyle}>
              {lastMessage ? (lastMessage.body) : ('Placeholder: Last message shorten...')}
            </span>
            <span className={relDate}>
              {' · 1d'}
            </span>
          </p>
        </div>
        <div className={unreadMessageDot}></div>
      </div>
    </>
)

}
