import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');

initForm();

form.addEventListener('submit', evt => {
	evt.preventDefault();
	const formData = new FormData(form);
	// console.log(formData);
	formData.forEach((value, name) => {
		console.log(value, name);
		form[name].value = "";
	});
	localStorage.removeItem(LOCALSTORAGE_KEY);
});

form.addEventListener('input', evt => {
	let persistedState = localStorage.getItem(LOCALSTORAGE_KEY);
	//console.log (persistedState);
	persistedState = persistedState ? JSON.parse(persistedState) : {};
	persistedState[evt.target.name] = evt.target.value;
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(persistedState));
});



function initForm() {
	let persistedState = localStorage.getItem(LOCALSTORAGE_KEY);
	// console.log(persistedState);
	if (persistedState) {
		persistedState = JSON.parse(persistedState);
		Object.entries(persistedState).forEach(([name, value]) =>{
			form.elements[name].value = value;
		});
	}
}

// form.addEventListener('input', throttle(onFormData, 500));
// form.addEventListener('submit', onSubmitForm);

// dataFromLocalStorage();

// function onFormData(e) {
//   let formData = localStorage.getItem('feedback-form-state');    
//   formData = formData ? JSON.parse(formData) : {};
//   formData[e.target.name] = e.target.value;
//   localStorage.setItem('feedback-form-state', JSON.stringify(formData));
// }
// function onSubmitForm(e) {
//   console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
//   e.preventDefault();
//   e.currentTarget.reset();
//   localStorage.removeItem('feedback-form-state');
// }
// function dataFromLocalStorage() {
//   let data =  localStorage.getItem('feedback-form-state');
// //   const email = document.querySelector('.feedback-form input');
// //   const message = document.querySelector('.feedback-form textarea');
//   if (data) {
//     data  = JSON.parse(data );
//    Object.entries(data).forEach(([name, value]) => {
// 		form.elements[name].value = value;
// 	});
//   }
// };
