import React from 'react'
import ChatSearchResultCard from './ChatSearchResultCard'
import { createChat } from '../../../api_calls/chatsAPI';

export default function ChatSearchResultList({ results, token, setToken, sessionUserID, 
    setChats, chats, setCurrentChat, setSendNewConversation
    }) {



    if (results.length > 0) {
        return (
            <div 
            aria-label='chat search results list'
            className='bg-white
            flex flex-col w-full
            shadow-lg rounded-xl 
            mt-2 z-50
            overflow-y-scroll max-h-40'>
                {results.map ((result, id) => (
                    <div key={id}>
                        <ChatSearchResultCard result={result} token={token} setToken={setToken} sessionUserID={sessionUserID}
                        setChats={setChats} chats={chats} setCurrentChat={setCurrentChat} setSendNewConversation={setSendNewConversation}
                        />
                    </div>
                )
                )}
            </div>
        )
    }
}


