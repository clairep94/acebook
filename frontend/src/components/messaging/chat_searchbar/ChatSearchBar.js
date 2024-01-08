import React, {useState} from 'react'
import ChatSearchInput from './ChatSearchInput';
import ChatSearchResultList from './ChatSearchResultList';
import { allUsers } from '../../../api_calls/usersAPI';


export default function ChatSearchBar({ 
        navigate, token, setToken, sessionUserID,
        chatSearchResults, setChatSearchResults,
        setCurrentChat, setSendNewConversation,
        chats, setChats 
    }) {


    const [input, setInput] = useState('');



    // =========== GET ALL USERS AS CLIENT TYPES INTO SEARCH BAR =========================
    // currently using allUsers method -> prefilter instead?
    const searchUsers = (value) => {
        allUsers(token)
        .then(usersData => {
            window.localStorage.setItem("token", usersData.token)
            setToken(window.localStorage.getItem("token"))

            const results = usersData.users.filter((user) => {
                const fullName = `${user.firstName} ${user.lastName}`;
                return (
                    value && //if user has not left the search field blank
                    user && //user exists in the api
                    fullName.toLowerCase().includes(value.toLowerCase()) //search value is partially included in the user.fullName
                )
            });
            setChatSearchResults(results);
            })
        }

    

    // ========= CALL searchUsers AS USER IS TYPING: =====================
    const handleChange = (value) => {
        setInput(value);
        searchUsers(value);
    }


    // ========= JSX OF COMPONENT UI ==============================

    return (
        <div className='relative'>
            <ChatSearchInput 
                searchUsers={searchUsers}
                handleChange={handleChange}
                input={input}
            />
            <div className='absolute w-full'>
                <ChatSearchResultList
                    token={token}
                    setToken={setToken}
                    sessionUserID={sessionUserID}
                    setChats={setChats}
                    chats={chats}
                    setCurrentChat={setCurrentChat}
                    setSendNewConversation={setSendNewConversation}
                    results={chatSearchResults}
                />
            </div>
        </div>
    )
}
