import throttle from 'lodash.throttle';
const form = document.querySelector('.feedback-form');
form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onSubmitForm);

function onFormData(e) {
  let formData = localStorage.getItem('feedback-form-state');    
  formData = formData ? JSON.parse(formData) : {};
  formData[e.target.name] = e.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}
function onSubmitForm(e) {
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}
(function dataFromLocalStorage() {
  let data =  localStorage.getItem('feedback-form-state');
  const email = document.querySelector('.feedback-form input');
  const message = document.querySelector('.feedback-form textarea');
  if (data) {
    data  = JSON.parse(data );
    email.value = data.email;
    message.value = data.message;
  }
})();
