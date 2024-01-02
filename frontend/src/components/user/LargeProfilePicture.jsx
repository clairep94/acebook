import React from 'react'

export default function LargeProfilePicture({id, name}) {
    // return the user's profile picture -- specify size outside of this component
    // TODO add checking if user is online
    if(id && name){
        return (
            <div>
                <img
                src={`https://picsum.photos/seed/${id}/300`}
                alt={`${name}`}
                className={`rounded-full
                        object-cover border-[0.4rem] border-white shadow-lg`}
                />
            </div>
        )
    } else {
        return (
            <div aria-label='loading profile picture' className='rounded-full bg-gray-500'>
            </div>
        )
    }
}
