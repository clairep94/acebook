import React, {useState} from 'react'
import SearchInput from './SearchInput';
import SearchResultList from './SearchResultList';
import { allUsers } from '../../api_calls/usersAPI';


export default function SearchBar({navigate, token, setToken}) {
    const [input, setInput] = useState('');
    const [results, setResults] = useState([]);

    // =========== GO TO SEARCH PAGE =========================
    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Search page and enter
        console.log('Search submitted!');
    };

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
            setResults(results);
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
            <SearchInput 
                searchUsers={searchUsers}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                input={input}
            />
            <div className='absolute w-full'>
                <SearchResultList 
                    navigate={navigate} 
                    results={results}
                />
            </div>
        </div>
    )
}
