import React, { useState } from 'react'
import UnfriendButton from './friend_buttons/UnfriendButton';
import ProfileMessageButton from '../messaging/ProfileMessageButton';


export default function FriendCardMed(props) {

  // =========== STATE VARIABLES =======================
  const token = props.token;
  const setToken = props.setToken;

  const friend = props.friend;

  const sessionUserID = props.sessionUserID;
  const sessionUser = props.sessionUser;
  const setSessionUser = props.setSessionUser;

  // ============ STYLE STRINGS: =====================

  const allFriendButtons = `
    text-[1rem] font-semibold h-11 w-full rounded-md hidden lg:block
    `

  const primaryFriendButtonCols = `
    text-white bg-[#4087ca] hover:bg-[#4d76b2] 
    focus:ring-2 focus:ring-sky-300
    `

  const secondaryFriendButtonCols = `
    text-grey-800 bg-gray-100 hover:bg-gray-200
    border border-1
    focus:ring-2 focus:ring-sky-300
    `



// ============ JSX UI ===========================================
if(friend){
  return (
      <div className='w-[16rem] h-[24rem] bg-white shadow-lg rounded-xl mr-3 mb-3 overflow-clip'>
        <img className='w-full h-[13rem] bg-gray-200'
          src={`https://picsum.photos/seed/${friend._id}/300`}
          alt='cover'
        >
        </img>
        
        <div className='p-4'>
          <h3 className='text-lg font-bold'>
            {friend.firstName}{' '}{friend.lastName}
          </h3>
          <p className='text-gray-500'>
            {friend.friends.length === 0
              ? 'No friends yet'
              : friend.friends.length === 1
              ? '1 friend'
              : `${friend.friends.length} friends`}        
          </p>
          <div className='space-y-1 translate-y-1'>
            <ProfileMessageButton token={token} setToken={setToken} targetUserID={friend._id} setSessionUser={setSessionUser} setTargetUser={null}
            styling={allFriendButtons + primaryFriendButtonCols + ' relative'}
            />
            <UnfriendButton token={token} setToken={setToken} targetUserID={friend._id} setSessionUser={setSessionUser}
            styling={allFriendButtons + secondaryFriendButtonCols}/>
          </div>
  
        </div>
  
      </div>
    )
}
}
