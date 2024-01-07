import React, { useState } from 'react'
// import { acceptFriendRequest } from '../../../api_calls/usersAPI';

export default function ProfileMessageButton(props) {

  // =========== STATE VARIABLES =======================
  // const token = props.token;
  // const setToken = props.setToken;
  // const targetUserID = props.targetUserID;
  // const setSessionUser = props.setSessionUser;

  // ========= BUTTON CLICK METHOD ======================
  const handleClick = async (event) => {
    console.log("SEND MESSAGE BUTTON TODO")
    // if (token) {
    //   event.preventDefault();

    //   acceptFriendRequest(token, targetUserID)
    //   .then(updatedSessionUserData => {
    //     window.localStorage.setItem("token", updatedSessionUserData.token)
    //     setToken(window.localStorage.getItem("token"))

    //     setSessionUser(updatedSessionUserData.user);
    //   })
    // }
  }


  // ============ JSX UI ===========================================
  return (
      <button onClick={handleClick}
      className={ props.styling }
      >
        Message
      </button>
  )
}
