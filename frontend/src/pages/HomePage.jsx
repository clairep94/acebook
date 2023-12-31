import React, {useEffect, useState} from 'react';
import Feed from '../components/feed/Feed';

import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications, IoLogOut } from "react-icons/io5";



export default function HomePage({navigate}) {

    const logout = () => {
        window.localStorage.removeItem("token")
        navigate('/')
        }


  return (
    <div className='h-screen w-screen bg-[#fcfdff] dark:bg-gray-900 flex flex-col'
    >
        {/* NAV BAR */}
        <div className='w-screen h-[3.75rem] bg-white flex flex-row items-stretch items-center
            p-2 
            dark:bg-gray-800 dark:border-gray-700 dark:border
            shadow-[0px_0px_10px_0px_#d9deed] dark:shadow-lg'>

            <img src='/images/acebook-logo.png' alt='facebook-logo' className='h-full mr-3'/>

            <div className='w-[16rem] h-[2.5rem] rounded-full bg-slate-50 mr-3 p-2 text-[#999c9f]'>
                <FiSearch/>
                Search placeholder...
            </div>

            <a href='/home' className='flex items-center text-[1.75rem] text-[#a8b5c8] mr-3'>
                <AiFillHome />
            </a>

            <a href='/friends' className='flex items-center text-[1.75rem] text-[#a8b5c8] mr-3'>
                <FaUserFriends/>
            </a>

            <a href='/notifications' className='flex items-center text-[1.75rem] text-[#a8b5c8] mr-3'>
                <IoNotifications />
            </a>

            <a href='/messages' className='flex items-center text-[1.75rem] text-[#a8b5c8] mr-3'>
                <AiFillMessage />
            </a>

            <button onClick={logout} className='flex items-center text-[1.75rem] text-[#a8b5c8] mr-3'>
                <IoLogOut />
            </button>

            <a href='/profile'>
                <img className='h-12 w-12 rounded-full
                    object-cover border-[0.2rem] border-white shadow-xl' 
                    src="https://media.licdn.com/dms/image/C4D03AQFCRdxPaFxEFw/profile-displayphoto-shrink_800_800/0/1583419992936?e=2147483647&v=beta&t=-aicjehD7GkHSo1bveZM_OVBx9hm3BBSxFegSVnEDPg"
                    alt='profile'
                />
            </a>

        </div>
        
        <div className='w-screen h-screen'>
            Column 3
            <Feed navigate={navigate} />

        </div>
    </div>
  )
}
