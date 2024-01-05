import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import getSessionUserID from '../../utilities/GetSessionUserID';
import { findUser } from '../../api_calls/usersAPI';
import LargeProfilePicture from '../user/LargeProfilePicture';
import FriendButtons from '../friend/FriendButtons';

import useFetchUserDataByID from '../../utilities/GetSelectedUsersInfo';

export default function Profile({ navigate, token, setToken, sessionUserID, sessionUser, setSessionUser }) {
  //TODO determine whether or not to use .populate.
  //TODO if so: will need to consider .some method; whether to add .populate to friend methods OR aggregate OR manually push/pull User from the UserDoc.
  //TODO if not: will need to do .aggregate for users where necessary... or new method where I run a list of userIDs and return userDocs.
  //TODO eg. .aggregate only the user.firstName, user.lastName, user.profilePicURL...

  // =========== STATE VARIABLES ==========================
  // PROFILE PAGE OWNER:
  const { userID } = useParams(); //ID of the profile page owner
  const targetID = userID; // renamed variable for clarity
  const [target, setTarget] = useState(null); // State to hold target data

  // // SESSION USER:
  // let sessionUserID = getSessionUserID(token);
  // const [sessionUser, setSessionUser] = useState(null); 

  // ========= COMPONENT MOUNT: Set Profile Owner Data & Session User Data ===============
  // Profile owner
  useEffect(() => {
    if (token) {
      if (sessionUserID === targetID) {
        navigate('/profile')
      }
      findUser(token, targetID)
      .then(targetData => {
        window.localStorage.setItem("token", targetData.token);
        setToken(window.localStorage.getItem("token"));
        setTarget(targetData.user);
        console.log("Profile Owner ", targetData.user)
      })
    }
  }, []);
  // // Session User
  // useEffect(() => {
  //   if (token && sessionUserID) {
  //     findUser(token, sessionUserID)
  //     .then(userData => {
  //         window.localStorage.setItem("token", userData.token)
  //         setToken(window.localStorage.getItem("token"))
  //         setSessionUser(userData.user);
  //         console.log("SessionUser ", userData.user);
  //     })
  //   }
  // },[])

  // ======================== JSX FOR COMPONENT =============================================
  if (target && sessionUser) {
    return (
      <div 
      className='w-10/12 h-full max-w-[60rem] min-w-[30rem] bg-slate-100 flex flex-col mx-auto overflow-auto'>

      {/* ========================= UPPER PORTION ==============================  */}
        {/* COVER PHOTO */}
        <div aria-label='header section' id='header-section'
          className='w-full h-[18rem] relative'>

          <img aria-label='cover photo' id='cover-photo'
            className='w-full h-full -z-10'
            src={`https://picsum.photos/seed/a${target._id}/400/700?grayscale`}
            alt={`${target.firstName} ${target.lastName} cover`}
          />

          {/* NAME */}
          <h1 aria-label='name' id='name' 
            className='absolute left-[13.2rem] bottom-4 z-10 font-semibold text-white text-[2rem]'>
            {`${target.firstName} ${target.lastName}`}
          </h1>

          {/* PROFILE PICTURE */}
          <div aria-label='profile pic' id='profile pic' 
            className='w-[11rem] h-[11rem] z-20 absolute left-[1rem] top-[9.5rem]'>
            <LargeProfilePicture id={target._id} name={`${target.firstName} ${target.lastName}`}/>
          </div>
        </div>

        {/* PAGE OPTIONS */}
        <div aria-label='page options' id='options'
          className='flex flex-row bg-white h-[3.3rem] shadow-lg z-10 items-center justify-between px-12 '>
          <div className='w-14'></div>
          <p>Timeline</p>
          <p>About</p>
          <p>Friends</p>
          <p>Photos</p>
        </div>

    {/* ========================= LOWER PORTION ====================================== */}
    <div aria-label='body section' id='body-section' 
      className='mt-5 h-full w-full flex flex-row'>

      {/* --------------------------- LEFT -------------------------------------- */}
      <div aria-label='body left' id='body-left' 
        className='mx-2 ml-4 h-full w-5/12 flex flex-col space-y-3'>

        {/* INTRO and ADD/UNFRIEND BUTTON */}
        <div className='w-full h-[14rem] md:h-[14.5rem] bg-white rounded-xl p-3 pb-5 
        shadow-md flex flex-col space-y-2 items-center'>
          {/* INTRO */}
          <div aria-label='bio' id='bio'>
            <h3 aria-label='bio' id='bio-header'
              className='font-bold text-lg'>
              Intro:
            </h3>
            <p aria-label='bio' id='bio-text' 
              className='text-sm text-gray-800 h-[7rem] md:h-[7.5rem] lg:h-[8rem] overflow-scroll'>
              {target.bio}
            </p>
          </div>
          {/* FRIEND BUTTONS */}
          <div className='flex flex-row items-center w-full h-10 sm:w-11/12 md:w-10/12'>
              <FriendButtons 
                token={token} setToken={setToken}
                targetID={targetID} target={target} setTarget={setTarget}
                sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={setSessionUser}
              />
          </div>
        </div>

        {/* FRIENDS LIST */}
        <div className='w-full h-[18rem] bg-white rounded-xl p-2 shadow-md'>
            Friends
        </div>

    </div>

    {/*  -------------------------------- RIGHT --------------------------------------- */}
    <div className='mx-2 mr-4 h-full w-7/12 flex flex-col space-y-3'>

      <div className='w-full h-[4rem] bg-white rounded-xl p-2 shadow-md'>
          Write on {`${target.firstName}'s wall`}
      </div>

      <div className='w-full h-[4rem] bg-white rounded-xl p-2 shadow-md'>
          {`${target.firstName}'s posts`}
          <p>Change this to a map with each div as a card</p>
      </div>
    </div>
  </div>
  </div>
    )
    }

}
