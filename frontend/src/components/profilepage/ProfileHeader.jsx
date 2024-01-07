import React, {useEffect, useState} from 'react'
import { findUser } from '../../api_calls/usersAPI';
import LargeProfilePicture from '../user/LargeProfilePicture';
import FriendButtons from '../friend/FriendButtons';

import useFetchUserDataByID from '../../utilities/GetSelectedUsersInfo';

export default function ProfileHeader({ user, setUser, sessionUserID, sessionUser, setSessionUser, section, setSection, token, setToken }) {

  // ============== TW Style Strings - separated from jsx for readability: ============

  const headerMainContainer = `max-w-[100rem] w-full bg-red-50 h-full z-10 relative`

  const coverPhoto = `w-full h-[21rem] lg:h-[24rem] xl:h-[27rem] max-w-[100rem] bg-yellow-400 z-10 xl:rounded-b-2x`

  const profilePicture = `rounded-full h-[16rem] w-[16rem] bg-slate-600 absolute 
    top-[13rem] md:top-[13rem] lg:top-[16rem] xl:top-[19rem] left-6 border-[0.35rem] border-white`

  const nameFriendsContainer = `ml-[19rem] py-[0.8rem] h-[7rem] bg-yellow-300 flex flex-col`
  const name = `text-[2.3rem] font-bold translate-y-6`
  const numFriendsAndFriendsButtonsContainer = `flex flex-row justify-between items-end pr-4 -translate-y-1`
  const numFriends = `text-[1.2rem] font-semibold text-gray-600 translate-y-1`

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
  if (user) {
    return ()
    }

}
