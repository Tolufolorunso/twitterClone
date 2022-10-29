const valid = (el, msg = 'errorMsg goes here') => {
  el.parentNode.classList.add('valid');
  el.parentNode.classList.remove('error');
  el.parentNode.parentNode.querySelector('p').style.visibility = 'hidden';
  el.parentNode.parentNode.querySelector('p').textContent = msg;
  el.parentNode.querySelector('.marked').style.display = 'block';
};

const invalid = (el, msg = '') => {
  el.parentNode.classList.remove('valid');
  el.parentNode.classList.add('error');
  el.parentNode.parentNode.querySelector('p').textContent = msg;
  el.parentNode.parentNode.querySelector('p').style.visibility = 'visible';
  el.parentNode.querySelector('.marked').style.display = 'none';
};

const isPassed = (pattern, el, msg) => {
  if (pattern.test(el.value.trim())) {
    valid(el);
    return true;
  } else {
    invalid(el, msg);
    return false;
  }
};

const validateText = (el) => {
  const pattern = /(^[a-zA-Z][a-zA-Z\s]{4,}[a-zA-Z]$)/;
  return isPassed(pattern, el, 'Enter valid name.');
};

const validateUsername = (el) => {
  const pattern = /(^[a-zA-Z0-9]{7,}[a-zA-Z]$)/;
  return isPassed(pattern, el, 'Enter valid name.');
};

const validateEmail = (el) => {
  const emailpattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return isPassed(emailpattern, el, 'Enter valid email');
};

const validatePassword = (el) => {
  const pattern = /(^[a-zA-Z0-9]{3,}[a-zA-Z]$)/;
  return isPassed(pattern, el, 'Enter at least 8 characters.');
};

const isPasswordsMatch = (el, password) => {
  if (el.value !== password) {
    invalid(el, 'Password not matched');
    return false;
  }
  valid(el);
  return true;
};
