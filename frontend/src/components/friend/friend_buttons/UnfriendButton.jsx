import React, { useState } from 'react'
import { unfriend } from '../../../api_calls/usersAPI';


export default function UnfriendButton(props) {

  // =========== STATE VARIABLES =======================
  const token = props.token;
  const setToken = props.setToken;
  const targetUserID = props.targetUserID;
  const setSessionUser = props.setSessionUser;
  const setTargetUser = props.setTargetUser


  // ========= BUTTON CLICK METHOD ======================
  const handleClick = async (event) => {
    if (token) {
      event.preventDefault();

      unfriend(token, targetUserID)
      .then(data => {
        window.localStorage.setItem("token", data.token)
        setToken(window.localStorage.getItem("token"))

        setSessionUser(data.sessionUser);
        setTargetUser(data.targetUser);
        })
    }
  }


  // ============ JSX UI ===========================================
  return (
      <button onClick={handleClick}
      className={ props.styling }
      >
          Unfriend
      </button>
  )
}
