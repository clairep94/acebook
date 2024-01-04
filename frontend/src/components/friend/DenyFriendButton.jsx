import React, { useState } from 'react'
import { denyFriendRequest } from '../../api_calls/usersAPI';

export default function DenyFriendButton(props) {

  // =========== STATE VARIABLES =======================
  const token = props.token;
  const setToken = props.setToken;
  const targetUserID = props.targetUserID;
  const setSessionUser = props.setSessionUserData;

  // ========= BUTTON CLICK METHOD ======================
  const handleClick = async (event) => {
    if (token) {
      event.preventDefault();

      denyFriendRequest(token, targetUserID)
      .then(updatedSessionUserData => {
        window.localStorage.setItem("token", updatedSessionUserData.token)
        setToken(window.localStorage.getItem("token"))

        setSessionUser(updatedSessionUserData.user);
      })
    }
  }


  // ============ JSX UI ===========================================
  return (
    <button onClick={handleClick}>
        Deny Friend
    </button>
  )
}
