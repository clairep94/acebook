import React, { useState } from 'react'
import { sendFriendRequest } from '../../api_calls/usersAPI';
import { buttonInheritTW } from './buttonStyleStrings';

export default function SendFriendRButton(props) {

  // =========== STATE VARIABLES =======================
  const token = props.token;
  const setToken = props.setToken;
  const targetUserID = props.targetUserID;
  const setTargetUser = props.setTargetUser;

  // ========= BUTTON CLICK METHOD ======================
  const handleClick = async (event) => {
    if (token) {
      event.preventDefault();

      sendFriendRequest(token, targetUserID)
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
    className={ buttonInheritTW }
    >
        Add Friend
    </button>
  )
}
