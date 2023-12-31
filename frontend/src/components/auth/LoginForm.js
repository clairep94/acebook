import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom'; // use this for login-popup when timed-out
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const LogInForm = ({ navigate, switchForms }) => {

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
      setError("Invalid email or password combination")
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
      //   navigate('/home');
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
    return (
      <div aria-label="Login Container" 
                    class="bg-white/80 flex 
                    w-80 md:w-96 lg:w-[28rem] max-w-3xl
                    rounded-lg shadow-lg  p-5 py-10 items-center
                    dark:bg-gray-800 dark:border-gray-700 dark:border
                    ">

        <div aria-label='Login Form' className='px-8 md:px-16 space-y-4 md:space-y-6 flex flex-col w-full'>

          <h2 className='font-bold text-2xl text-black dark:text-white'>Login</h2>

          {/* LOGIN FORM */}
          <form class="space-y-2 md:space-y-3" onSubmit={handleSubmit}>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input aria-label="Email Field" placeholder='name@company.com' id="email" type='text' value={ email } onChange={handleEmailChange} 
              className="bg-gray-100 border border-gray-300 text-gray-600 sm:text-sm rounded-lg 
              focus:ring-1 focus:outline-none focus:ring-sky-300 focus:border-sky-300
              block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            />

            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <div className='relative'>
              <input aria-label="Password Field" placeholder="•••••••••••" id="password" type={passwordHidden ? 'password': 'text'} value={ password } onChange={handlePasswordChange} 
                className="bg-gray-100 border border-gray-300 text-gray-600 sm:text-sm rounded-lg 
                focus:ring-1 focus:outline-none focus:ring-sky-300 focus:border-sky-300 block w-full p-2.5 
                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
              />
              {/* BUTTON TO TOGGLE PW VISIBILITY */}
              <button
                aria-label="Toggle Password Visibility Button"
                onClick={handleSetPasswordHidden}
                id="toggle-pw-visibility-button"
                button type="button"
                className='font-medium rounded-lg text-xl p-1.5 text-center
                  text-gray-400 hover:text-gray-500 focus:ring-2 focus:outline-none focus:ring-sky-300
                  dark:text-gray-400 dark:hover:text-gray-500
                  absolute bottom-[0.3rem] right-[0.3rem]'
                >
                  {/* {passwordHidden ? 'Show Password' : 'Hide Password'} */}
                  {passwordHidden ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}
              </button>

            </div>

            <input aria-label="Login Button" id='login-button' type="submit" value="Login" 
              className='w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center
              text-white
              bg-sky-600 hover:bg-sky-700
              focus:ring-2 focus:outline-none focus:ring-sky-300
              dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"'
            />
          </form>


        {/* ERROR MESSAGES */}
        {error && <p aria-label="Login Error Message" className='text-red-500 text-sm italic'>{error}</p>}


        <p aria-label="Don't have an account? Register">
          <font color="#505050 ">Don't have an account? </font>
          <span aria-label="Link to Register" className='text-sky-600 font-bold hover:underline' onClick={switchForms} >Register</span>
        </p>

        </div>

      </div>
    );
}

export default LogInForm;
