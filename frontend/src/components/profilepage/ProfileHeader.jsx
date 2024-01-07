import React, {useEffect, useState} from 'react'
import AcceptFriendButton from '../friend/friend_buttons/AcceptFriendButton'
import DenyFriendButton from '../friend/friend_buttons/DenyFriendButton'
import SendFriendButton from '../friend/friend_buttons/SendFriendRequest'
import UnfriendButton from '../friend/friend_buttons/UnfriendButton'
import UnsendFriendButton from '../friend/friend_buttons/UnsendFriendRequest'
import ProfileMessageButton from '../messaging/ProfileMessageButton'

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

  // ===================== FRIEND BUTTONS ================================
  const friendButtonsContainer = `flex flex-row space-x-2 -translate-y-1`
  const allFriendButtons = `
  text-[1rem] font-semibold h-12 px-6 min-w-[7rem] rounded-md hidden lg:block
  `
  // const primaryFriendButton = ` text-white bg-blue-600`
  // const secondaryFriendButton = ' text-black bg-gray-200'

  const primaryFriendButtonCols = `
    text-white bg-[#4087ca] hover:bg-[#4d76b2] 
    focus:ring-2 focus:ring-sky-300
    `

  const secondaryFriendButtonCols = `
      text-grey-800 bg-gray-100 hover:bg-gray-200
      border border-1
      focus:ring-2 focus:ring-sky-300
      `

  // conditions:
  const inList = (list, id) => {return (list.includes(id))}; // return true if list contains a targetID
  const areFriends = sessionUser && inList(sessionUser.friends, target._id);// if friends: UnfriendButton
  const receivedRequest = sessionUser && inList(sessionUser.requests, target._id); // if received, Accept & Deny Buttons
  const sentRequest = target && inList(target.requests, sessionUserID); // if none of these: Send or Unsend Buttons depending if sent

  // --------------------- BUTTON SETS ------------------------
  const areFriendsButtons = areFriends && (
    <>
      <UnfriendButton token={token} setToken={setToken} targetUserID={target._id} setSessionUser={setSessionUser}
      styling={allFriendButtons + secondaryFriendButtonCols}/>
      <ProfileMessageButton
      styling={allFriendButtons + primaryFriendButtonCols}/>
    </>
  );

  const receivedRequestButtons = !areFriends && receivedRequest && (
    <>
<div
  aria-label='friend request alert'
  className='text-gray-400 font-bold text-xl flex items-center border-4 px-10 py-3 border-gray-300 rounded-lg'
>
  {target.firstName} sent you a friend request
</div>

      <AcceptFriendButton token={token} setToken={setToken} targetUserID={target._id} setSessionUser={setSessionUser}
      styling={allFriendButtons + primaryFriendButtonCols}
      />
      <DenyFriendButton token={token} setToken={setToken} targetUserID={target._id} setSessionUser={setSessionUser}
      styling={allFriendButtons + secondaryFriendButtonCols}/>
      <ProfileMessageButton
      styling={allFriendButtons + secondaryFriendButtonCols}/>
    </>
  );

  const SendFriendRequestButton = !areFriends && !receivedRequest && !sentRequest && (
    <>
      <SendFriendButton token={token} setToken={setToken} targetUserID={target._id} setTargetUser={setTarget}
      styling={allFriendButtons + primaryFriendButtonCols}
      />
      <ProfileMessageButton
      styling={allFriendButtons + primaryFriendButtonCols}/>
    </>
  );

  const UnsendFriendRequestButton = !areFriends && !receivedRequest && sentRequest && (
    <>
      <UnsendFriendButton token={token} setToken={setToken} targetUserID={target._id} setTargetUser={setTarget}
      styling={allFriendButtons + secondaryFriendButtonCols}/>
      <ProfileMessageButton
        styling={allFriendButtons + primaryFriendButtonCols}/>
    </>
    
  );




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
                  {areFriendsButtons}
                  {receivedRequestButtons}
                  {SendFriendRequestButton}
                  {UnsendFriendRequestButton}
              {/* <button className={allFriendButtons + primaryFriendButton}>
                Accept
              </button>
              <button className={allFriendButtons + secondaryFriendButton}>
                Deny
              </button>
              <button className={allFriendButtons + secondaryFriendButton}>
                Message
              </button> */}
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
