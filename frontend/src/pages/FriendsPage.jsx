import React, {useEffect, useState} from 'react'


export default function FriendsPage({ navigate, token, setToken, sessionUserID, sessionUser, setSessionUser }) {



  // ======================== JSX FOR COMPONENT =============================================

    return (
      <div className='w-full flex bg-green-100 mt-3 mb-2 '>
        {/* MENU - no overflow? */}
        <div className='w-[20rem] shadow-lg bg-red-200 flex flex-col'>
          <p>Friends</p>
          <p>Friend Requests</p>
        </div>

        {/* MAIN - overflow scroll */}
        <div className='bg-yellow-200 overflow-scroll w-full'>
                {/* LENGTH TESTER */}
                  <div className='w-[30px] h-[600rem] bg-green-500'></div>
                  <div className='w-[60px] h-5 bg-purple-200'></div>

        </div>

        
      </div>
    )
  

}
