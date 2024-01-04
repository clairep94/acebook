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

  const userID = props.userID;
  const user = props.user;
  const setUser = props.setUser;

  const sessionUserID = props.sessionUserID;
  const sessionUser = props.sessionUser;
  const setSessionUser = props.setSessionUser;


  // ================ FRIEND REQUEST / UNFRIEND BUTTONS LOGIC ========================
  // TODO decide on whether or not user methods return .populated docs: if so, use
  // const inList = userDoc && userDoc.thisList.some(member => member._id === userID);
  
  const inList = (list, id) => {return (list.includes(id))}; // return true if list contains a targetID
  const areFriends = sessionUser && inList(sessionUser.friends, userID);// if friends: UnfriendButton
  const receivedRequest = sessionUser && inList(sessionUser.requests, userID); // if received, Accept & Deny Buttons
  const sentRequest = user && inList(user.requests, sessionUserID); // if none of these: Send or Unsend Buttons depending if sent
  

  // ============ JSX UI ===========================================
  return (
    <>
      {(!areFriends && receivedRequest) && 
        (<>
            <AcceptFriendButton token={token} setToken={setToken} targetUserID={userID} setSessionUser={setSessionUser}/>
            <DenyFriendButton token={token} setToken={setToken} targetUserID={userID} setSessionUser={setSessionUser}/>
        </>)}
      {(!areFriends && !receivedRequest && !sentRequest) && (<>
      <SendFriendButton token={token} setToken={setToken} targetUserID={userID} setTargetUser={setUser}/>
      </>)}
      {(!areFriends && !receivedRequest && sentRequest) && (<>
      <UnsendFriendButton token={token} setToken={setToken} targetUserID={userID} setTargetUser={setUser}/>
      </>)}
      {areFriends && <UnfriendButton token={token} setToken={setToken} targetUserID={userID} setSessionUser={setSessionUser}/>}
    </>

  )
}
