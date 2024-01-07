import React, {useEffect, useState} from 'react'
import FriendButtons from '../friend/FriendButtons'

export default function ProfileHeader({ target, setTarget, sessionUserID, sessionUser, setSessionUser, section, setSection, token, setToken }) {

  // ============== TW Style Strings - separated from jsx for readability: ============

  const headerMainContainer = `max-w-[100rem] w-full h-full z-10 relative`

  const coverPhoto = `w-full h-[21rem] lg:h-[24rem] xl:h-[27rem] max-w-[100rem] z-10 xl:rounded-b-2xl
  object-fill`

  const profilePicture = `rounded-full h-[16rem] w-[16rem] bg-slate-600 absolute 
    top-[13rem] md:top-[13rem] lg:top-[16rem] xl:top-[19rem] left-7 border-[0.35rem] border-white`

  const nameFriendsContainer = `ml-[19rem] py-[0.8rem] h-[8.5rem] flex flex-col`
  const name = `text-[2.3rem] font-bold translate-y-6`
  const numFriendsAndFriendsButtonsContainer = `flex flex-row justify-between items-end pr-4 -translate-y-1`
  const numFriends = `text-[1.2rem] font-semibold text-gray-600  translate-y-5 lg:translate-y-1 hover:cursor-pointer hover:underline`

  const friendButtonsContainer = `flex flex-row space-x-2 -translate-y-1`



  // ========================= PROFILE SECTION SELECTOR BUTTONS =======================
  // Changing the selected section to view
  const viewPosts = () => {setSection('Posts')}
  const viewFriends = () => {setSection('Friends')}

  // Checking which section it is
  const onPosts = section === 'Posts'
  const onFriends = section === 'Friends'

  // Style strings:
const sectionSelectorButtonsContainer = `mx-[2rem]
  h-[3.8rem] flex items-center lg:justify-center justify-end space-x-3
  border-t-[2px] border-gray-300
`;  
  const allSectionSelectorButtons = `
  flex items-center justify-center h-[3.4rem] w-[9rem] rounded-lg text-[1.2rem] font-medium hover:cursor-pointer 
  `

  const currentHighlight = `absolute -bottom-[0.05rem] w-[9rem] bg-[#4d76b2] h-[3.5px]`


  // ======================== JSX FOR COMPONENT =============================================
  if (target) {
    return (
      <div aria-label='header main container' className={headerMainContainer}>

        {/* COVER PHOTO */}
        <img aria-label='cover photo' className={coverPhoto}
          src={`https://picsum.photos/seed/a${target._id}/300/700?grayscale`}
          alt='cover'>
        </img>

        {/* PROFILE PICTURE */}
        <img aria-label='profile picture' className={profilePicture} 
          src={`https://picsum.photos/seed/${target._id}/300`}
          alt='cover'>
        </img>

        {/* NAME & FRIENDS */}
        <div aria-label='name and friends container' className={nameFriendsContainer}>

          {/* NAME */}
          <h1 aria-label='name' className={name}>
            {target.firstName}{' '}{target.lastName}
          </h1>

          {/* NUM FRIENDS & FRIENDS BUTTONS */}
          <div aria-label='num friends and friends buttons container' className={numFriendsAndFriendsButtonsContainer}>

            {/* NUM FRIENDS */}
            <div aria-label='num friends' className={numFriends} onClick={viewFriends}>
              {target.friends.length === 0
                ? 'No friends yet'
                : target.friends.length === 1
                ? '1 friend'
                : `${target.friends.length} friends`}
            </div>

            {/* FRIEND BUTTONS */}
            <div aria-label='friends buttons container' className={friendButtonsContainer}>
              <FriendButtons token={token} setToken={setToken} target={target} setTarget={setTarget}
              sessionUserID={sessionUserID} sessionUser={sessionUser} setSessionUser={setSessionUser}/>
            </div>
          </div>
        </div>

        {/* PAGE OPTIONS - Posts & Friends */}

        <div aria-label='section selector buttons container' className={sectionSelectorButtonsContainer}>
          <button className={allSectionSelectorButtons + (onPosts ? ('text-[#4d76b2]'):('text-[#7c7c7c] hover:bg-gray-100'))
          } onClick={viewPosts}>
            Posts
          {onPosts && (<div className={currentHighlight}/>)}
          </button>

          <button className={allSectionSelectorButtons + (onFriends ? ('text-[#4d76b2]'):('text-[#7c7c7c] hover:bg-gray-100'))
          } onClick={viewFriends}>
            Friends
          {onFriends && (<div className={currentHighlight}/>)}
          </button>

        </div>

      </div>



    )
    }

}
