import React, { useState } from 'react'
import AcceptFriendButton from './AcceptFriendButton';
import DenyFriendButton from './DenyFriendButton';
import SendFriendButton from './SendFriendRequest';
import UnsendFriendButton from './UnsendFriendRequest';
import UnfriendButton from './UnfriendButton';
import { positiveButtonTW, negativeButtonTW, buttonInheritTW } from './buttonStyleStrings';

export default function FriendButtons(props) {
  // TODO add 'message' button later on to (areFriends)

  // =========== STATE VARIABLES =======================
  const token = props.token;
  const setToken = props.setToken;

  const targetID = props.targetID;
  const target = props.target;
  const setTarget = props.setTarget;

  const sessionUserID = props.sessionUserID;
  const sessionUser = props.sessionUser;
  const setSessionUser = props.setSessionUser;


  // ================ FRIEND REQUEST / UNFRIEND BUTTONS LOGIC ========================
  // TODO decide on whether or not user methods return .populated docs: if so, use
  // const inList = userDoc && userDoc.thisList.some(member => member._id === targetID);
  
  const inList = (list, id) => {return (list.includes(id))}; // return true if list contains a targetID
  const areFriends = sessionUser && inList(sessionUser.friends, targetID);// if friends: UnfriendButton
  const receivedRequest = sessionUser && inList(sessionUser.requests, targetID); // if received, Accept & Deny Buttons
  const sentRequest = target && inList(target.requests, sessionUserID); // if none of these: Send or Unsend Buttons depending if sent

  // =============== BUTTON SETS ====================================

  const MessageAndUnfriendButtons = areFriends && (
    <>
      <UnfriendButton token={token} setToken={setToken} targetUserID={targetID} setSessionUser={setSessionUser}/>
    </>
  );

  const AcceptAndDenyButtons = !areFriends && receivedRequest && (
    <div className='w-full '>
      <div aria-label='Accept friend request' 
      className={positiveButtonTW}>
        <AcceptFriendButton token={token} setToken={setToken} targetUserID={targetID} setSessionUser={setSessionUser}/>
      </div>

      <div aria-label='Deny friend request' >
        <DenyFriendButton token={token} setToken={setToken} targetUserID={targetID} setSessionUser={setSessionUser}/>
      </div>
    </div>
  );

  const SendFriendRequestButton = !areFriends && !receivedRequest && !sentRequest && (
    <div aria-label='Add friend' className={positiveButtonTW}>
      <SendFriendButton token={token} setToken={setToken} targetUserID={targetID} setTargetUser={setTarget}/>
    </div>
  );

  const UnsendFriendRequestButton = !areFriends && !receivedRequest && sentRequest && (
    <div aria-label='Unsend friend request' className={negativeButtonTW}>
      <UnsendFriendButton token={token} setToken={setToken} targetUserID={targetID} setTargetUser={setTarget}/>      
    </div>
  );


// ============ JSX UI ===========================================
return (
  <>
    {MessageAndUnfriendButtons}
    {AcceptAndDenyButtons}
    {SendFriendRequestButton}
    {UnsendFriendRequestButton}
  </>
)
}
