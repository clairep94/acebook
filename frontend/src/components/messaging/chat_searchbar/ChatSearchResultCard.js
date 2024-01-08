import React from 'react'
import ProfilePicture from '../../user/ProfilePicture'
import { createChat } from '../../../api_calls/chatsAPI';

export default function ChatSearchResultCard({ result, id, token, setToken, sessionUserID, 
    setChats, chats, setCurrentChat, setSendNewConversation }) {

const targetID = result._id;

    // Check if a target in a member of a chat: -> returns bool
    const isTargetUserInChat = (chat) => {
        return chat.members.some(member => member._id === targetID);
    }

    // Check if the target user is already talking to the sessionUser: -> returns bool
    const alreadyTalking = () => {
        return chats.some(chat => isTargetUserInChat(chat));
    }

    // Get the existing chat and setCurrentChat, use if alreadyTalking is true:
    const setExistingChat = () => {
        const existingChat = chats.find(chat => isTargetUserInChat(chat));
        setCurrentChat(existingChat);
    }

    // Create a new chat, use if alreadyTalking is not true:
    const createNewChat = async (event) => {
        console.log("create a new chat")
        // event.preventDefault();

        const newChatPayload = {
            senderID: sessionUserID,
            receiverID: targetID
        }

        if (token) {
            createChat(token, newChatPayload)
            .then(newChatData => {
                window.localStorage.setItem("token", newChatData.token)
                setToken(window.localStorage.getItem("token"))

                // add newChat to the chats array:
                setChats([...chats, newChatData.chat])

                // set newChat to the current chat:
                console.log(newChatData.chat)
                setCurrentChat(newChatData.chat)

                // send newChat to the socket server:
                const receiverID = targetID;
                setSendNewConversation({...newChatData.chat, receiverID});
                console.log("send signal to new chat partner")
            })
        }
    }

  // BUTTON CLICK -------------------
  const handleClick = () => {
    if (targetID === sessionUserID) {
      console.log('selected self'); // TODO change this so that you can talk to yourself. change thats to array of non-self chat members. pop out first instance.
    }
    else if (alreadyTalking()){
      setExistingChat()
    }
    else {
      createNewChat()
    }
  }



  

  
  return (
    <div aria-label={`${result.firstName} ${result.lastName}`} onClick={handleClick}>

        {/* ENTIRE CARD IS A LINK TO THE USER'S PROFILE */}
        <a href={`/users/${result._id}`}
        className='flex flex-row hover:bg-gray-100
        px-[10px] py-[10px] pl-5
        '>
          {/* PROFILE PICTURE */}
          {/* Had to parse data first before feeding into component, or it would not load */}
          <div className='h-10 w-10 mr-2'>
            <ProfilePicture id={result._id} name={`${result.firstName} ${result.lastName}`}/>
          </div>

          {/* NAME */}
          <div className='flex flex-row'>
            <span className='flex items-center font-medium translate-y-1
            text-md
            text-gray-800'>
              {`${result.firstName} ${result.lastName}`}
            </span>
          </div>

        </a>
    </div>
  )
}
