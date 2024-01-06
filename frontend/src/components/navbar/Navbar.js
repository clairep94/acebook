import React, {useEffect, useState} from 'react';
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { CgGames } from "react-icons/cg";
import { IoNotifications, IoLogOut } from "react-icons/io5";
import { findUser } from '../../api_calls/usersAPI';
import SearchBar from '../searchbar/SearchBar';
import NavBarIcons from './NavBarIcons';

export default function Navbar( {navigate, token, setToken, sessionUserID, sessionUser, setSessionUser} ) {

    // ======== FIND AND SET THE USER DATA UPON COMPONENT LOAD =============
    useEffect(() => {
        if (token && sessionUserID) {
            findUser(token, sessionUserID)
            .then(sessionUser => {
                window.localStorage.setItem("token", sessionUser.token)
                setToken(window.localStorage.getItem("token"))
                setSessionUser(sessionUser.user);
            })
        }
    },[])

    // ======= CHECKING IF CURRENT PAGE MATCHES THAT ICON ============
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        // Update currentPath whenever the route changes
        const pathname = window.location.pathname;
        setCurrentPath(pathname);
    }, [navigate]);

    const isCurrentPage = (path) => currentPath === path;

    // ======= CHECKING IF THERE ARE ALERTS ============
    const friendRequests = sessionUser && sessionUser.requests.length ? true: false;
    //TODO add message alerts and game invites
    //TODO implement socket upon login

    // ===== ICONS FOR NAV BAR ===========
    const iconFunctions = [
        { 
            name: "Home",
            handleClick: () => {
                navigate("/");
            },
            path: '/',
            icon: <AiFillHome />,
            size: "1.55rem",
        },
        {   
            name: "Messages",
            handleClick: () => {
                navigate("/messages");
            },
            path: '/messages',
            icon: <AiFillMessage />,
            size: "1.5rem",
        },
        {   
            name: "Friends",
            handleClick: () => {
                navigate("/friends");
            },
            path: '/friends',
            icon: <FaUserFriends />,
            size: "1.7rem",
            notifications: friendRequests,
        },
        {   
            name: "Games",            
            handleClick: () => {
                navigate("/games");
            },
            path: '/games',
            icon: <CgGames />,
            size: "1.8rem",
        },
        {   
            name: "Logout",
            handleClick: () => {
                window.localStorage.removeItem("token")
                navigate('/welcome')
                //TODO add: disconnect from socket
            },
            icon: <IoLogOut />,
            size: "1.7rem",
        },
    ]




    // ================= JSX FOR COMPONENT ================================================
    return (
        <div aria-label='navbar' id='navbar'
            className='w-full h-[4rem] bg-white p-2 px-4
                flex flex-row 
                justify-between
                shadow-[0px_0px_10px_0px_#d9deed]'>

            {/* ================= LEFT SIDE NAVBAR ============================================== */}
            <div className='flex flex-row items-center'>
                {/* ============= FACEBOOK LOGO ============= */}
                <a href='/' className='mr-3'>
                    <img src='/images/facebook-logo.png' alt='facebook-logo' className='hidden md:block min-w-[2.8rem] h-[2.8rem]'/>
                </a>

                {/* ============ SEARCHBAR ==================== */}
                <div className='sm:w-[20rem] w-[12rem] flex flex-col mr-3'>  
                    <SearchBar navigate={navigate} token={token} setToken={setToken}/>
                </div>
            </div>

            {/* ================= RIGHT SIDE OF NAVBAR ========================================== */}
            <div className='flex flex-row'>

            {sessionUser && 
                <>
                {/* NAVBAR ICONS */}
                <div className='flex flex-row items-center justify-between h-[2.8rem] mr-2 '>
                    {iconFunctions.map((item, index) => (
                        <div key={index} className='group flex flex-col items-center text-center '>
                            <NavBarIcons icon={item} isCurrentPage={isCurrentPage(item.path)} index={index}/>
                        </div>
                    ))}
                </div>

                {/* PROFILE PICTURE & NAME */}
                <a href='/profile' className='flex flex-row items-center h-11 mr-3'>
                    <img className='h-11 min-w-11 rounded-full
                        object-cover border-[0.2rem] border-white shadow-lg mr-2' 
                        src={`https://picsum.photos/seed/${sessionUser._id}/300`}
                        alt='profile'
                    />
                   <p className='font-semibold text-#textDarkGrey hidden lg:block'>
                        {`${sessionUser.firstName} ${sessionUser.lastName}`}
                    </p>
                </a>
                </>
            }
            </div>
        </div>
  )
}
