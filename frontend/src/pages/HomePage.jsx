import React, {useEffect, useState} from 'react';
import Feed from '../components/feed/Feed';
import Navbar from '../components/navbar/Navbar';


export default function HomePage({navigate}) {
// TODO: Add light/dark mode management
// TODO: Add 2 columns - feed and messages/online friends

  return (
    <div className='h-screen w-screen bg-[#fcfdff] dark:bg-gray-900 flex flex-col'
    >
        {/* NAV BAR */}
        <Navbar navigate={navigate} />

        <div className='w-screen h-screen'>
            <Feed navigate={navigate} />

        </div>
    </div>
  )
}
