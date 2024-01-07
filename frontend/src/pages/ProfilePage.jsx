import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { findUserFullProfile } from '../api_calls/usersAPI';
import ProfileHeader from '../components/profilepage/ProfileHeader';



export default function ProfilePage({ navigate, token, setToken, sessionUserID, sessionUser, setSessionUser }) {

  // =========== STATE VARIABLES ==========================
  // PROFILE PAGE OWNER:
  const { userID } = useParams(); //ID of the profile page owner
  const targetID = userID; // renamed variable for clarity
  const [target, setTarget] = useState(null); // State to hold target data

  const [section, setSection] = useState('Posts'); // holds what view the user is current on, default is Posts

  // ========= COMPONENT MOUNT: Set Profile Owner Data & Session User Data ===============
  // Profile owner
  useEffect(() => {
    if (token) {
      if (sessionUserID === targetID) {
        navigate('/profile')
      }
      findUserFullProfile(token, targetID)
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
      <div className='w-full overflow-scroll bg-green-100 mb-2 '>
        {/* MAIN PAGE */}

        {/*  ================= HEADER SECTION ================= */}
        <div aria-label='header container' 
          className='w-full bg-white h-[33.5rem] lg:h-[36.5rem] xl:h-[39.5rem] flex flex-col items-center
          shadow-md
          '>
          <ProfileHeader target={target} setTarget={setTarget} 
            sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={setSessionUser}
            section={section} setSection={setSection} token={token} setToken={setToken}
          />
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
