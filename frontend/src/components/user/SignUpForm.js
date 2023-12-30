import React, { useState } from 'react';
// import styles from './SignUpForm.module.css';
const SignUpForm = ({ navigate }) => {

    // =========== STATE VARIABLES ==========================
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState(null);

  // ============ FORM SUBMISSION FOR SIGNUP ====================
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !retypePassword) {
      setError("All fields must be filled"); 
      return;
    } else {
      setError("")
    }

    if (!isValidUsername(username)) {
      setError("Username must have at least 6 characters and must not include any spaces or special characters");
      return;
    } else {
      setError("");
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
    

    fetch( '/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, email: email, password: password })
    })
      .then(response => {
        if(response.status === 201) {
          navigate('/login')
        } else {
          navigate('/signup')
        }
      })
  }

  // ------------ SUPPORTIVE FUNCTIONS: ----------------
  // FUNCTIONS FOR CHANGING STATE VARIABLES 
  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
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

    return (
      <>
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>

          <input aria-label="Username input field" placeholder="Username" id="username" type='text' value={ username } onChange={handleUsernameChange} />
          <input aria-label="Email address input field" placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
          <input aria-label="Password input field" placeholder="Password" id="password" type={passwordHidden ? 'password': 'text'} value={ password } onChange={handlePasswordChange} />
          <input aria-label="Retype password input field" placeholder="Retype Password" id="retype-password" type={passwordHidden ? 'password': 'text'} value={retypePassword} onChange={handleRetypePasswordChange}/>
          {/* BUTTON TO TOGGLE PW VISIBILITY */}
          <button
            onClick={handleSetPasswordHidden} id="toggle-pw-visibility-button" button type="button" aria-label="Toggle Password Visibility Button"> {passwordHidden ? 'Show Password' : 'Hide Password'}
          </button>
          <input aria-label="Submit button" id='submit' type="submit" value="Submit"/>
      </form>

        
      
      {/* ERROR MESSAGES */}
      {error && <p aria-label="Error Message">{error}</p>}
      
      <br/>
      <p aria-label="Aready have an account? Log in">
      <font color="#505050 ">Already have an account? </font>
      <a aria-label="Link to Log in" href="/login" font color="#003163">Log in</a>
      </p>
      </>
    
    );
}

function isValidPassword(password) {
  // Password must have at least 8 characters with no spaces and must include at least 1 lowercase letter, 1 uppercase letter, 1 special character and 1 number
  const passwordRegex = /^(?!.*\s)(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})(?=.*[a-z])(?=.*[A-Z])/;
  return passwordRegex.test(password);
}

function isValidUsername(username) {
  //Username must have at least 6 characters and must not include any spaces or special characters
  const usernameRegex = /^[a-zA-Z0-9]{6,}$/;
  return usernameRegex.test(username);
}

/* Email must comply with the following criteria set out in line with the email address standards (RFC 5321 and RFC 5322):
no spaces
a single @ sign
maximum 64 characters before the @ sign
only certain accepted characters before the @ sign
maximum 255 characters after the @ sign
the top-level domain (TLD) e.g. .com .org should be a valid and recognised TLD*/
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
export default SignUpForm;
