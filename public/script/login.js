const inputs = $('.form__group--input', true);

let isLogUserValid, isPasswordValid;

const loginUser = () => {
  const loginBtn = $('.login-btn');

  if (isLogUserValid && isPasswordValid) {
    loginBtn.classList.remove('not-allowed');
    loginBtn.removeAttribute('disabled');
  } else {
    loginBtn.classList.add('not-allowed');
    loginBtn.setAttribute('disabled', 'true');
  }
};

const validateInputs = (event) => {
  if (event.target.name === 'loguser') {
    isLogUserValid = event.target.value !== '';
  }

  if (event.target.name === 'password') {
    isPasswordValid =  event.target.value !== '';
  }
  loginUser();
};

inputs.forEach((input) => {
  input.addEventListener('keyup', validateInputs);
});
