import React, {useEffect, useState} from 'react';
import Feed from '../components/feed/Feed';
import Navbar from '../components/navbar/Navbar';
import { useSessionTimeOutCheck } from '../utilities/LoggedInCheck';
import LoginPopup from '../components/auth/LoginPopup';


export default function HomePage({navigate}) {
// TODO: Add light/dark mode management
// TODO: Add 2 columns - feed and messages/online friends
  const [token, setToken] = useState(window.localStorage.getItem("token")); 

  // ===== LOGIN POPUP & TIMEOUT CHECKER: COPY TO EVERY AUTHENTICATED PAGE: ==========   
  const showLoginPopup = !useSessionTimeOutCheck(); // checks every 5 seconds if token is valid and changes true/false
  const closeLoginPopup = () => {
    navigate('/')
  }

  const goToRegister = () => {
    navigate('/')
  }

  return (
    <div className='h-screen w-screen bg-#bgGrey dark:bg-gray-900 flex flex-col'>

      {/* LOGGED OUT POPUP */}
      {showLoginPopup && 
        <div className='z-40 absolute h-full w-full'>
          <LoginPopup 
            navigate={navigate} 
            onClose={closeLoginPopup} 
            handleRegister={goToRegister}
          />
        </div>
        }

      {/* NAV BAR */}
      <div className='z-30'>
        <Navbar navigate={navigate} token={token} setToken={setToken}/>
      </div>

      {/* MAIN PAGE */}
      <div className='w-screen h-screen flex flex-row'>

          {/* MAIN DIV - Feed & New Post */}
          <div className='w-full h-full'>
            <Feed navigate={navigate} />
          </div>

          {/* MESSENGER DIV - Online friends */}
          <div className='flex flex-row items-center justify-between h-full w-[36rem]  md:w-[38.5rem] lg:w-[42.5rem] px-4
          border-l-2'>
            MESSENGER
          </div>

        </div>
    </div>
  )
}
