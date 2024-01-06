import React, { useEffect, useState, useRef } from 'react'
import ProfilePicture from '../user/ProfilePicture';


export default function MessageCard({message, sessionUserID}) {
  
  const isOwn = (message.author._id === sessionUserID)
  
  const allMessagesStyle = `relative
  font-light text-[15px] py-[0.5rem] px-[0.7rem] rounded-[1.2rem]
  max-w-[16rem] inline-block
  `

  const ownMessageStyle = `
  bg-[#5acad2] text-white ml-auto mr-[2.7rem]
  `

  const otherMessageStyle = `
  bg-[#f0eded] text-gray-800 mr-auto ml-[2.7rem]
  `

  const profilePictStyle = `h-[2.3rem] w-[2.3rem] absolute `

  // ======================== JSX FOR COMPONENT =============================================
  return (
    <div className='flex flex-row p-0 mb-2 relative'>
      {!isOwn && (
        <div className={profilePictStyle + 'left-0 bottom-0'}>
          <ProfilePicture id={message.author._id} name={`${message.author.firstName} ${message.author.lastName}`} />
        </div>
      )}
      <div aria-label='message' className={allMessagesStyle + (isOwn ? ownMessageStyle : otherMessageStyle)}>
        {message.body}
      </div>
      {isOwn && (
        <div className={profilePictStyle + 'right-0 bottom-0'}>
          <ProfilePicture id={message.author._id} name={`${message.author.firstName} ${message.author.lastName}`} />
        </div>
      )}
    </div>
  );
}
