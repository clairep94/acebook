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

  const [section, setSection] = useState('Profile'); // holds what view the user is current on

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
          className='w-full bg-white h-[35rem] md:h-[40rem] lg:h-[45rem] flex flex-col items-center
          shadow-md
          '>
          <div className='max-w-[100rem] w-full bg-red-50 h-full z-10 relative'>
            {/* COVER PHOTO */}
            <div aria-label='cover photo'
            className='w-full h-2/3 max-w-[100rem] bg-yellow-400 z-10 xl:rounded-b-2xl'>
            </div>
            {/* PROFILE PICTURE */}
            <div aria-label='profile picture'
            className='rounded-full h-[16rem] w-[16rem] bg-slate-600 absolute 
            top-[17rem] md:top-[21rem] lg:top-[22rem] left-6 border-[0.35rem] border-white' 
            >
            </div>
            {/* NAME & FRIENDS */}
            <div aria-label='name and friends container'
              className='ml-[19rem] py-[1.8rem] h-[22%] bg-yellow-300 flex flex-col'>
              {/* NAME */}
              <p aria-label='name'
              className='text-[2.3rem] font-bold translate-y-4'>
              John Doe
              </p>
              {/* NUM FRIENDS & FRIENDS BUTTONS */}
              <div className='flex flex-row justify-between bg-red-400 items-center pr-4'>
                <p className='text-[1.1rem] font-semibold text-gray-600'>
                  2 friends
                </p>
                <div className='flex flex-row space-x-2'>
                  {/* FRIEND BUTTONS */}
                  <button className='text-[0.9rem] font-semibold text-white bg-blue-600 h-12 px-6 rounded-md'>
                    Add Friend
                  </button>
                  <button className='text-[0.9rem] font-semibold text-gray-800 bg-gray-300 h-12 px-6 rounded-md'>
                    Message
                  </button>
              </div>
                  
              </div>
            </div>

          {/* PAGE OPTIONS - Posts & Friends */}
            <div className='h-[11%] flex flex-row items-center justify-center space-x-2'>
              <div className={'flex items-center justify-center h-[4rem] w-[6rem] rounded-lg text-[1rem] relative hover:bg-gray-100' + 
                              (section === 'Profile') ? ('text-#iconBlue hover:bg-gray-100') 
                              : ('text-#iconGrey hover:bg-gray-100')
              } >
                Posts
              </div>
              {(section === 'Profile') && <div className='absolute -bottom-[0.1rem] w-[4.5rem] bg-#iconBlue h-[2px]'/>}
              <div className='flex items-center justify-center h-[4rem] w-[6rem] rounded-lg text-[1rem]

              text-#iconGrey hover:bg-gray-100
              ' >
                Friends
              </div>

            </div>

          </div>

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
