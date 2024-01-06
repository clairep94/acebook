import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import getSessionUserID from '../utilities/GetSessionUserID';
import { findUser } from '../api_calls/usersAPI';
import LargeProfilePicture from '../components/user/LargeProfilePicture';
import FriendButtons from '../components/friend/FriendButtons';

import useFetchUserDataByID from '../utilities/GetSelectedUsersInfo';

export default function ProfilePage({ navigate, token, setToken, sessionUserID, sessionUser, setSessionUser }) {

  // =========== STATE VARIABLES ==========================
  // PROFILE PAGE OWNER:
  const { userID } = useParams(); //ID of the profile page owner
  const targetID = userID; // renamed variable for clarity
  const [target, setTarget] = useState(null); // State to hold target data

  const [profileSection, setProfileSection] = useState(''); // holds what view the user is current on

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

  // ======================== JSX FOR COMPONENT =============================================
  if (target && sessionUser) {
    return (
      <div className='w-full overflow-scroll bg-red-100 mt-2 mb-2 '>
        {/* MAIN PAGE */}

        {/*  ================= HEADER SECTION ================= */}
        <div aria-label='header container' 
          className='w-full bg-white h-[35rem] md:h-[40rem] lg:h-[45rem] flex flex-col items-center relative
          shadow-md
          '>
          {/* COVER PHOTO */}
          <div aria-label='cover photo'
          className='w-full h-2/3 max-w-[100rem] bg-yellow-400 z-10 xl:rounded-b-2xl absolute'>
          </div>
          {/* PROFILE PICTURE */}

            {/* NAME */}
            {/* NUM FRIENDS  & FRIEND BUTTONS */}

          {/* PAGE OPTIONS - Posts & Friends */}

        </div>

        {/*  ================= BOTTOM SECTION -- depends on page section: Main or Friends ================= */}
        <div aria-label='profile main section'
        className='w-full overflow-auto bg-blue-200 max-w-[100rem] m-auto p-4'
        >
        {/* LENGTH TESTER */}
        <div className='w-[50px] h-[100rem] bg-green-100'></div>
        <div className='w-[60px] h-5 bg-purple-200'></div>
          
        </div>

        
      </div>
    )
    }

}
