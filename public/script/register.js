const inputs = $('.form__group--input', true);
let password;
let isFirstnameValid,
  isLastnameValid,
  isPasswordValid,
  isUsernameValid,
  isEmailValid,
  isConfirmPasswordValid;

const submitForm = () => {
  const registerBtn = $('.register-btn');

  if (
    isFirstnameValid &&
    isLastnameValid &&
    isUsernameValid &&
    isPasswordValid && isEmailValid &&
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
  }

  if (event.target.name === 'lastname') {
    isLastnameValid = validateText(event.target);
  }

  if (event.target.name === 'username') {
    isUsernameValid = validateUsername(event.target);
  }

  if (event.target.name === 'email') {
    isEmailValid = validateEmail(event.target);
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

const startValidate = () => {
  const form = document.querySelector('.form')
if(form.username.value || form.email.value){
   isFirstnameValid = validateText(form.firstname)
  isLastnameValid = validateText(form.lastname)
  isUsernameValid = validateUsername(form.username)
  isEmailValid = validateEmail(form.email)
}
 
}

startValidate()