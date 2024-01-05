import React, {useEffect, useState} from 'react';
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications, IoLogOut } from "react-icons/io5";
import getSessionUserID from '../../utilities/GetSessionUserID';
import { findUser } from '../../api_calls/usersAPI';
import SearchBar from '../searchbar/SearchBar';

export default function Navbar( {navigate, token, setToken} ) {

    // ======== FIND AND SET THE USER DATA UPON COMPONENT LOAD =============
    let sessionUserID = getSessionUserID(token);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (token && sessionUserID) {
            findUser(token, sessionUserID)
            .then(userData => {
                window.localStorage.setItem("token", userData.token)
                setToken(window.localStorage.getItem("token"))
                setUserData(userData.user);
                console.log(userData.user);
            })
        }
    },[])

    // ======= CHECKING IF CURRENT PAGE MATCHES THAT ICON ============
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        // Update currentPath whenever the route changes
        const pathname = window.location.pathname;
        setCurrentPath(pathname);
    }, []);

    const isCurrentPage = (path) => currentPath === path;


    // ===== ICONS FOR NAV BAR ===========
    const iconFunctions = [
        { 
            name: "Home",
            handleClick: () => {
                navigate("/");
            },
            path: '/',
            icon: <AiFillHome />,
            translateY: 0,
            size: "1.55rem",
            textSize:"0.55rem"
        },
        {   
            name: "Requests",
            handleClick: () => {
                navigate("/friend_requests");
            },
            path: '/friend_requests',
            icon: <FaUserFriends />,
            translateY: 0,
            size: "1.75rem",
            textSize:"0.52rem"
        },
        {   
            name: "Notifications",            
            handleClick: () => {
                navigate("/notifications");
            },
            path: '/notifications',
            icon: <IoNotifications />,
            translateY: 0,
            size: "1.55rem",
            textSize:"0.5rem"
        },
        {   
            name: "Messages",
            handleClick: () => {
                navigate("/messages");
            },
            path: '/messages',
            icon: <AiFillMessage />,
            translateY: 0,
            size: "1.5rem",
            textSize:"0.52rem"
        },
        {   
            name: "Logout",
            handleClick: () => {
                window.localStorage.removeItem("token")
                navigate('/welcome')
                //TODO add: disconnect from socket
            },
            icon: <IoLogOut />,
            translateY: 0,
            size: "1.7rem",
            textSize:"0.55rem"
        },
    ]


    // ======= CHECKING IF CURRENT PAGE MATCHES THAT ICON ============
    const friendRequests = userData && userData.requests.length ? true: false;
    // TODO have to add a property to the map. "property" : "requests", "notifications", "unread_messages?"



    // ================= JSX FOR COMPONENT ================================
    return (
        <div aria-label='navbar' id='navbar'
            className='w-screen h-[4rem] bg-white flex flex-row 
                p-2 justify-between px-4
                dark:bg-gray-800 dark:border-gray-700 dark:border
                shadow-[0px_0px_10px_0px_#d9deed] dark:shadow-lg'>

            {/* ================= LEFT SIDE NAVBAR ================== */}
            <div className='flex flex-row items-center'>
                {/* FACEBOOK LOGO */}
                <a href='/' className='mr-3'>
                    <img src='/images/acebook-logo.png' alt='facebook-logo' className='hidden sm:block w-[2.8rem] h-[2.8rem]'/>
                </a>

                {/* SEARCHBAR - responsive breakpoints to the screensize */}
                <div className='
                    min-w-[12rem] max-w-[32rem]
                    md:min-w-[18rem] md:max-w-[32rem]
                    lg:min-w-[26rem] lg:max-w-[32rem]
                    xl:min-w-[32rem] xl:max-w-[32rem]
                    flex flex-col'
                    >  
                    <SearchBar navigate={navigate} token={token} setToken={setToken}/>
                </div>
            </div>

            {/* ================= RIGHT SIDE OF NAVBAR ================= */}
            <div className='flex flex-row'>

            {userData && 
                <>
                {/* NAVBAR ICONS */}
                <div className='flex flex-row items-center justify-between h-[2.8rem] w-[14rem] md:w-[16.5rem] mr-4 '>
                    {/* Icons from iconFunctions list. The current page's icon will be highlighted. Hovered icons show their name */}
                    {iconFunctions.map((item, index) => (
                        <div key={index} className='group flex flex-col items-center text-center '>
                            {/* Main Icon */}
                            <button aria-label={`${item.name} icon`} id={`${item.name} icon`}
                                className={`flex items-center text-[${item.size}]
                                ${isCurrentPage(item.path) ? 'text-#iconBlue' : 'text-#iconGrey'} hover:text-#iconBlue`}
                                onClick={item.handleClick}>
                                {item.icon}
                            </button>
                            {/* Blue dot when on current page */}
                            { isCurrentPage(item.path) && <div className='mt-[0.3rem] h-[0.3rem] w-[0.3rem] rounded-full bg-#iconBlue group-hover:hidden'></div>}
                            {/* Label for the Icon, shows when hover */}
                            <p className={`pt-1 font-semibold text-[${item.textSize}] text-#iconBlue hidden group-hover:block`}>{item.name}</p>
                        </div>
                    ))}
                </div>

                {/* PROFILE PICTURE & NAME */}
                <a href='/profile' className='flex flex-row items-center mr-3'>
                    <img className='h-11 w-11 rounded-full
                        object-cover border-[0.2rem] border-white shadow-lg mr-2' 
                        src={`https://picsum.photos/seed/${userData._id}/300`}
                        alt='profile'
                    />
                   <p className='font-semibold text-#textDarkGrey hidden lg:block'>
                        {`${userData.firstName} ${userData.lastName}`}
                    </p>
                </a>
                </>
            }
            </div>
        </div>
  )
}
