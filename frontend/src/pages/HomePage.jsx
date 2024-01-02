import React, {useEffect, useState} from 'react';
import Feed from '../components/feed/Feed';
import Navbar from '../components/navbar/Navbar';



export default function HomePage({navigate}) {
// TODO: Add light/dark mode management
// TODO: Add 2 columns - feed and messages/online friends
  const [token, setToken] = useState(window.localStorage.getItem("token")); 


  return (
    <div className='h-screen w-screen bg-[#fcfdff] dark:bg-gray-900 flex flex-col'
    >
        {/* NAV BAR */}
        <Navbar navigate={navigate} token={token} setToken={setToken}/>

        <div className='w-screen h-screen'>
            <Feed navigate={navigate} />

        </div>
    </div>
  )
}
