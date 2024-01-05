import { useEffect, useState } from 'react';
import { findUser } from '../api_calls/usersAPI';

const useFetchUserDataByID = (token, userID) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataResponse = await findUser(token, userID);
        window.localStorage.setItem('token', userDataResponse.token);
        setUserData(userDataResponse.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (token && userID) {
      fetchUserData();
    }
  }, [token, userID]);

  return userData;
};

export default useFetchUserDataByID;
