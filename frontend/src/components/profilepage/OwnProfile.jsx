import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import getSessionUserID from '../../utilities/GetSessionUserID';
import { findUser } from '../../api_calls/usersAPI';
import LargeProfilePicture from '../user/LargeProfilePicture';

export default function OwnProfile({ navigate, token, setToken }) {

    // TODO change this to conditional rendering for re-factoring...

    // =========== STATE VARIABLES ==========================
    // PROFILE PAGE OWNER:
    // const { userID } = useParams(); //ID of the profile page owner
    const [user, setUser] = useState(null); // State to hold user data

    // SESSION USER:
    const sessionUserID = getSessionUserID(token);
    //   const sessionUser = useFetchUserDataByID(sessionUserID);

    // FRIEND REQUEST / UNFRIEND / ACCEPT or DENY FRIENDS BUTTONS ================
    // If the profile owner and user are friends (they will be mutually friends): Unfriend Button & Message Button
    // const areFriends = sessionUser && sessionUser.friends.some(user => user._id === userId);
    // Else if the profile owner HAS sent the user a friend request: 
    // const requestRecieved = sessionUser && sessionUser.requests.some(user => user._id === userId);
    // Else neither user has sent a friend request: Friend Request / Cancel Friend Request Button

    // ========= COMPONENT MOUNT: Set Profile Owner Data ===============
    useEffect(() => {
        if (token) {
            findUser(token, sessionUserID)
            .then(userData => {
                window.localStorage.setItem("token", userData.token);
                setToken(window.localStorage.getItem("token"));
                setUser(userData.user);
            })
        }
    }, []);




    // ================= JSX FOR COMPONENT ================================
    if (user) {
        return(
        <div className='w-10/12 h-full max-w-[60rem] min-w-[30rem] bg-slate-100 flex flex-col
        mx-auto
        '>

            {/* COVER PHOTO */}
            <div className='w-full h-[18rem] relative'>
                <img className='w-full h-full -z-10'
                src={`https://picsum.photos/seed/a${user._id}/400/700?grayscale`}
                alt={`Your cover`}
                />

                {/* NAME */}
                <p className='absolute left-[13.2rem] bottom-4 z-10 font-semibold text-white text-[2rem]'
                >{`${user.firstName} ${user.lastName}`}</p>

                {/* PROFILE PICTURE */}
                <div className='w-[11rem] h-[11rem] z-20 absolute
                left-[1rem] top-[9.5rem]
                '>
                    <LargeProfilePicture id={user._id} name={`${user.firstName} ${user.lastName}`}/>
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
