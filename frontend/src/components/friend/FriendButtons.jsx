import React, { useState } from 'react'
import AcceptFriendButton from './AcceptFriendButton';
import DenyFriendButton from './DenyFriendButton';
import SendFriendButton from './SendFriendRequest';
import UnsendFriendButton from './UnsendFriendRequest';
import UnfriendButton from './UnfriendButton';

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
    <>
      <AcceptFriendButton token={token} setToken={setToken} targetUserID={targetID} setSessionUser={setSessionUser}/>
      <DenyFriendButton token={token} setToken={setToken} targetUserID={targetID} setSessionUser={setSessionUser}/>
    </>
  );

  const SendFriendRequestButton = !areFriends && !receivedRequest && !sentRequest && (
    <SendFriendButton token={token} setToken={setToken} targetUserID={targetID} setTargetUser={setTarget}/>
  );

  const UnsendFriendRequestButton = !areFriends && !receivedRequest && sentRequest && (
    <UnsendFriendButton token={token} setToken={setToken} targetUserID={targetID} setTargetUser={setTarget}/>
  );

// ============ JSX UI ===========================================
return (
  <>
    {MessageAndUnfriendButtons}
    {AcceptAndDenyButtons}
    {SendFriendRequestButton}
    {UnsendFriendRequestButton}
  </>

      // {/* {(!areFriends && receivedRequest) && 
      //   (<>
      //       <AcceptFriendButton token={token} setToken={setToken} targetUserID={targetID} setSessionUser={setSessionUser}/>
      //       <DenyFriendButton token={token} setToken={setToken} targetUserID={targetID} setSessionUser={setSessionUser}/>
      //   </>)}
      // {(!areFriends && !receivedRequest && !sentRequest) && (<>
      // <SendFriendButton token={token} setToken={setToken} targetUserID={targetID} setTargetUser={setTarget}/>
      // </>)}
      // {(!areFriends && !receivedRequest && sentRequest) && (<>
      // <UnsendFriendButton token={token} setToken={setToken} targetUserID={targetID} setTargetUser={setTarget}/>
      // </>)}
      // {areFriends && <UnfriendButton token={token} setToken={setToken} targetUserID={targetID} setSessionUser={setSessionUser}/>} */}
)
}
