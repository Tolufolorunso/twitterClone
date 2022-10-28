const form = document.querySelector('.form');
const API = 'http://localhost:3003';

// const fetchApi = async (data) => {
//   console.log(data);

//   const response = await fetch(`${API}/auth/register`, {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   });

//   const result = await response.json();

//   console.log(result);
// };

// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   const user = {
//     firstname: form.firstname.value,
//     lastname: form.lastname.value,
//     username: form.username.value,
//     email: form.email.value,
//     password: form.password.value,
//     confirmPassword: form.confirmPassword.value,
//   };

//   fetchApi(user);
// });
