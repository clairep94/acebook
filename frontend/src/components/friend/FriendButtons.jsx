import React, { useState } from 'react'
import AcceptFriendButton from './friend_buttons/AcceptFriendButton';
import DenyFriendButton from './friend_buttons/DenyFriendButton';
import SendFriendButton from './friend_buttons/SendFriendRequest';
import UnsendFriendButton from './friend_buttons/UnsendFriendRequest';
import UnfriendButton from './friend_buttons/UnfriendButton';
import ProfileMessageButton from '../messaging/ProfileMessageButton';

export default function FriendButtons(props) {

  // =========== STATE VARIABLES =======================
  const token = props.token;
  const setToken = props.setToken;

  const target = props.target;
  const setTarget = props.setTarget;

  const sessionUserID = props.sessionUserID;
  const sessionUser = props.sessionUser;
  const setSessionUser = props.setSessionUser;

  // ============ STYLE STRINGS: =====================

  const allFriendButtons = `
    text-[1rem] font-semibold h-12 px-6 min-w-[7rem] rounded-md hidden lg:block
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


  // ================ FRIEND REQUEST / UNFRIEND BUTTONS LOGIC ========================
  // TODO decide on whether or not user methods return .populated docs: if so, use
  // const inList = userDoc && userDoc.thisList.some(member => member._id === targetID);
  
  const inList = (list, id) => {return (list.includes(id))}; // return true if list contains a targetID
  const areFriends = sessionUser && inList(sessionUser.friends, target._id);// if friends: UnfriendButton
  const receivedRequest = sessionUser && inList(sessionUser.requests, target._id); // if received, Accept & Deny Buttons
  const sentRequest = target && inList(target.requests, sessionUserID); // if none of these: Send or Unsend Buttons depending if sent

  // =============== BUTTON SETS ====================================

  const areFriendsButtons = areFriends && (
    <>
      <UnfriendButton token={token} setToken={setToken} targetUserID={target._id} setSessionUser={setSessionUser}
      styling={allFriendButtons + secondaryFriendButtonCols}/>
      <ProfileMessageButton
      styling={allFriendButtons + primaryFriendButtonCols}/>
    </>
  );

  const receivedRequestButtons = !areFriends && receivedRequest && (
    <>
      <div
        aria-label='friend request container'
        className='hidden lg:block items-center border-2 pl-7 w-[35.3rem] py-[0.8rem] border-gray-300 rounded-lg -translate-y-[0.3rem] absolute -z-10 -translate-x-[20rem]'
      >
        <p
          aria-label='friend request alert'
          className='text-gray-400 font-semibold text-lg mr-10'
        >
          {target.firstName} sent you a friend request
        </p>
      </div>
      <AcceptFriendButton token={token} setToken={setToken} targetUserID={target._id} setSessionUser={setSessionUser}
      styling={allFriendButtons + primaryFriendButtonCols + ' relative'}
      />
      <DenyFriendButton token={token} setToken={setToken} targetUserID={target._id} setSessionUser={setSessionUser}
      styling={allFriendButtons + secondaryFriendButtonCols}/>

      <ProfileMessageButton
      styling={allFriendButtons + secondaryFriendButtonCols}/>
    </>
  );

  const SendFriendRequestButton = !areFriends && !receivedRequest && !sentRequest && (
    <>
      <SendFriendButton token={token} setToken={setToken} targetUserID={target._id} setTargetUser={setTarget}
      styling={allFriendButtons + primaryFriendButtonCols}
      />
      <ProfileMessageButton
      styling={allFriendButtons + secondaryFriendButtonCols}/>
    </>
  );

  const UnsendFriendRequestButton = !areFriends && !receivedRequest && sentRequest && (
    <>
      <UnsendFriendButton token={token} setToken={setToken} targetUserID={target._id} setTargetUser={setTarget}
      styling={allFriendButtons + secondaryFriendButtonCols}/>
      <ProfileMessageButton
        styling={allFriendButtons + primaryFriendButtonCols}/>
    </>
    
  );



// ============ JSX UI ===========================================
return (
  <>
    {areFriendsButtons}
    {receivedRequestButtons}
    {SendFriendRequestButton}
    {UnsendFriendRequestButton}
  </>
)
}
