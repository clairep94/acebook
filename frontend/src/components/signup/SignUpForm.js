import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { isValidPassword, isValidEmail } from '../../utilities/SignUpRegex';



const SignUpForm = ({ navigate, switchForms }) => {

    // =========== STATE VARIABLES ==========================
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [retypePassword, setRetypePassword] = useState("");
  const [showSuccessful, setShowSuccessful] = useState(false);
  const [error, setError] = useState(null);

  // Load the component, change form if form changes
  useEffect(() => {
  }, [showSuccessful])


  // ============ FORM SUBMISSION FOR SIGNUP ====================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !email || !password || !retypePassword) {
      setError("All fields must be filled"); 
      return;
    } else {
      setError("")
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    } else {
      setError("");
    }

    if (!isValidPassword(password)) {
      setError("Password must have at least 8 characters with no spaces and must include at least 1 lowercase letter, 1 uppercase letter, 1 special character and 1 number");
      return;
    } else {
      setError("");
    }

    if (password !== retypePassword) {
      setError("Passwords do not match")
      return;
    } else {
      setError("")
    }
    
    // API CALL ---------------------
    fetch( '/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName: firstName, lastName: lastName, email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          setShowSuccessful(true);
          
        } else if (response.status === 400) {
          setError("Email is already registered with an account")
        } else {
          setError("Server error, please try again later")
        }
      })
  }

  // ------------ SUPPORTIVE FUNCTIONS: ----------------
  // FUNCTIONS FOR CHANGING STATE VARIABLES 
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSetPasswordHidden = (event) => {
    setPasswordHidden(!passwordHidden)
  }

  const handleRetypePasswordChange = (event) => {
    setRetypePassword(event.target.value)
  }

  // ========= JSX FOR THE UI OF THE COMPONENT =====================
    return (
      <> {showSuccessful ? 
        (<>
          {/* SUCCESSFULLY SIGNED UP MESSAGE */}
          <div aria-label='Successful Sign Up Message'
            className='px-8 md:px-16 space-y-4 md:space-y-6 flex flex-col w-full'
          >
            <span className='text-green-600 text-center text-[3rem]'><FaCheckCircle/></span>
            <h2 className='font-bold text-2xl text-black dark:text-white'>Successfully Signed Up!</h2>

            <span aria-label="Link to Log in" className='text-sky-600 font-bold hover:underline text-[1.5rem]' onClick={switchForms}>Log in</span>

          </div>
      
        </>) : (
        <>
          <div aria-label='Signup Form' className='px-8 md:px-16 space-y-4 md:space-y-6 flex flex-col w-full'>

            <h2 className='font-bold text-2xl text-black dark:text-white'>Sign Up</h2>

            {/* Sign Up Form */}
            <form class="space-y-2 md:space-y-3" onSubmit={handleSubmit}>

                {/* First Name */}
                <input aria-label="First Name input field" placeholder="First Name" id="firstName" type='text' value={ firstName } onChange={handleFirstNameChange} 
                  className="bg-gray-100 border border-gray-300 text-gray-600 sm:text-sm rounded-lg 
                  focus:ring-1 focus:outline-none focus:ring-sky-300 focus:border-sky-300
                  block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                />

                {/* Last Name */}
                <input aria-label="Last Name input field" placeholder="Last Name" id="lastName" type='text' value={ lastName } onChange={handleLastNameChange} 
                  className="bg-gray-100 border border-gray-300 text-gray-600 sm:text-sm rounded-lg 
                  focus:ring-1 focus:outline-none focus:ring-sky-300 focus:border-sky-300
                  block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                />

                {/* Email */}
                <input aria-label="Email address input field" placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} 
                  className="bg-gray-100 border border-gray-300 text-gray-600 sm:text-sm rounded-lg 
                    focus:ring-1 focus:outline-none focus:ring-sky-300 focus:border-sky-300
                    block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                  />

                {/* Password 1 */}
                <div className='relative'>
                  {/* Password field */}
                  <input aria-label="Password input field" placeholder="Password" id="password" type={passwordHidden ? 'password': 'text'} value={ password } onChange={handlePasswordChange} 
                    className="bg-gray-100 border border-gray-300 text-gray-600 sm:text-sm rounded-lg 
                    focus:ring-1 focus:outline-none focus:ring-sky-300 focus:border-sky-300
                    block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
                    />
                  
                  {/* Toggle PW Visibility */}
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

                {/* Password 2 */}
                <div className='relative'>
                  <input aria-label="Retype password input field" placeholder="Retype Password" id="retype-password" type={passwordHidden ? 'password': 'text'} value={retypePassword} onChange={handleRetypePasswordChange}
                    className="bg-gray-100 border border-gray-300 text-gray-600 sm:text-sm rounded-lg 
                    focus:ring-1 focus:outline-none focus:ring-sky-300 focus:border-sky-300
                    block w-full p-2.5 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"            
                  />
                                {/* Toggle PW Visibility */}
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

                {/* Submit Button */}
                <input aria-label="Submit button" id='submit' type="submit" value="Submit"
                  className='w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center
                  text-white
                  bg-green-600 hover:bg-green-700
                  focus:ring-2 focus:outline-none focus:ring-sky-400
                  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-sky-800"'
                />
            </form>


            {/* ERROR MESSAGES */}
            {error && <p aria-label="Signup Error Message" className='text-red-500 text-sm italic'>{error}</p>}

            <p aria-label="Aready have an account? Log in">
            <font color="#505050 ">Already have an account? </font>
            <span aria-label="Link to Log in" className='text-sky-600 font-bold hover:underline' onClick={switchForms}>Log in</span>
            </p>
          </div>
        </> )
      }

    </>    
    );
}

export default SignUpForm;
