import React, {useEffect, useState} from 'react'
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import FriendRequestCardMed from '../components/friend/FriendRequestCardMed';
import FriendCardMed from '../components/friend/FriendCardMed';



export default function MessagingPage({ navigate, token, setToken, sessionUserID, sessionUser, setSessionUser }) {


  // ======================== JSX FOR COMPONENT =============================================

  return (
    <div className='w-full flex mb-2 '>
      {/* MENU - no overflow? */}
      <div className='w-[35rem] shadow-xl  flex flex-col z-10 bg-white py-4 px-4 space-y-2'>
        <h1 className='text-[2rem] font-bold pb-4'>
          Chats
        </h1>
      </div>


    {/* MAIN - overflow scroll */}
    <div className='w-full items-center justify-center flex flex-col'>
      <img src='/images/pickChat.png'
        alt='pick a chat'>
      </img>
      <h3 className='font-bold text-[1.5rem] mt-9 text-slate-600'>
        Pick a chat!
      </h3>
    </div>



      {/* <div className='overflow-scroll w-full px-10 pt-10 bg-red-200'> */}
        {/* LENGTH TESTER */}
        {/* <div className='w-[50px] h-[100rem] bg-green-100'></div>
        <div className='w-[60px] h-5 bg-purple-200'></div>
      </div> */}

      
    </div>
  )
  

}
