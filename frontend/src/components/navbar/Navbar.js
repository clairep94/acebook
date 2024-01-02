import React, {useEffect, useState} from 'react';
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaUserFriends } from "react-icons/fa";
import { IoNotifications, IoLogOut } from "react-icons/io5";

export default function Navbar( {navigate} ) {

    // ===== ICONS FOR NAV BAR ===========
    const iconFunctions = [
        { 
            name: "Home",
            handleClick: () => {
                navigate("/home");
            },
            icon: <AiFillHome />,
            translateY: 0,
            size: "1.7rem",
            textSize:"0.6rem"
        },
        {   
            name: "Requests",
            handleClick: () => {
                navigate("/friend_requests");
            },
            icon: <FaUserFriends />,
            translateY: 0,
            size: "1.95rem",
            textSize:"0.6rem"
        },
        {   
            name: "Notifications",            
            handleClick: () => {
                navigate("/notifications");
            },
            icon: <IoNotifications />,
            translateY: 0,
            size: "1.7rem",
            textSize:"0.55rem"
        },
        {   
            name: "Messages",
            handleClick: () => {
                navigate("/messages");
            },
            icon: <AiFillMessage />,
            translateY: 0,
            size: "1.63rem",
            textSize:"0.6rem"
        },
        {   
            name: "Logout",
            handleClick: () => {
                window.localStorage.removeItem("token")
                navigate('/')
            },
            icon: <IoLogOut />,
            translateY: 0,
            size: "1.85rem",
            textSize:"0.65rem"
        },
    ]


    // ======= CHECKING IF CURRENT PAGE MATCHES THAT ICON ============
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        // Update currentPath whenever the route changes
        const pathname = window.location.pathname;
        setCurrentPath(pathname);
    }, []);

    const isCurrentPage = (path) => currentPath === path;



    // ======= LOGOUT FUNCTION ===========
    const logout = () => {
        window.localStorage.removeItem("token")
        navigate('/')
        //TODO add: disconnect from socket
        }


    // ================= JSX FOR COMPONENT ================================
    return (
    // TODO timed out popup
    // Function to see what url 
    // TODO add framer motion button hover and selections
    // TODO add light/dark mode buttons
    // TODO separate friend requests and notifications as separate components, with conditional red mark
    // TODO separate profile picture as separate component with conditional green mark
        <div aria-label='navbar' id='navbar'
            className='w-screen h-[3.75rem] bg-white flex flex-row 
                p-2 justify-between
                dark:bg-gray-800 dark:border-gray-700 dark:border
                shadow-[0px_0px_10px_0px_#d9deed] dark:shadow-lg'>

            {/* LEFT SIDE NAVBAR */}
            <div className='flex flex-row'>
                {/* FACEBOOK LOGO */}
                <a href='/home' className='flex items-center text-[1.75rem] h-full w-[3rem] text-[#a8b5c8] mr-3'>
                    <img src='/images/acebook-logo.png' alt='facebook-logo' className='h-full w-[2.9rem]'/>
                </a>

                {/* SEARCHBAR */}
                <div className='w-[18rem] h-[2.4rem] rounded-full bg-slate-50 mr-3 p-2 text-[#999c9f] text-sm shadow-sm flex flex-row'>
                    <FiSearch/>
                    Search placeholder...
                </div>
            </div>

            {/* RIGHT SIDE OF NAVBAR */}
            <div className='flex flex-row'>

                {/* NAVBAR ICONS */}
                <div className='flex flex-row items-center justify-between w-[16.5rem] mr-4'>
                    {/* Icons from iconFunctions list. The current page's icon will be highlighted. Hovered icons show their name */}
                    {iconFunctions.map((item, index) => (
                        <div key={index} className='group flex flex-col items-center text-center w-8'>
                            {/* Main Icon */}
                            <button aria-label={`${item.name} icon`} id={`${item.name} icon`}
                                className={`flex items-center text-[${item.size}]
                                ${isCurrentPage(item.path) ? 'text-[#4d76b2]' : 'text-[#a8b5c8]'} hover:text-[#4d76b2]`}
                                onClick={item.handleClick}>
                                {item.icon}
                            </button>
                            {/* Blue dot when on current page */}
                            { isCurrentPage(item.path) && <div className='mt-[0.2rem] h-[0.4rem] w-[0.4rem] rounded-full bg-[#4d76b2] group-hover:hidden'></div>}
                            {/* Label for the Icon, shows when hover */}
                            <p className={`pt-1 font-semibold text-[${item.textSize}] text-[#4d76b2] hidden group-hover:block`}>{item.name}</p>
                        </div>
                    ))}
                </div>



                {/* PROFILE PICTURE & NAME */}
                <a href='/profile' className='flex flex-row items-center mr-3'>
                    <img className='h-12 w-12 rounded-full
                        object-cover border-[0.2rem] border-white shadow-lg mr-2' 
                        src="https://media.licdn.com/dms/image/C4D03AQFCRdxPaFxEFw/profile-displayphoto-shrink_800_800/0/1583419992936?e=2147483647&v=beta&t=-aicjehD7GkHSo1bveZM_OVBx9hm3BBSxFegSVnEDPg"
                        alt='profile'
                    />
                    <p className='font-semibold text-[#494949]'>Claire Peng</p>
                </a>
            </div>

        </div>

  )
}
