import React, {useState} from 'react'
import SearchInput from './SearchInput';
import SearchResultList from './SearchResultList';
import { allUsers } from '../../api_calls/usersAPI';


export default function SearchBar({navigate, token, setToken}) {
    const [results, setResults] = useState([]);

    // =========== GET ALL USERS AS CLIENT TYPES INTO SEARCH BAR =========================
    // currently using allUsers method -> prefilter instead?
    const searchUsers = (value) => {
        if (token){
            allUsers(token)
            .then(usersData => {
                window.localStorage.setItem("token", usersData.token)
                setToken(window.localStorage.getItem("token"))

                const results = usersData.users.filter((user) => {
                    const fullName = `${user.firstName} ${user.lastName}`;
                    return (
                        value && //if user has not left the search field blank
                        user && //user exists in the api
                        // user.fullName && //user has a full name in the api
                        fullName.toLowerCase().includes(value.toLowerCase()) //search value is partially included in the user.fullName
                    )
                });
                console.log(results);
                setResults(results);
            })
        }
    }

    // ========= JSX OF COMPONENT UI ==============================
    return (
        <div className=''>
            <SearchInput 
                searchUsers={searchUsers}
                // handleSubmit={handleSubmit}
                // value={input}
                // handleChange={handleChange}
                // handleSubmit={handleSubmit}
            />
            <div className='absolute'>
                <SearchResultList 
                    navigate={navigate} 
                    results={results}
                />
            </div>
        </div>
    )
}
