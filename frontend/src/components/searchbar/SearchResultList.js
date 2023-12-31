import React from 'react'
import SearchResultCard from './SearchResultCard'

export default function SearchResultList({ results, navigate }) {

    if (results.length > 0) {
        return (
            <div 
            aria-label='search results list'
            className='bg-white
            flex flex-col w-full
            shadow-lg rounded-xl 
            mt-2 z-50
            overflow-y-scroll max-h-40'>
                {results.map ((result, id) => (
                    <div key={id}>
                        <SearchResultCard navigate={navigate} result={result}/>
                    </div>
                )
                )}
            </div>
        )
    }
}


