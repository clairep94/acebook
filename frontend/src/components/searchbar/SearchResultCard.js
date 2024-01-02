import React from 'react'
import ProfilePicture from '../user/ProfilePicture'

export default function SearchResultCard({ navigate, result }) {
  // TODO add if online greendot
  return (
    <div aria-label={`${result.firstName} ${result.lastName}`}>


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
