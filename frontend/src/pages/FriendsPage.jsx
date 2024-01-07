import React, {useEffect, useState} from 'react'
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import FriendRequestCardMed from '../components/friend/FriendRequestCardMed';




export default function FriendsPage({ navigate, token, setToken, sessionUserID, sessionUser, setSessionUser }) {

  const [currentView, setCurrentView] = useState("Requests")
  const viewRequests = () => {setCurrentView("Requests")}
  const viewFriends = () => {setCurrentView("Friends")}

  
  // Styling strings

  // ======================== JSX FOR COMPONENT =============================================
  if (sessionUser){
    return (
      <div className='w-full flex  mb-2 '>
        {/* MENU - no overflow? */}
        <div className='w-[35rem] shadow-lg  flex flex-col z-10 bg-white py-5 px-3 space-y-2'>
          <h1 className='text-[2rem] font-bold pb-4'>
            Friends
          </h1>
          {/* VIEW FRIEND REQUESTS */}
          <div className='flex flex-row bg-gray-100 rounded-xl h-[4.2rem] items-center pl-3 justify-between'>
            <div className='flex flex-row items-center'
            onClick={viewRequests}
            >
              <div className='rounded-full w-[3rem] h-[3rem] bg-gray-300'>
                <div className='text-[1.9rem] translate-x-[0.7rem] translate-y-[0.5rem]'>
                  <BsFillPersonPlusFill/>
                </div>
              </div>
              <p className='text-[1.2rem] font-semibold text-gray-700 pl-5'>
                Friend Requests
              </p>
            </div>
            <div className='text-[2rem] font-semibold text-gray-500'>
              <IoIosArrowForward/>
            </div>
          </div>

          {/* VIEW FRIENDS */}
          <div className='flex flex-row bg-gray-100 rounded-xl h-[4.2rem] items-center pl-3 justify-between'>
            <div className='flex flex-row items-center'
            onClick={viewFriends}
            >
              <div className='rounded-full w-[3rem] h-[3rem] bg-gray-300'>
                <div className='text-[1.9rem] translate-x-[0.6rem] translate-y-[0.5rem]'>
                  <BsFillPersonLinesFill/>
                </div>
              </div>
              <p className='text-[1.2rem] font-semibold text-gray-700 pl-5'>
                All friends
              </p>
            </div>
            <div className='text-[2rem] font-semibold text-gray-500'>
              <IoIosArrowForward/>
            </div>
          </div>
        
        </div>


        {/* MAIN - overflow scroll */}
        <div className='overflow-scroll w-full px-10 pt-10'>
          {/* LENGTH TESTER */}

          <h2 className='text-[1.7rem] font-bold pb-4'>
          Friend Requests
          </h2>

          <div className='flex flex-row flex-wrap '>
            {sessionUser.requests.map((user) => (
                <FriendRequestCardMed token={token} setToken={setToken}
                requester={user} sessionUserID={sessionUserID} sessionUser={sessionUser} 
                setSessionUser={setSessionUser}
                />
            ))}
          </div>


        </div>

        
      </div>
    )
  }

}
