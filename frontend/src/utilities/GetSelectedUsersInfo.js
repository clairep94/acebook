import { useState, useEffect } from 'react';
import { findUser } from '../api_calls/usersAPI';

const useFetchUserDataByID = (userID) => {
    const [token, setToken] = useState(window.localStorage.getItem('token'));
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (token && userID) {
        findUser(token, userID)
            .then(data => {
                window.localStorage.setItem("token", data.token);
                setToken(window.localStorage.getItem("token"));
                setUserData(data.user);
                })
            }
    }, [userID, token]);

    return userData;
};

export default useFetchUserDataByID;

// Use Example:

// import useFetchUserDataByID from '../utility/getselectuserinfo';

// const userID = comment.user_id;
// const FoundUser = useFetchUserDataByID(userID);
// const userEmail = FoundUser && FoundUser.email ? FoundUser.email : '';