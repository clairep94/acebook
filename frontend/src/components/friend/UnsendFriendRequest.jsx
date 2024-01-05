import React, { useState } from 'react'
import { unsendFriendRequest } from '../../api_calls/usersAPI';

export default function UnsendFriendButton(props) {

  // =========== STATE VARIABLES =======================
  const token = props.token;
  const setToken = props.setToken;
  const targetUserID = props.targetUserID;
  const setTargetUser = props.setTargetUser;
  

  // ========= BUTTON CLICK METHOD ======================
  const handleClick = async (event) => {
    if (token) {
      event.preventDefault();

      unsendFriendRequest(token, targetUserID)
      .then(updatedTargetData => {
        window.localStorage.setItem("token", updatedTargetData.token)
        setToken(window.localStorage.getItem("token"))

        setTargetUser(updatedTargetData.user);
      })
    }
  }


  // ============ JSX UI ===========================================
  return (
      <button onClick={handleClick}
      className={ props.styling }
      >
        Cancel request
      </button>
  )
}
