const inputs = $('.form__group--input', true);
const passwordVisibility = $('.eye');

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
    isPasswordValid = event.target.value !== '';
  }
  loginUser();
};

inputs.forEach((input) => {
  input.addEventListener('keyup', validateInputs);
});

passwordVisibility.addEventListener('click', function () {
const password = $('#password')
  if (this.textContent === 'visibility') {
    this.textContent = 'visibility_off'
    password.setAttribute('type', 'password')
    this.style.color = 'black'
  } else {
    this.textContent = 'visibility'
    password.setAttribute('type', 'text')
    this.style.color = 'red'
  }
})
