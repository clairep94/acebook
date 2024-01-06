import React, {useState} from 'react';
import { FiSearch } from "react-icons/fi";


export default function SearchInput({ searchUsers, input, handleChange, handleSubmit}) {

    // ========= JSX OF COMPONENT UI ==============================
    return (
        <div>
            <form aria-label='searchbar input'
                className='relative'
                onSubmit={handleSubmit}>
                {/* INPUT FIELD */}
                <input
                    type='text'
                    placeholder='Search Facebook'
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                    className='
                    flex flex-row relative
                    h-[2.6rem] w-full 
                    p-2 pl-4
                    rounded-full
                   bg-slate-100 
                    text-gray-600 text-sm
                    shadow-sm 
                    focus:ring-2 focus:outline-none focus:ring-sky-300
                    placeholder-gray-400
                    '
                />
                {/* SUBMIT BUTTON */}
                <button type="submit"
                    aria-label="Submit search button"
                    id="submit-search-button"
                    onClick={handleSubmit}
                    className='font-medium rounded-full text-lg p-[0.5rem] text-center
                    text-gray-500 hover:text-gray-500 hover:bg-gray-200
                    dark:text-gray-400 dark:hover:text-gray-500
                    focus:ring-2 focus:outline-none focus:ring-gray-300 focus:bg-gray-200
                    absolute bottom-[0.25rem] right-[0.3rem]
                    '>
                    <FiSearch/>
                </button>
            </form>
        </div>
    )
}
