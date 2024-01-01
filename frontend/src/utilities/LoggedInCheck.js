import { jwtDecode } from 'jwt-decode';


const isLoggedIn = () => {
    const token = localStorage.getItem('token');

    if (!token){
        return false;
    }

    try {
        const decodedToken = jwtDecode(token); // Decoding the token using jwt-decode
        const currentTime = Date.now() / 1000; // Get current time in seconds

        // Check if the token's expiration time is greater than the current time
        if (decodedToken.exp && decodedToken.exp > currentTime) {
        // Token exists and is not expired
        return true;
        } else {
        // Token exists but is expired
        return false;
        }
    } catch (error) {
        // If there's an error decoding the token (invalid token format, etc.), consider it as invalid
        return false;
    }

}

export default isLoggedIn;