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

export {isValidEmail, isValidUsername, isValidPassword}