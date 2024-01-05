import React, { useEffect, useState, useRef } from 'react'


export default function ChatCard({chatData, sessionUserID, online}) {
  // =========== STATE VARIABLES ==========================
  // const chatData = props.chatData;
  // const sessionUserID = props.sessionUserID;
  const conversationPartner = chatData.members.find((user) => user._id !== sessionUserID);
  // const online = props.online;



  // ======================== JSX FOR COMPONENT =============================================
  return (
    <>
        <div className="bg-red-100 hover:curser-pointer hover:bg-[#80808038]" >
            <div>
                {online && <div style={{backgroundColor: "greenyellow", borderRadius: "50%",
                  position: "absolute", left: "2rem", width: "1rem", height:"1rem"
                }}></div>}

                <img alt='small pfp' 
                    src={`https://picsum.photos/seed/${conversationPartner?._id}/300`} 
                    className='followerImage'
                    style={{width:'50px', height:'50px'}}
                />
                <div className='name' style={{fontSize: "0.8rem", fontFamily: "'Arial', sans-serif"}}>
                    <span>{`${conversationPartner.firstName} ${conversationPartner.lastName}`}</span>
                    <span style={{color: "grey"}}>{online? "Online" : "Offline"}</span>
                </div>
            
            </div>
        </div>
        <hr style={{width: '85%', border: '0.1px solid #ececec'}}/>
    </>
)

}
