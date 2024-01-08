import React, { useEffect, useState, useRef } from 'react'
import ProfilePicture from '../user/ProfilePicture';


export default function ChatCard({chat, sessionUserID, online, isCurrentChat, setCurrentChat, index}) {

  // This component shows the full name, profile picture, and whether the user is online
  // This component gets highlighted if it is the current chat
  
  // =========== STATE VARIABLES ==========================
  const conversationPartner = chat.members.find((user) => user._id !== sessionUserID);
  
  // =========== FUNCTION TO SET CURRENT CHAT =================
  const handleClick = () => {
    console.log(chat._id)
    setCurrentChat(chat)
  }
  
  // TODO this component gets a blue mark and is bolded if there is an unread message
  // TODO show last message & time ago
  

  // ========== TW Styling =======================

  const allCards = `
    h-[5rem] w-full rounded-lg p-3 flex flex-row items-center
    `
  const currentChatCols = `
    bg-blue-50`

  const notCurrentChatCols = `
    hover:bg-gray-50`

  

  // ======================== JSX FOR COMPONENT =============================================
  return (
    <>
    {/* MAIN CONTAINER */}
    <div id={index} aria-label={`chat card for ${conversationPartner}`}
    className={allCards + (isCurrentChat ? currentChatCols : notCurrentChatCols)}>
      
      {/* PROFILE PICTURE */}
      <div className='w-[4.5rem'>


      </div>
      test

    </div>
        {/* <div className="flex flex-col items-center " >
          <div className='flex flex-row w-full rounded-2xl p-2 pr-6 my-2 hover:curser-pointer hover:bg-[#80808038] group'
            onClick={handleClick}
            >
                <div className='w-[3.3rem] h-[3.3rem] mr-3 relative'>
                  {online && 
                  <div className='bg-lime-400 w-4 h-4 rounded-full absolute left-9 bottom-0 '
                  />}
                  <ProfilePicture id={conversationPartner._id} name={conversationPartner.firstName + ` ` + conversationPartner.lastName}/>
                </div>
                <div className='flex flex-col justify-center'>
                    <span className='text-md font-medium translate-y-[0.35rem] text-#textDarkGrey'>
                      {`${conversationPartner.firstName} ${conversationPartner.lastName}`}
                    </span>
                    <span className='text-[13px]'
                      style={{color: "grey"}}>
                      {online? "Active Now" : "Offline"}
                    </span>
                </div>
            </div>
        <hr style={{width: '85%', border: '0.1px solid #ececec'}}/>
        </div> */}
    </>
)

}
