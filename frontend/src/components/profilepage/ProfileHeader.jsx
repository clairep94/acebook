import React, {useEffect, useState} from 'react'
import { findUser } from '../../api_calls/usersAPI';
import LargeProfilePicture from '../user/LargeProfilePicture';
import FriendButtons from '../friend/FriendButtons';

import useFetchUserDataByID from '../../utilities/GetSelectedUsersInfo';

export default function ProfileHeader({ target, setTarget, sessionUserID, sessionUser, setSessionUser, section, setSection, token, setToken }) {

  // ============== TW Style Strings - separated from jsx for readability: ============

  const headerMainContainer = `max-w-[100rem] w-full bg-red-400 h-full z-10 relative`

  const coverPhoto = `w-full h-[21rem] lg:h-[24rem] xl:h-[27rem] max-w-[100rem] bg-yellow-400 z-10 xl:rounded-b-2xl`

  const profilePicture = `rounded-full h-[16rem] w-[16rem] bg-slate-600 absolute 
    top-[13rem] md:top-[13rem] lg:top-[16rem] xl:top-[19rem] left-6 border-[0.35rem] border-white`

  const nameFriendsContainer = `ml-[19rem] py-[0.8rem] h-[7rem] bg-yellow-300 flex flex-col`
  const name = `text-[2.3rem] font-bold translate-y-6`
  const numFriendsAndFriendsButtonsContainer = `flex flex-row justify-between items-end pr-4 -translate-y-1`
  const numFriends = `text-[1.2rem] font-semibold text-gray-600 translate-y-1 hover:cursor-pointer hover:underline`

  // ---------- FRIEND BUTTONS ---------------------
  const friendButtonsContainer = `flex flex-row space-x-2`
  const allFriendButtons = ''
  const primaryFriendButton = ''
  const secondaryFriendButton = ''

  // ---------- PROFILE SECTION SELECTOR BUTTONS ----------------
  // Changing the selected section to view
  const viewPosts = () => {setSection('Posts')}
  const viewFriends = () => {setSection('Friends')}

  // Checking which section it is
  const onPosts = section === 'Posts'
  const onFriends = section === 'Friends'

  // Style strings:
  const allSectionSelectorButtons = ''
  const currentSection = ''
  const notCurrentSection = ''
  const currentHighlight = ''


  // ======================== JSX FOR COMPONENT =============================================
  if (target) {
    return (
      <div aria-label='header main container' className={headerMainContainer}>

        {/* COVER PHOTO */}
        <div aria-label='cover photo' className={coverPhoto}>
        </div>

        {/* PROFILE PICTURE */}
        <div aria-label='profile picture' className={profilePicture} >
        </div>

        {/* NAME & FRIENDS */}
        <div aria-label='name and friends container' className={nameFriendsContainer}>

          {/* NAME */}
          <h1 aria-label='name' className={name}>
            {target.firstName}{' '}{target.lastName}
          </h1>

          {/* NUM FRIENDS & FRIENDS BUTTONS */}
          <div className={numFriendsAndFriendsButtonsContainer}>

            {/* NUM FRIENDS */}
            <div className={numFriends} onClick={viewFriends}>
              {target.friends.length === 0
                ? 'No friends yet'
                : target.friends.length === 1
                ? '1 friend'
                : `${target.friends.length} friends`}
            </div>

            {/* FRIEND BUTTONS */}
            <div className={friendButtonsContainer}>
              <button className='text-[0.9rem] font-semibold text-white bg-blue-600 h-12 px-6 min-w-[7rem] rounded-md'>
                Accept
              </button>
              <button className='text-[0.9rem] font-semibold text-gray-800 bg-gray-300 h-12 px-6 min-w-[7rem] rounded-md'>
                Deny
              </button>
              <button className='text-[0.9rem] font-semibold text-gray-800 bg-gray-300 h-12 px-6 min-w-[7rem] rounded-md'>
                Message
              </button>
            </div>
          </div>
        </div>

        {/* PAGE OPTIONS - Posts & Friends */}

        <div className='h-[3.8rem] bg-gray-50 flex items-center lg:justify-center justify-end mr-10 lg:mr-0 space-x-3'>
          <div className={'flex items-center justify-center  h-[4rem] w-[10rem] rounded-lg text-[2rem] relative hover:bg-gray-100' + 
                          (section === 'Profile') ? ('text-#iconBlue') 
                          : ('text-#iconGrey')
          } >
            Posts
          </div>
          {(section === 'Profile') && <div className='absolute -bottom-[0.1rem] w-[4.5rem] bg-#iconBlue h-[2px]'/>}
          <div className='flex items-center justify-center h-[4rem] w-[10rem] rounded-lg text-[1.2rem]

          text-#iconGrey hover:bg-gray-100
          ' >
            Friends
          </div>

        </div>

      </div>



    )
    }

}
