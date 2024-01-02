import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import getSessionUserID from '../../utilities/GetSessionUserID';
import { findUser } from '../../api_calls/usersAPI';
import ProfilePicture from '../user/ProfilePicture';

// FOR NOW FOCUSING ON 'OTHER PROFILE'
export default function Profile({ navigate, token, setToken }) {

    // =========== STATE VARIABLES ==========================
    // PROFILE PAGE OWNER:
    const { userID } = useParams(); //ID of the profile page owner
    const [user, setUser] = useState(null); // State to hold user data

    // SESSION USER:
    const sessionUserID = getSessionUserID;
    //   const sessionUser = useFetchUserDataByID(sessionUserID);

    // FRIEND REQUEST / UNFRIEND / ACCEPT or DENY FRIENDS BUTTONS ================
    // If the profile owner and user are friends (they will be mutually friends): Unfriend Button & Message Button
    // const areFriends = sessionUser && sessionUser.friends.some(user => user._id === userId);
    // Else if the profile owner HAS sent the user a friend request: 
    // const requestRecieved = sessionUser && sessionUser.requests.some(user => user._id === userId);
    // Else neither user has sent a friend request: Friend Request / Cancel Friend Request Button



    // const [currentPath, setCurrentPath] = useState('');
    // useEffect(() => {
    //     // Update currentPath whenever the route changes
    //     const pathname = window.location.pathname;
    //     setCurrentPath(pathname);
    // }, []);

    // const isSessionUsersPage = (currentPath === '/profile')

    // ========= COMPONENT MOUNT: Set Profile Owner Data ===============
    useEffect(() => {
        if (token) {
            if (sessionUserID === userID) {
                navigate('/profile')
            }

            findUser(token, userID)
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
                alt={`${user.firstName} ${user.lastName} cover`}
                />

                {/* NAME */}
                <p className='absolute left-[13.2rem] bottom-4 z-20 font-semibold text-white text-[2rem]'
                >{`${user.firstName} ${user.lastName}`}</p>

                {/* PROFILE PICTURE */}
                <div className='w-[11rem] h-[11rem] z-40 absolute
                left-[1rem] top-[9.5rem]
                '>
                    <ProfilePicture id={user._id} name={`${user.firstName} ${user.lastName}`}/>
                </div>
            </div>

            {/* PAGE OPTIONS */}
            <div className='flex flex-row bg-white h-[3rem] shadow-lg z-20 items-center justify-between px-12'>
                <div className='w-14'></div>
                <p>Timeline</p>
                <p>About</p>
                <p>Friends</p>
                <p>Photos</p>
            </div>

            {/* PAGE BOTTOM SECTION */}
            <div className='mt-10 bg-slate-400 h-full w-full'>

            </div>


        </div>
    )
    }

}
