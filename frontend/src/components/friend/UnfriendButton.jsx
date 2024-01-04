import React, { useState } from 'react'
import { unfriend } from '../../api_calls/usersAPI';
import { buttonInheritTW } from './buttonStyleStrings';

export default function UnfriendButton(props) {

  // =========== STATE VARIABLES =======================
  const token = props.token;
  const setToken = props.setToken;
  const targetUserID = props.targetUserID;
  const setSessionUser = props.setSessionUser;

  // ========= BUTTON CLICK METHOD ======================
  const handleClick = async (event) => {
    if (token) {
      event.preventDefault();

      unfriend(token, targetUserID)
      .then(updatedSessionUserData => {
        window.localStorage.setItem("token", updatedSessionUserData.token)
        setToken(window.localStorage.getItem("token"))

        setSessionUser(updatedSessionUserData.user);
      })
    }
  }


  // ============ JSX UI ===========================================
  return (
    <button onClick={handleClick}
    className={ buttonInheritTW }
    >
        Unfriend
    </button>
  )
}
