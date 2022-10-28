const inputs = $('.form__group--input', true);
let password;

let isFirstnameValid,
  isLastnameValid,
  isPasswordValid,
  isUsernameValid,
  isConfirmPasswordValid;

const submitForm = () => {
  const registerBtn = $('.register-btn');

  if (
    isFirstnameValid &&
    isLastnameValid &&
    isUsernameValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    registerBtn.classList.remove('not-allowed');
    registerBtn.removeAttribute('disabled');
  } else {
    registerBtn.classList.add('not-allowed');
    registerBtn.setAttribute('disabled', 'true');
  }
};

const validateInputs = (event) => {
  if (event.target.name === 'firstname') {
    isFirstnameValid = validateText(event.target);
    console.log(isFirstnameValid);
  }

  if (event.target.name === 'lastname') {
    isLastnameValid = validateText(event.target);
  }

  if (event.target.name === 'username') {
    isUsernameValid = validateUsername(event.target);
  }

  if (event.target.name === 'email') {
    isUsernameValid = validateEmail(event.target);
  }

  if (event.target.name === 'password') {
    isPasswordValid = validatePassword(event.target);
    password = event.target.value;
  }

  if (event.target.name === 'confirmPassword') {
    isConfirmPasswordValid = isPasswordsMatch(event.target, password);
  }
  submitForm();
};

inputs.forEach((input) => {
  input.addEventListener('keyup', validateInputs);
});
