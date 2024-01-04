import React, { useState } from 'react'
import { acceptFriendRequest } from '../../api_calls/usersAPI';

export default function AcceptFriendButton(props) {

  // =========== STATE VARIABLES =======================
  const token = props.token;
  const setToken = props.setToken;
  const targetUserID = props.targetUserID;
  const setTargetUser = props.setTargetUserData;

  // ========= BUTTON CLICK METHOD ======================
  const handleClick = async (event) => {
    if (token) {
      event.preventDefault();

      acceptFriendRequest(token, targetUserID)
      .then(updatedTargetData => {
        window.localStorage.setItem("token", updatedTargetData.token)
        setToken(window.localStorage.getItem("token"))

        setTargetUser(updatedTargetData.user);
      })
    }
  }


  // ============ JSX UI ===========================================
  return (
    <button onClick={handleClick}>
        Accept Friend
    </button>
  )
}
