import React, { useEffect, useState, useRef } from 'react'
import ProfilePicture from '../user/ProfilePicture';


export default function ChatCard({chatData, sessionUserID, online, setCurrentChat}) {

  const handleClick = () => {
    console.log(chatData._id)
    setCurrentChat(chatData)
  }
  

  // =========== STATE VARIABLES ==========================
  const conversationPartner = chatData.members.find((user) => user._id !== sessionUserID);


  // ======================== JSX FOR COMPONENT =============================================
  return (
    <>
        <div className="flex flex-col items-center " >
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
        </div>
    </>
)

}
