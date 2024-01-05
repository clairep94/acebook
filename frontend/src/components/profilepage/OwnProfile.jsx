import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import getSessionUserID from '../../utilities/GetSessionUserID';
import { findUser } from '../../api_calls/usersAPI';
import LargeProfilePicture from '../user/LargeProfilePicture';

export default function OwnProfile({navigate, token, setToken, sessionUserID, sessionUser, setSessionUser}) {


    // ================= JSX FOR COMPONENT ================================
    if (sessionUser) {
        return(
        <div className='w-10/12 h-full max-w-[60rem] min-w-[30rem] bg-slate-100 flex flex-col
        mx-auto
        '>

            {/* COVER PHOTO */}
            <div className='w-full h-[18rem] relative'>
                <img className='w-full h-full -z-10'
                src={`https://picsum.photos/seed/a${sessionUser._id}/400/700?grayscale`}
                alt={`Your cover`}
                />

                {/* NAME */}
                <p className='absolute left-[13.2rem] bottom-4 z-10 font-semibold text-white text-[2rem]'
                >{`${sessionUser.firstName} ${sessionUser.lastName}`}</p>

                {/* PROFILE PICTURE */}
                <div className='w-[11rem] h-[11rem] z-20 absolute
                left-[1rem] top-[9.5rem]
                '>
                    <LargeProfilePicture id={sessionUser._id} name={`${sessionUser.firstName} ${sessionUser.lastName}`}/>
                </div>
            </div>

            {/* PAGE OPTIONS */}
            <div className='flex flex-row bg-white h-[3.3rem] shadow-lg z-10 items-center justify-between px-12 '>
                <div className='w-14'></div>
                <p>Timeline</p>
                <p>About</p>
                <p>Friends</p>
                <p>Photos</p>
            </div>

            

            {/* PAGE BOTTOM SECTION */}
            <div className='mt-5 h-full w-full flex flex-row'>
                {/* LEFT */}
                <div className='mx-2 ml-4 h-full w-5/12 flex flex-col space-y-3'>

                    {/* INTRO and ADD/UNFRIEND BUTTON */}
                    <div className='w-full h-[14rem] bg-white rounded-xl p-2 shadow-md'>
                        Intro OR ADD FRIEND BUTTONS
                    </div>

                    {/* FRIENDS LIST */}
                    <div className='w-full h-[18rem] bg-white rounded-xl p-2 shadow-md'>
                        Friends
                    </div>

                </div>

                {/* RIGHT */}
                <div className='mx-2 mr-4 h-full w-7/12 flex flex-col space-y-3'>

                    <div className='w-full h-[4rem] bg-white rounded-xl p-2 shadow-md'>
                        Post on your wall
                    </div>

                    <div className='w-full h-[4rem] bg-white rounded-xl p-2 shadow-md'>
                        {`Your posts`}
                        <p>Change this to a map with each div as a card</p>
                    </div>
                </div>
            </div>

        </div>
    )
    }

}
