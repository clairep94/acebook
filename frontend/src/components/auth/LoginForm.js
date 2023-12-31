import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom'; // use this for login-popup when timed-out
// import styles from './LoginForm.module.css'

const LogInForm = ({ navigate }) => {

  // =========== STATE VARIABLES ==========================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [passwordHidden, setPasswordHidden] = useState(true);

  // const location = useLocation(); // use this for login-popup when timed-out



  // ============ FORM SUBMISSION FOR LOGIN ====================
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send POST request to '/tokens' endpoint
    let response = await fetch( '/tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password })
    })

    // Checking the response status
    if(response.status === 401){ // wrong password
      setError("Enter a valid email or password")
    } else if (response.status !== 201) { // if error code is not 401 or 201, show server error
      setError("Server error, please try again later")
    } else { // login successful
      let data = await response.json()
      window.localStorage.setItem("token", data.token)
      

      // TEMP: No timeout login popup:
      navigate('/home')

      // FOR FUTURE USE IF HAVING TIMEOUT LOGIN POPUP:
      // // Check the current location and navigate accordingly
      // if (location.pathname === '/') {
      //   navigate('/timeline');
      // } else {
      //   // 
      // }
      // window.location.reload(); // Necessary addition so that page after successful login if logging in after timed out
    }
  }



  // ------------ SUPPORTIVE FUNCTIONS: ----------------
  // FUNCTIONS FOR CHANGING STATE VARIABLES 
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSetPasswordHidden = (event) => {
    setPasswordHidden(!passwordHidden)
  }

  // Enter a valid email or password


  // ========= JSX FOR THE UI OF THE COMPONENT =====================
  // for all styling: use className={styles.Button}
    return (
      <div aria-label='Login Form' className='px-8 md:px-16 flex flex-col'>

      <h2 className='font-bold text-2xl text-black'>Login</h2>

      {/* LOGIN FORM */}
      <form onSubmit={handleSubmit}>
        <p>Your email</p>
        <input aria-label="Email Field" placeholder='name@company.com' id="email" type='text' value={ email } onChange={handleEmailChange} />
        <p>Password</p>
        <input aria-label="Password Field" placeholder="••••••••" id="password" type={passwordHidden ? 'password': 'text'} value={ password } onChange={handlePasswordChange} />

        <input aria-label="Login Button" id='login-button' type="submit" value="Login" />
      </form>

      {/* BUTTON TO TOGGLE PW VISIBILITY */}
      <button
        aria-label="Toggle Password Visibility Button"
        onClick={handleSetPasswordHidden}
        id="toggle-pw-visibility-button"
        button type="button"
        >
          {passwordHidden ? 'Show Password' : 'Hide Password'}
      </button>

      {/* ERROR MESSAGES */}
      {error && <p aria-label="Login Error Message"  >{error}</p>}

      <br/>
      <p aria-label="Don't have an account? Register">
        <font color="#505050 ">Don't have an account? </font>
        <a aria-label="Link to Register" href="/signup" font color="#003163" >Register</a>
      </p>

      {/* BACKGROUND */}
      <div 
      ></div>

      </div>
    );
}

export default LogInForm;
